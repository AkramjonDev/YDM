import type { aboutPage } from "@/data/about-page";
import { leadership } from "@/data/leadership";
import type { Locale } from "@/i18n/config";
import { Eyebrow } from "../../_home/eyebrow";
import { Reveal } from "../../_home/reveal";
import { RevealGrid } from "../../_home/reveal-grid";
import { SplitHeading } from "../../_home/split-heading";
import { PersonCard } from "../../_page/person-card";

type Props = { content: typeof aboutPage; locale: Locale; emailLabel: string };

export function Leadership({ content, locale, emailLabel }: Props) {
  if (leadership.length === 0) return null;

  return (
    <section className="bg-white py-[72px] sm:py-24 lg:py-[110px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <Eyebrow className="text-gold-600">{content.intro.eyebrow[locale]}</Eyebrow>
          <SplitHeading
            text={content.leadership.title[locale]}
            className="mt-6 font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-navy-900 sm:text-4xl lg:text-[44px]"
          />
        </Reveal>

        <RevealGrid className="mx-auto mt-10 grid max-w-[420px] gap-7 sm:max-w-none sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {leadership.map((person) => (
            <li
              key={person.id}
              data-state="idle"
              className="group/reveal ease-reveal [--reveal-delay:calc(var(--col,0)*120ms)] [transition-delay:var(--reveal-delay)] motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-8 motion-safe:data-[state=idle]:opacity-0"
            >
              <PersonCard
                name={person.name}
                position={person.position[locale]}
                photo={person.photo}
                email={person.email}
                emailLabel={emailLabel}
              />
            </li>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
