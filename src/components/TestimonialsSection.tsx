"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const TESTIMONIALS = [
  {
    name: "Ahmed R.",
    location: "Karachi",
    text: "B&B prepared my entire Schengen visa file: cover letter, itinerary, everything. Got approved on first try. Highly recommended for families.",
    rating: 5,
  },
  {
    name: "Fatima K.",
    location: "Lahore",
    text: "We booked our Umrah package through them. Visa, hotels, and transport, all handled professionally. Trusted by our whole family.",
    rating: 5,
  },
  {
    name: "Usman T.",
    location: "Islamabad",
    text: "Not just ticket booking. They actually understand visa requirements. My USA visit visa file was perfect. Business clients should use them.",
    rating: 5,
  },
  {
    name: "Sara M.",
    location: "Rawalpindi",
    text: "Customized honeymoon trip to Europe within our budget. They matched flights, hotels, and visa support in one package. Amazing service!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-6 text-center"
        >
          <p className="mb-3 font-sans-body text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Trusted by Families &amp; Business Clients
          </p>
          <h2 className="font-serif-display text-3xl font-bold text-forest sm:text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans-body text-forest/60">
            100+ visa files prepared · Trusted by families and business travelers across Pakistan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center"
        >
          <a
            href={LINKS.googleReview}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-pill border-2 border-gold bg-gold/10 px-6 py-3 font-sans-body text-sm font-bold text-forest transition-all hover:bg-gold hover:text-white"
          >
            <Star size={16} className="fill-gold text-gold group-hover:fill-white group-hover:text-white" />
            Leave a Google Review
            <ExternalLink size={14} />
          </a>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-forest/10 bg-cream/50 p-7"
            >
              <Quote size={28} className="mb-4 text-gold/40" />
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-5 font-sans-body text-sm leading-relaxed text-forest/75">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="font-sans-body text-sm">
                <strong className="text-forest">{t.name}</strong>
                <span className="text-forest/50"> · {t.location}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
