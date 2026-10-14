import { Suspense } from "react";
import { SiteFooter, SiteFooterFallback } from "./_footer/site-footer";
import { SiteHeader, SiteHeaderFallback } from "./_header/site-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader />
      </Suspense>

      <main className="flex-1">{children}</main>

      <Suspense fallback={<SiteFooterFallback />}>
        <SiteFooter />
      </Suspense>
    </>
  );
}
