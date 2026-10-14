import { ComingSoonPage } from "../_page/coming-soon";
import { localizedMetadata } from "../_page/page-metadata";

export const generateMetadata = localizedMetadata((d) => ({ title: d.header.nav.news }));

export default function NewsPage() {
  return <ComingSoonPage content={(d) => ({ title: d.header.nav.news })} />;
}
