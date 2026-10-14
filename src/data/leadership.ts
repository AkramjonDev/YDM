import type { Localized } from "@/i18n/config";

// Same shape the admin panel will store.
export type Leader = {
  id: number;
  name: string;
  position: Localized;
  // Path in /public or absolute URL; `null` shows the placeholder portrait.
  photo: string | null;
  // Display order, ascending.
  order: number;
  email?: string;
  // TODO: short biographies, once supplied.
  bio?: Localized;
};

// PLACEHOLDER names and photos until the real team is confirmed.
const items: Leader[] = [
  {
    id: 1,
    name: "Ism Familiya",
    position: { uz: "Markaz rahbari", ru: "Руководитель Центра", en: "Head of the Centre" },
    photo: null,
    order: 1,
  },
  {
    id: 2,
    name: "Ism Familiya",
    position: { uz: "Rahbar oʻrinbosari", ru: "Заместитель руководителя", en: "Deputy Head" },
    photo: null,
    order: 2,
  },
  {
    id: 3,
    name: "Ism Familiya",
    position: { uz: "Ijrochi direktor", ru: "Исполнительный директор", en: "Executive Director" },
    photo: null,
    order: 3,
  },
];

export const leadership: Leader[] = items.toSorted((a, b) => a.order - b.order);
