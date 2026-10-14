"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";

type Props = {
  text: string;
  className?: string;
};

// Paragraph whose words brighten (opacity 0.2 → 1) in reading order as it
// scrolls through the viewport: from its top at 85% of the viewport height to
// its bottom at 50%. Only `--p` (progress 0–1) is written per frame; each
// word's opacity is derived in CSS from its index. Full opacity with
// prefers-reduced-motion.
export function ScrollWords({ text, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travelled = vh * 0.85 - rect.top;
      const distance = vh * 0.35 + rect.height;
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, travelled / distance))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        schedule();
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        schedule();
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const words = text.split(/\s+/);

  return (
    <p ref={ref} style={{ "--n": words.length } as CSSProperties} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span
            style={{ "--i": i } as CSSProperties}
            className="[opacity:clamp(0.2,calc(var(--p,0)*var(--n)-var(--i)),1)] motion-reduce:opacity-100"
          >
            {word}
          </span>
        </Fragment>
      ))}
    </p>
  );
}
