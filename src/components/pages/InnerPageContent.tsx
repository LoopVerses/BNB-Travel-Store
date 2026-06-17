"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { InnerPageData } from "@/data/innerPages";
import FoundersVisionSection from "@/components/about/FoundersVisionSection";
import { FeatureIcon } from "@/lib/featureIcons";
import { LINKS } from "@/lib/links";
import {
  fadeUp,
  scaleIn,
  sectionHeader,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

export default function InnerPageContent({ page }: { page: InnerPageData }) {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden md:min-h-[520px]">
        <img
          src={page.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/30" />
        <motion.div
          className="relative z-10 w-full px-8 pb-16 pt-32 md:px-14 md:pb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            • {page.eyebrow}
          </p>
          <h1 className="font-serif-display text-4xl font-bold leading-tight text-cream md:text-6xl lg:text-7xl">
            {page.title}{" "}
            {page.highlight && (
              <span className="text-gold">{page.highlight}</span>
            )}
          </h1>
          <p className="mt-5 max-w-xl font-sans-body text-base leading-relaxed text-cream/75 md:text-lg">
            {page.subtitle}
          </p>
        </motion.div>
      </section>

      {/* 2. Intro */}
      <section className="bg-white px-8 py-20 md:px-14 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            <h2 className="font-serif-display text-3xl font-bold leading-tight text-forest md:text-4xl">
              {page.intro.heading}
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromRight}
          >
            <p className="font-sans-body text-base leading-relaxed text-forest/65 md:text-lg">
              {page.intro.body}
            </p>
          </motion.div>
        </div>
      </section>

      {page.slug === "about" && <FoundersVisionSection />}

      {/* 3. Features grid */}
      <section className="bg-cream px-8 py-20 md:px-14 md:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-center font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            What We Offer
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-14 text-center font-serif-display text-3xl font-bold text-forest md:text-4xl"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.features.map((feature) => (
                <motion.article
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="rounded-2xl border border-forest/10 bg-white p-7 shadow-[0_8px_30px_rgba(26,58,42,0.06)]"
                >
                  <FeatureIcon name={feature.icon} />
                  <h3 className="mb-3 font-serif-display text-lg font-bold text-forest">
                    {feature.title}
                  </h3>
                  <p className="font-sans-body text-sm leading-relaxed text-forest/60">
                    {feature.description}
                  </p>
                </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Process steps */}
      <section className="bg-white px-8 py-20 md:px-14 md:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-14 text-center font-serif-display text-3xl font-bold text-forest md:text-4xl"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step) => (
              <motion.div
                key={step.num}
                variants={scaleIn}
                className="relative rounded-2xl border border-forest/10 bg-cream/50 p-7"
              >
                <span className="font-serif-display text-4xl font-bold text-gold/40">
                  {step.num}
                </span>
                <h3 className="mb-2 mt-3 font-sans-body text-base font-bold text-forest">
                  {step.title}
                </h3>
                <p className="font-sans-body text-sm leading-relaxed text-forest/60">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. Gallery / Packages / Stats */}
      {page.gallery ? (
        <section className="bg-cream-dark px-8 py-20 md:px-14 md:py-28">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="mb-14 text-center font-serif-display text-3xl font-bold text-forest md:text-4xl"
            >
              Featured Destinations
            </motion.h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {page.gallery.map((item) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  whileHover={{ scale: 1.04, y: -6 }}
                  className="group overflow-hidden rounded-2xl shadow-lg"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent p-4">
                      <p className="font-sans-body text-xs font-semibold text-cream">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      ) : page.packages ? (
        <section className="relative overflow-hidden px-8 py-20 md:px-14 md:py-28">
          <div className="absolute inset-0 bg-forest/90" />
          <img
            src={page.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            aria-hidden
          />
          <motion.div
            className="relative z-10 mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="mb-14 text-center font-serif-display text-3xl font-bold text-cream md:text-4xl"
            >
              Our Umrah Packages
            </motion.h2>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-5">
              {page.packages.map((pkg) => (
                <motion.article
                  key={pkg.name}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className={`relative flex flex-col rounded-[1.75rem] bg-cream px-7 pb-7 pt-9 text-center ${
                    pkg.featured ? "scale-[1.03] border-2 border-gold lg:scale-105" : "border border-cream-dark"
                  }`}
                >
                  {pkg.featured && pkg.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-sans-body text-[10px] font-bold uppercase tracking-wider text-white">
                      {pkg.badge}
                    </span>
                  )}
                  <p className="mb-6 font-sans-body text-xs font-bold uppercase tracking-[0.16em] text-gold">
                    {pkg.name}
                  </p>
                  <ul className="mb-8 flex flex-col gap-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="font-sans-body text-sm text-forest/65">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-xl py-3 font-sans-body text-xs font-bold uppercase tracking-wider ${
                      pkg.featured ? "bg-gold text-white" : "border-2 border-gold text-gold"
                    }`}
                  >
                    Get Quote
                  </motion.a>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>
      ) : (
        page.stats && (
          <section className="bg-forest px-8 py-16 md:px-14 md:py-20">
            <motion.div
              className="mx-auto grid max-w-4xl grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {page.stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <p className="font-serif-display text-4xl font-bold text-gold md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-sans-body text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-cream px-8 py-24 md:px-14 md:py-32">
        <motion.div
          className="relative z-10 mx-auto max-w-3xl text-center"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="mb-5 font-serif-display text-3xl font-bold text-forest md:text-4xl">
            {page.cta.title}
          </h2>
          <p className="mb-10 font-sans-body text-base text-forest/65">{page.cta.body}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pl-6 pr-2.5 font-sans-body text-sm font-bold text-forest shadow-md"
            >
              {page.cta.button}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={15} className="text-white" strokeWidth={2.5} />
              </span>
            </motion.a>
            <Link
              href={LINKS.home}
              className="font-sans-body text-sm font-medium text-forest/50 transition-colors hover:text-forest"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
