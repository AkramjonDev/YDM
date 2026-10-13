import type { CSSProperties } from "react";
import type { Department } from "@/data/departments";
import { departmentIcons } from "./department-icons";

// Generated cover for news without a photo: a navy → department-colour
// gradient with the department icon on a glass tile. Fills its positioned
// parent; hover effects follow the enclosing `group/card-link`.
export function NewsCover({ department }: { department: Department }) {
  const Icon = departmentIcons[department.icon];

  return (
    <div
      aria-hidden
      style={{ "--dept": department.color } as CSSProperties}
      className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,var(--color-navy-900)_0%,color-mix(in_oklab,var(--dept)_45%,var(--color-navy-900))_55%,color-mix(in_oklab,var(--dept)_60%,var(--color-navy-900))_100%)] [background-size:200%_200%] motion-safe:animate-cover-shift"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.18),transparent_60%)] opacity-70 transition-opacity duration-300 card-on:opacity-100" />

      <div className="relative grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-[scale] duration-300 motion-safe:animate-cover-float motion-safe:card-on:scale-110">
        <Icon strokeWidth={1.75} className="size-7 text-white" />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/yd-mark-white.svg"
        alt=""
        width={42}
        height={28}
        className="absolute bottom-4 right-4 h-7 w-auto opacity-35"
      />
    </div>
  );
}
