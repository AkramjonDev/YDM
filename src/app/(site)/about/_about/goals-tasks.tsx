import type { CSSProperties } from "react";
import type { aboutPage } from "@/data/about-page";
import type { Locale } from "@/i18n/config";
import { Eyebrow } from "../../_home/eyebrow";
import { Reveal } from "../../_home/reveal";
import { SplitHeading } from "../../_home/split-heading";

type Props = { content: typeof aboutPage; locale: Locale };

const GOAL_STAGGER_MS = 100;
// The number rolls in as its card lands.
const ROLL_DELAY_MS = 350;
// Tasks start once the goals are under way.
const TASKS_DELAY_MS = 300;
const TASK_STAGGER_MS = 120;

const titleClass =
  "mt-6 font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-navy-900 sm:text-4xl lg:text-[44px]";

export function GoalsTasks({ content, locale }: Props) {
  const { lists, goals, tasks } = content;

  return (
    <section className="relative isolate bg-mist py-[72px] sm:py-24 lg:py-[110px]">
      <div aria-hidden className="pattern-girih-dark absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <Eyebrow className="text-gold-600">{lists.eyebrow[locale]}</Eyebrow>
          <SplitHeading text={lists.goalsTitle[locale]} className={titleClass} />

          <ol className="mt-10 space-y-3 sm:space-y-[18px] lg:mt-14">
            {goals.map((goal, i) => (
              <li
                key={i}
                style={{ transitionDelay: `${i * GOAL_STAGGER_MS}ms` }}
                className="ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:-translate-x-8 motion-safe:group-data-[state=idle]/reveal:opacity-0"
              >
                <div className="group/goal relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-white px-5 py-5 transition-[translate,box-shadow] duration-300 hover:shadow-[0_20px_40px_-24px_rgb(2_28_86/0.3)] motion-safe:hover:-translate-y-1 sm:gap-7 sm:px-7 sm:py-6">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-gold-500 transition-[scale] duration-300 group-hover/goal:scale-y-100"
                  />
                  <span
                    aria-hidden
                    className="shrink-0 transition-[scale] duration-300 motion-safe:group-hover/goal:scale-110"
                  >
                    <RollNumber value={i + 1} delayMs={i * GOAL_STAGGER_MS + ROLL_DELAY_MS} />
                  </span>
                  <span className="text-[17px] font-medium leading-snug text-navy-900">
                    {goal[locale]}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <Eyebrow className="text-gold-600">{lists.eyebrow[locale]}</Eyebrow>
          <SplitHeading text={lists.tasksTitle[locale]} className={titleClass} />

          {/* Starts a little lower, level with the text inside the goal cards. */}
          <ul className="mt-10 space-y-6 sm:space-y-9 lg:mt-14 lg:pt-5">
            {tasks.map((task, i) => {
              const delay = TASKS_DELAY_MS + i * TASK_STAGGER_MS;
              return (
                <li key={i} className="flex items-start gap-4">
                  <DrawnCheck delayMs={delay} />
                  <span
                    style={{ transitionDelay: `${delay + 300}ms` }}
                    className="text-[17px] leading-normal text-navy-900 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:translate-x-3 motion-safe:group-data-[state=idle]/reveal:opacity-0"
                  >
                    {task[locale]}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// "01"–"99" whose digits roll up from 0 to their value (CSS only). The final
// value is the resting state, so reduced motion simply shows it.
function RollNumber({ value, delayMs }: { value: number; delayMs: number }) {
  const digits = String(value).padStart(2, "0").split("").map(Number);

  return (
    <span className="flex font-display text-[26px] font-extrabold leading-none tabular-nums text-gold-500">
      {digits.map((digit, i) => (
        <span key={i} className="inline-block h-[1em] overflow-hidden">
          <span
            style={
              { "--roll": `-${digit}em`, transitionDelay: `${delayMs}ms` } as CSSProperties
            }
            className="flex translate-y-(--roll) flex-col ease-reveal motion-safe:transition-[translate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:translate-y-0"
          >
            {Array.from({ length: digit + 1 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

// lucide CircleCheck, drawn stroke by stroke (pathLength 0 → 1).
function DrawnCheck({ delayMs }: { delayMs: number }) {
  const draw =
    "[stroke-dasharray:1] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-500 motion-safe:ease-out motion-safe:group-data-[state=idle]/reveal:[stroke-dashoffset:1]";
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-5 shrink-0 text-brand-500"
    >
      <circle cx="12" cy="12" r="10" pathLength={1} style={{ transitionDelay: `${delayMs}ms` }} className={draw} />
      <path d="m9 12 2 2 4-4" pathLength={1} style={{ transitionDelay: `${delayMs + 250}ms` }} className={draw} />
    </svg>
  );
}
