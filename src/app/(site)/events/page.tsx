import { ComingSoonPage } from "../_page/coming-soon";
import { localizedMetadata } from "../_page/page-metadata";

export const generateMetadata = localizedMetadata((d) => ({ title: d.header.nav.events }));

export default function EventsPage() {
  return <ComingSoonPage content={(d) => ({ title: d.header.nav.events })} />;
}
