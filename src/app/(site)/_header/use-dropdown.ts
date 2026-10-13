"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";

// Disclosure-style dropdown: a button toggling a panel of [data-dropdown-item]
// elements. Arrow keys move between items, Esc closes and returns focus to the
// button, and clicking or tabbing outside closes it.
export function useDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onOutside = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [open]);

  function focusItem(index: number) {
    const items = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>("[data-dropdown-item]") ?? [],
    );
    if (items.length === 0) return;
    items[(index + items.length) % items.length].focus();
  }

  function currentIndex() {
    const items = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>("[data-dropdown-item]") ?? [],
    );
    return items.indexOf(document.activeElement as HTMLElement);
  }

  function onKeyDown(event: KeyboardEvent) {
    const index = currentIndex();
    switch (event.key) {
      case "Escape":
        if (!open) return;
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        if (!open) {
          flushSync(() => setOpen(true));
          focusItem(step === 1 ? 0 : -1);
        } else {
          focusItem(index < 0 ? (step === 1 ? 0 : -1) : index + step);
        }
        break;
      }
      case "Home":
      case "End":
        if (!open || index < 0) return;
        event.preventDefault();
        focusItem(event.key === "Home" ? 0 : -1);
        break;
    }
  }

  return {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen((value) => !value),
    rootRef,
    buttonRef,
    panelId,
    onKeyDown,
  };
}
