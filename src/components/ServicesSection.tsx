"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, Flag, GraduationCap, Plane, Zap } from "lucide-react";

type TabId = "visa" | "evisa";

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: typeof Building2;
};

const TABS: { id: TabId; label: string }[] = [
  { id: "visa", label: "Visa Consultancy" },
  { id: "evisa", label: "Fast-Track E-Visas" },
];

const SERVICES: Record<TabId, ServiceCard[]> = {
  visa: [
    {
      id: "schengen",
      title: "Schengen & UK",
      description:
        "Expert guidance for European and UK visa applications with document review and interview prep.",
      icon: Building2,
    },
    {
      id: "usa-canada",
      title: "USA & Canada",
      description:
        "End-to-end support for North American visas: tourist, business, and family visit categories.",
      icon: Flag,
    },
    {
      id: "study",
      title: "Study Visas",
      description:
        "University admissions, SOP review, and student visa filing for top global destinations.",
      icon: GraduationCap,
    },
  ],
  evisa: [
    {
      id: "instant",
      title: "Instant Approval",
      description:
        "Fast-track e-visa processing for eligible countries with same-day confirmation options.",
      icon: Zap,
    },
    {
      id: "gulf",
      title: "Gulf & Middle East",
      description:
        "Streamlined digital applications for UAE, Saudi, Qatar, and surrounding regions.",
      icon: Building2,
    },
    {
      id: "asia-pacific",
      title: "Asia Pacific",
      description:
        "Quick e-visa solutions for Southeast Asia, Australia, and popular holiday destinations.",
      icon: Plane,
    },
  ],
};

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={cardVariants}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group flex flex-col rounded-2xl border border-forest/10 bg-white p-8 shadow-[0_8px_30px_rgba(26,58,42,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(26,58,42,0.12)]"
    >
      <Icon size={28} className="mb-6 text-gold" strokeWidth={1.75} />

      <h3 className="mb-4 font-serif-display text-xl font-bold italic tracking-tight text-forest md:text-2xl">
        {card.title}
      </h3>

      <p className="mb-8 flex-1 font-sans-body text-sm leading-relaxed text-forest/60">
        {card.description}
      </p>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="/visa-services"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 font-sans-body text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors group-hover:bg-forest/90"
        >
          View Details
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </Link>
      </motion.div>
    </motion.article>
  );
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<TabId>("visa");
  const activeServices = SERVICES[activeTab];

  return (
    <section id="services" aria-label="Our services" className="w-full bg-white px-6 py-24 md:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Centered mission header */}
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <p className="mb-4 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            • Our Services
          </p>
          <h2 className="mx-auto max-w-3xl font-serif-display text-4xl font-bold leading-tight text-forest md:text-5xl lg:text-[3.25rem]">
            Expert Visa &amp; Travel Solutions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans-body text-base leading-relaxed text-forest/60">
            From visa consultancy to fast-track e-visas, we handle the paperwork so you can focus on the adventure.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-12 flex items-center justify-center gap-10 md:gap-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="relative pb-3 font-sans-body text-xs font-bold uppercase tracking-[0.18em] transition-colors md:text-sm"
              >
                <span className={isActive ? "text-gold" : "text-forest/35 hover:text-forest/55"}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="services-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            variants={gridVariants}
          >
            {activeServices.map((card, index) => (
              <ServiceCardItem key={card.id} card={card} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
