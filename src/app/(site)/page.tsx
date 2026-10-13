import { Suspense } from "react";
import { About } from "./_home/about";
import { Departments } from "./_home/departments";
import { Hero, HeroFallback } from "./_home/hero";
import { News } from "./_home/news";
import { Stats } from "./_home/stats";

export default function Home() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <Hero />
      <Stats />
      <About />
      <Departments />
      <News />
    </Suspense>
  );
}
