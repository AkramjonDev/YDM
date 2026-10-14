import type { Localized } from "@/i18n/config";

// /about page content. Plain data so the admin panel can supply it later.
// Reused from the dictionary rather than copied here: the intro lead
// (`about.text`, shared with the home page) and the photo's alt text
// (`hero.secondaryImageAlt`, the same photo as in the home hero).
export const aboutPage: {
  hero: { title: Localized; subtitle: Localized };
  intro: { eyebrow: Localized; image: string };
  lists: { eyebrow: Localized; goalsTitle: Localized; tasksTitle: Localized };
  leadership: { title: Localized };
  goals: Localized[];
  tasks: Localized[];
} = {
  hero: {
    title: { uz: "Markaz haqida", ru: "О Центре", en: "About the Centre" },
    subtitle: {
      uz: "Yangi avlod diplomatiyasi — Oʻzbekiston ovozi dunyoda",
      ru: "Дипломатия нового поколения — голос Узбекистана в мире",
      en: "New-generation diplomacy: Uzbekistan’s voice in the world",
    },
  },
  intro: {
    eyebrow: {
      uz: "Yoshlar Diplomatiya Markazi",
      ru: "Центр молодёжной дипломатии",
      en: "Youth Diplomacy Centre",
    },
    // PLACEHOLDER photo.
    image: "/hero-youth.jpg",
  },
  lists: {
    eyebrow: { uz: "Markaz haqida", ru: "О Центре", en: "About the Centre" },
    goalsTitle: { uz: "Maqsadlar", ru: "Цели", en: "Goals" },
    tasksTitle: { uz: "Asosiy vazifalar", ru: "Основные задачи", en: "Key tasks" },
  },
  leadership: {
    title: { uz: "Rahbariyat", ru: "Руководство", en: "Leadership" },
  },
  goals: [
    {
      uz: "Yoshlarning diplomatik va analitik salohiyatini oshirish",
      ru: "Развитие дипломатического и аналитического потенциала молодёжи",
      en: "Building young people’s diplomatic and analytical capacity",
    },
    {
      uz: "Oʻzbekistonning ijobiy imijini xalqaro maydonda targʻib qilish",
      ru: "Продвижение позитивного имиджа Узбекистана на международной арене",
      en: "Promoting a positive image of Uzbekistan internationally",
    },
    {
      uz: "Xorijdagi oʻzbekistonlik yoshlar bilan aloqalarni mustahkamlash",
      ru: "Укрепление связей с молодыми узбекистанцами за рубежом",
      en: "Strengthening ties with young Uzbekistanis abroad",
    },
    {
      uz: "Madaniyatlararo muloqot va tinchlik madaniyatini rivojlantirish",
      ru: "Развитие межкультурного диалога и культуры мира",
      en: "Fostering intercultural dialogue and a culture of peace",
    },
  ],
  tasks: [
    {
      uz: "Oʻquv dasturlari, treninglar va simulyatsiyalar tashkil etish",
      ru: "Организация учебных программ, тренингов и симуляций",
      en: "Running training programmes, workshops and simulations",
    },
    {
      uz: "Xalqaro forum va konferensiyalar oʻtkazish",
      ru: "Проведение международных форумов и конференций",
      en: "Hosting international forums and conferences",
    },
    {
      uz: "Elchixonalar va xalqaro tashkilotlar bilan hamkorlik qilish",
      ru: "Сотрудничество с посольствами и международными организациями",
      en: "Cooperating with embassies and international organisations",
    },
    {
      uz: "Tahliliy tadqiqotlar va nashrlar tayyorlash",
      ru: "Подготовка аналитических исследований и публикаций",
      en: "Producing analytical research and publications",
    },
    {
      uz: "Hududlarda iqtidorli yoshlarni qoʻllab-quvvatlash",
      ru: "Поддержка талантливой молодёжи в регионах",
      en: "Supporting talented young people in the regions",
    },
  ],
};
