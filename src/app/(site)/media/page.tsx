import { ComingSoonPage } from "../_page/coming-soon";
import { localizedMetadata } from "../_page/page-metadata";

export const generateMetadata = localizedMetadata((d) => ({ title: d.header.nav.media }));

export default function MediaPage() {
  return <ComingSoonPage content={(d) => ({ title: d.header.nav.media })} />;
}
