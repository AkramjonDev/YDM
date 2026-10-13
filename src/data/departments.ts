import type { Localized } from "@/i18n/config";

// lucide icon names; mapped to components in the UI.
export type DepartmentIcon =
  | "globe"
  | "graduation-cap"
  | "chart-line"
  | "palette"
  | "megaphone"
  | "heart-handshake"
  | "users"
  | "bird"
  | "sparkle"
  | "briefcase-business";

export type Department = {
  // Stable key other records point at (e.g. news `department_id`).
  id: number;
  slug: string;
  color: string;
  icon: DepartmentIcon;
  name: Localized;
  // One or two sentences for cards.
  short: Localized;
  // `null` = content not supplied yet (TODO).
  description: Localized | null;
  goals: Localized<string[]> | null;
  head: { name: Localized; position: Localized; photo: string | null } | null;
  email: string | null;
};

export function getDepartment(id: number): Department {
  const department = departments.find((d) => d.id === id);
  if (!department) throw new Error(`Unknown department id: ${id}`);
  return department;
}

// Content not supplied yet: shared by every entry below until it is.
const TODO = {
  description: null,
  goals: null,
  head: null,
  email: null,
} satisfies Pick<Department, "description" | "goals" | "head" | "email">;

// Single source of truth for the departments: the header dropdown, the mobile
// menu, the home stats and the home grid all read this array.
// PLACEHOLDER: entries 1–6 (and their short texts) stand in for the centre's
// real departments until the content is confirmed.
export const departments: Department[] = [
  {
    id: 1,
    slug: "international-cooperation",
    color: "#0a78e0",
    icon: "globe",
    name: {
      uz: "Xalqaro hamkorlik",
      ru: "Международное сотрудничество",
      en: "International cooperation",
    },
    short: {
      uz: "Xorijiy yoshlar tashkilotlari va xalqaro institutlar bilan hamkorlikni rivojlantirish.",
      ru: "Развитие сотрудничества с зарубежными молодёжными организациями и международными институтами.",
      en: "Building partnerships with youth organisations and international institutions abroad.",
    },
    ...TODO,
  },
  {
    id: 2,
    slug: "diplomatic-education",
    color: "#c9a24a",
    icon: "graduation-cap",
    name: {
      uz: "Diplomatik taʼlim",
      ru: "Дипломатическое образование",
      en: "Diplomatic education",
    },
    short: {
      uz: "Yoshlar uchun diplomatiya, muzokara va protokol boʻyicha kurslar va maktablar.",
      ru: "Курсы и школы для молодёжи по дипломатии, переговорам и протоколу.",
      en: "Courses and schools for young people in diplomacy, negotiation and protocol.",
    },
    ...TODO,
  },
  {
    id: 3,
    slug: "research-analysis",
    color: "#173a85",
    icon: "chart-line",
    name: {
      uz: "Tadqiqot va tahlil",
      ru: "Исследования и аналитика",
      en: "Research and analysis",
    },
    short: {
      uz: "Xalqaro munosabatlar va yoshlar siyosati boʻyicha tadqiqotlar va tahliliy materiallar.",
      ru: "Исследования и аналитические материалы по международным отношениям и молодёжной политике.",
      en: "Research and analysis on international relations and youth policy.",
    },
    ...TODO,
  },
  {
    id: 4,
    slug: "cultural-diplomacy",
    color: "#7c4dce",
    icon: "palette",
    name: {
      uz: "Madaniy diplomatiya",
      ru: "Культурная дипломатия",
      en: "Cultural diplomacy",
    },
    short: {
      uz: "Madaniy almashinuv dasturlari va xalqaro madaniy tadbirlarni tashkil etish.",
      ru: "Программы культурного обмена и международные культурные мероприятия.",
      en: "Cultural exchange programmes and international cultural events.",
    },
    ...TODO,
  },
  {
    id: 5,
    slug: "media-communications",
    color: "#0f9d8a",
    icon: "megaphone",
    name: {
      uz: "Media va kommunikatsiyalar",
      ru: "Медиа и коммуникации",
      en: "Media and communications",
    },
    short: {
      uz: "Markaz faoliyatini ommaviy axborot vositalari va ijtimoiy tarmoqlarda yoritish.",
      ru: "Освещение деятельности центра в СМИ и социальных сетях.",
      en: "Covering the Centre’s work in the media and on social networks.",
    },
    ...TODO,
  },
  {
    id: 6,
    slug: "volunteering",
    color: "#e0603a",
    icon: "heart-handshake",
    name: {
      uz: "Volontyorlik",
      ru: "Волонтёрство",
      en: "Volunteering",
    },
    short: {
      uz: "Xalqaro tadbirlar va ijtimoiy loyihalarda ishtirok etuvchi volontyorlar tarmogʻi.",
      ru: "Сеть волонтёров для международных мероприятий и социальных проектов.",
      en: "A volunteer network for international events and social projects.",
    },
    ...TODO,
  },
  {
    id: 7,
    slug: "diplomatik-mahalla",
    color: "#1E6FE0",
    icon: "users",
    name: {
      uz: "Diplomatik Mahalla va Hududiy boʻlimlar dasturi",
      ru: "Программа «Дипломатическая махалля» и региональные отделения",
      en: "Diplomatic Mahalla and Regional Branches",
    },
    short: {
      uz: "Markaz faoliyatini barcha viloyatlar va mahallalargacha yetkazish.",
      ru: "Донесение деятельности центра до всех областей и махаллей.",
      en: "Bringing the Centre’s work to every region and mahalla.",
    },
    ...TODO,
  },
  {
    id: 8,
    slug: "tinchlik-va-muloqot",
    color: "#C99A0E",
    icon: "bird",
    name: {
      uz: "Yoshlar Tinchlik, Mediatsiya va Madaniyatlararo Muloqot markazi",
      ru: "Молодёжный центр мира, медиации и межкультурного диалога",
      en: "Youth Centre for Peace, Mediation and Intercultural Dialogue",
    },
    short: {
      uz: "Bagʻrikenglik, tinchlik madaniyati va madaniyatlararo muloqotni targʻib qilish, yoshlarni mediatsiya koʻnikmalariga oʻrgatish.",
      ru: "Продвижение толерантности, культуры мира и межкультурного диалога, обучение молодёжи навыкам медиации.",
      en: "Promoting tolerance, a culture of peace and intercultural dialogue, and training young people in mediation.",
    },
    ...TODO,
  },
  {
    id: 9,
    slug: "yumshoq-kuch",
    color: "#C8283C",
    icon: "sparkle",
    name: {
      uz: "Oʻzbekiston Yumshoq Kuch Diplomatiyasi boʻlimi",
      ru: "Отдел дипломатии «мягкой силы» Узбекистана",
      en: "Uzbekistan Soft Power Diplomacy",
    },
    short: {
      uz: "Madaniyat, turizm, gastronomiya va taʼlim orqali Oʻzbekiston imijini dunyoga tanitish.",
      ru: "Продвижение имиджа Узбекистана в мире через культуру, туризм, гастрономию и образование.",
      en: "Showcasing Uzbekistan to the world through culture, tourism, gastronomy and education.",
    },
    ...TODO,
  },
  {
    id: 10,
    slug: "pr-va-karyera",
    color: "#6B3FC9",
    icon: "briefcase-business",
    name: {
      uz: "Diplomatik PR va Karyera boʻlimi",
      ru: "Отдел дипломатического PR и карьеры",
      en: "Diplomatic PR and Careers",
    },
    short: {
      uz: "Karyera maslahati, amaliyot va stajirovka imkoniyatlari, shaxsiy brend va diplomatik PR boʻyicha treninglar.",
      ru: "Карьерные консультации, практика и стажировки, тренинги по личному бренду и дипломатическому PR.",
      en: "Career advice, internships and placements, plus training in personal branding and diplomatic PR.",
    },
    ...TODO,
  },
];
