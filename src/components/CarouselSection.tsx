"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";
import { LINKS } from "@/lib/links";
import { useMotionPrefs } from "@/lib/motionPrefs";

const PANELS_DATA = [
  {
    id: 1,
    num: "01",
    location: "Santorini",
    country: "Greece",
    desc: "Experience spectacular sunsets over blue-domed churches and the Aegean Sea.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    num: "02",
    location: "Amalfi Coast",
    country: "Italy",
    desc: "Explore colorful cliffside villages, lush lemon gardens, and dramatic coastal cliffs.",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    num: "03",
    location: "Bali Island",
    country: "Indonesia",
    desc: "Immerse yourself in volcanic mountains, iconic rice paddies, and mystical temples.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    num: "04",
    location: "Zermatt",
    country: "Switzerland",
    desc: "Discover pristine alpine glaciers, world-class skiing, and the iconic Matterhorn peak.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    num: "05",
    location: "Barcelona",
    country: "Spain",
    desc: "Indulge in Gaudí's breathtaking architecture, sun-drenched beaches, and tapas culture.",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600&auto=format&fit=crop",
  },
];

function MobilePanel({ panel }: { panel: (typeof PANELS_DATA)[number] }) {
  return (
    <article className="relative h-[380px] w-[min(85vw,300px)] shrink-0 snap-center overflow-hidden rounded-[2rem] cursor-pointer">
      <Image
        src={panel.image}
        alt={panel.location}
        fill
        sizes="320px"
        className="object-cover brightness-[0.75]"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-center justify-between text-white">
          <span className="font-sans text-lg font-bold">{panel.num}</span>
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            <MapPin size={12} className="text-[#E74C3C]" />
            {panel.country}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl">
          <h3 className="mb-2 font-serif text-2xl font-black tracking-tight">{panel.location}</h3>
          <p className="font-sans text-sm leading-relaxed text-white/80">{panel.desc}</p>
        </div>
      </div>
    </article>
  );
}

export default function CarouselSection() {
  const [activeIdx, setActiveIdx] = useState(2);
  const { reduced, t, spring } = useMotionPrefs();

  return (
    <section id="carousel" className="w-full overflow-hidden bg-[#FAF8F5] px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 text-center sm:mb-16 md:mb-20"
        >
          <p className="mb-4 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            • Destinations
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#1E3A2B] sm:text-4xl md:text-5xl lg:text-6xl">
            Explore the World&apos;s Finest Escapes
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        >
          {PANELS_DATA.map((panel) => (
            <motion.div key={panel.id} variants={fadeUp}>
              <MobilePanel panel={panel} />
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: accordion */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="hidden h-[550px] w-full gap-4 md:gap-6 lg:flex lg:flex-row"
        >
          {PANELS_DATA.map((panel, index) => {
            const isActive = activeIdx === index;

            return (
              <motion.div
                key={panel.id}
                variants={fadeUp}
                layout={!reduced}
                onClick={() => setActiveIdx(index)}
                onMouseEnter={() => setActiveIdx(index)}
                transition={spring({ type: "spring", stiffness: 100, damping: 18 })}
                className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] transition-all duration-300 ${
                  isActive ? "flex-[3.5]" : "flex-1"
                }`}
              >
                <div className="absolute inset-0 h-full w-full">
                  <motion.div
                    animate={{ scale: isActive && !reduced ? 1.05 : 1 }}
                    transition={t({ duration: 0.8 })}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={panel.image}
                      alt={panel.location}
                      fill
                      sizes="(max-width:1280px) 50vw, 25vw"
                      className="object-cover brightness-[0.75] transition-all duration-500 group-hover:brightness-[0.65]"
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={t({ duration: 0.2 })}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 py-10 text-white lg:flex-col"
                    >
                      <span className="font-sans text-lg font-bold text-white/50 md:text-xl">{panel.num}</span>
                      <span className="origin-center whitespace-nowrap font-serif text-lg font-bold tracking-wide md:text-2xl lg:-rotate-90">
                        {panel.location}
                      </span>
                      <span className="hidden h-2 w-2 rounded-full bg-white/40 lg:block" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={t({ delay: reduced ? 0 : 0.2, duration: 0.4 })}
                      className="absolute inset-0 z-20 flex flex-col justify-between p-6 lg:p-10"
                    >
                      <div className="flex items-center justify-between text-white">
                        <span className="font-sans text-lg font-bold">{panel.num}</span>
                        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                          <MapPin size={12} className="text-[#E74C3C]" />
                          {panel.country}
                        </div>
                      </div>

                      <motion.div
                        initial={{ y: reduced ? 0 : 50, opacity: reduced ? 1 : 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={spring({ type: "spring", stiffness: 120, damping: 16 })}
                        className="flex w-full max-w-lg flex-col gap-4 self-start rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl lg:p-8"
                      >
                        <div>
                          <h3 className="mb-2 font-serif text-3xl font-black tracking-tight lg:text-4xl">
                            {panel.location}
                          </h3>
                          <p className="font-sans text-sm leading-relaxed text-white/80">{panel.desc}</p>
                        </div>

                        <Link href={LINKS.holidays}>
                          <motion.span
                            whileHover={reduced ? undefined : { scale: 1.05 }}
                            whileTap={reduced ? undefined : { scale: 0.95 }}
                            className="mt-2 flex cursor-pointer items-center gap-4 self-start rounded-full bg-[#F2B938] py-2 pl-5 pr-2.5 shadow-md transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                          >
                            <span className="font-sans text-xs font-bold text-[#1E3A2B] lg:text-sm">
                              Explore Destination
                            </span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A2B]">
                              <ArrowUpRight size={16} className="text-white" strokeWidth={2.5} />
                            </div>
                          </motion.span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
