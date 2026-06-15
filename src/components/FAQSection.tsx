"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { CTAS } from "@/lib/siteConfig";
import { fadeUp, slideFromLeft, staggerContainer, viewportOnce } from "@/lib/animations";
import { useMotionPrefs } from "@/lib/motionPrefs";

const FAQS = [
  {
    q: "How do I book a trip with B&B Travel Store?",
    a: "Simply browse our destinations, select your preferred package, and follow the secure booking process. Our team will confirm your reservation within 24 hours.",
  },
  {
    q: "Can I customize my travel itinerary?",
    a: "Absolutely. Every B&B Travel Store journey can be tailored to your preferences, from accommodation choices to activity schedules.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We offer flexible cancellation up to 30 days before departure for a full refund. Please review our full policy for specific trip conditions.",
  },
  {
    q: "Are flights included in the packages?",
    a: "Most packages include return flights from major airports. Details are specified clearly on each destination page.",
  },
  {
    q: "Do you offer travel insurance?",
    a: "Yes, we partner with leading insurers to offer comprehensive travel protection as an optional add-on during checkout.",
  },
  {
    q: "How can I get real-time trip support?",
    a: "B&B Travel Store provides 24/7 in-trip support via WhatsApp, phone, and email. Your journey manager's contact is shared upon booking confirmation.",
  },
] as const;

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useMotionPrefs();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      className="mb-3 cursor-pointer rounded-2xl border border-forest/10 bg-white px-4 py-4 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:px-6 sm:py-5"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-sans-body text-sm font-semibold text-forest min-w-0 flex-1">{question}</p>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={t({ duration: 0.3 })}
          className="shrink-0 text-forest"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: reduced ? 1 : 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: reduced ? 1 : 0 }}
            transition={t({ duration: 0.35, ease: "easeInOut" })}
            className="overflow-hidden"
          >
            <p className="pt-4 font-sans-body text-sm leading-relaxed text-forest/60">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const { reduced } = useMotionPrefs();

  return (
    <section id="faq" aria-label="FAQ" className="w-full bg-white px-4 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="mb-4 font-sans-body text-sm text-forest/50">• FAQ</p>
          <h2 className="mb-6 font-serif-display text-3xl font-bold leading-tight text-forest sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 font-sans-body text-base text-forest/60">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
          </p>
          <motion.a
            href="/contact"
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-pill bg-gold px-6 py-3 font-sans-body text-sm font-semibold text-white focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:px-7"
          >
            {CTAS.freeConsultation}
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </motion.a>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {FAQS.map((faq) => (
            <motion.div key={faq.q} variants={fadeUp}>
              <FAQItem question={faq.q} answer={faq.a} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
