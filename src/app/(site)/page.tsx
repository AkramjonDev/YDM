import { Suspense } from "react";
import { Hero, HeroFallback } from "./_home/hero";
import { Stats } from "./_home/stats";

export default function Home() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <Hero />
      <Stats />
    </Suspense>
  );
}
