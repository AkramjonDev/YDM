import type { Localized } from "@/i18n/config";

export type Partner = {
  id: number;
  name: Localized;
  // Path in /public or absolute URL; `null` shows the name's initial instead.
  logo: string | null;
  // Partner website; `null` renders the card without a link.
  url: string | null;
};

// PLACEHOLDER partners until the real list (and logos) is supplied.
export const partners: Partner[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: {
    uz: `Hamkor tashkilot ${i + 1}`,
    ru: `Организация-партнёр ${i + 1}`,
    en: `Partner organisation ${i + 1}`,
  },
  logo: null,
  url: null,
}));
