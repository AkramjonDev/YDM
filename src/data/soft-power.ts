import type { Localized } from "@/i18n/config";

export type SoftPowerPhoto = "soft-registan" | "soft-dance" | "soft-plov" | "soft-lake";

// lucide icon names; mapped to components in the UI.
export type SoftPowerIcon =
  | "landmark"
  | "mountain"
  | "soup"
  | "person-standing"
  | "leaf"
  | "droplet"
  | "trending-up"
  | "laptop"
  | "graduation-cap"
  | "palette"
  | "star";

export type SoftPowerDirection = {
  slug: string;
  icon: SoftPowerIcon;
  label: Localized;
  // Gallery tile highlighted while this direction's chip is hovered/focused.
  photo?: SoftPowerPhoto;
};

// "Soft power" section config. Kept as plain data so the admin panel can
// supply it later; section copy and photo alt texts live in the dictionary.
export const softPower: {
  photos: { key: SoftPowerPhoto; src: string }[];
  directions: SoftPowerDirection[];
} = {
  // Mosaic order. PLACEHOLDER low-res photos: swap the files (or paths).
  photos: [
    { key: "soft-registan", src: "/soft-registan.jpg" },
    { key: "soft-dance", src: "/soft-dance.jpg" },
    { key: "soft-plov", src: "/soft-plov.jpg" },
    { key: "soft-lake", src: "/soft-lake.jpg" },
  ],
  directions: [
    {
      slug: "madaniy",
      icon: "landmark",
      label: { uz: "Madaniy diplomatiya", ru: "Культурная дипломатия", en: "Cultural diplomacy" },
      photo: "soft-dance",
    },
    {
      slug: "turizm",
      icon: "mountain",
      label: { uz: "Turizm diplomatiyasi", ru: "Туристическая дипломатия", en: "Tourism diplomacy" },
      photo: "soft-lake",
    },
    {
      slug: "gastro",
      icon: "soup",
      label: { uz: "Gastro diplomatiya", ru: "Гастродипломатия", en: "Gastrodiplomacy" },
      photo: "soft-plov",
    },
    {
      slug: "sport",
      icon: "person-standing",
      label: { uz: "Sport diplomatiyasi", ru: "Спортивная дипломатия", en: "Sports diplomacy" },
    },
    {
      slug: "yashil",
      icon: "leaf",
      label: { uz: "Yashil diplomatiya", ru: "Зелёная дипломатия", en: "Green diplomacy" },
    },
    {
      slug: "suv",
      icon: "droplet",
      label: { uz: "Suv diplomatiyasi", ru: "Водная дипломатия", en: "Water diplomacy" },
      photo: "soft-lake",
    },
    {
      slug: "iqtisodiy",
      icon: "trending-up",
      label: { uz: "Iqtisodiy diplomatiya", ru: "Экономическая дипломатия", en: "Economic diplomacy" },
    },
    {
      slug: "raqamli",
      icon: "laptop",
      label: { uz: "Raqamli diplomatiya", ru: "Цифровая дипломатия", en: "Digital diplomacy" },
    },
    {
      slug: "talim",
      icon: "graduation-cap",
      label: { uz: "Taʼlim diplomatiyasi", ru: "Образовательная дипломатия", en: "Education diplomacy" },
    },
    {
      slug: "kreativ",
      icon: "palette",
      label: { uz: "Kreativ diplomatiya", ru: "Креативная дипломатия", en: "Creative diplomacy" },
    },
    {
      slug: "brending",
      icon: "star",
      label: { uz: "Milliy brending", ru: "Национальный брендинг", en: "Nation branding" },
      photo: "soft-registan",
    },
  ],
};
