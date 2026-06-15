import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";

export const metadata = {
  title: "Holidays | B&B Travel Store",
  description: "Curated holiday packages to dream destinations worldwide.",
};

export default function HolidaysPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES.holidays} />
    </SiteShell>
  );
}
