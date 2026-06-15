"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, FileCheck, Map, PenLine } from "lucide-react";
import { CTAS, SITE } from "@/lib/siteConfig";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const PILLARS = [
  { icon: PenLine, title: "Visa Cover Letters", desc: "Professionally written for USA, UK, Schengen & Canada." },
  { icon: Map, title: "Travel Itineraries", desc: "Embassy-ready day-by-day plans tailored to your trip." },
  { icon: FileCheck, title: "Complete File Prep", desc: "Documentation checked, organized, and submission-ready." },
];

// --- 3D Holographic Card Component ---
function HolographicCard({ item }: { item: typeof PILLARS[0] }) {
  const Icon = item.icon;

  // Track Mouse movement relative to Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform coordinates to 3D Rotation Angles
  const rotateX = useTransform(mouseY, [-150, 150], [15, -15]);
  const rotateY = useTransform(mouseX, [-150, 150], [-15, 15]);

  // Specular Reflection Glare Coordinates
  const glareX = useTransform(mouseX, [-150, 150], [0, 100]);
  const glareY = useTransform(mouseY, [-150, 150], [0, 100]);

  const springConfig = { stiffness: 150, damping: 20 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={fadeUp}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d", // Activates 3D depth for nested children
      }}
      className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl cursor-pointer select-none transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(242,185,56,0.12)] hover:border-white/20 will-change-transform sm:rounded-[2.5rem] sm:p-8"
    >
      {/* 
        Holographic Glass Specular Glint (Shine layer)
        Moves beautifully opposite to mouse movement.
      */}
      <motion.div
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 70%)",
          backgroundSize: "200% 200%",
          left: useTransform(glareX, (v) => `${v}%`),
          top: useTransform(glareY, (v) => `${v}%`),
        }}
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[2.5rem]"
      />

      {/* 
        PARALLAX ICON CONTAINER (Preserve-3D Z-index)
        This gold circle physically floats 50px ABOVE the card background!
      */}
      <motion.div 
        style={{ translateZ: 50, transformStyle: "preserve-3d" }}
        className="mb-6 inline-block"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-inner border border-gold/10">
          <Icon size={28} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* 
        PARALLAX TEXT CONTENT (Preserve-3D Z-index)
        Floats 30px above the card background.
      */}
      <motion.div style={{ translateZ: 30 }}>
        <h3 className="mb-3 font-sans text-xl font-bold text-white tracking-tight">
          {item.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-white/60">
          {item.desc}
        </p>
      </motion.div>

      {/* Subtle outer gold card line glow on hover */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-transparent transition-all duration-300 hover:border-gold/10 pointer-events-none" />
    </motion.div>
  );
}

export default function ValuePropositionSection() {
  return (
    <section className="relative w-full overflow-x-hidden bg-[#051c0f] px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:py-32">
      
      {/* 
        3D LIVING MESH BACKGROUND & PULSING NEBULA NEST
        Adds massive elite depth to the section.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Living Mesh Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: "radial-gradient(rgba(242,185,56,0.15) 1px, transparent 0), radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px"
          }}
        />

        {/* Pulsing Gold Nebula Glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-gold blur-[120px]"
        />
        
        {/* Pulsing Green/Emerald Glow */}
        <motion.div
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute -left-20 bottom-0 h-[600px] w-[600px] rounded-full bg-[#1abc9c] blur-[150px]"
        />
      </div>

      {/* MAIN CONTENT WRAPPER (Sits safely at z-30 in front of the scrolly plane) */}
      <div className="relative z-30 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 text-center sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              Your Unique Advantage
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl font-serif text-3xl font-bold leading-[1.15] text-white tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            {SITE.tagline}
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            High-quality documentation increases your chances of approval. We write letters, build itineraries, and prepare your entire visa file, so you travel with confidence.
          </p>
        </motion.div>

        {/* 
          3D STAGGER CARDS CONTAINER
          Perspective viewport triggers holographic depth on desktop.
        */}
        <div 
          className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          style={{ perspective: "1500px" }} // Activates 3D space for the grid
        >
          {PILLARS.map((item) => (
            <HolographicCard key={item.title} item={item} />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href={LINKS.visaServices}
            className="group inline-flex items-center gap-4 rounded-full bg-gold py-2.5 pl-6 pr-2.5 font-sans text-sm font-bold text-[#1E3A2B] shadow-lg transition-transform hover:shadow-xl"
          >
            {CTAS.applyVisa}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A2B] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} className="text-white" strokeWidth={2.5} />
            </span>
          </Link>
          
          <Link
            href={LINKS.contact}
            className="rounded-full border border-white/20 px-7 py-3.5 font-sans text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/30 focus:outline-none"
          >
            {CTAS.freeConsultation}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}