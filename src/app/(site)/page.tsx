import { ContactForm } from "./contact-form";

const features = [
  {
    title: "Fast",
    body: "Server-rendered with Next.js for quick first loads and great SEO.",
  },
  {
    title: "Secure",
    body: "Supabase Auth and row level security protect your data.",
  },
  {
    title: "Manageable",
    body: "A built-in admin panel to review and manage incoming leads.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Build something people want
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg opacity-70">
          Replace this headline and copy with your product&apos;s value
          proposition.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-foreground px-6 py-3 font-medium text-background hover:opacity-90"
          >
            Contact us
          </a>
          <a
            href="#features"
            className="rounded-full border border-black/15 px-6 py-3 font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            Learn more
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Features</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 opacity-70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-xl scroll-mt-16 px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Get in touch</h2>
        <p className="mt-3 text-center opacity-70">
          Leave your details and we&apos;ll get back to you.
        </p>
        <ContactForm />
      </section>
    </>
  );
}
