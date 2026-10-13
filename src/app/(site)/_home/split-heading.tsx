"use client";

import { Fragment, useLayoutEffect, useRef, type CSSProperties } from "react";

type Props = {
  id?: string;
  // A string reveals line by line, following the real wrapping. An array
  // (e.g. sentences) reveals one item per step, however the items wrap.
  text: string | string[];
  // Delay between steps.
  stepMs?: number;
  className?: string;
};

// Heading that slides up in steps inside a <Reveal>. Words wrap naturally and
// each carries its step index (--line): measured after layout for a string,
// taken from the item index for an array, so it works in every language and
// at every width.
export function SplitHeading({ id, text, stepMs = 80, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const grouped = Array.isArray(text);

  useLayoutEffect(() => {
    const heading = ref.current;
    if (!heading || grouped) return;
    const words = Array.from(heading.querySelectorAll<HTMLElement>("[data-word]"));

    const measure = () => {
      let line = -1;
      let top = -Infinity;
      for (const word of words) {
        if (word.offsetTop > top + 1) {
          line++;
          top = word.offsetTop;
        }
        word.style.setProperty("--line", String(line));
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(heading);
    return () => observer.disconnect();
  }, [text, grouped]);

  const words = (grouped ? text : [text]).flatMap((segment, step) =>
    segment.split(/\s+/).map((word) => ({ word, step })),
  );

  return (
    <h2
      ref={ref}
      id={id}
      style={{ "--step-ms": `${stepMs}ms` } as CSSProperties}
      className={className}
    >
      {words.map(({ word, step }, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {/* Extra bottom room so descenders aren't clipped; the negative
              margin keeps the line box unchanged. */}
          <span
            data-word
            style={grouped ? ({ "--line": step } as CSSProperties) : undefined}
            className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top"
          >
            <span className="inline-block ease-reveal [transition-delay:calc(100ms+var(--line,0)*var(--step-ms,80ms))] motion-safe:transition-[translate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:translate-y-[115%]">
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </h2>
  );
}
