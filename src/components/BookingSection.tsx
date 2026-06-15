"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Building2,
  Calendar,
  ChevronDown,
  Plane,
  Search,
} from "lucide-react";
import { springBounce } from "@/lib/animations";
import { LINKS } from "@/lib/links";

type BookingTab = "flights" | "hotels";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block font-sans-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
      {children}
    </label>
  );
}

function StyledInput({
  placeholder,
  type = "text",
  icon: Icon,
}: {
  placeholder: string;
  type?: string;
  icon?: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}) {
  return (
    <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.995 }} className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-forest/10 bg-cream/60 px-4 py-3.5 font-sans-body text-sm text-forest placeholder:text-forest/35 outline-none transition-shadow duration-300 focus:border-gold/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
      />
      {Icon && (
        <Icon
          size={18}
          strokeWidth={1.75}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-forest/40"
        />
      )}
    </motion.div>
  );
}

function TravelersSelect() {
  return (
    <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.995 }} className="relative">
      <select
        defaultValue="1"
        className="w-full appearance-none rounded-xl border border-forest/10 bg-cream/60 px-4 py-3.5 font-sans-body text-sm text-forest outline-none transition-shadow duration-300 focus:border-gold/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
      >
        <option value="1">1 Adult</option>
        <option value="2">2 Adults</option>
        <option value="3">3 Adults</option>
        <option value="4">4+ Adults</option>
      </select>
      <ChevronDown
        size={18}
        strokeWidth={1.75}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-forest/40"
      />
    </motion.div>
  );
}

export default function BookingSection() {
  const [activeTab, setActiveTab] = useState<BookingTab>("flights");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const tabs: { id: BookingTab; label: string; icon: typeof Plane }[] = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "hotels", label: "Hotels", icon: Building2 },
  ];

  return (
    <section
      ref={sectionRef}
      id="booking"
      aria-label="Booking"
      className="w-full bg-cream-dark px-6 py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={springBounce}
          whileHover={{ y: -2 }}
          className="overflow-hidden rounded-[1.75rem] border border-forest/8 bg-white shadow-[0_24px_60px_rgba(26,58,42,0.12)]"
        >
          <div className="relative grid grid-cols-2 border-b border-forest/8 bg-cream/40">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-2.5 px-6 py-5 font-sans-body text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? "text-forest" : "text-forest/45 hover:text-forest/70"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="booking-tab-bg"
                      className="absolute inset-0 bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="booking-tab-accent"
                      className="absolute inset-x-0 top-0 h-1 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={16} strokeWidth={2} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "flights" ? (
                <motion.div
                  key="flights"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <FieldLabel>From / Origin</FieldLabel>
                      <StyledInput placeholder="City or Airport" />
                    </div>
                    <div>
                      <FieldLabel>To / Destination</FieldLabel>
                      <StyledInput placeholder="City or Airport" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr_auto]">
                    <div>
                      <FieldLabel>Date</FieldLabel>
                      <StyledInput type="date" placeholder="" icon={Calendar} />
                    </div>
                    <div>
                      <FieldLabel>Travelers</FieldLabel>
                      <TravelersSelect />
                    </div>
                    <div className="flex items-end">
                      <Link href={LINKS.flightsHotels}>
                        <motion.span
                          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-pill bg-forest px-8 py-3.5 font-sans-body text-sm font-bold uppercase tracking-[0.1em] text-cream focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none md:w-auto md:min-w-[220px]"
                          whileHover={{
                            scale: 1.04,
                            boxShadow: "0 12px 32px rgba(26, 58, 42, 0.28)",
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Search size={17} strokeWidth={2.5} />
                          Search Best Rates
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hotels"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <FieldLabel>Destination</FieldLabel>
                      <StyledInput placeholder="City, Hotel or Region" />
                    </div>
                    <div>
                      <FieldLabel>Guests</FieldLabel>
                      <TravelersSelect />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr_auto]">
                    <div>
                      <FieldLabel>Check In</FieldLabel>
                      <StyledInput type="date" placeholder="" icon={Calendar} />
                    </div>
                    <div>
                      <FieldLabel>Check Out</FieldLabel>
                      <StyledInput type="date" placeholder="" icon={Calendar} />
                    </div>
                    <div className="flex items-end">
                      <Link href={LINKS.contact}>
                        <motion.span
                          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-pill bg-gold px-8 py-3.5 font-sans-body text-sm font-bold uppercase tracking-[0.1em] text-white focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none md:w-auto md:min-w-[220px]"
                          whileHover={{
                            scale: 1.04,
                            boxShadow: "0 12px 32px rgba(201, 168, 76, 0.35)",
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Search size={17} strokeWidth={2.5} />
                          Search Hotels
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
