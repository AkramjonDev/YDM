import { departments } from "@/data/departments";

export function generateStaticParams() {
  return departments.map(({ slug }) => ({ slug }));
}

export default function DepartmentPage() {
  return null;
}
