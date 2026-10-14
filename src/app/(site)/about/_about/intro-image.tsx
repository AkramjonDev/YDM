"use client";

import Image from "next/image";
import { useRef } from "react";
import { useParallax } from "../../_page/use-parallax";

// Photo that wipes in from the right while settling from 1.15× (inside a
// <Reveal>), then drifts slightly with scroll.
export function IntroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, 20);

  return (
    <div ref={ref}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist ease-reveal [clip-path:inset(0)] motion-safe:transition-[clip-path] motion-safe:duration-900 motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_0_0_100%)]">
        <div className="absolute inset-0 ease-reveal motion-safe:transition-[scale] motion-safe:duration-900 motion-safe:group-data-[state=idle]/reveal:scale-115">
          <Image
            src={src}
            alt={alt}
            fill
            // Above the fold on desktop, where it is the page's largest paint.
            loading="eager"
            sizes="(min-width: 1280px) 540px, (min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
