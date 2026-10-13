import type { Locale } from "./config";
import type { PluralForms } from "./plural";

const uz = {
  topBar: {
    republic: "Oʻzbekiston Respublikasi",
    centreName: "Oʻzbekiston Yoshlar Diplomatiya Markazi",
    phone: "Telefon",
    email: "Elektron pochta",
  },
  header: {
    nav: {
      about: "Markaz haqida",
      departments: "Boʻlimlar",
      softPower: "Yumshoq kuch",
      news: "Yangiliklar",
      events: "Tadbirlar",
      media: "Media",
      partners: "Hamkorlar",
    },
    cta: "Bogʻlanish",
    mainNav: "Asosiy navigatsiya",
    language: "Til",
    contacts: "Aloqa",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    menu: "Menyu",
  },
  hero: {
    eyebrow: "Oʻzbekiston Respublikasi",
    title: "Yoshlar — yangi Oʻzbekiston diplomatiyasining kelajagi",
    lead: "Markaz iqtidorli yoshlarni xalqaro munosabatlar, muzokara va jamoatchilik diplomatiyasi sohasida tayyorlaydi hamda Oʻzbekistonning dunyodagi ijobiy imijini mustahkamlaydi.",
    primaryCta: "Boʻlimlar bilan tanishish",
    secondaryCta: "Soʻnggi yangiliklar",
    badge: "Bir meros — katta imkoniyatlar",
    mainImageAlt: "Quyosh botayotgan paytda Samarqanddagi minoralar va moviy gumbazlar",
    secondaryImageAlt:
      "Oʻzbekiston bayrogʻini ushlab turgan ikki yosh qiz, ortida kechki Toshkent manzarasi",
  },
  stats: {
    title: "Markaz raqamlarda",
    items: {
      departments: "ixtisoslashgan boʻlim",
      regionalOffices: "hududiy vakolatxona",
      members: "faol aʼzo va ishtirokchi",
      partners: "xalqaro hamkor",
    },
  },
  about: {
    eyebrow: "Biz haqimizda",
    title: "Maqsadimiz — dunyo bilan muloqot qila oladigan yoshlar avlodi",
    text: "Oʻzbekiston Yoshlar Diplomatiya Markazi — yoshlarni xalqaro munosabatlar, jamoatchilik diplomatiyasi va madaniyatlararo muloqot sohasida tayyorlovchi, ularning gʻoya va tashabbuslarini xalqaro maydonga olib chiquvchi platforma.",
    more: "Batafsil",
    mission: {
      label: "Missiya",
      text: "Bilimli, vatanparvar va dunyo bilan erkin muloqot qila oladigan yoshlarni tarbiyalash orqali Oʻzbekistonning xalqaro nufuzini mustahkamlash.",
    },
    vision: {
      label: "Vizyon",
      text: "Mintaqadagi yetakchi yoshlar diplomatiyasi markazi boʻlish va har bir hududdan xalqaro darajadagi yosh mutaxassislarni yetishtirish.",
    },
  },
  departments: {
    eyebrow: "Tuzilma",
    title: { other: "Markazning {count} ta boʻlimi" } as PluralForms,
    subtitle:
      "Har bir boʻlim oʻz yoʻnalishida dasturlar, tadqiqotlar va xalqaro loyihalarni amalga oshiradi.",
    all: "Boʻlimlar",
    cardLink: "Boʻlimga oʻtish",
  },
  news: {
    eyebrow: "Axborot xizmati",
    title: "Soʻnggi yangiliklar",
    all: "Barcha yangiliklar",
    viewsLabel: "koʻrishlar",
  },
  softPower: {
    eyebrow: "Yumshoq kuch diplomatiyasi",
    // One entry per sentence: each reveals as its own step.
    title: ["Boy meros.", "Ochiq madaniyat.", "Keng imkoniyatlar."],
    text: "Madaniyat, turizm, taʼlim, sport va raqamli sohalar orqali Oʻzbekistonning jahondagi obroʻsini oshiramiz.",
    cta: { other: "{count} ta yoʻnalishni koʻrish" } as PluralForms,
    photoAlt: {
      "soft-registan": "Quyosh botishida Registon madrasasining peshtoqi va minoralari",
      "soft-dance": "Atlas libosdagi oʻzbek raqqosasi",
      "soft-plov": "Oʻzbek palovi",
      "soft-lake": "Togʻlar orasidagi moviy koʻl",
    },
  },
};

export type Dictionary = typeof uz;

const dictionaries: Record<Locale, Dictionary> = {
  uz,
  ru: {
    topBar: {
      republic: "Республика Узбекистан",
      centreName: "Центр молодёжной дипломатии Узбекистана",
      phone: "Телефон",
      email: "Электронная почта",
    },
    header: {
      nav: {
        about: "О центре",
        departments: "Отделы",
        softPower: "Мягкая сила",
        news: "Новости",
        events: "Мероприятия",
        media: "Медиа",
        partners: "Партнёры",
      },
      cta: "Связаться",
      mainNav: "Основная навигация",
      language: "Язык",
      contacts: "Контакты",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      menu: "Меню",
    },
    hero: {
      eyebrow: "Республика Узбекистан",
      title: "Молодёжь — будущее дипломатии нового Узбекистана",
      lead: "Центр готовит талантливую молодёжь в сфере международных отношений, переговоров и публичной дипломатии и укрепляет положительный имидж Узбекистана в мире.",
      primaryCta: "Познакомиться с отделами",
      secondaryCta: "Последние новости",
      badge: "Одно наследие — большие возможности",
      mainImageAlt: "Минареты и голубые купола Самарканда на закате",
      secondaryImageAlt:
        "Две девушки держат флаг Узбекистана на фоне вечернего Ташкента",
    },
    stats: {
      title: "Центр в цифрах",
      items: {
        departments: "профильных отделов",
        regionalOffices: "региональных представительств",
        members: "активных членов и участников",
        partners: "международных партнёров",
      },
    },
    about: {
      eyebrow: "О нас",
      title: "Наша цель — поколение молодёжи, способное вести диалог с миром",
      text: "Центр молодёжной дипломатии Узбекистана — платформа, которая готовит молодёжь в сфере международных отношений, публичной дипломатии и межкультурного диалога и выводит её идеи и инициативы на международный уровень.",
      more: "Подробнее",
      mission: {
        label: "Миссия",
        text: "Укреплять международный авторитет Узбекистана, воспитывая образованную, патриотичную молодёжь, свободно ведущую диалог с миром.",
      },
      vision: {
        label: "Видение",
        text: "Стать ведущим центром молодёжной дипломатии в регионе и готовить молодых специалистов международного уровня из каждого региона страны.",
      },
    },
    departments: {
      eyebrow: "Структура",
      title: {
        one: "{count} отдел Центра",
        few: "{count} отдела Центра",
        many: "{count} отделов Центра",
        other: "{count} отдела Центра",
      },
      subtitle:
        "Каждый отдел реализует программы, исследования и международные проекты в своём направлении.",
      all: "Все отделы",
      cardLink: "Перейти в отдел",
    },
    news: {
      eyebrow: "Пресс-служба",
      title: "Последние новости",
      all: "Все новости",
      viewsLabel: "просмотров",
    },
    softPower: {
      eyebrow: "Дипломатия «мягкой силы»",
      title: ["Богатое наследие.", "Открытая культура.", "Широкие возможности."],
      text: "Повышаем авторитет Узбекистана в мире через культуру, туризм, образование, спорт и цифровые технологии.",
      cta: { other: "Все направления ({count})" },
      photoAlt: {
        "soft-registan": "Портал медресе и минареты Регистана на закате",
        "soft-dance": "Узбекская танцовщица в атласном наряде",
        "soft-plov": "Узбекский плов",
        "soft-lake": "Бирюзовое озеро среди гор",
      },
    },
  },
  en: {
    topBar: {
      republic: "Republic of Uzbekistan",
      centreName: "Youth Diplomacy Centre of Uzbekistan",
      phone: "Phone",
      email: "Email",
    },
    header: {
      nav: {
        about: "About the Centre",
        departments: "Departments",
        softPower: "Soft power",
        news: "News",
        events: "Events",
        media: "Media",
        partners: "Partners",
      },
      cta: "Contact us",
      mainNav: "Main navigation",
      language: "Language",
      contacts: "Contacts",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
    },
    hero: {
      eyebrow: "Republic of Uzbekistan",
      title: "Youth — the future of New Uzbekistan’s diplomacy",
      lead: "The Centre trains talented young people in international relations, negotiation and public diplomacy, and strengthens Uzbekistan’s positive image in the world.",
      primaryCta: "Explore our departments",
      secondaryCta: "Latest news",
      badge: "One heritage — great opportunities",
      mainImageAlt: "Minarets and blue domes of Samarkand at sunset",
      secondaryImageAlt:
        "Two young women holding the flag of Uzbekistan against the Tashkent skyline at dusk",
    },
    stats: {
      title: "The Centre in numbers",
      items: {
        departments: "specialised departments",
        regionalOffices: "regional offices",
        members: "active members and participants",
        partners: "international partners",
      },
    },
    about: {
      eyebrow: "About us",
      title: "Our goal: a generation of young people who can engage with the world",
      text: "The Youth Diplomacy Centre of Uzbekistan is a platform that trains young people in international relations, public diplomacy and intercultural dialogue, and brings their ideas and initiatives to the international stage.",
      more: "Learn more",
      mission: {
        label: "Mission",
        text: "To strengthen Uzbekistan’s international standing by raising knowledgeable, patriotic young people who can engage freely with the world.",
      },
      vision: {
        label: "Vision",
        text: "To become the region’s leading youth diplomacy centre and develop internationally competitive young professionals from every region of the country.",
      },
    },
    departments: {
      eyebrow: "Structure",
      title: {
        one: "The Centre’s {count} department",
        other: "The Centre’s {count} departments",
      },
      subtitle:
        "Each department runs programmes, research and international projects in its own field.",
      all: "All departments",
      cardLink: "View department",
    },
    news: {
      eyebrow: "Press service",
      title: "Latest news",
      all: "All news",
      viewsLabel: "views",
    },
    softPower: {
      eyebrow: "Soft power diplomacy",
      title: ["Rich heritage.", "Open culture.", "Broad opportunities."],
      text: "We raise Uzbekistan’s global standing through culture, tourism, education, sport and digital initiatives.",
      cta: { other: "Explore all {count} areas" },
      photoAlt: {
        "soft-registan": "Madrasa portal and minarets of the Registan at sunset",
        "soft-dance": "An Uzbek dancer in an atlas silk costume",
        "soft-plov": "Uzbek plov",
        "soft-lake": "A turquoise lake among the mountains",
      },
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
