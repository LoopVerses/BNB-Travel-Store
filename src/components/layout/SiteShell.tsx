"use client";

import BoxedLayout from "@/components/BoxedLayout";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <BoxedLayout>
      <Navbar visible />
      {children}
      <Footer />
    </BoxedLayout>
  );
}
