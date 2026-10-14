import { events } from "@/data/events";

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export default function EventPage() {
  return null;
}
