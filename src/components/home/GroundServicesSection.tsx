"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, MapPinned, PlaneLanding } from "lucide-react";
import { CTAS } from "@/lib/siteConfig";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const GROUND = [
  { icon: PlaneLanding, title: "Airport Transfers", desc: "Reliable pickup and drop-off at all major airports." },
  { icon: MapPinned, title: "Tours & Excursions", desc: "Guided local tours tailored to your schedule and interests." },
  { icon: Car, title: "Chauffeur Services", desc: "Private drivers for business trips and family travel." },
];

export default function GroundServicesSection() {
  return (
    <section className="w-full border-y border-forest/10 bg-cream-dark px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 text-center"
        >
          <p className="mb-2 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Ground Services
          </p>
          <h2 className="font-serif-display text-3xl font-bold text-forest md:text-4xl">
            Reliable Local &amp; International Support
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {GROUND.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <Icon size={26} className="mb-4 text-gold" />
                <h3 className="mb-2 font-sans-body font-bold text-forest">{item.title}</h3>
                <p className="font-sans-body text-sm text-forest/60">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href={LINKS.contact}
            className="inline-block rounded-pill bg-forest px-8 py-3 font-sans-body text-sm font-bold text-cream focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
          >
            {CTAS.whatsapp}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
