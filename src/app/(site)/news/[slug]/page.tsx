import { news } from "@/data/news";

export function generateStaticParams() {
  return news.map(({ slug }) => ({ slug }));
}

export default function NewsArticlePage() {
  return null;
}
