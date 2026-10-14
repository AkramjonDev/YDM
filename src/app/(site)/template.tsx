// Remounted by Next on every navigation, so page content fades in on route
// changes while the header and footer (in the layout) stay put.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-page-in">{children}</div>;
}
