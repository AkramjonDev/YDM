import Link from "next/link";
import { about, type AboutCard } from "@/data/about";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { ArrowRightIcon, CompassIcon, TargetIcon } from "../_header/icons";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const CARD_STAGGER_MS = 150;
// The icon pops in as its card finishes sliding.
const ICON_DELAY_MS = 450;

const tones = {
  navy: {
    card: "bg-navy-900 hover:shadow-[0_28px_56px_-20px_rgb(2_28_86/0.6)]",
    label: "text-gold-500",
    text: "text-white/90 sm:text-[21px]",
  },
  mist: {
    card: "border border-line bg-mist hover:border-brand-100 hover:bg-white hover:shadow-[0_28px_56px_-24px_rgb(2_28_86/0.28)]",
    label: "text-brand-500",
    text: "text-navy-900 sm:text-xl",
  },
} satisfies Record<AboutCard["tone"], Record<string, string>>;

// The stats section above already ends with generous bottom padding, so only a
// little top padding is added here. Reads the locale cookie, so render it
// inside <Suspense> (Cache Components).
export async function About() {
  const locale = await getLocale();
  const { about: t } = getDictionary(locale);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 bg-white pb-[72px] sm:pb-24 lg:scroll-mt-32 lg:pb-[120px] lg:pt-2"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[minmax(0,45fr)_minmax(0,50fr)] lg:items-start lg:gap-16 xl:gap-20">
        <Reveal>
          <Eyebrow className="text-gold-600">{t.eyebrow}</Eyebrow>

          <SplitHeading
            id="about-title"
            text={t.title}
            className="mt-6 max-w-[560px] font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl"
          />

          <p
            className="mt-7 max-w-[600px] text-[17px] leading-[1.75] text-muted ease-reveal motion-safe:transition-[opacity,translate] motion-safe:delay-300 motion-safe:duration-600 sm:text-[19px] motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0"
          >
            {t.text}
          </p>

          {/* Reveal on the wrapper so the link's hover transitions stay undelayed. */}
          <div
            className="mt-10 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:delay-450 motion-safe:duration-600 motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0"
          >
            <Link
              href={about.href}
              className="group/more inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-semibold text-navy-900 transition-colors duration-300 hover:border-navy-900"
            >
              {t.more}
              <ArrowRightIcon className="size-5 transition-[translate] duration-300 motion-safe:group-hover/more:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal className="grid gap-6">
          {about.cards.map((card, i) => (
            <Card key={card.key} card={card} index={i} labels={t} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Card({
  card,
  index,
  labels,
}: {
  card: AboutCard;
  index: number;
  labels: Dictionary["about"];
}) {
  const tone = tones[card.tone];
  const { label, text } = labels[card.key];
  const delay = index * CARD_STAGGER_MS;

  return (
    // Outer layer slides in (up on mobile, from the right on desktop); the
    // inner card owns the hover lift, so the two transforms don't collide.
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className="ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-800 motion-safe:group-data-[state=idle]/reveal:translate-y-8 motion-safe:group-data-[state=idle]/reveal:opacity-0 lg:motion-safe:group-data-[state=idle]/reveal:translate-x-12 lg:motion-safe:group-data-[state=idle]/reveal:translate-y-0"
    >
      <article
        className={`group/card relative isolate overflow-hidden rounded-3xl p-7 transition-[translate,box-shadow,background-color,border-color] duration-300 sm:p-10 motion-safe:hover:-translate-y-1 ${tone.card}`}
      >
        {card.tone === "navy" && (
          <div
            aria-hidden
            className="pattern-girih-line absolute inset-0 -z-10 opacity-[0.07] transition-opacity duration-300 group-hover/card:opacity-10 motion-safe:animate-girih-drift"
          />
        )}

        <h3
          className={`flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] ${tone.label}`}
        >
          <span
            aria-hidden
            style={{ transitionDelay: `${delay + ICON_DELAY_MS}ms` }}
            className="inline-flex ease-spring motion-safe:transition-[scale,rotate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:scale-60 motion-safe:group-data-[state=idle]/reveal:-rotate-20"
          >
            <CardIcon icon={card.icon} />
          </span>
          {label}
        </h3>

        <p className={`mt-5 text-lg leading-[1.7] ${tone.text}`}>{text}</p>
      </article>
    </div>
  );
}

function CardIcon({ icon }: { icon: AboutCard["icon"] }) {
  if (icon === "compass") {
    return (
      <CompassIcon
        className="size-[22px]"
        needleClassName="origin-center [transform-box:fill-box] motion-safe:group-hover/card:animate-needle-wobble"
      />
    );
  }
  return (
    <TargetIcon className="size-[22px] transition-[rotate] duration-1000 ease-in-out motion-safe:group-hover/card:rotate-360" />
  );
}
