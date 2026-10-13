"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  // <li> items, each rendered with data-state="idle".
  children: ReactNode;
};

// Grid that reveals row by row. Each item flips its own `data-state` to "in"
// once ~20% of it is visible, so rows below the fold wait until scrolled to;
// `--col` (its column in the current layout) drives the left-to-right stagger.
// Also feeds the pointer position to `[data-spotlight]` cards as
// --spot-x/--spot-y.
export function RevealGrid({ className, children }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const items = Array.from(grid.children) as HTMLElement[];

    const measure = () => {
      let col = 0;
      let top = -Infinity;
      for (const item of items) {
        if (item.offsetTop > top + 1) {
          col = 0;
          top = item.offsetTop;
        } else {
          col++;
        }
        item.style.setProperty("--col", String(col));
      }
    };
    // Measure first so the stagger is in place before anything reveals.
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(grid);

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-state", "in");
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    items.forEach((item) => reveal.observe(item));

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element).closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };
    grid.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      resize.disconnect();
      reveal.disconnect();
      grid.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
