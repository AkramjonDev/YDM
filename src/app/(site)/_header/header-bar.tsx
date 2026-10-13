"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { ActiveRule, DepartmentsDropdown } from "./departments-dropdown";
import { MenuIcon } from "./icons";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { CTA_HREF, getNavEntries, isActive, type DepartmentLink, type HeaderLabels } from "./nav";

type Props = {
  locale: Locale;
  labels: HeaderLabels;
  departments: DepartmentLink[];
};

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

// True once the page has scrolled past the 48px top bar and the navbar is stuck.
function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 48,
    () => false,
  );
}

export function HeaderBar({ locale, labels, departments }: Props) {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const entries = getNavEntries(labels);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // The panel only exists below 1024px; close it if the viewport grows past that.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function closeMenu(restoreFocus: boolean) {
    setMenuOpen(false);
    if (restoreFocus) burgerRef.current?.focus();
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-white transition-shadow duration-300 motion-reduce:transition-none ${
        scrolled ? "shadow-[0_10px_30px_-14px_rgba(1,15,51,0.22)]" : ""
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-25">
        <Logo className="h-11 w-auto lg:h-12 xl:h-14" />

        <nav aria-label={labels.mainNav} className="hidden lg:block">
          <ul className="flex items-center xl:gap-1">
            {entries.map((entry) =>
              entry.kind === "departments" ? (
                <li key="departments">
                  <DepartmentsDropdown
                    label={entry.label}
                    departments={departments}
                    pathname={pathname}
                  />
                </li>
              ) : (
                <li key={entry.href}>
                  <DesktopLink
                    href={entry.href}
                    label={entry.label}
                    active={isActive(pathname, entry.href)}
                  />
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={CTA_HREF}
            className="hidden h-11 items-center whitespace-nowrap rounded-full bg-navy-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:inline-flex xl:px-6"
          >
            {labels.cta}
          </Link>
          <button
            ref={burgerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-mist lg:hidden"
          >
            <MenuIcon className="size-6" />
            <span className="sr-only">{labels.openMenu}</span>
          </button>
        </div>
      </div>

      <MobileMenu
        id={menuId}
        open={menuOpen}
        onClose={closeMenu}
        locale={locale}
        labels={labels}
        entries={entries}
        departments={departments}
        pathname={pathname}
      />
    </header>
  );
}

function DesktopLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative inline-flex h-10 items-center whitespace-nowrap rounded-md px-2 text-sm font-medium text-navy-900 transition-colors hover:text-brand-600 xl:px-3 xl:text-[15px]"
    >
      {label}
      <ActiveRule active={active} />
    </Link>
  );
}
