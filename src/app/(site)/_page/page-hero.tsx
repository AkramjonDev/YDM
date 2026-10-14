import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { Eyebrow } from "../_home/eyebrow";
import { Reveal } from "../_home/reveal";
import { SplitHeading } from "../_home/split-heading";

export type Breadcrumb = { label: string; href?: string };

type Props = {
  title: string;
  // Trail after "Home"; the last item is the current page (no `href`).
  breadcrumbs: Breadcrumb[];
} & (
  | { variant?: "band"; subtitle?: string }
  | {
      // Text on the left, `media` (e.g. a photo grid) on the right.
      variant: "split";
      eyebrow: string;
      tagline?: string;
      text?: string;
      // Rendered inside a <Reveal>, so it can use the reveal classes.
      media: ReactNode;
    }
);

const bandClass =
  "relative isolate overflow-hidden bg-linear-to-r from-navy-900 to-navy-800";
const titleClass =
  "font-display text-[32px] font-extrabold tracking-tight text-white md:text-[40px] lg:text-[56px]";
const fadeUp =
  "ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-600 motion-safe:group-data-[state=idle]/reveal:translate-y-3 motion-safe:group-data-[state=idle]/reveal:opacity-0";

// Title area at the top of every inner page: breadcrumbs and the <h1>, either
// as a band with an optional subtitle or split with media on the right.
// Reads the locale cookie, so render it inside <Suspense>.
export async function PageHero(props: Props) {
  const { page } = getDictionary(await getLocale());
  const breadcrumbs = (
    <Breadcrumbs
      label={page.breadcrumb}
      trail={[{ label: page.home, href: "/" }, ...props.breadcrumbs]}
    />
  );

  if (props.variant === "split") {
    return (
      <section className="relative isolate overflow-hidden bg-navy-950 py-16 lg:py-[90px]">
        <div
          aria-hidden
          className="pattern-girih-line absolute inset-0 -z-10 opacity-5 motion-safe:animate-girih-drift"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:items-center lg:gap-14">
          <Reveal>
            {breadcrumbs}
            <Eyebrow className="mt-8 text-gold-500">{props.eyebrow}</Eyebrow>
            <SplitHeading as="h1" text={props.title} className={`mt-5 leading-[1.1] ${titleClass}`} />
            {props.tagline && (
              <p
                style={{ transitionDelay: "350ms" }}
                className={`mt-5 text-lg font-medium text-gold-400 lg:text-[22px] ${fadeUp}`}
              >
                {props.tagline}
              </p>
            )}
            {props.text && (
              <p
                style={{ transitionDelay: "450ms" }}
                className={`mt-4 max-w-[600px] text-[17px] leading-[1.7] text-white/75 lg:text-[19px] ${fadeUp}`}
              >
                {props.text}
              </p>
            )}
          </Reveal>
          <Reveal>{props.media}</Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className={`${bandClass} pb-16 pt-8 lg:pb-[90px] lg:pt-10`}>
      <Backdrop />
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
        {breadcrumbs}
        <SplitHeading as="h1" text={props.title} className={`mt-7 max-w-4xl leading-[1.12] ${titleClass}`} />
        {props.subtitle && (
          <p
            style={{ transitionDelay: "250ms" }}
            className={`mt-5 max-w-[720px] text-lg leading-relaxed text-white/80 lg:text-xl ${fadeUp}`}
          >
            {props.subtitle}
          </p>
        )}
      </Reveal>
    </section>
  );
}

function Breadcrumbs({ label, trail }: { label: string; trail: Breadcrumb[] }) {
  return (
    <nav
      aria-label={label}
      className="motion-safe:transition-opacity motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:opacity-0"
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13.5px]">
        {trail.map((crumb, i) => {
          const current = i === trail.length - 1;
          return (
            <Fragment key={i}>
              {i > 0 && (
                <li aria-hidden className="text-white/40">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
              <li>
                {crumb.href && !current ? (
                  <Link href={crumb.href} className="rounded text-white/65 transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={current ? "page" : undefined} className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// Glow in the top-right corner plus the slowly drifting girih lattice.
function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_100%_0%,color-mix(in_oklab,var(--color-brand-500)_15%,transparent),transparent_70%)]"
      />
      <div aria-hidden className="pattern-girih absolute inset-0 -z-10 motion-safe:animate-girih-drift" />
    </>
  );
}

// Static stand-in while a page's locale-aware content streams in. At least a
// screen tall, so the footer (which often arrives first) starts below the fold.
export function PageHeroFallback() {
  return (
    <div aria-hidden className="min-h-svh">
      <div className={`${bandClass} h-[260px] lg:h-[320px]`}>
        <Backdrop />
      </div>
    </div>
  );
}
