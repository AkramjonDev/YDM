import Image from "next/image";
import { Mail, User } from "lucide-react";

type Props = {
  name: string;
  position: string;
  photo: string | null;
  email?: string;
  // Accessible label for the mail button, e.g. "Elektron pochta".
  emailLabel?: string;
};

// Portrait card for a person (leadership, department heads). Inside a
// `group/reveal` item (<Reveal>, <RevealGrid>), the photo wipes down from the
// top while settling from 1.12×; the item can set the stagger with
// `[transition-delay:…]`, which the wipe inherits via `--reveal-delay`.
export function PersonCard({ name, position, photo, email, emailLabel = "Email" }: Props) {
  return (
    <article className="group/person h-full overflow-hidden rounded-2xl border border-line bg-white transition-[translate,box-shadow] duration-300 hover:shadow-[0_24px_48px_-24px_rgb(2_28_86/0.3)] motion-safe:hover:-translate-y-1.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-900 ease-reveal [clip-path:inset(0)] [transition-delay:var(--reveal-delay,0ms)] motion-safe:transition-[clip-path] motion-safe:duration-800 motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_0_100%_0)]">
        <div className="absolute inset-0 ease-reveal [transition-delay:var(--reveal-delay,0ms)] motion-safe:transition-[scale] motion-safe:duration-800 motion-safe:group-data-[state=idle]/reveal:scale-112">
          <div className="absolute inset-0 transition-[scale] duration-500 ease-out motion-safe:group-hover/person:scale-105">
            {photo ? (
              <Image
                src={photo}
                alt={name}
                fill
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 420px"
                className="object-cover object-top"
              />
            ) : (
              <PersonPlaceholder />
            )}
          </div>
        </div>

        {email && (
          <a
            href={`mailto:${email}`}
            aria-label={`${emailLabel}: ${name}`}
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-navy-900 opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 group-hover/person:opacity-100"
          >
            <Mail aria-hidden className="size-4" />
          </a>
        )}
      </div>

      <div className="p-7">
        <h3 className="font-display text-[19px] font-bold leading-snug text-navy-900">{name}</h3>
        <span
          aria-hidden
          className="gold-rule mt-3.5 block h-[3px] w-16 rounded-full transition-[width] duration-300 motion-safe:group-hover/person:w-[110px]"
        />
        <p className="mt-3.5 text-[15px] leading-snug text-muted">{position}</p>
      </div>
    </article>
  );
}

// Stand-in portrait: navy gradient, girih lattice and a softly breathing
// person icon. Fills its positioned parent.
export function PersonPlaceholder() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center bg-linear-135 from-navy-900 to-navy-700">
      <div className="pattern-girih-line absolute inset-0 opacity-[0.08]" />
      <User strokeWidth={1.5} className="relative size-16 text-white opacity-35 motion-safe:animate-breathe" />
    </div>
  );
}
