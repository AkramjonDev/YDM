import type { Locale } from "./config";

// Events are scheduled in Tashkent time, whoever is viewing.
const EVENT_TIME_ZONE = "Asia/Tashkent";

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

const monthsShort: Record<Locale, string[]> = {
  uz: ["YAN", "FEV", "MAR", "APR", "MAY", "IYN", "IYL", "AVG", "SEN", "OKT", "NOY", "DEK"],
  ru: ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
};

const intlLocale = { ru: "ru", en: "en-GB" } as const;

type Parts = { year: number; month: number; day: number; hour: number; minute: number };

// Calendar fields of `date` as seen in `timeZone` (month is 0-based).
function partsIn(date: Date, timeZone: string): Parts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value);
  return {
    year: get("year"),
    month: get("month") - 1,
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

// "2026-yil 22-sentabr" · "22 сентября 2026" · "22 September 2026".
function dayLabel(locale: Locale, date: Date, timeZone: string): string {
  if (locale === "uz") {
    const { year, month, day } = partsIn(date, timeZone);
    return `${year}-yil ${day}-${uzMonths[month]}`;
  }
  // Assembled from parts to drop the Russian "г." suffix.
  const parts = new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("day")} ${part("month")} ${part("year")}`;
}

// A calendar date (YYYY-MM-DD), read in UTC so it never shifts a day.
export function formatDate(locale: Locale, iso: string): string {
  return dayLabel(locale, new Date(iso), "UTC");
}

// An event start, in Tashkent time: "2026-yil 15-oktabr, 10:00" ·
// "15 октября 2026, 10:00" · "15 October 2026, 10:00".
export function formatDateTime(locale: Locale, iso: string): string {
  const date = new Date(iso);
  const { hour, minute } = partsIn(date, EVENT_TIME_ZONE);
  const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  return `${dayLabel(locale, date, EVENT_TIME_ZONE)}, ${time}`;
}

// Day of month and short month ("15", "OKT") of an event start, in Tashkent time.
export function eventDay(locale: Locale, iso: string): { day: number; month: string } {
  const { day, month } = partsIn(new Date(iso), EVENT_TIME_ZONE);
  return { day, month: monthsShort[locale][month] };
}

// Whole calendar days (Tashkent) from `now` to an event start: 0 = today.
export function daysUntil(iso: string, now: Date): number {
  const dayNumber = (date: Date) => {
    const { year, month, day } = partsIn(date, EVENT_TIME_ZONE);
    return Date.UTC(year, month, day) / 86_400_000;
  };
  return dayNumber(new Date(iso)) - dayNumber(now);
}

// Integers grouped by thousands: "1 240" (uz, ru) · "1,240" (en). Built from
// en-US output because browsers often ship without Uzbek number data and fall
// back to "1,240"; this way server and client always agree. Always grouped,
// so four-digit numbers are grouped too.
export function formatNumber(locale: Locale, value: number): string {
  const grouped = new Intl.NumberFormat("en-US", { useGrouping: "always" }).format(value);
  return locale === "en" ? grouped : grouped.replaceAll(",", " ");
}
