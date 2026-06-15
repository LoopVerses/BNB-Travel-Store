"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  viewportOnce,
  viewportOnceWide,
} from "@/lib/animations";

const HIGHLIGHTS = [
  "PROFILE ASSESSMENT",
  "STRATEGIC ITINERARIES",
  "EXPERT DOCUMENTATION",
  "PERSONAL SUPPORT",
] as const;

export default function FoundersVisionSection() {
  return (
    <section className="bg-cream px-8 py-20 md:px-14 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromLeft}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(26,58,42,0.14)] ring-1 ring-forest/10">
            <img
              src="/images/about/founder.jpg"
              alt="Founder of B&B Travel Store"
              className="aspect-[4/5] w-full object-cover object-top grayscale-[20%] contrast-[1.05]"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl" aria-hidden />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromRight}
        >
          <p className="mb-4 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            • Our Story
          </p>
          <h2 className="mb-8 font-serif-display text-3xl font-bold uppercase leading-tight tracking-wide text-forest md:text-4xl">
            The Founder&apos;s Vision.
          </h2>

          <p className="mb-10 font-sans-body text-base leading-relaxed text-forest/70 md:text-lg">
            I built{" "}
            <strong className="font-semibold text-forest">B&amp;B Travel Store</strong> to solve
            one major problem:{" "}
            <strong className="font-semibold text-forest">Rejections.</strong> Most agents just
            book a ticket. We build a professional case for you. My team and I specialize in
            high-approval documentation, making sure every file we submit is visa-ready and
            bulletproof.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceWide}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5"
          >
            {HIGHLIGHTS.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Check size={14} className="text-gold" strokeWidth={2.5} />
                </span>
                <span className="font-sans-body text-xs font-bold uppercase tracking-[0.12em] text-forest md:text-[13px]">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
