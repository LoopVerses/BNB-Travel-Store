import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";

export const metadata = {
  title: "eVisas | B&B Travel Store",
  description: "Fast-track e-visa processing for Umrah, Gulf, and Asia-Pacific destinations.",
};

export default function EvisasPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES.evisas} />
    </SiteShell>
  );
}
