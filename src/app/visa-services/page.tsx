import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";

export const metadata = {
  title: "Visa Services | B&B Travel Store",
  description: "Expert visa consultancy, file preparation, cover letters and travel itineraries.",
};

export default function VisaServicesPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES["visa-services"]} />
    </SiteShell>
  );
}
