import type { CSSProperties } from "react";
import type { SoftPowerDirection } from "@/data/soft-power";
import type { Locale } from "@/i18n/config";
import { Reveal } from "../../_home/reveal";
import { RevealGrid } from "../../_home/reveal-grid";
import { softPowerIcons } from "../../_home/soft-power-icons";
import { SplitHeading } from "../../_home/split-heading";
import { HashPulse } from "./hash-pulse";

// Matches the cards' `[transition-delay:calc(var(--col,0)*60ms)]` class.
const STAGGER_MS = 60;
// The icon pops and the bar grows as the card lands.
const LAND_MS = 400;

// Column spans on the 6-column grid: 3 per row on desktop, 2 per row on
// tablet, 1 on mobile. A short last row is stretched to fill: two leftovers
// span 3 columns each, a single one spans all 6.
function spanClass(index: number, count: number) {
  const last = count - 1;
  let lg = "lg:col-span-2";
  if (count % 3 === 2 && index >= last - 1) lg = "lg:col-span-3";
  if (count % 3 === 1 && index === last) lg = "lg:col-span-6";
  const sm = count % 2 === 1 && index === last ? "sm:col-span-6" : "sm:col-span-3";
  return `${sm} ${lg}`;
}

type Props = { title: string[]; directions: SoftPowerDirection[]; locale: Locale };

export function Directions({ title, directions, locale }: Props) {
  return (
    <section className="relative isolate bg-mist py-[72px] sm:py-24 lg:py-[100px]">
      <div aria-hidden className="pattern-girih-dark absolute inset-0 -z-10" />
      <HashPulse />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SplitHeading
            text={title}
            stepMs={150}
            className="max-w-[640px] font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-navy-900 sm:text-4xl lg:text-[44px]"
          />
        </Reveal>

        <RevealGrid className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-6 lg:mt-12">
          {directions.map((direction, i) => (
            <li
              key={direction.slug}
              data-state="idle"
              className={`group/reveal ease-reveal [transition-delay:calc(var(--col,0)*60ms)] motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-8 motion-safe:data-[state=idle]:opacity-0 ${spanClass(i, directions.length)}`}
            >
              <DirectionCard direction={direction} number={i + 1} locale={locale} />
            </li>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}

function DirectionCard({
  direction,
  number,
  locale,
}: {
  direction: SoftPowerDirection;
  number: number;
  locale: Locale;
}) {
  const Icon = softPowerIcons[direction.icon];
  const land = { transitionDelay: `calc(var(--col, 0) * ${STAGGER_MS}ms + ${LAND_MS}ms)` };

  return (
    // `id` lets /soft-power#slug (home page chips) land here; see <HashPulse>.
    <article
      id={direction.slug}
      data-hash-target
      style={{ "--dir": direction.color } as CSSProperties}
      className="group/dir relative h-full scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[translate,box-shadow] duration-300 hover:shadow-[0_22px_44px_-22px_color-mix(in_oklab,var(--dir)_55%,transparent)] motion-safe:hover:-translate-y-1.5 lg:scroll-mt-36"
    >
      <span
        aria-hidden
        className="absolute -right-12 -top-12 size-40 rounded-full bg-(--dir)/7 transition-[scale,background-color] duration-500 group-hover/dir:bg-(--dir)/12 motion-safe:animate-drift motion-safe:group-hover/dir:scale-130"
      />

      <div className="relative flex gap-5">
        <span
          aria-hidden
          style={land}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-(--dir) text-white ease-spring motion-safe:transition-[scale] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:scale-0"
        >
          <Icon className="size-[22px] transition-[rotate,scale] duration-300 motion-safe:group-hover/dir:-rotate-8 motion-safe:group-hover/dir:scale-108" />
        </span>

        <div className="min-w-0">
          <p aria-hidden className="text-[11px] font-semibold tabular-nums text-muted">
            {String(number).padStart(2, "0")}
          </p>
          <h3 className="mt-1 font-display text-[17px] font-bold leading-snug text-navy-900">
            {direction.label[locale]}
          </h3>
          <span
            aria-hidden
            style={land}
            className="mt-3 block origin-left ease-reveal motion-safe:transition-[scale] motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:scale-x-0"
          >
            <span className="block h-[3px] w-8 rounded-full bg-(--dir) transition-[width] duration-300 motion-safe:group-hover/dir:w-14" />
          </span>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">{direction.desc[locale]}</p>
        </div>
      </div>
    </article>
  );
}
