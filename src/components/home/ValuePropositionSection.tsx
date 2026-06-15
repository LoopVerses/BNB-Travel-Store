"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileCheck, Map, PenLine } from "lucide-react";
import { CTAS, SITE } from "@/lib/siteConfig";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const PILLARS = [
  { icon: PenLine, title: "Visa Cover Letters", desc: "Professionally written for USA, UK, Schengen & Canada." },
  { icon: Map, title: "Travel Itineraries", desc: "Embassy-ready day-by-day plans tailored to your trip." },
  { icon: FileCheck, title: "Complete File Prep", desc: "Documentation checked, organized, and submission-ready." },
];

export default function ValuePropositionSection() {
  return (
    <section className="relative w-full overflow-hidden bg-forest px-6 py-20 md:px-12 md:py-28">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <p className="mb-4 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Your Unique Advantage
          </p>
          <h2 className="mx-auto max-w-4xl font-serif-display text-3xl font-bold leading-tight text-cream md:text-4xl lg:text-5xl">
            {SITE.tagline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans-body text-base leading-relaxed text-cream/65">
            High-quality documentation increases your chances of approval. We write letters, build itineraries, and prepare your entire visa file, so you travel with confidence.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="rounded-2xl border border-cream/10 bg-cream/5 p-7 backdrop-blur-sm"
              >
                <Icon size={26} className="mb-4 text-gold" strokeWidth={1.75} />
                <h3 className="mb-2 font-sans-body text-base font-bold text-cream">{item.title}</h3>
                <p className="font-sans-body text-sm leading-relaxed text-cream/60">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={LINKS.visaServices}
            className="group inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pl-6 pr-2.5 font-sans-body text-sm font-bold text-forest shadow-lg"
          >
            {CTAS.applyVisa}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest transition-transform group-hover:rotate-45">
              <ArrowUpRight size={15} className="text-white" strokeWidth={2.5} />
            </span>
          </Link>
          <Link
            href={LINKS.contact}
            className="rounded-pill border border-cream/30 px-6 py-3 font-sans-body text-sm font-semibold text-cream transition-colors hover:bg-cream/10 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
          >
            {CTAS.freeConsultation}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
