"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// One underline for the desktop nav that slides to the active item when the
// route changes. Items mark themselves with [data-nav-active] and their text
// with [data-nav-label]; the bar sits under that text. It jumps (no slide) on
// first paint, on resize, and when it reappears after no item was active.
export function useNavIndicator(pathname: string) {
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const visible = useRef(false);

  const place = (slide: boolean) => {
    const list = listRef.current;
    const bar = barRef.current;
    if (!list || !bar) return;
    const item = list.querySelector<HTMLElement>("[data-nav-active]");
    if (!item) {
      bar.style.opacity = "0";
      visible.current = false;
      return;
    }
    const label = item.querySelector<HTMLElement>("[data-nav-label]") ?? item;
    const from = list.getBoundingClientRect();
    const to = label.getBoundingClientRect();
    bar.style.transitionProperty = slide && visible.current ? "translate, width, opacity" : "opacity";
    bar.style.translate = `${to.left - from.left}px 0`;
    bar.style.width = `${to.width}px`;
    bar.style.opacity = "1";
    visible.current = true;
  };
  const placeRef = useRef(place);
  useLayoutEffect(() => {
    placeRef.current = place;
  });

  // Route change: slide to the new item.
  useLayoutEffect(() => {
    placeRef.current(true);
  }, [pathname]);

  // Layout change (resize, fonts): jump into place. Skips the observer's
  // initial callback so it doesn't cancel a slide that just started.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let first = true;
    const observer = new ResizeObserver(() => {
      if (first) first = false;
      else placeRef.current(false);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return { listRef, barRef };
}
