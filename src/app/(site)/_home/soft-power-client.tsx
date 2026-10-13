"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, use, useEffect, useRef, useState, type ReactNode } from "react";
import type { SoftPowerIcon, SoftPowerPhoto } from "@/data/soft-power";
import { ArrowRightIcon } from "../_header/icons";
import { softPowerIcons } from "./soft-power-icons";

// Which gallery tile a hovered/focused chip points at.
const ActivePhoto = createContext<{
  active: SoftPowerPhoto | null;
  setActive: (photo: SoftPowerPhoto | null) => void;
}>({ active: null, setActive: () => {} });

export function ActivePhotoProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SoftPowerPhoto | null>(null);
  return <ActivePhoto value={{ active, setActive }}>{children}</ActivePhoto>;
}

export function DirectionChip({
  href,
  icon,
  label,
  photo,
}: {
  href: string;
  icon: SoftPowerIcon;
  label: string;
  photo?: SoftPowerPhoto;
}) {
  const { setActive } = use(ActivePhoto);
  const Icon = softPowerIcons[icon];
  const highlight = photo ? () => setActive(photo) : undefined;
  const clear = photo ? () => setActive(null) : undefined;

  return (
    <Link
      href={href}
      onPointerEnter={highlight}
      onPointerLeave={clear}
      onFocus={highlight}
      onBlur={clear}
      className="group/chip inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[13.5px] font-medium text-white/85 transition-colors duration-300 hover:border-gold-500/60 hover:bg-gold-500/10 hover:text-white focus-visible:border-gold-500/60 focus-visible:bg-gold-500/10 focus-visible:text-white"
    >
      <Icon
        aria-hidden
        className="size-[15px] shrink-0 text-gold-400 transition-[rotate] duration-300 motion-safe:group-hover/chip:-rotate-8 motion-safe:group-focus-visible/chip:-rotate-8"
      />
      {label}
    </Link>
  );
}

// Per-tile layout: grid placement (≥640px), wipe direction and parallax speed.
const tiles = {
  "soft-registan": {
    place: "sm:col-span-2",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_0_100%_0)]",
    speed: -0.6,
    sizes: "(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 640px) 100vw, 50vw",
  },
  "soft-dance": {
    place: "sm:row-span-2",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_100%_0_0)]",
    speed: 1,
    sizes: "(min-width: 1280px) 310px, (min-width: 1024px) 25vw, 50vw",
  },
  "soft-plov": {
    place: "",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_0_0_100%)]",
    speed: -1,
    sizes: "(min-width: 1280px) 310px, (min-width: 1024px) 25vw, 50vw",
  },
  "soft-lake": {
    place: "",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(100%_0_0_0)]",
    speed: 0.5,
    sizes: "(min-width: 1280px) 310px, (min-width: 1024px) 25vw, 50vw",
  },
} satisfies Record<SoftPowerPhoto, { place: string; wipe: string; speed: number; sizes: string }>;

const TILE_STAGGER_MS = 120;
const PARALLAX_PX = 20;

// Mosaic (≥640px) or 2×2 grid. Tiles wipe in inside a <Reveal>, drift at
// different speeds while in view, and respond to chip hover/focus.
export function SoftPowerGallery({
  photos,
}: {
  photos: { key: SoftPowerPhoto; src: string; alt: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { active } = use(ActivePhoto);

  // Parallax: only listens to scroll while the gallery is on screen.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 640px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const enabled = wide.matches && !reduce.matches;
      const rect = root.getBoundingClientRect();
      const half = window.innerHeight / 2;
      // -1 below the viewport centre … 1 above it.
      const progress = Math.max(
        -1,
        Math.min(1, (half - (rect.top + rect.height / 2)) / (half + rect.height / 2)),
      );
      for (const layer of layers) {
        const y = progress * Number(layer.dataset.speed) * PARALLAX_PX;
        layer.style.translate = enabled ? `0 ${y.toFixed(1)}px` : "";
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        schedule();
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:grid-rows-[250px_117px_117px] sm:gap-4"
    >
      {photos.map((photo, i) => {
        const tile = tiles[photo.key];
        const delay = { transitionDelay: `${i * TILE_STAGGER_MS}ms` };
        const state = active === null ? "" : active === photo.key ? "on" : "off";

        return (
          // Grid cell; carries the parallax drift.
          <div
            key={photo.key}
            data-speed={tile.speed}
            className={`relative aspect-square sm:aspect-auto ${tile.place}`}
          >
            {/* Chip highlight (scale + ring) or dim. */}
            <div
              data-highlight={state || undefined}
              className="group/tile absolute inset-0 transition-[scale,opacity] duration-300 data-[highlight=off]:opacity-50 motion-safe:data-[highlight=on]:scale-103"
            >
              {/* Wipe-in mask. */}
              <div
                style={delay}
                className={`absolute inset-0 overflow-hidden rounded-2xl bg-navy-900 ease-reveal [clip-path:inset(0)] motion-safe:transition-[clip-path] motion-safe:duration-900 ${tile.wipe}`}
              >
                <div
                  style={delay}
                  className="absolute inset-0 ease-reveal motion-safe:transition-[scale] motion-safe:duration-900 motion-safe:group-data-[state=idle]/reveal:scale-120"
                >
                  <div className="absolute inset-0 transition-[scale] duration-600 ease-out motion-safe:group-hover/tile:scale-108">
                    <div
                      className={`absolute inset-0 ${
                        photo.key === "soft-registan" ? "motion-safe:animate-ken-burns" : ""
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={tile.sizes}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-navy-950/0 to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-inset ring-gold-500 transition-opacity duration-300 group-data-[highlight=on]/tile:opacity-100"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Gold pill whose arrow nudges until the first hover, then rests.
export function SoftPowerCta({ href, label }: { href: string; label: string }) {
  const [nudge, setNudge] = useState(true);

  return (
    <Link
      href={href}
      onPointerEnter={() => setNudge(false)}
      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 font-semibold text-navy-950 transition-colors hover:bg-gold-400 sm:w-auto"
    >
      {label}
      <ArrowRightIcon className={`size-5 ${nudge ? "motion-safe:animate-nudge" : ""}`} />
    </Link>
  );
}
