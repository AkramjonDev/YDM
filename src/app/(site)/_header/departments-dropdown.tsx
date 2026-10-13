"use client";

import Link from "next/link";
import { ChevronDownIcon } from "./icons";
import { departmentHref, type DepartmentLink } from "./nav";
import { useDropdown } from "./use-dropdown";

type Props = {
  label: string;
  departments: DepartmentLink[];
  pathname: string;
};

export function DepartmentsDropdown({ label, departments, pathname }: Props) {
  const { open, close, toggle, rootRef, buttonRef, panelId, onKeyDown } = useDropdown();
  const active = pathname.startsWith("/departments/");

  return (
    <div ref={rootRef} onKeyDown={onKeyDown} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="relative inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-md px-2 text-sm font-medium text-navy-900 transition-colors hover:text-brand-600 xl:px-3 xl:text-[15px]"
      >
        {label}
        <ChevronDownIcon
          className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
        <ActiveRule active={active} />
      </button>

      <div
        id={panelId}
        className={`absolute left-1/2 top-full z-10 mt-2 w-80 -translate-x-1/2 rounded-xl border border-line bg-white p-2 shadow-[0_18px_40px_-16px_rgba(1,15,51,0.35)] duration-200 motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,translate]"
            : "invisible -translate-y-1 opacity-0 transition-[opacity,translate,visibility]"
        }`}
      >
        <span aria-hidden className="gold-rule mx-3 mb-1 mt-2 block h-0.5 w-8 rounded-full" />
        <ul>
          {departments.map((department) => {
            const href = departmentHref(department.slug);
            const current = pathname === href;
            return (
              <li key={department.slug}>
                <Link
                  href={href}
                  data-dropdown-item
                  aria-current={current ? "page" : undefined}
                  onClick={close}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-brand-50 hover:text-navy-900 ${
                    current ? "bg-brand-50 font-semibold text-navy-900" : "text-ink"
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
    </div>
  );
}

// Gold underline marking the active desktop nav item.
export function ActiveRule({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`gold-rule pointer-events-none absolute inset-x-2 bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 motion-reduce:transition-none xl:inset-x-3 ${
        active ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}
