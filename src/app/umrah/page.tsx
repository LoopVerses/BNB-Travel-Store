import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";

export const metadata = {
  title: "Umrah Packages | B&B Travel Store",
  description: "Spiritual Umrah packages with visa, hotels, and VIP transport.",
};

export default function UmrahPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES.umrah} />
    </SiteShell>
  );
}
