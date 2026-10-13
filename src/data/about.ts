import type { Dictionary } from "@/i18n/dictionaries";

type CardKey = keyof Pick<Dictionary["about"], "mission" | "vision">;

export type AboutCard = {
  // Text key in the `about` dictionary ({ label, text }).
  key: CardKey;
  icon: "target" | "compass";
  tone: "navy" | "mist";
};

// "About us" teaser on the home page. Kept as plain data so the admin panel can
// supply it later; the copy itself lives in the `about` dictionary.
export const about: { href: string; cards: AboutCard[] } = {
  href: "/about",
  cards: [
    { key: "mission", icon: "target", tone: "navy" },
    { key: "vision", icon: "compass", tone: "mist" },
  ],
};
