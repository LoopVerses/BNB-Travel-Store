"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, MessageCircle, Phone, Star } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import InnerPageContent from "@/components/pages/InnerPageContent";
import { INNER_PAGES } from "@/data/innerPages";
import { CTAS, SITE } from "@/lib/siteConfig";

function ContactExtras() {
  return (
    <section className="bg-cream px-8 py-16 md:px-14">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { icon: MessageCircle, label: "WhatsApp", value: CTAS.whatsapp, href: SITE.whatsapp, external: true },
          { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
          { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center rounded-2xl border border-forest/10 bg-white p-7 text-center"
            >
              <Icon size={28} className="mb-3 text-gold" />
              <p className="font-sans-body text-xs font-bold uppercase tracking-wider text-forest/50">{item.label}</p>
              <p className="mt-1 font-sans-body text-sm font-semibold text-forest">{item.value}</p>
            </motion.a>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <a
          href={SITE.googleReview}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans-body text-sm font-bold text-gold hover:underline"
        >
          <Star size={16} className="fill-gold text-gold" />
          Read &amp; Leave Google Reviews
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <SiteShell>
      <InnerPageContent page={INNER_PAGES.contact} />
      <ContactExtras />
    </SiteShell>
  );
}
