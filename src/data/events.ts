import type { Localized } from "@/i18n/config";

// Same shape the admin panel will store (hence the snake_case foreign key).
export type EventItem = {
  id: number;
  slug: string;
  // `Department.id`; drives the badge colour and name.
  department_id: number;
  // Start date-time with the Tashkent offset, e.g. 2026-10-15T10:00:00+05:00.
  start: string;
  location: Localized;
  title: Localized;
  excerpt: Localized;
  // TODO: event descriptions, once the event pages are built.
  body: Localized | null;
};

// PLACEHOLDER events until the admin panel supplies real items.
export const events: EventItem[] = [
  {
    id: 1,
    slug: "model-bmt-2026",
    department_id: 1,
    start: "2026-10-15T10:00:00+05:00",
    location: {
      uz: "Toshkent, Markaz konferens-zali",
      ru: "Ташкент, конференц-зал Центра",
      en: "Tashkent, Centre conference hall",
    },
    title: {
      uz: "Model BMT — Toshkent 2026",
      ru: "Модель ООН — Ташкент 2026",
      en: "Model UN — Tashkent 2026",
    },
    excerpt: {
      uz: "Talabalar BMT Xavfsizlik Kengashi va Bosh Assambleyasi formatida xalqaro muammolar yuzasidan muzokara olib boradi.",
      ru: "Студенты проведут переговоры по международным проблемам в формате Совета Безопасности и Генеральной Ассамблеи ООН.",
      en: "Students negotiate international issues in the format of the UN Security Council and General Assembly.",
    },
    body: null,
  },
  {
    id: 2,
    slug: "yoshlar-tinchlik-forumi",
    department_id: 8,
    start: "2026-11-05T14:00:00+05:00",
    location: { uz: "Samarqand", ru: "Самарканд", en: "Samarkand" },
    title: {
      uz: "Yoshlar tinchlik forumi",
      ru: "Молодёжный форум мира",
      en: "Youth Peace Forum",
    },
    excerpt: {
      uz: "Mediatsiya, bagʻrikenglik va madaniyatlararo muloqot boʻyicha yoshlar tashabbuslari taqdimoti va panel muhokamalar.",
      ru: "Презентации молодёжных инициатив и панельные дискуссии о медиации, толерантности и межкультурном диалоге.",
      en: "Youth initiative showcases and panel discussions on mediation, tolerance and intercultural dialogue.",
    },
    body: null,
  },
  {
    id: 3,
    slug: "karyera-yarmarkasi",
    department_id: 10,
    start: "2026-11-20T11:00:00+05:00",
    location: { uz: "Toshkent", ru: "Ташкент", en: "Tashkent" },
    title: {
      uz: "Karyera yarmarkasi: xalqaro tashkilotlar",
      ru: "Ярмарка карьеры: международные организации",
      en: "Career fair: international organisations",
    },
    excerpt: {
      uz: "Xalqaro tashkilotlar va kompaniyalar yoshlarga stajirovka va ish oʻrinlarini taklif etadi.",
      ru: "Международные организации и компании предложат молодёжи стажировки и вакансии.",
      en: "International organisations and companies offer young people internships and jobs.",
    },
    body: null,
  },
];

// Events starting at or after `now`, soonest first.
export function upcomingEvents(now: Date, limit = 3): EventItem[] {
  return events
    .filter((event) => new Date(event.start).getTime() >= now.getTime())
    .toSorted((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, limit);
}
