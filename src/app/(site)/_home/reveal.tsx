"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

// Flips `data-state` from "idle" to "in" once, the first time ~25% of the block
// is visible. Descendants animate with `group-data-[state=idle]/reveal:`
// classes, behind `motion-safe:` so reduced-motion users see the final state.
export function Reveal({ className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-state={inView ? "in" : "idle"} className={`group/reveal ${className}`}>
      {children}
    </div>
  );
}
