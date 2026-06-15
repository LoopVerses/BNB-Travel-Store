"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LINKS } from "@/lib/links";
import { useMotionPrefs } from "@/lib/motionPrefs";
import { useIsMobile } from "@/lib/useMediaQuery";

const LEFT_TRAVELERS = [
  { id: "left-1", name: "Nathan", location: "Madrid, Spain", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" },
  { id: "left-2", name: "Yuki", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300" },
  { id: "left-3", name: "Amara", location: "Lagos, Nigeria", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300" },
];

const RIGHT_TRAVELERS = [
  { id: "right-1", name: "Josua", location: "Perth, Australia", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300" },
  { id: "right-2", name: "Carlos", location: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=300" },
  { id: "right-3", name: "Nobita", location: "Paris, France", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300" },
];

const ALL_TRAVELERS = [...LEFT_TRAVELERS, ...RIGHT_TRAVELERS];

const CARD_WIDTH = 118;
const CARD_HEIGHT = 148;

const LEFT_SPOTS_DESKTOP = [
  { left: "0%", top: "-8%", rot: -5, z: 30 },
  { left: "-2%", top: "60%", rot: 6, z: 20 },
  { left: "16%", top: "16%", rot: -4, z: 10 },
];

const RIGHT_SPOTS_DESKTOP = [
  { right: "0%", top: "-8%", rot: 5, z: 30 },
  { right: "-2%", top: "60%", rot: -4, z: 20 },
  { right: "16%", top: "16%", rot: 4, z: 10 },
];

function TravelerCard({
  traveler,
  compact = false,
}: {
  traveler: (typeof ALL_TRAVELERS)[number];
  compact?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 select-none flex-col overflow-hidden rounded-xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.12)] ${
        compact ? "w-[100px] p-1.5" : "p-2"
      }`}
    >
      <div
        className={`relative mb-1 w-full shrink-0 overflow-hidden rounded-md bg-gray-100 ${
          compact ? "h-[62px]" : "h-[78px]"
        }`}
      >
        <Image
          src={traveler.image}
          alt={traveler.name}
          fill
          sizes={compact ? "100px" : "120px"}
          className="object-cover"
          draggable={false}
        />
      </div>
      <div className="shrink-0 px-0.5 pb-0.5">
        <p className={`truncate font-bold text-[#0A3321] ${compact ? "text-[9px]" : "text-[11px]"}`}>
          {traveler.name}
        </p>
        <div className="mt-0.5 flex items-center gap-1 text-gray-400">
          <MapPin size={8} className="shrink-0 text-gray-300" />
          <p className={`truncate ${compact ? "text-[8px]" : "text-[10px]"}`}>{traveler.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdventureSection() {
  const [leftOrder, setLeftOrder] = useState([0, 1, 2]);
  const [rightOrder, setRightOrder] = useState([0, 1, 2]);
  const isMobile = useIsMobile();
  const { reduced, spring } = useMotionPrefs();

  useEffect(() => {
    if (reduced || isMobile) return;
    const interval = window.setInterval(() => {
      setLeftOrder((prev) => [prev[2], prev[0], prev[1]]);
      setRightOrder((prev) => [prev[2], prev[0], prev[1]]);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [reduced, isMobile]);

  const renderDesktopTraveler = (
    traveler: (typeof LEFT_TRAVELERS)[number],
    index: number,
    order: number[],
    spots: typeof LEFT_SPOTS_DESKTOP | typeof RIGHT_SPOTS_DESKTOP,
    side: "left" | "right"
  ) => {
    const spotIdx = order[index];
    const spot = spots[spotIdx];
    const posStyle =
      side === "left"
        ? { left: (spot as (typeof LEFT_SPOTS_DESKTOP)[number]).left, top: spot.top }
        : { right: (spot as (typeof RIGHT_SPOTS_DESKTOP)[number]).right, top: spot.top };

    return (
      <motion.div
        key={traveler.id}
        style={{ zIndex: spot.z, pointerEvents: spotIdx === 0 ? "auto" : "none" }}
        animate={{
          ...posStyle,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          rotate: spot.rot,
        }}
        transition={spring({ type: "spring", stiffness: 90, damping: 15 })}
        className="absolute z-40 hidden cursor-pointer md:flex"
      >
        <TravelerCard traveler={traveler} />
      </motion.div>
    );
  };

  return (
    <section id="adventure" className="relative w-full overflow-x-hidden overflow-y-visible bg-[#FAF8F5] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
      {/* Mobile layout */}
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5 md:hidden">
        <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-[#0A3321] px-5 py-8 text-center shadow-xl">
          <h2 className="max-w-sm font-serif text-2xl font-bold leading-[1.2] tracking-tight text-white">
            Adventure Awaits <br /> Are You Ready?
          </h2>

          <Link href={LINKS.contact}>
            <motion.span
              whileTap={reduced ? undefined : { scale: 0.95 }}
              className="inline-flex cursor-pointer items-center gap-3.5 rounded-full bg-[#F2B938] py-2 pl-5 pr-2 shadow-md focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <span className="font-sans text-xs font-bold text-[#1E3A2B]">Join Now</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B]">
                <ArrowUpRight size={14} className="text-white" strokeWidth={3} />
              </div>
            </motion.span>
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALL_TRAVELERS.map((traveler) => (
            <div key={traveler.id} className="snap-center">
              <TravelerCard traveler={traveler} compact />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — outer padding lets cards overlap above/below the green panel */}
      <div className="relative mx-auto hidden w-full max-w-[1100px] overflow-visible px-6 py-10 md:flex md:px-10 md:py-14">
        <div className="relative flex h-[340px] w-full flex-col items-center justify-center overflow-visible rounded-[2.5rem] bg-[#0A3321] px-6 shadow-xl">
        <div className="z-30 flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-md font-serif text-3xl font-bold leading-[1.2] tracking-tight text-white md:text-4xl lg:text-[3rem]">
            Adventure Awaits <br /> Are You Ready?
          </h2>

          <Link href={LINKS.contact}>
            <motion.span
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={reduced ? undefined : { scale: 0.95 }}
              className="flex cursor-pointer items-center gap-3.5 rounded-full bg-[#F2B938] py-2 pl-5 pr-2 shadow-md transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <span className="font-sans text-xs font-bold text-[#1E3A2B] lg:text-sm">Join Now</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B]">
                <ArrowUpRight size={14} className="text-white" strokeWidth={3} />
              </div>
            </motion.span>
          </Link>
        </div>

        {LEFT_TRAVELERS.map((traveler, index) =>
          renderDesktopTraveler(traveler, index, leftOrder, LEFT_SPOTS_DESKTOP, "left")
        )}
        {RIGHT_TRAVELERS.map((traveler, index) =>
          renderDesktopTraveler(traveler, index, rightOrder, RIGHT_SPOTS_DESKTOP, "right")
        )}
        </div>
      </div>
    </section>
  );
}
