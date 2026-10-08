import Link from "next/link";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold">
            YDM
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <a href="#features" className="hover:opacity-70">Features</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
            <a
              href="#contact"
              className="rounded-full bg-foreground px-4 py-2 text-background hover:opacity-90"
            >
              Get started
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70 dark:border-white/10">
        © <CopyrightYear /> YDM. All rights reserved.
      </footer>
    </>
  );
}
