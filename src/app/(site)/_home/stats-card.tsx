"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { formatNumber } from "@/i18n/format";

type Item = { value: number; suffix: string; label: string };

type Props = {
  locale: Locale;
  items: Item[];
};

const COUNT_MS = 1800;
const STAGGER_MS = 120;
const EASE = "cubic-bezier(0.22,1,0.36,1)";

const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

// Same formatting as the rest of the site (see formatNumber).
function formatter(locale: Locale) {
  return { format: (value: number) => formatNumber(locale, value) };
}

// Cell borders for a 2×2 grid below 1024px and a single row above it.
const cellBorders = [
  "",
  "border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-l border-t lg:border-t-0",
];

export function StatsCard({ locale, items }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLLIElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Current displayed value per item. Starts at the final value, which is what
  // the server renders, and is what screen readers always get.
  const progress = useRef(items.map((item) => item.value));
  const format = useRef(formatter(locale));
  const [inView, setInView] = useState(false);

  // Language change: re-format whatever is on screen without restarting.
  useLayoutEffect(() => {
    format.current = formatter(locale);
    numberRefs.current.forEach((el, i) => {
      if (el) el.textContent = format.current.format(progress.current[i]);
    });
  }, [locale]);

  // Reveal once, when ~30% of the card is visible.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Count-up. Writes straight to the DOM each frame, so React doesn't re-render.
  useEffect(() => {
    if (!inView) return;
    const finish = (i: number) => cellRefs.current[i]?.setAttribute("data-done", "");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((_, i) => finish(i));
      return;
    }

    const targets = items.map((item) => item.value);
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      let running = false;
      targets.forEach((target, i) => {
        const t = Math.min(Math.max((now - start - i * STAGGER_MS) / COUNT_MS, 0), 1);
        const value = Math.round(target * easeOutQuart(t));
        if (value !== progress.current[i]) {
          progress.current[i] = value;
          const el = numberRefs.current[i];
          if (el) el.textContent = format.current.format(value);
        }
        if (t < 1) running = true;
        else finish(i);
      });
      if (running) frame = requestAnimationFrame(tick);
    };

    progress.current = targets.map(() => 0);
    numberRefs.current.forEach((el) => {
      if (el) el.textContent = format.current.format(0);
    });
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `items` only changes with the language, which must not restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={cardRef}
      data-state={inView ? "in" : "idle"}
      style={{ transitionTimingFunction: EASE }}
      className="group/card overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-20px_rgb(2_28_86/0.25)] motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-10 motion-safe:data-[state=idle]:opacity-0"
    >
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={i}
            ref={(el) => {
              cellRefs.current[i] = el;
            }}
            className={`group/stat border-line px-4 py-7 transition-colors duration-300 hover:bg-mist sm:px-8 sm:py-9 lg:px-10 lg:py-11 ${cellBorders[i] ?? ""}`}
          >
            <div
              style={{ transitionDelay: `${i * STAGGER_MS}ms`, transitionTimingFunction: EASE }}
              className="motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/card:translate-y-5 motion-safe:group-data-[state=idle]/card:opacity-0"
            >
              <p className="font-display text-[2rem] font-extrabold leading-none text-navy-900 tabular-nums sm:text-[2.5rem] lg:text-5xl">
                <span
                  aria-hidden
                  suppressHydrationWarning
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                >
                  {formatter(locale).format(item.value)}
                </span>
                {item.suffix && (
                  <span
                    aria-hidden
                    className="transition-opacity duration-300 motion-safe:opacity-0 motion-safe:group-data-done/stat:opacity-100"
                  >
                    {item.suffix}
                  </span>
                )}
                <span className="sr-only" suppressHydrationWarning>
                  {formatter(locale).format(item.value)}
                  {item.suffix}
                </span>
              </p>
              <span
                aria-hidden
                style={{
                  transition: `scale 0.5s ${EASE}, width 0.3s ease`,
                }}
                className="gold-rule mt-4 block h-[3px] w-[70px] origin-left rounded-full group-hover/stat:w-[100px] motion-safe:scale-x-0 motion-safe:group-data-done/stat:scale-x-100 motion-reduce:transition-none!"
              />
              <p className="mt-5 text-sm leading-snug text-muted sm:text-base lg:text-[17px]">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
