"use client";

import { useEffect } from "react";

// Wait for the card's reveal to finish before pulsing.
const PULSE_DELAY_MS = 900;
// Length of `animate-hash-pulse` (2 × 0.8s, globals.css).
const PULSE_MS = 1600;

// When the page is opened with #slug (e.g. a home page chip) or the hash
// changes, scrolls to that [data-hash-target] element and pulses it twice so
// the link visibly "lands". Instant scroll and no pulse with reduced motion.
export function HashPulse() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;

    const land = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target?.hasAttribute("data-hash-target")) return;

      target.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "start" });
      if (reduce.matches) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        target.classList.remove("animate-hash-pulse");
        void target.offsetWidth; // restart if it is already pulsing
        target.classList.add("animate-hash-pulse");
        timer = window.setTimeout(() => target.classList.remove("animate-hash-pulse"), PULSE_MS);
      }, PULSE_DELAY_MS);
    };

    land();
    window.addEventListener("hashchange", land);
    return () => {
      window.removeEventListener("hashchange", land);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
