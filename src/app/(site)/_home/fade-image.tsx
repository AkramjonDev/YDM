"use client";

import Image, { type ImageProps } from "next/image";

// next/image that fades in once loaded, over the parent's mist skeleton. Marks
// the <img> directly (no re-render), and the ref also catches images that
// finished loading before hydration.
export function FadeImage({ alt, className = "", ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      ref={(img) => {
        if (img?.complete && img.naturalWidth > 0) img.dataset.loaded = "";
      }}
      onLoad={(event) => {
        event.currentTarget.dataset.loaded = "";
      }}
      className={`transition-opacity duration-500 motion-safe:opacity-0 motion-safe:data-loaded:opacity-100 ${className}`}
    />
  );
}
