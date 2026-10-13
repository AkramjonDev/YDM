"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

type Props = {
  id?: string;
  text: string;
  className?: string;
};

// Heading that slides up line by line inside a <Reveal>. Words wrap naturally;
// after layout each word gets its line index (--line), so the stagger follows
// the real wrapping in every language and at every width.
export function SplitHeading({ id, text, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const heading = ref.current;
    if (!heading) return;
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
  }, [text]);

  return (
    <h2 ref={ref} id={id} className={className}>
      {text.split(/\s+/).map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {/* Extra bottom room so descenders aren't clipped; the negative
              margin keeps the line box unchanged. */}
          <span data-word className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
            <span className="inline-block ease-reveal [transition-delay:calc(100ms+var(--line,0)*80ms)] motion-safe:transition-[translate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:translate-y-[115%]">
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </h2>
  );
}
