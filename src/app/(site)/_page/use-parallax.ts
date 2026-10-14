"use client";

import { useEffect, type RefObject } from "react";

// Drifts an element vertically by up to ±`distance` px as it crosses the
// viewport. Only listens to scroll while the element is on screen; off with
// prefers-reduced-motion. Writes `translate` directly, so no re-renders.
export function useParallax(ref: RefObject<HTMLElement | null>, distance = 20) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        el.style.translate = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const half = window.innerHeight / 2;
      // -1 below the viewport centre … 1 above it.
      const progress = Math.max(
        -1,
        Math.min(1, (half - (rect.top + rect.height / 2)) / (half + rect.height / 2)),
      );
      el.style.translate = `0 ${(progress * distance).toFixed(1)}px`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        schedule();
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref, distance]);
}
