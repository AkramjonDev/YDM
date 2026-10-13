"use client";

import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";

export function useLocaleSwitch() {
  const [pending, startTransition] = useTransition();

  function change(locale: Locale) {
    startTransition(async () => {
      await setLocale(locale);
    });
  }

  return { pending, change };
}
