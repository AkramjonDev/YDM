"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

// The root layout renders <html lang> with the default locale (reading the
// cookie there would make every page's shell dynamic); this syncs it to the
// visitor's locale, including after a language switch.
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
