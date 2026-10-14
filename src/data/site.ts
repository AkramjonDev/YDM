import type { Localized } from "@/i18n/config";

export type Social = {
  // Accessible name, e.g. "Telegram".
  name: string;
  href: string;
};

// Public contact details: the top bar, the mobile menu and the footer all read
// this object.
export const contact: {
  phone: string;
  phoneHref: string;
  email: string;
  address: Localized;
  hours: Localized;
  // Footer social links; the footer shows none while this is empty.
  socials: Social[];
} = {
  phone: "+998 71 000 00 00",
  phoneHref: "tel:+998710000000",
  email: "info@yoshlardiplomatiya.uz",
  // PLACEHOLDER: replace with the exact address.
  address: {
    uz: "Toshkent shahri (aniq manzil keyin kiritiladi)",
    ru: "г. Ташкент (точный адрес будет добавлен)",
    en: "Tashkent (exact address to be added)",
  },
  hours: {
    uz: "Dushanba–Juma, 09:00–18:00",
    ru: "Пн–Пт, 09:00–18:00",
    en: "Mon–Fri, 09:00–18:00",
  },
  socials: [],
};

// Hero photos live in /public. They are low-res placeholders: swap the files
// (or these paths) when the final photography is ready.
export const heroImages = {
  main: "/hero-samarkand.jpg",
  secondary: "/hero-youth.jpg",
};
