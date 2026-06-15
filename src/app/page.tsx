"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BoxedLayout from "@/components/BoxedLayout";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import VisaFocusSection from "@/components/home/VisaFocusSection";
import StatsSection from "@/components/StatsSection";
import TravelServicesSection from "@/components/home/TravelServicesSection";
import BookingSection from "@/components/BookingSection";
import MissionSection from "@/components/MissionSection";
import CarouselSection from "@/components/CarouselSection";
import AdventureSection from "@/components/AdventureSection";
import UmrahSection from "@/components/UmrahSection";
import GroundServicesSection from "@/components/home/GroundServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SplitReveal from "@/components/SplitReveal";
import InitialLoader from "@/components/InitialLoader";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
    setShowReveal(true);
  }, []);

  const handleRevealComplete = useCallback(() => {
    setRevealComplete(true);
    setShowReveal(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaderDone && (
          <InitialLoader key="initial-loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showReveal && !revealComplete && (
          <SplitReveal key="split-reveal" onComplete={handleRevealComplete} />
        )}
      </AnimatePresence>

      <BoxedLayout>
        <Navbar visible={revealComplete} />
        <HeroSection visible={revealComplete} />
        <ValuePropositionSection />
        <VisaFocusSection />
        <StatsSection />
        <TravelServicesSection />
        <BookingSection />
        <MissionSection />
        <CarouselSection />
        <AdventureSection />
        <UmrahSection />
        <GroundServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </BoxedLayout>
    </>
  );
}
