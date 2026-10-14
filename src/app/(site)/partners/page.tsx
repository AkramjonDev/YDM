import { ComingSoonPage } from "../_page/coming-soon";
import { localizedMetadata } from "../_page/page-metadata";

export const generateMetadata = localizedMetadata((d) => ({ title: d.header.nav.partners }));

export default function PartnersPage() {
  return <ComingSoonPage content={(d) => ({ title: d.header.nav.partners })} />;
}
