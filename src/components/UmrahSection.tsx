"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { LINKS } from "@/lib/links";
import { sectionHeader, viewportOnce } from "@/lib/animations";

const PACKAGES = [
  {
    id: "silver",
    name: "Silver Economy",
    price: "$850",
    features: [
      "14 Days Package",
      "3-Star Hotels (Bus Service)",
      "Umrah eVisa & Insurance",
    ],
    featured: false,
  },
  {
    id: "premium",
    name: "Premium Gold",
    price: "$1,250",
    features: [
      "4-Star Hotels (Walking Distance)",
      "Half-Board Breakfast",
      "VIP Ground Transport",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "vvip",
    name: "VVIP Deluxe",
    price: "$1,950",
    features: [
      "5-Star Clock Tower Hotels",
      "Full Board Buffet",
      "Business Class Option",
    ],
    featured: false,
  },
] as const;

const UMRAH_BG_IMAGE =
  "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?q=80&w=1920&auto=format&fit=crop";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 16, mass: 0.85 },
  },
};

function PackageCard({
  pkg,
}: {
  pkg: (typeof PACKAGES)[number];
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className={`relative flex flex-col rounded-[1.5rem] bg-cream px-6 pb-6 pt-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:rounded-[1.75rem] sm:px-8 sm:pb-8 sm:pt-10 ${
        pkg.featured
          ? "border-2 border-gold ring-4 ring-gold/20 md:scale-[1.03] lg:scale-105"
          : "border border-cream-dark/80"
      }`}
    >
      {pkg.featured && "badge" in pkg && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-sans-body text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md">
          {pkg.badge}
        </span>
      )}

      <p className="mb-3 font-sans-body text-xs font-bold uppercase tracking-[0.18em] text-gold">
        {pkg.name}
      </p>

      <p className="mb-8 font-serif-display text-5xl font-bold tracking-tight text-forest md:text-[3.25rem]">
        {pkg.price}
      </p>

      <ul className="mb-10 flex flex-1 flex-col gap-3">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-center justify-center gap-2 font-sans-body text-sm leading-snug ${
              pkg.featured ? "font-semibold text-forest" : "text-forest/55"
            }`}
          >
            <Check size={14} className="shrink-0 text-gold" strokeWidth={2.5} />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={LINKS.contact}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-sans-body text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
          pkg.featured
            ? "bg-gold text-white shadow-[0_8px_24px_rgba(201,168,76,0.4)]"
            : "border-2 border-gold bg-transparent text-gold hover:bg-gold/10"
        }`}
      >
        Details
        <ArrowUpRight size={14} strokeWidth={2.5} />
      </Link>
    </motion.article>
  );
}

export default function UmrahSection() {
  return (
    <section
      id="umrah"
      aria-label="Umrah packages"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={UMRAH_BG_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
          aria-hidden
        />
        <div className="absolute inset-0 bg-forest/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          className="mb-14 text-center md:mb-16"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="font-sans-body text-2xl font-bold uppercase tracking-[0.12em] text-cream md:text-3xl lg:text-4xl">
            Spiritual{" "}
            <span className="font-serif-display text-gold">Umrah</span>{" "}
            Packages
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-5 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
