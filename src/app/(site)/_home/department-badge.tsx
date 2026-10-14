import type { Department } from "@/data/departments";
import type { Locale } from "@/i18n/config";

// Department pill, truncated to one line. Expects `--dept` (the department
// colour) from the enclosing card.
export function DepartmentBadge({ department, locale }: { department: Department; locale: Locale }) {
  return (
    <span className="inline-flex max-w-full items-center self-start gap-1.5 rounded-full bg-(--dept)/10 px-2.5 py-1 text-[11px] font-semibold leading-tight text-(--dept)">
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-(--dept)" />
      <span className="truncate">{department.name[locale]}</span>
    </span>
  );
}
