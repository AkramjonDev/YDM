import type { Locale } from "./config";

// Built by hand: Intl's Uzbek output varies between runtimes.
const uzMonths = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

const dateFormats = {
  ru: new Intl.DateTimeFormat("ru", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  en: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};

// "2026-yil 22-sentabr" · "22 сентября 2026" · "22 September 2026".
// `iso` is a calendar date (YYYY-MM-DD), read in UTC so it never shifts a day.
export function formatDate(locale: Locale, iso: string): string {
  const date = new Date(iso);
  if (locale === "uz") {
    return `${date.getUTCFullYear()}-yil ${date.getUTCDate()}-${uzMonths[date.getUTCMonth()]}`;
  }
  // Assembled from parts to drop the Russian "г." suffix.
  const parts = dateFormats[locale].formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("day")} ${part("month")} ${part("year")}`;
}

// Always grouped, so four-digit numbers read "1 240" in uz/ru too (their
// default skips grouping below 10 000).
export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale, { useGrouping: "always" }).format(value);
}
