"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { contact } from "@/data/site";
import { ChevronDownIcon, CloseIcon, MailIcon, PhoneIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import {
  CTA_HREF,
  departmentHref,
  isActive,
  type DepartmentLink,
  type HeaderLabels,
  type NavEntry,
} from "./nav";

type Props = {
  id: string;
  open: boolean;
  onClose: (restoreFocus: boolean) => void;
  locale: Locale;
  labels: HeaderLabels;
  entries: NavEntry[];
  departments: DepartmentLink[];
  pathname: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  id,
  open,
  onClose,
  locale,
  labels,
  entries,
  departments,
  pathname,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const accordionId = useId();
  const [departmentsOpen, setDepartmentsOpen] = useState(() =>
    pathname.startsWith("/departments/"),
  );

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose(true);
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;

    // Keep focus inside the panel while it is open.
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => !element.closest("[inert]"),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeOnNavigate = () => onClose(false);

  return (
    <div
      inert={!open}
      className={`fixed inset-0 z-50 overflow-hidden motion-reduce:transition-none lg:hidden ${
        open ? "visible" : "invisible transition-[visibility] duration-300"
      }`}
    >
      <div
        aria-hidden
        onClick={() => onClose(true)}
        className={`absolute inset-0 bg-navy-950/50 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
          <span className="font-display text-sm font-bold text-navy-900">{labels.menu}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => onClose(true)}
            className="inline-flex size-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-mist"
          >
            <CloseIcon className="size-5" />
            <span className="sr-only">{labels.closeMenu}</span>
          </button>
        </div>

        <nav aria-label={labels.mainNav} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {entries.map((entry) => {
              if (entry.kind === "departments") {
                const sectionActive = isActive(pathname, "/departments");
                return (
                  <li key="departments">
                    <button
                      type="button"
                      aria-expanded={departmentsOpen}
                      aria-controls={accordionId}
                      onClick={() => setDepartmentsOpen((value) => !value)}
                      className={rowClass(sectionActive)}
                    >
                      {entry.label}
                      <ChevronDownIcon
                        className={`size-5 transition-transform duration-200 motion-reduce:transition-none ${
                          departmentsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      id={accordionId}
                      className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                        departmentsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul inert={!departmentsOpen} className="overflow-hidden">
                        {departments.map((department) => {
                          const href = departmentHref(department.slug);
                          const current = pathname === href;
                          return (
                            <li key={department.slug}>
                              <Link
                                href={href}
                                onClick={closeOnNavigate}
                                aria-current={current ? "page" : undefined}
                                className={`ml-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-brand-50 ${
                                  current ? "font-semibold text-navy-900" : "text-ink"
                                }`}
                              >
                                <span
                                  aria-hidden
                                  className="size-2.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: department.color }}
                                />
                                {department.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }

              const active = isActive(pathname, entry.href);
              return (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={closeOnNavigate}
                    aria-current={active ? "page" : undefined}
                    className={rowClass(active)}
                  >
                    {entry.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-4 border-t border-line px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ul aria-label={labels.contacts} className="space-y-1.5 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-2 rounded text-navy-900 hover:text-brand-600"
                >
                  <PhoneIcon className="size-4 text-gold-600" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded text-navy-900 hover:text-brand-600"
                >
                  <MailIcon className="size-4 text-gold-600" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <LanguageSwitcher locale={locale} label={labels.language} variant="light" />
          </div>
          <Link
            href={CTA_HREF}
            onClick={closeOnNavigate}
            className="flex h-12 w-full items-center justify-center rounded-full bg-navy-900 px-5 font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {labels.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function rowClass(active: boolean) {
  return `relative flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium transition-colors hover:bg-mist ${
    active
      ? "bg-brand-50 text-brand-600 before:absolute before:inset-y-2.5 before:left-0 before:w-1 before:rounded-full before:bg-gold-500"
      : "text-navy-900"
  }`;
}
