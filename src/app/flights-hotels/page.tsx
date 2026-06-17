import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";

export const metadata = {
  title: "Flights & Hotels | B&B Travel Store",
  description: "Book flights and hotels with B&B Travel Store.",
};

export default function FlightsHotelsPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES["flights-hotels"]} />
    </SiteShell>
  );
}
