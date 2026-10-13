import { Suspense } from "react";
import { SiteHeader, SiteHeaderFallback } from "./_header/site-header";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader />
      </Suspense>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70 dark:border-white/10">
        © <CopyrightYear /> YDM. All rights reserved.
      </footer>
    </>
  );
}
