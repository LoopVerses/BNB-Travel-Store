"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Plane, Shield, Stamp } from "lucide-react";
import { CTAS } from "@/lib/siteConfig";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const VISA_SERVICES = [
  { icon: Stamp, title: "USA, UK, Schengen & Canada", desc: "Expert visa assistance for top destinations worldwide." },
  { icon: FileText, title: "Visit Visa File Preparation", desc: "Complete documentation: cover letters, forms & checklists." },
  { icon: Plane, title: "Cover Letters & Itinerary", desc: "Embassy-ready travel plans written by our specialists." },
  { icon: Shield, title: "Travel Insurance", desc: "Comprehensive coverage as an add-on during your application." },
];

export default function VisaFocusSection() {
  return (
    <section id="visa-focus" className="w-full bg-white px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            • Visa Services, Our Main Focus
          </p>
          <h2 className="font-serif-display text-4xl font-bold text-forest md:text-5xl">
            Expert Visa Consultancy
            <br />
            <span className="text-gold">&amp; Documentation Support</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans-body text-base text-forest/60">
            High-quality documentation increases your chances of approval. We don&apos;t just advise. We prepare your complete file.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VISA_SERVICES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                className="rounded-2xl border border-forest/10 bg-cream/40 p-6"
              >
                <Icon size={28} className="mb-4 text-gold" strokeWidth={1.75} />
                <h3 className="mb-2 font-sans-body text-sm font-bold text-forest">{item.title}</h3>
                <p className="font-sans-body text-xs leading-relaxed text-forest/55">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            href={LINKS.visaServices}
            className="group inline-flex items-center gap-3 rounded-full bg-forest py-2.5 pl-6 pr-2.5 font-sans-body text-sm font-bold text-cream"
          >
            {CTAS.applyVisa}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold transition-transform group-hover:rotate-45">
              <ArrowUpRight size={15} className="text-forest" strokeWidth={2.5} />
            </span>
          </Link>
          <Link
            href={LINKS.evisas}
            className="rounded-pill border-2 border-gold px-6 py-3 font-sans-body text-sm font-bold text-gold transition-colors hover:bg-gold/10"
          >
            Fast-Track eVisas →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
