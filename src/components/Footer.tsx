"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMotionPrefs } from "@/lib/motionPrefs";

const FOOTER_POLAROIDS = [
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", rot: -5, y: 18, z: 10 },
  { url: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400", rot: 3, y: 10, z: 12 },
  { url: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=400", rot: -3, y: 4, z: 14 },
  { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400", rot: 0, y: -12, z: 20 },
  { url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=400", rot: 3, y: 4, z: 14 },
  { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=400", rot: -2, y: 10, z: 12 },
  { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=400", rot: 5, y: 18, z: 10 },
];

const FOOTER_POLAROIDS_MOBILE = FOOTER_POLAROIDS.map((card) => ({
  url: card.url,
  rot: card.rot,
  y: card.y,
}));

function MobileFooterMarquee({ reduced }: { reduced: boolean }) {
  const track = [...FOOTER_POLAROIDS_MOBILE, ...FOOTER_POLAROIDS_MOBILE];

  return (
    <div className="relative z-10 h-[200px] w-full overflow-hidden md:hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FAF8F5] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FAF8F5] to-transparent" />

      <motion.div
        className="flex w-max items-end gap-4 px-4 pb-2 pt-6"
        animate={reduced ? { x: 0 } : { x: ["0%", "-50%"] }}
        transition={
          reduced
            ? { duration: 0 }
            : { x: { repeat: Infinity, duration: 28, ease: "linear" } }
        }
      >
        {track.map((card, index) => (
          <motion.div
            key={`${card.url}-${index}`}
            className="relative shrink-0"
            style={{ zIndex: 10 + (index % 7) }}
            animate={reduced ? { y: 0 } : { y: [card.y * 0.4, card.y * 0.4 - 8, card.y * 0.4] }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    y: {
                      duration: 3.5 + (index % 4) * 0.3,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: (index % 7) * 0.25,
                    },
                  }
            }
          >
            <div
              className="relative h-[130px] w-[86px] overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] sm:h-[140px] sm:w-[92px]"
              style={{ transform: `rotate(${card.rot}deg)` }}
            >
              <Image
                src={card.url}
                alt={`Destination ${(index % FOOTER_POLAROIDS_MOBILE.length) + 1}`}
                fill
                sizes="92px"
                className="object-cover"
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const EXPLORE_LINKS = [
  { label: "Visa Services", href: "/visa-services" },
  { label: "eVisas", href: "/evisas" },
  { label: "Holiday Packages", href: "/holidays" },
  { label: "Umrah Packages", href: "/umrah" },
  { label: "Flights & Hotels", href: "/flights-hotels" },
  { label: "Cruise Booking", href: "/contact" },
  { label: "Pakistan Adventure Tours", href: "/holidays" },
  { label: "Eurail Services", href: "/contact" },
  { label: "Chatbot & WhatsApp Agent", href: "/contact" },
];

export default function Footer() {
  const { reduced, t, spring, variants } = useMotionPrefs();

  const containerVariants = variants({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduced ? 0 : 0.12 },
    },
  });

  const columnVariants = variants({
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: spring({ type: "spring", stiffness: 85, damping: 16, mass: 0.9 }),
    },
  });

  return (
    <footer id="footer" aria-label="Footer" className="w-full bg-[#FAF8F5]">
      {/* Mobile: continuous sliding polaroids */}
      <MobileFooterMarquee reduced={reduced} />

      {/* Desktop: full polaroid strip */}
      <div className="relative z-10 hidden h-[340px] w-full items-end justify-center overflow-hidden pb-0 -space-x-7 md:flex lg:-space-x-8">
        {FOOTER_POLAROIDS.map((card, index) => (
          <div
            key={index}
            className="relative shrink-0"
            style={{ transform: `translateY(${card.y}px)`, zIndex: card.z }}
          >
            <motion.div
              initial={{ y: reduced ? 0 : 100, opacity: reduced ? 1 : 0 }}
              animate={reduced ? { y: 0, opacity: 1 } : { y: [0, -8, 0], opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: index * 0.35,
                      },
                      opacity: { duration: 0.5, delay: index * 0.1 },
                    }
              }
            >
              <motion.div
                initial={{ rotate: card.rot }}
                whileHover={reduced ? undefined : { scale: 1.08, rotate: 0, y: -20 }}
                transition={t({ duration: 0.25 })}
                className="relative h-[275px] w-[182px] cursor-pointer overflow-hidden rounded-3xl border-[3px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] focus-within:ring-2 focus-within:ring-gold lg:h-[315px] lg:w-[215px]"
              >
                <Image
                  src={card.url}
                  alt={`Destination ${index + 1}`}
                  fill
                  sizes="215px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="relative z-20 -mt-6 rounded-t-[2.5rem] bg-[#0A3321] px-4 pb-3 pt-10 sm:-mt-12 sm:rounded-t-[3.5rem] sm:px-6 sm:pt-16 md:px-12 md:pt-20 lg:pt-24">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-3">
            <motion.div variants={columnVariants}>
              <h2 className="mb-6 font-sans text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
                Ready to start your journey?
              </h2>
              <p className="mb-8 max-w-[340px] font-sans text-sm leading-relaxed text-white/60 sm:text-[15px]">
                Have questions or need help planning your next adventure? Our travel experts are here for you!
              </p>
              <motion.a
                href="/contact"
                whileHover={reduced ? undefined : { scale: 1.05 }}
                whileTap={reduced ? undefined : { scale: 0.95 }}
                className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#F2B938] py-2.5 pl-6 pr-2.5 font-sans text-sm font-bold text-[#1E3A2B] shadow-md focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              >
                Get In Touch
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B]">
                  <ArrowUpRight size={14} className="text-white" strokeWidth={3} />
                </div>
              </motion.a>
            </motion.div>

            <motion.div variants={columnVariants} className="lg:pl-16">
              <h3 className="mb-6 font-sans text-lg font-bold text-white">Explore</h3>
              <ul className="flex flex-col gap-3.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block cursor-pointer font-sans text-sm text-white/70 transition-colors hover:text-[#F2B938] focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={columnVariants}>
              <Link href="/about" className="mb-6 inline-block rounded focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none">
                <Image
                  src="/images/logo/logo.png"
                  alt="B&B Travel Store"
                  width={160}
                  height={64}
                  className="h-12 w-auto object-contain sm:h-14 md:h-16"
                />
              </Link>
              <p className="mb-6 font-sans text-sm leading-relaxed text-white/60 sm:text-[15px]">
                Travel isn&apos;t just what we do it&apos;s who we are. Founded by passionate explorers.
              </p>
              <Link
                href="/about"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded font-sans text-sm font-bold text-[#F2B938] transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              >
                Learn More <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 pb-3 sm:mt-12">
            <p className="text-center font-sans text-xs tracking-wider text-white/40">
              @BNB Travel Store. All Rights Reserved.
            </p>
            <p className="mt-2 pb-1 text-center font-sans text-[11px] text-white/35">
              Powered by{" "}
              <a
                href="http://loopverses.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#F2B938]/80 transition-colors hover:text-[#F2B938] focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none rounded"
              >
                Loopverses
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
