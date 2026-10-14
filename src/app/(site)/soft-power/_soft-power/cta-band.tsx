import Link from "next/link";
import { ArrowRightIcon } from "../../_header/icons";
import { Reveal } from "../../_home/reveal";

const LETTER_MS = 20;
const LETTERS_START_MS = 250;

// Navy band: a spaced-out line between two gold rules, then a gold button.
// The rules grow outwards, the letters fade in one by one, the button rises.
export function CtaBand({ text, button }: { text: string; button: { href: string; label: string } }) {
  const letters = [...text];
  const buttonDelay = LETTERS_START_MS + letters.length * LETTER_MS + 100;
  const rule =
    "h-0.5 w-6 shrink-0 bg-gold-500 ease-reveal motion-safe:transition-[scale] motion-safe:duration-700 sm:w-14 motion-safe:group-data-[state=idle]/reveal:scale-x-0";

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-14">
      <div aria-hidden className="pattern-girih-line absolute inset-0 -z-10 opacity-5" />

      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <p className="flex items-center gap-4 sm:gap-5">
          <span aria-hidden className={`origin-right ${rule}`} />
          <span className="min-w-0 font-display text-sm font-bold uppercase leading-relaxed tracking-[0.35em] text-white/80">
            <span className="sr-only">{text}</span>
            <span aria-hidden>
              {letters.map((letter, i) => (
                <span
                  key={i}
                  style={{ transitionDelay: `${LETTERS_START_MS + i * LETTER_MS}ms` }}
                  className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:group-data-[state=idle]/reveal:opacity-0"
                >
                  {letter}
                </span>
              ))}
            </span>
          </span>
          <span aria-hidden className={`origin-left ${rule}`} />
        </p>

        <div
          style={{ transitionDelay: `${buttonDelay}ms` }}
          className="w-full ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-600 min-[400px]:w-auto motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0"
        >
          <Link
            href={button.href}
            className="group/cta inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-400 min-[400px]:w-auto"
          >
            {button.label}
            <ArrowRightIcon className="size-5 shrink-0 transition-[translate] duration-300 motion-safe:group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
