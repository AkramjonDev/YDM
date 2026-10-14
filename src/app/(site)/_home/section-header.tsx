import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../_header/icons";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

// Outline pill with an arrow that nudges right on hover.
export function PillLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group/more inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 font-semibold text-navy-900 transition-colors duration-300 hover:border-navy-900"
    >
      {children}
      <ArrowRightIcon className="size-5 transition-[translate] duration-300 motion-safe:group-hover/more:translate-x-1" />
    </Link>
  );
}

type Props = {
  eyebrow: string;
  title: string;
  titleId: string;
  // Desktop title size, e.g. "lg:text-[40px]".
  titleSize: "lg:text-[40px]" | "lg:text-[44px]";
  action: { href: string; label: string };
  // Optional subtitle under the title.
  children?: ReactNode;
};

// Eyebrow + title (+ subtitle) on the left, a pill link on the right; stacks
// below 768px. Reveals in order: rule, title lines, subtitle, link.
export function SectionHeader({ eyebrow, title, titleId, titleSize, action, children }: Props) {
  return (
    <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
      <div>
        <Eyebrow className="text-gold-600">{eyebrow}</Eyebrow>
        <SplitHeading
          id={titleId}
          text={title}
          className={`mt-6 font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-navy-900 sm:text-4xl ${titleSize}`}
        />
        {children && (
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.7] text-muted ease-reveal motion-safe:transition-[opacity,translate] motion-safe:delay-300 motion-safe:duration-600 sm:text-lg motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0">
            {children}
          </p>
        )}
      </div>

      {/* Reveal on the wrapper so the link's hover transitions stay undelayed. */}
      <div
        className={`shrink-0 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-600 motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0 ${
          children ? "motion-safe:delay-450" : "motion-safe:delay-300"
        }`}
      >
        <PillLink href={action.href}>{action.label}</PillLink>
      </div>
    </Reveal>
  );
}
