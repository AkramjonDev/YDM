"use client";

import Image from "next/image";
import { useRef } from "react";
import { useParallax } from "../../_page/use-parallax";

export type GalleryPhoto = { src: string; alt: string };

// Per position: span (≥640px; a 2×2 grid below), wipe direction and parallax
// travel (px, sign = direction).
const tiles = [
  {
    span: "sm:col-span-8",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_0_100%_0)]",
    parallax: -16,
    sizes: "(min-width: 1280px) 420px, (min-width: 1024px) 34vw, (min-width: 640px) 66vw, 50vw",
  },
  {
    span: "sm:col-span-4",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_0_0_100%)]",
    parallax: 10,
    sizes: "(min-width: 1280px) 210px, (min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw",
  },
  {
    span: "sm:col-span-4",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_100%_0_0)]",
    parallax: -10,
    sizes: "(min-width: 1280px) 210px, (min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw",
  },
  {
    span: "sm:col-span-8",
    wipe: "motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(100%_0_0_0)]",
    parallax: 16,
    sizes: "(min-width: 1280px) 420px, (min-width: 1024px) 34vw, (min-width: 640px) 66vw, 50vw",
  },
];

const STAGGER_MS = 120;

// Four-photo mosaic for the split page hero (inside its <Reveal>): wide/narrow
// over narrow/wide, each tile wiping in from its own side.
export function HeroGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-12 sm:grid-rows-[240px_240px]">
      {photos.slice(0, tiles.length).map((photo, i) => (
        <Tile key={photo.src + i} photo={photo} index={i} />
      ))}
    </div>
  );
}

function Tile({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const tile = tiles[index];
  useParallax(ref, tile.parallax);
  const delay = { transitionDelay: `${index * STAGGER_MS}ms` };

  return (
    <div ref={ref} className={`relative aspect-square sm:aspect-auto ${tile.span}`}>
      <div
        style={delay}
        className={`group/tile absolute inset-0 overflow-hidden rounded-2xl bg-navy-900 ease-reveal [clip-path:inset(0)] motion-safe:transition-[clip-path] motion-safe:duration-900 ${tile.wipe}`}
      >
        <div
          style={delay}
          className="absolute inset-0 ease-reveal motion-safe:transition-[scale] motion-safe:duration-900 motion-safe:group-data-[state=idle]/reveal:scale-120"
        >
          <div className="absolute inset-0 transition-[scale] duration-500 ease-out motion-safe:group-hover/tile:scale-106">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              // Above the fold: the hero's largest paint.
              loading="eager"
              fetchPriority={index === 0 ? "high" : undefined}
              sizes={tile.sizes}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
