import type { Localized } from "@/i18n/config";

// Same shape the admin panel will store (hence the snake_case foreign key).
export type NewsItem = {
  id: number;
  slug: string;
  // `Department.id`; drives the badge colour, name and icon.
  department_id: number;
  // Path in /public, or `null` to use the generated department cover.
  image: string | null;
  // Publication date, YYYY-MM-DD.
  date: string;
  views: number;
  title: Localized;
  excerpt: Localized;
  // TODO: article bodies, once the news pages are built.
  body: Localized | null;
};

// PLACEHOLDER news until the admin panel supplies real items.
const items: NewsItem[] = [
  {
    id: 1,
    slug: "akademiya-yangi-mavsum",
    department_id: 1,
    image: "/hero-samarkand.jpg",
    date: "2026-09-22",
    views: 1240,
    title: {
      uz: "Yosh Diplomatlar Akademiyasining yangi oʻquv mavsumi boshlandi",
      ru: "В Академии молодых дипломатов стартовал новый учебный сезон",
      en: "The Young Diplomats Academy opens its new season",
    },
    excerpt: {
      uz: "Tanlovdan oʻtgan 60 nafar tinglovchi diplomatik protokol, xalqaro huquq va muzokara boʻyicha uch oylik dasturda ishtirok etadi.",
      ru: "60 отобранных слушателей пройдут трёхмесячную программу по дипломатическому протоколу, международному праву и переговорам.",
      en: "Sixty selected participants begin a three-month programme in diplomatic protocol, international law and negotiation.",
    },
    body: null,
  },
  {
    id: 2,
    slug: "markaziy-osiyo-forumi",
    department_id: 4,
    image: "/hero-youth.jpg",
    date: "2026-09-18",
    views: 986,
    title: {
      uz: "Toshkentda Markaziy Osiyo yoshlar diplomatiyasi forumi oʻtkazildi",
      ru: "В Ташкенте прошёл Центральноазиатский форум молодёжной дипломатии",
      en: "Tashkent hosts the Central Asian Youth Diplomacy Forum",
    },
    excerpt: {
      uz: "Forumda mintaqa davlatlari, elchixonalar va xalqaro tashkilotlar vakillari yoshlarning xalqaro hamkorlikdagi oʻrnini muhokama qildi.",
      ru: "Представители стран региона, посольств и международных организаций обсудили роль молодёжи в международном сотрудничестве.",
      en: "Representatives of regional states, embassies and international organisations discussed young people’s role in international cooperation.",
    },
    body: null,
  },
  {
    id: 3,
    slug: "ozbek-dasturxoni-festivali",
    department_id: 9,
    image: null,
    date: "2026-09-12",
    views: 1532,
    title: {
      uz: "“Oʻzbek dasturxoni” gastro-diplomatiya festivali xorijlik mehmonlarni jamladi",
      ru: "Гастродипломатический фестиваль «Узбекский дастархан» собрал иностранных гостей",
      en: "“Uzbek Dastarkhan” gastro-diplomacy festival brings together foreign guests",
    },
    excerpt: {
      uz: "Festivalda diplomatik korpus vakillari milliy taomlar, mehmondoʻstlik anʼanalari va hunarmandchilik bilan yaqindan tanishdi.",
      ru: "Представители дипломатического корпуса познакомились с национальной кухней, традициями гостеприимства и ремёслами.",
      en: "Members of the diplomatic corps got a close look at national cuisine, hospitality traditions and crafts.",
    },
    body: null,
  },
  {
    id: 4,
    slug: "harvard-muzokara-treningi",
    department_id: 5,
    image: null,
    date: "2026-09-08",
    views: 642,
    title: {
      uz: "“Harvard uslubidagi muzokaralar” mavzusida amaliy trening",
      ru: "Практический тренинг «Гарвардский метод переговоров»",
      en: "Hands-on training: Harvard-style negotiation",
    },
    excerpt: {
      uz: "Ikki kunlik treningda ishtirokchilar manfaatlarga asoslangan muzokara usullarini rolli oʻyinlar orqali oʻzlashtirdi.",
      ru: "За два дня участники освоили методы переговоров на основе интересов в ролевых играх.",
      en: "Over two days, participants practised interest-based negotiation through role-plays.",
    },
    body: null,
  },
];

// Newest first.
export const news: NewsItem[] = items.toSorted((a, b) => b.date.localeCompare(a.date));
