"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Heart, Hotel, Map, Plane, Users } from "lucide-react";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const SERVICES = [
  { icon: Plane, title: "International & Domestic Air Ticketing", href: "/flights-hotels" },
  { icon: Hotel, title: "Hotel Reservations Worldwide", href: "/flights-hotels" },
  { icon: Map, title: "Customized Holiday Packages (Europe, UAE, Asia)", href: "/holidays" },
  { icon: Heart, title: "Honeymoon & Family Trips", href: "/holidays" },
  { icon: GraduationCap, title: "Educational & Group Tours", href: "/holidays" },
  { icon: Users, title: "Professional Visa Consultation", href: "/visa-services" },
];

export default function TravelServicesSection() {
  return (
    <section className="w-full bg-cream px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            We Offer
          </p>
          <h2 className="font-serif-display text-4xl font-bold text-forest md:text-5xl">
            Hassle-Free Travel Planning Worldwide
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans-body text-base text-forest/60">
            We design trips based on your budget, preferences, and visa requirements.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-4 rounded-2xl border border-forest/10 bg-white p-6 transition-all hover:border-gold/40 hover:shadow-lg"
                >
                  <Icon size={24} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.75} />
                  <div className="flex-1">
                    <p className="font-sans-body text-sm font-semibold text-forest group-hover:text-gold">
                      {item.title}
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="shrink-0 text-forest/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
