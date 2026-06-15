"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import { LINKS } from "@/lib/links";
import { useMotionPrefs } from "@/lib/motionPrefs";

export default function MissionSection() {
  const { reduced, t, spring, variants } = useMotionPrefs();

  const containerVariants = variants({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduced ? 0 : 0.15, delayChildren: reduced ? 0 : 0.1 },
    },
  });

  const slideUpVariant = variants({
    hidden: { y: reduced ? 0 : 60, opacity: reduced ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: spring({ type: "spring", stiffness: 80, damping: 20 }),
    },
  });

  const slideRightVariant = variants({
    hidden: { x: reduced ? 0 : -40, opacity: reduced ? 1 : 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: spring({ type: "spring", stiffness: 80, damping: 20 }),
    },
  });

  const imageZoomVariant = variants({
    hidden: { scale: reduced ? 1 : 1.1, opacity: reduced ? 1 : 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: t({ duration: 1, ease: [0.25, 0.1, 0.25, 1] }),
    },
  });

  return (
    <section id="mission" className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-20">
      <motion.div
        className="mx-auto max-w-[1400px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 lg:mb-20 lg:grid-cols-12 lg:gap-8">
          <motion.div variants={slideRightVariant} className="lg:col-span-3 lg:pt-3">
            <h4 className="flex items-center gap-3 font-sans text-base font-medium text-[#1E3A2B] sm:text-[1.1rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A2B]" />
              Our Mission
            </h4>
          </motion.div>

          <motion.div variants={slideUpVariant} className="lg:col-span-9">
            <h2 className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[#1E3A2B] sm:text-4xl md:text-5xl lg:text-[4.5rem]">
              The Passion Behind Every Destination
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-12">
          <motion.div variants={slideUpVariant} className="w-full">
            <motion.div
              className="h-[280px] w-full overflow-hidden rounded-[1.5rem] shadow-lg sm:h-[360px] lg:h-[550px] lg:rounded-[2rem]"
              whileHover={reduced ? undefined : { y: -10 }}
              transition={t({ duration: 0.4 })}
            >
              <motion.div variants={imageZoomVariant} className="relative h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop"
                  alt="Maldives Water Villas"
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="flex h-full flex-col justify-between gap-8">
            <motion.div variants={slideUpVariant}>
              <p className="mb-6 font-sans text-base leading-relaxed text-[#4A5D53] sm:text-[1.05rem]">
                Travel isn&apos;t just what we do it&apos;s who we are. Founded by passionate explorers,
                we help people experience the world in meaningful ways.
              </p>

              <div className="flex justify-start lg:justify-end lg:pr-4">
                <Link href={LINKS.holidays}>
                  <motion.span
                    whileHover={reduced ? undefined : { scale: 1.05 }}
                    whileTap={reduced ? undefined : { scale: 0.95 }}
                    className="group flex cursor-pointer items-center gap-4 rounded-full bg-[#F2B938] py-2 pl-6 pr-2 shadow-md transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    <span className="font-sans text-[15px] font-bold text-[#1E3A2B]">Discovery Now</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A2B] transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={18} className="text-white" strokeWidth={2.5} />
                    </div>
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={slideUpVariant}
              whileHover={reduced ? undefined : { scale: 1.02, y: -5 }}
              className="flex h-[220px] w-full flex-col justify-between rounded-[2rem] bg-[#E74C3C] p-6 text-white transition-shadow sm:h-[260px] sm:rounded-[2.5rem] sm:p-8 lg:mt-auto"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10">
                <Compass size={24} className="text-white/80" />
              </div>
              <div>
                <h3 className="mb-2 font-sans text-6xl font-bold leading-none tracking-tight sm:text-[5rem]">
                  99%
                </h3>
                <p className="text-sm font-medium tracking-wide text-white/90">Travel With Confidence</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={slideUpVariant} className="flex h-full items-end lg:mt-0">
            <motion.div
              whileHover={reduced ? undefined : { y: -10 }}
              className="group w-full rounded-[2rem] border border-gray-100 bg-white p-4 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] sm:rounded-[2.5rem]"
            >
              <div className="relative mb-6 h-[220px] w-full overflow-hidden rounded-[1.5rem] sm:h-[260px] sm:rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=800&auto=format&fit=crop"
                  alt="Overhead Beach Surfing"
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F2B938] shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={20} className="text-[#1E3A2B]" strokeWidth={2.5} />
                </div>
              </div>

              <div className="px-2 sm:px-3">
                <h4 className="mb-2 font-sans text-xl font-bold tracking-tight text-[#1E3A2B] sm:text-2xl">
                  Expertly Curated Itineraries
                </h4>
                <p className="font-sans text-sm leading-relaxed text-gray-500 sm:text-[15px]">
                  Destinations &amp; Experiences Tailored To Your Travel
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
