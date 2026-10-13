import type { Dictionary } from "@/i18n/dictionaries";

export type Stat = {
  // Label key in the `stats.items` dictionary.
  key: keyof Dictionary["stats"]["items"];
  value: number;
  suffix: "" | "+";
};

// Key figures shown under the hero. Kept as plain data so the admin panel can
// supply them later.
export const stats: Stat[] = [
  { key: "departments", value: 10, suffix: "" },
  { key: "regionalOffices", value: 14, suffix: "" },
  { key: "members", value: 2500, suffix: "+" },
  { key: "partners", value: 30, suffix: "+" },
];
