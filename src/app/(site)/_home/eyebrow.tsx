import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

// Short rule + uppercase label in the current text colour. Inside a <Reveal>
// the rule grows in from the left, then the label fades in.
export function Eyebrow({ className = "", children }: Props) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] ${className}`}>
      <span
        aria-hidden
        className="h-0.5 w-10 shrink-0 origin-left rounded-full bg-current ease-reveal motion-safe:transition-[scale] motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:scale-x-0"
      />
      <span className="motion-safe:transition-opacity motion-safe:delay-300 motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:opacity-0">
        {children}
      </span>
    </p>
  );
}
