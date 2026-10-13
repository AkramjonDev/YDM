import type { Locale } from "@/i18n/config";

export type Department = {
  slug: string;
  color: string;
  name: Record<Locale, string>;
};

// PLACEHOLDER: replace with the centre's real departments (or load them from
// Supabase) once the content is confirmed.
export const departments: Department[] = [
  {
    slug: "international-cooperation",
    color: "#0a78e0",
    name: {
      uz: "Xalqaro hamkorlik",
      ru: "Международное сотрудничество",
      en: "International cooperation",
    },
  },
  {
    slug: "diplomatic-education",
    color: "#c9a24a",
    name: {
      uz: "Diplomatik taʼlim",
      ru: "Дипломатическое образование",
      en: "Diplomatic education",
    },
  },
  {
    slug: "research-analysis",
    color: "#173a85",
    name: {
      uz: "Tadqiqot va tahlil",
      ru: "Исследования и аналитика",
      en: "Research and analysis",
    },
  },
  {
    slug: "cultural-diplomacy",
    color: "#7c4dce",
    name: {
      uz: "Madaniy diplomatiya",
      ru: "Культурная дипломатия",
      en: "Cultural diplomacy",
    },
  },
  {
    slug: "media-communications",
    color: "#0f9d8a",
    name: {
      uz: "Media va kommunikatsiyalar",
      ru: "Медиа и коммуникации",
      en: "Media and communications",
    },
  },
  {
    slug: "volunteering",
    color: "#e0603a",
    name: {
      uz: "Volontyorlik",
      ru: "Волонтёрство",
      en: "Volunteering",
    },
  },
];
