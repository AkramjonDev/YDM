import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { departments } from "@/data/departments";
import { contact } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { Logo } from "../_header/logo";
import { departmentHref, getSiteLinks } from "../_header/nav";
import { Reveal } from "../_home/reveal";

const COLUMN_STAGGER_MS = 100;
const ITEM_STAGGER_MS = 30;

// Fades a column up when the footer enters view (needs the <Reveal> group).
const columnClass =
  "ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:translate-y-6 motion-safe:group-data-[state=idle]/reveal:opacity-0";
const headingClass = "font-display text-[15px] font-bold uppercase tracking-wider text-gold-400";
// List link: turns gold; its `slideClass` text nudges right.
const linkClass =
  "group/fl flex gap-2 rounded text-[15px] leading-[1.45] text-white/85 transition-colors duration-250 hover:text-gold-400 focus-visible:text-gold-400";
const slideClass =
  "min-w-0 transition-[translate] duration-250 motion-safe:group-hover/fl:translate-x-1 motion-safe:group-focus-visible/fl:translate-x-1";
// Contact link: text turns white, its icon grows.
const contactLinkClass =
  "group/fc flex items-start gap-3 rounded text-white/85 transition-colors duration-250 hover:text-white focus-visible:text-white";
const contactIconClass =
  "mt-0.5 size-[18px] shrink-0 text-gold-400 transition-[scale] duration-250 motion-safe:group-hover/fc:scale-110 motion-safe:group-focus-visible/fc:scale-110";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

// Site footer, on every page. Departments, page links and contacts come from
// the same data as the header. Reads the locale cookie, so render it inside
// <Suspense> (Cache Components).
export async function SiteFooter() {
  const locale = await getLocale();
  const { footer: t, header, topBar } = getDictionary(locale);
  const [copyrightBefore, copyrightAfter = ""] = t.copyright.split("{year}");
  const delay = (column: number) => ({ transitionDelay: `${column * COLUMN_STAGGER_MS}ms` });

  return (
    <footer className="relative isolate overflow-hidden bg-navy-900 pt-[72px]">
      <div
        aria-hidden
        className="pattern-girih-line absolute inset-0 -z-10 opacity-5 motion-safe:animate-girih-drift motion-safe:[animation-duration:80s]"
      />

      {/* Below 768px: brand, contact, departments, site (contacts first). */}
      <Reveal className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-[1.2fr_1.8fr_0.8fr_1.2fr]">
        <div style={delay(0)} className={columnClass}>
          <Logo tone="light" className="h-14 w-auto" />
          <p className="mt-6 max-w-[280px] text-[15.5px] leading-[1.65] text-white/75">{t.about}</p>
        </div>

        <nav aria-labelledby="footer-departments" style={delay(1)} className={`max-md:order-2 ${columnClass}`}>
          <h2 id="footer-departments" className={headingClass}>
            {t.departments}
          </h2>
          <ol className="mt-6 space-y-3">
            {departments.map((department, i) => (
              <li
                key={department.slug}
                style={{ transitionDelay: `${COLUMN_STAGGER_MS + i * ITEM_STAGGER_MS}ms` }}
                className="motion-safe:transition-opacity motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:opacity-0"
              >
                <Link href={departmentHref(department.slug)} className={linkClass}>
                  <span
                    aria-hidden
                    className="w-5 shrink-0 tabular-nums text-white/45 transition-colors duration-250 group-hover/fl:text-gold-500 group-focus-visible/fl:text-gold-500"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={slideClass}>{department.name[locale]}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <nav aria-labelledby="footer-site" style={delay(2)} className={`max-md:order-3 ${columnClass}`}>
          <h2 id="footer-site" className={headingClass}>
            {t.site}
          </h2>
          <ul className="mt-6 space-y-3">
            {getSiteLinks(header).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  <span className={slideClass}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={delay(3)} className={`max-md:order-1 ${columnClass}`}>
          <h2 className={headingClass}>{t.contact}</h2>
          <ul className="mt-6 space-y-4 text-[15px] leading-[1.45]">
            <li className="flex items-start gap-3 text-white/85">
              <MapPin aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-400" />
              <span>
                <span className="sr-only">{t.address}: </span>
                {contact.address[locale]}
              </span>
            </li>
            <li>
              <a href={contact.phoneHref} className={contactLinkClass}>
                <Phone aria-hidden className={contactIconClass} />
                <span>
                  <span className="sr-only">{topBar.phone}: </span>
                  {contact.phone}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={contactLinkClass}>
                <Mail aria-hidden className={contactIconClass} />
                <span className="min-w-0 break-words">
                  <span className="sr-only">{topBar.email}: </span>
                  {contact.email}
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/85">
              <Clock aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-400" />
              <span>
                <span className="sr-only">{t.hours}: </span>
                {contact.hours[locale]}
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 border-t border-white/10 py-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13.5px] text-white/55">
            {copyrightBefore}
            <CopyrightYear />
            {copyrightAfter}
          </p>
          {contact.socials.length > 0 && (
            <ul className="flex flex-wrap gap-4 text-[13.5px]">
              {contact.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded text-white/70 transition-colors hover:text-gold-400 focus-visible:text-gold-400"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

// Static shell shown until the locale-aware footer streams in.
export function SiteFooterFallback() {
  return <footer aria-hidden className="min-h-96 bg-navy-900" />;
}
