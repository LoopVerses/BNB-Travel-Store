"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LINKS } from "@/lib/links";
import { useMotionPrefs } from "@/lib/motionPrefs";

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

const LEFT_SPOTS_MOBILE = [
  { left: "-4%", top: "4%", rot: -4, z: 30 },
  { left: "-6%", top: "58%", rot: 5, z: 20 },
  { left: "8%", top: "28%", rot: -3, z: 10 },
];

const RIGHT_SPOTS_MOBILE = [
  { right: "-4%", top: "4%", rot: 4, z: 30 },
  { right: "-6%", top: "58%", rot: -3, z: 20 },
  { right: "8%", top: "28%", rot: 3, z: 10 },
];

export default function AdventureSection() {
  const [leftOrder, setLeftOrder] = useState([0, 1, 2]);
  const [rightOrder, setRightOrder] = useState([0, 1, 2]);
  const [isMobile, setIsMobile] = useState(false);
  const { reduced, spring } = useMotionPrefs();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setLeftOrder((prev) => [prev[2], prev[0], prev[1]]);
      setRightOrder((prev) => [prev[2], prev[0], prev[1]]);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [reduced]);

  const scaleFactor = isMobile ? 0.68 : 1;
  const leftSpots = isMobile ? LEFT_SPOTS_MOBILE : LEFT_SPOTS_DESKTOP;
  const rightSpots = isMobile ? RIGHT_SPOTS_MOBILE : RIGHT_SPOTS_DESKTOP;

  const renderTraveler = (
    traveler: (typeof LEFT_TRAVELERS)[number],
    index: number,
    order: number[],
    spots: typeof LEFT_SPOTS_DESKTOP | typeof RIGHT_SPOTS_MOBILE,
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
          width: CARD_WIDTH * scaleFactor,
          height: CARD_HEIGHT * scaleFactor,
          rotate: spot.rot,
        }}
        transition={spring({ type: "spring", stiffness: 90, damping: 15 })}
        className="absolute flex cursor-pointer select-none flex-col overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] focus-within:ring-2 focus-within:ring-gold md:p-2"
      >
        <div className="relative mb-1 h-[72px] w-full shrink-0 overflow-hidden rounded-md bg-gray-100 md:h-[78px]">
          <Image
            src={traveler.image}
            alt={traveler.name}
            fill
            sizes="120px"
            className="object-cover"
            draggable={false}
          />
        </div>
        <div className="shrink-0 px-0.5 pb-0.5">
          <p className="truncate text-[10px] font-bold text-[#0A3321] md:text-[11px]">{traveler.name}</p>
          <div className="mt-0.5 flex items-center gap-1 text-gray-400">
            <MapPin size={8} className="shrink-0 text-gray-300" />
            <p className="truncate text-[9px] md:text-[10px]">{traveler.location}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="adventure" className="relative w-full overflow-visible bg-[#FAF8F5] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
      <div className="relative mx-auto flex h-[300px] w-[320px] flex-col items-center justify-center overflow-visible rounded-[2rem] bg-[#0A3321] px-4 shadow-xl sm:h-[340px] sm:w-full sm:max-w-[1100px] sm:rounded-[2.5rem] sm:px-6">
        <div className="z-30 flex flex-col items-center gap-4 text-center pointer-events-none sm:gap-5">
          <h2 className="max-w-md font-serif text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[3rem]">
            Adventure Awaits <br /> Are You Ready?
          </h2>

          <Link href={LINKS.contact}>
            <motion.span
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={reduced ? undefined : { scale: 0.95 }}
              className="pointer-events-auto flex cursor-pointer items-center gap-3.5 rounded-full bg-[#F2B938] py-2 pl-5 pr-2 shadow-md transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <span className="font-sans text-xs font-bold text-[#1E3A2B] lg:text-sm">Join Now</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B]">
                <ArrowUpRight size={14} className="text-white" strokeWidth={3} />
              </div>
            </motion.span>
          </Link>
        </div>

        {LEFT_TRAVELERS.map((traveler, index) =>
          renderTraveler(traveler, index, leftOrder, leftSpots, "left")
        )}
        {RIGHT_TRAVELERS.map((traveler, index) =>
          renderTraveler(traveler, index, rightOrder, rightSpots, "right")
        )}
      </div>
    </section>
  );
}
