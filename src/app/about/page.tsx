import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";

export const metadata = {
  title: "About Us | B&B Travel Store",
  description: "Learn about B&B Travel Store, passionate explorers crafting unforgettable journeys.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES.about} />
    </SiteShell>
  );
}
