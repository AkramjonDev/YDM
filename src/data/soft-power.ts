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
  // Card accent on /soft-power.
  color: string;
  desc: Localized;
  // Gallery tile highlighted while this direction's chip is hovered/focused.
  photo?: SoftPowerPhoto;
};

// Soft power config: the home section and the /soft-power page. Kept as plain
// data so the admin panel can supply it later. Reused from the dictionary
// rather than copied here: the tagline (`softPower.title`), the CTA line
// (`hero.badge`) and the photo alt texts.
export const softPower: {
  photos: { key: SoftPowerPhoto; src: string }[];
  page: {
    eyebrow: Localized;
    title: Localized;
    // `{count}` = number of directions.
    text: Localized;
    relatedTitle: Localized;
    // Department the CTA links to and whose news are "related".
    departmentSlug: string;
  };
  directions: SoftPowerDirection[];
} = {
  // Mosaic order. PLACEHOLDER low-res photos: swap the files (or paths).
  photos: [
    { key: "soft-registan", src: "/soft-registan.jpg" },
    { key: "soft-dance", src: "/soft-dance.jpg" },
    { key: "soft-plov", src: "/soft-plov.jpg" },
    { key: "soft-lake", src: "/soft-lake.jpg" },
  ],
  page: {
    eyebrow: { uz: "Soft power", ru: "Soft power", en: "Soft power" },
    title: {
      uz: "Oʻzbekistonning yumshoq kuch diplomatiyasi",
      ru: "Дипломатия «мягкой силы» Узбекистана",
      en: "Uzbekistan’s soft power diplomacy",
    },
    text: {
      uz: "Yumshoq kuch — bu majburlash emas, balki jozibadorlik orqali taʼsir koʻrsatish. Markaz Oʻzbekistonning madaniy merosi, mehmondoʻstligi, taʼlim va innovatsion salohiyatini dunyoga tanitish uchun {count} ta yoʻnalishda ish olib boradi.",
      ru: "Мягкая сила — это влияние не через принуждение, а через привлекательность. Центр работает по {count} направлениям, чтобы представить миру культурное наследие, гостеприимство, образовательный и инновационный потенциал Узбекистана.",
      en: "Soft power is influence through attraction, not coercion. The Centre works across {count} areas to show the world Uzbekistan’s cultural heritage, hospitality, education and capacity for innovation.",
    },
    relatedTitle: { uz: "Mavzuga oid yangiliklar", ru: "Новости по теме", en: "Related news" },
    departmentSlug: "yumshoq-kuch",
  },
  directions: [
    {
      slug: "madaniy",
      icon: "landmark",
      label: { uz: "Madaniy diplomatiya", ru: "Культурная дипломатия", en: "Cultural diplomacy" },
      color: "#0B4DB5",
      desc: {
        uz: "Tarix, sanʼat, musiqa, adabiyot, milliy qadriyatlar",
        ru: "История, искусство, музыка, литература, национальные ценности",
        en: "History, art, music, literature, national values",
      },
      photo: "soft-dance",
    },
    {
      slug: "turizm",
      icon: "mountain",
      label: { uz: "Turizm diplomatiyasi", ru: "Туристическая дипломатия", en: "Tourism diplomacy" },
      color: "#1F8A3E",
      desc: {
        uz: "Turizm, tarixiy obidalar, madaniy meros, hududlar imiji",
        ru: "Туризм, исторические памятники, культурное наследие, имидж регионов",
        en: "Tourism, historic monuments, cultural heritage, regional image",
      },
      photo: "soft-lake",
    },
    {
      slug: "gastro",
      icon: "soup",
      label: { uz: "Gastro diplomatiya", ru: "Гастродипломатия", en: "Gastrodiplomacy" },
      color: "#D4860B",
      desc: {
        uz: "Milliy taomlar, oshxona madaniyati, mehmondoʻstlik",
        ru: "Национальная кухня, культура застолья, гостеприимство",
        en: "National cuisine, food culture, hospitality",
      },
      photo: "soft-plov",
    },
    {
      slug: "sport",
      icon: "person-standing",
      label: { uz: "Sport diplomatiyasi", ru: "Спортивная дипломатия", en: "Sports diplomacy" },
      color: "#1E6FE0",
      desc: {
        uz: "Sport, sportchilar, xalqaro musobaqalar, doʻstlik",
        ru: "Спорт, спортсмены, международные соревнования, дружба",
        en: "Sport, athletes, international competitions, friendship",
      },
    },
    {
      slug: "yashil",
      icon: "leaf",
      label: { uz: "Yashil diplomatiya", ru: "Зелёная дипломатия", en: "Green diplomacy" },
      color: "#1F8A3E",
      desc: {
        uz: "Ekologiya, iqlim oʻzgarishi, yashil iqtisodiyot, Orolboʻyi",
        ru: "Экология, изменение климата, зелёная экономика, Приаралье",
        en: "Ecology, climate change, green economy, the Aral Sea region",
      },
    },
    {
      slug: "suv",
      icon: "droplet",
      label: { uz: "Suv diplomatiyasi", ru: "Водная дипломатия", en: "Water diplomacy" },
      color: "#1A73D9",
      desc: {
        uz: "Suv resurslari, mintaqaviy hamkorlik, barqaror rivojlanish",
        ru: "Водные ресурсы, региональное сотрудничество, устойчивое развитие",
        en: "Water resources, regional cooperation, sustainable development",
      },
      photo: "soft-lake",
    },
    {
      slug: "iqtisodiy",
      icon: "trending-up",
      label: { uz: "Iqtisodiy diplomatiya", ru: "Экономическая дипломатия", en: "Economic diplomacy" },
      color: "#D4860B",
      desc: {
        uz: "Savdo, investitsiya, eksport, biznes hamkorligi",
        ru: "Торговля, инвестиции, экспорт, деловое сотрудничество",
        en: "Trade, investment, exports, business partnerships",
      },
    },
    {
      slug: "raqamli",
      icon: "laptop",
      label: { uz: "Raqamli diplomatiya", ru: "Цифровая дипломатия", en: "Digital diplomacy" },
      color: "#0B4DB5",
      desc: {
        uz: "Texnologiyalar, raqamli tarmoqlar, ijtimoiy kommunikatsiya",
        ru: "Технологии, цифровые сети, социальные коммуникации",
        en: "Technology, digital networks, social communication",
      },
    },
    {
      slug: "talim",
      icon: "graduation-cap",
      label: { uz: "Taʼlim diplomatiyasi", ru: "Образовательная дипломатия", en: "Education diplomacy" },
      color: "#6B3FC9",
      desc: {
        uz: "Talabalar almashinuvi, grantlar, stipendiyalar, qoʻshma taʼlim dasturlari",
        ru: "Студенческие обмены, гранты, стипендии, совместные образовательные программы",
        en: "Student exchanges, grants, scholarships, joint education programmes",
      },
    },
    {
      slug: "kreativ",
      icon: "palette",
      label: { uz: "Kreativ diplomatiya", ru: "Креативная дипломатия", en: "Creative diplomacy" },
      color: "#C8283C",
      desc: {
        uz: "Kino, moda, dizayn, foto, arxitektura, kreativ industriya",
        ru: "Кино, мода, дизайн, фото, архитектура, креативные индустрии",
        en: "Film, fashion, design, photography, architecture, creative industries",
      },
    },
    {
      slug: "brending",
      icon: "star",
      label: { uz: "Milliy brending", ru: "Национальный брендинг", en: "Nation branding" },
      color: "#138A72",
      desc: {
        uz: "Oʻzbekiston brendi, zamonaviy imij, soft power",
        ru: "Бренд Узбекистана, современный имидж, мягкая сила",
        en: "Uzbekistan’s brand, modern image, soft power",
      },
      photo: "soft-registan",
    },
  ],
};
