"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Car, MapPinned, MessageCircle, Mountain, PlaneLanding, Ship, TrainFront } from "lucide-react";
import { CTAS } from "@/lib/siteConfig";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const GROUND = [
  { icon: PlaneLanding, title: "Airport Transfers", desc: "Reliable pickup and drop-off at all major airports." },
  { icon: MapPinned, title: "Tours & Excursions", desc: "Guided local tours tailored to your schedule and interests." },
  { icon: Car, title: "Chauffeur Services", desc: "Private drivers for business trips and family travel." },
  { icon: Ship, title: "Cruise & Cruise Booking", desc: "Ocean & river cruises with full cabin and excursion booking." },
  { icon: Mountain, title: "Inbound Pakistan Adventures", desc: "Northern areas, heritage sites, and adventure tours in Pakistan." },
  { icon: TrainFront, title: "Eurail Services", desc: "Eurail passes and seamless multi-country European rail travel." },
  { icon: Bot, title: "Chatbot Development", desc: "AI chatbots for travel queries, bookings, and lead generation." },
  { icon: MessageCircle, title: "WhatsApp Agent", desc: "Automated WhatsApp agents for quotes, follow-ups, and support." },
];

export default function GroundServicesSection() {
  return (
    <section className="w-full border-y border-forest/10 bg-cream-dark px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 text-center"
        >
          <p className="mb-2 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Specialized Services
          </p>
          <h2 className="font-serif-display text-3xl font-bold text-forest md:text-4xl">
            Ground, Cruise, Rail &amp; Digital Support
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {GROUND.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl bg-white p-6 shadow-sm sm:p-7"
              >
                <Icon size={26} className="mb-4 text-gold" />
                <h3 className="mb-2 font-sans-body text-sm font-bold text-forest sm:text-base">{item.title}</h3>
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
            {CTAS.freeConsultation}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
