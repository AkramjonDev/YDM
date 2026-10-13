"use client";

import { localeNames, locales, type Locale } from "@/i18n/config";
import { useLocaleSwitch } from "./use-locale-switch";

type Props = {
  locale: Locale;
  label: string;
  // "dark" sits on the navy top bar, "light" in the white mobile panel.
  variant: "dark" | "light";
};

const styles = {
  dark: {
    group: "border-white/15",
    button: "h-7 min-w-10 px-2.5 text-xs",
    active: "bg-gold-500 text-navy-950",
    idle: "text-white/70 hover:text-white",
  },
  light: {
    group: "border-line bg-mist",
    button: "h-9 min-w-14 px-3 text-sm",
    active: "bg-gold-500 text-navy-950 shadow-sm",
    idle: "text-muted hover:text-navy-900",
  },
};

export function LanguageSwitcher({ locale, label, variant }: Props) {
  const { pending, change } = useLocaleSwitch();
  const s = styles[variant];

  return (
    <div
      role="group"
      aria-label={label}
      aria-busy={pending}
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${s.group}`}
    >
      {locales.map((value) => {
        const current = value === locale;
        return (
          <button
            key={value}
            type="button"
            lang={value}
            aria-pressed={current}
            onClick={() => {
              if (!current) change(value);
            }}
            className={`rounded-full font-semibold transition-colors ${s.button} ${
              current ? s.active : s.idle
            }`}
          >
            {value.toUpperCase()}
            <span className="sr-only"> {localeNames[value]}</span>
          </button>
        );
      })}
    </div>
  );
}
