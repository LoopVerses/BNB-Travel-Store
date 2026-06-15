"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
  Heart,
  Hotel,
  Map,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile, useIsLg } from "@/lib/useMediaQuery";

type PopupPlacement = "top" | "bottom" | "left" | "right" | "bottom-left" | "bottom-right";

type ServiceItem = {
  id: number;
  icon: LucideIcon;
  title: string;
  href: string;
  desc: string;
  color: string;
  angle: number;
  popup: PopupPlacement;
};

const SERVICES: ServiceItem[] = [
  { id: 0, icon: Plane, title: "Air Ticketing", href: "/flights-hotels", desc: "Domestic & international flight bookings with premium seat selection.", color: "#3498DB", angle: 330, popup: "right" },
  { id: 1, icon: Hotel, title: "Hotel Reservations", href: "/flights-hotels", desc: "Luxury stays and curated resort bookings worldwide at special rates.", color: "#E74C3C", angle: 30, popup: "bottom-right" },
  { id: 2, icon: Map, title: "Holiday Packages", href: "/holidays", desc: "Bespoke day-by-day itineraries tailored to Europe, UAE & Asia.", color: "#C9A84C", angle: 90, popup: "bottom" },
  { id: 3, icon: Heart, title: "Honeymoon Trips", href: "/holidays", desc: "Romantic escapes, private dinners, and luxurious beachfront villas.", color: "#9B59B6", angle: 150, popup: "bottom-left" },
  { id: 4, icon: GraduationCap, title: "Group Tours", href: "/holidays", desc: "Custom educational excursions and seamless corporate team trips.", color: "#1ABC9C", angle: 210, popup: "left" },
  { id: 5, icon: Users, title: "Visa Consultation", href: "/visa-services", desc: "Embassy-ready documentation support and complete file prep.", color: "#E67E22", angle: 270, popup: "top" },
];

const FOREST = "#0A3321";
const GOLD = "#C9A84C";

function getCircularPosition(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}


function getPopupPlacementClass(placement: PopupPlacement) {
  switch (placement) {
    case "top":
      return "bottom-full left-1/2 mb-[18px] -translate-x-1/2";
    case "bottom":
      return "left-1/2 top-full mt-[18px] -translate-x-1/2";
    case "left":
      return "right-full top-1/2 mr-[18px] -translate-y-1/2";
    case "right":
      return "left-full top-1/2 ml-[18px] -translate-y-1/2";
    case "bottom-left":
      return "top-full right-1/2 mt-[18px] origin-top-right";
    case "bottom-right":
      return "top-full left-1/2 mt-[18px] -translate-x-[6%] origin-top-left";
    default:
      return "left-1/2 top-full mt-[18px] -translate-x-1/2";
  }
}

function getPopupMotionOrigin(placement: PopupPlacement) {
  switch (placement) {
    case "top":
      return { scale: 0.88, y: 10 };
    case "bottom":
    case "bottom-right":
      return { scale: 0.88, y: -10 };
    case "bottom-left":
      return { scale: 0.88, x: 14, y: -10 };
    case "left":
      return { scale: 0.88, x: 12 };
    case "right":
      return { scale: 0.88, x: -12 };
    default:
      return { scale: 0.88 };
  }
}

function ServiceNode({
  item,
  index,
  isMobile,
  isActive,
  onHoverStart,
  onHoverEnd,
}: {
  item: ServiceItem;
  index: number;
  isMobile: boolean;
  isActive: boolean;
  onHoverStart: (idx: number) => void;
  onHoverEnd: () => void;
}) {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);
  const active = isHovered || isActive;

  const radius = isMobile ? 130 : 235;
  const pos = getCircularPosition(item.angle, radius);
  const popupClass = getPopupPlacementClass(item.popup);
  const motionFrom = getPopupMotionOrigin(item.popup);

  return (
    <motion.div
      style={{ x: pos.x, y: pos.y }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart(index);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
      animate={{ scale: active ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`absolute flex items-center justify-center select-none ${active ? "z-[60]" : "z-20"}`}
    >
      <div className="relative">
      <div
        className={`flex items-center gap-3 rounded-full border bg-white/95 px-5 py-3 shadow-[0_8px_30px_rgba(10,51,33,0.08)] backdrop-blur-sm transition-all duration-300 ${
          active
            ? "border-[#C9A84C]/50 shadow-[0_12px_40px_rgba(201,168,76,0.22)]"
            : "border-[#0A3321]/8 hover:border-[#C9A84C]/35"
        }`}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300"
          style={{
            backgroundColor: active ? item.color : "rgba(10,51,33,0.06)",
            color: active ? "white" : FOREST,
          }}
        >
          <Icon size={17} strokeWidth={2} />
        </div>
        <span className="whitespace-nowrap font-sans text-xs font-bold text-[#0A3321] lg:text-sm">{item.title}</span>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, ...motionFrom }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...motionFrom }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={`pointer-events-auto absolute z-[70] w-[220px] sm:w-[240px] lg:w-[270px] ${popupClass}`}
          >
            <div className="rounded-[1.75rem] border border-white/50 bg-white/90 p-5 shadow-[0_24px_60px_rgba(10,51,33,0.14)] backdrop-blur-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A3321]/35">Service</span>
              <h3 className="mt-1 font-sans text-base font-bold tracking-tight" style={{ color: item.color }}>
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#0A3321]/70">{item.desc}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-[11px] font-bold text-white shadow-md transition-shadow hover:shadow-lg"
                style={{ backgroundColor: item.color }}
              >
                Explore <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PremiumCompass({ size = "lg" }: { size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-[480px] w-[480px]" : "h-[380px] w-[380px]";
  const emblem = size === "lg" ? "h-[4.5rem] w-[4.5rem]" : "h-[3.75rem] w-[3.75rem]";
  const emblemText = size === "lg" ? "text-2xl" : "text-xl";

  return (
    <div className={`pointer-events-none absolute z-0 flex items-center justify-center ${dim}`}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_68%)]" />

      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        viewBox="0 0 100 100"
        className="absolute h-full w-full"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke={GOLD} strokeWidth="0.2" opacity="0.35" />
        <circle cx="50" cy="50" r="44" stroke={FOREST} strokeWidth="0.12" opacity="0.12" strokeDasharray="0.8 2.2" />
        <circle cx="50" cy="50" r="38" stroke={GOLD} strokeWidth="0.18" opacity="0.25" />
        <circle cx="50" cy="50" r="32" stroke={FOREST} strokeWidth="0.1" opacity="0.1" />
        <line x1="50" y1="4" x2="50" y2="96" stroke={FOREST} strokeWidth="0.1" opacity="0.12" />
        <line x1="4" y1="50" x2="96" y2="50" stroke={FOREST} strokeWidth="0.1" opacity="0.12" />
        <line x1="15" y1="15" x2="85" y2="85" stroke={FOREST} strokeWidth="0.08" opacity="0.08" />
        <line x1="15" y1="85" x2="85" y2="15" stroke={FOREST} strokeWidth="0.08" opacity="0.08" />
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 5 * Math.PI) / 180;
          const inner = i % 6 === 0 ? 41 : 43.5;
          const outer = 46;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * inner}
              y1={50 + Math.sin(a) * inner}
              x2={50 + Math.cos(a) * outer}
              y2={50 + Math.sin(a) * outer}
              stroke={i % 6 === 0 ? GOLD : FOREST}
              strokeWidth={i % 6 === 0 ? "0.22" : "0.1"}
              opacity={i % 6 === 0 ? 0.45 : 0.15}
            />
          );
        })}
        <text x="50" y="9" textAnchor="middle" className="fill-[#C9A84C] text-[2.8px] font-bold tracking-widest" opacity="0.7">N</text>
        <text x="50" y="95" textAnchor="middle" className="fill-[#0A3321] text-[2.5px] font-bold" opacity="0.35">S</text>
        <text x="93" y="51" textAnchor="middle" className="fill-[#0A3321] text-[2.5px] font-bold" opacity="0.35">E</text>
        <text x="7" y="51" textAnchor="middle" className="fill-[#0A3321] text-[2.5px] font-bold" opacity="0.35">W</text>
      </motion.svg>

      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 180, ease: "linear" }}
        viewBox="0 0 100 100"
        className="absolute h-[72%] w-[72%]"
        fill="none"
      >
        <circle cx="50" cy="50" r="28" stroke={GOLD} strokeWidth="0.15" opacity="0.3" strokeDasharray="1.5 3" />
        <path id="compass-curve" d="M 50,50 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0" />
        <text className="fill-[#0A3321] text-[1.6px] font-medium tracking-[0.28em]" opacity="0.28">
          <textPath href="#compass-curve">B&amp;B TRAVEL STORE · WORLDWIDE COORDINATES</textPath>
        </text>
      </motion.svg>

      <div className={`relative z-10 flex items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#FAF8F5] shadow-[inset_0_2px_12px_rgba(10,51,33,0.06),0_8px_24px_rgba(201,168,76,0.15)] ${emblem}`}>
        <div className="absolute inset-1.5 rounded-full border border-[#0A3321]/8" />
        <span className={`font-serif font-black tracking-tighter text-[#0A3321] ${emblemText}`}>B</span>
      </div>
    </div>
  );
}

export default function TravelServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const isLg = useIsLg();
  const showWheel = !isMobile && isLg;
  const activeColor = hoveredIdx !== null ? SERVICES[hoveredIdx].color : FOREST;

  return (
    <section className="relative w-full overflow-x-hidden overflow-y-visible bg-[#FAF8F5] px-4 py-16 sm:py-20 md:px-12 md:py-24 lg:px-20 lg:py-28">
      <motion.div
        animate={{
          background:
            hoveredIdx !== null
              ? `radial-gradient(ellipse 90% 70% at 50% 45%, ${activeColor}12 0%, rgba(250,248,245,0) 70%)`
              : `radial-gradient(ellipse 90% 70% at 50% 45%, rgba(201,168,76,0.04) 0%, rgba(250,248,245,0) 70%)`,
        }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-30 mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="pointer-events-none mb-12 text-center sm:mb-16 md:mb-20 lg:mb-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/8 px-4 py-1.5 sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">We Offer</span>
          </div>
          <h2 className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#0A3321] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Hassle-Free Travel Planning Worldwide
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans-body text-base text-[#0A3321]/60">
            We design trips based on your budget, preferences, and visa requirements.
          </p>
        </div>

        {showWheel ? (
          <div className="relative w-full overflow-visible px-2 py-6 sm:px-4 md:py-8">
            <div className="relative mx-auto flex h-[660px] w-full max-w-[900px] items-center justify-center overflow-visible lg:h-[740px]">
            <PremiumCompass size="lg" />

            {SERVICES.map((item, index) => (
              <ServiceNode
                key={item.id}
                item={item}
                index={index}
                isMobile={false}
                isActive={hoveredIdx === index}
                onHoverStart={setHoveredIdx}
                onHoverEnd={() => setHoveredIdx(null)}
              />
            ))}
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-full flex-col gap-4">
            {SERVICES.map((item) => {
              const Icon = item.icon;
              const isOpen = hoveredIdx === item.id;

              return (
                <div key={item.id} className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setHoveredIdx(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#0A3321]">{item.title}</span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-5 pb-5"
                      >
                        <p className="mb-4 text-xs leading-relaxed text-gray-500">{item.desc}</p>
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          Book Now <ArrowUpRight size={12} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
