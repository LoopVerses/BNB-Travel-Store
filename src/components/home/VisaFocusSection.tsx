"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, FileText, Plane, Shield, Stamp } from "lucide-react";
import { CTAS } from "@/lib/siteConfig";
import { LINKS } from "@/lib/links";
import { fadeUp, sectionHeader, staggerContainer, viewportOnce } from "@/lib/animations";

const VISA_SERVICES = [
  { icon: Stamp, title: "USA, UK, Schengen & Canada", desc: "Expert visa assistance for top destinations worldwide." },
  { icon: FileText, title: "Visit Visa File Preparation", desc: "Complete documentation: cover letters, forms & checklists." },
  { icon: Plane, title: "Cover Letters & Itinerary", desc: "Embassy-ready travel plans written by our specialists." },
  { icon: Shield, title: "Travel Insurance", desc: "Comprehensive coverage as an add-on during your application." },
];

// --- 3D Acrylic Laser Border Card Component ---
function Acrylic3DCard({ item }: { item: typeof VISA_SERVICES[0] }) {
  const Icon = item.icon;

  // Track Mouse movement relative to Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform coordinates to 3D Rotation Angles
  const rotateX = useTransform(mouseY, [-150, 150], [12, -15]);
  const rotateY = useTransform(mouseX, [-150, 150], [-12, 15]);

  const springConfig = { stiffness: 150, damping: 22 };
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
        transformStyle: "preserve-3d", // Activates 3D space for child nesting
      }}
      className="group relative rounded-[1.5rem] bg-gradient-to-br from-white via-white/80 to-[#FAF8F5] p-5 cursor-pointer select-none transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(10,51,33,0.08)] will-change-transform z-10 sm:rounded-[2rem] sm:p-7"
    >
      
      {/* 
        ROTATING NEON LASER BORDER (Specular Edge-Light)
        Spins infinitely on hover around the card border.
      */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute -inset-[1.5px] rounded-[2rem] bg-[conic-gradient(from_0deg,transparent,transparent,#E8B031,transparent,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
      />

      {/* Outer subtle shadow/border structure */}
      <div className="absolute inset-0 rounded-[2rem] border border-[#0A3321]/5 bg-white z-0 pointer-events-none group-hover:border-transparent transition-colors duration-300" />

      {/* 
        FUTURISTIC ICON PORTAL (Floating 45px above)
        Pulsing aura circle behind the icon creates an epic depth.
      */}
      <motion.div 
        style={{ translateZ: 45, transformStyle: "preserve-3d" }}
        className="mb-6 inline-block relative z-10"
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A3321]/5 text-[#0A3321] overflow-hidden border border-[#0A3321]/5">
          {/* Inner portal glow */}
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#E8B031] rounded-full blur-md"
          />
          <Icon size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
        </div>
      </motion.div>

      {/* 
        TEXT LAYERS (Floating 25px above)
      */}
      <motion.div style={{ translateZ: 25 }} className="relative z-10">
        <h3 className="mb-2 font-sans text-base font-bold text-[#0A3321] tracking-tight transition-colors duration-300 group-hover:text-[#E8B031]">
          {item.title}
        </h3>
        <p className="font-sans text-[13px] leading-relaxed text-[#0A3321]/65">
          {item.desc}
        </p>
      </motion.div>

    </motion.div>
  );
}

export default function VisaFocusSection() {
  return (
    <section id="visa-focus" className="relative w-full overflow-x-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:py-32">
      
      {/* Subtle vector background grid just like luxury travel portals */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: "radial-gradient(#0A3321 1.5px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative z-30 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8B031]/30 bg-[#E8B031]/5 px-4 py-1.5 mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8B031] animate-pulse"></span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#E8B031]">
              Visa Services, Our Main Focus
            </span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-[#0A3321] leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Expert Visa Consultancy
            <br />
            <span className="text-[#E8B031] font-script italic font-normal" style={{ fontFamily: '"Caveat", cursive' }}>
              &amp; Documentation Support
            </span>
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-[#0A3321]/65">
            High-quality documentation increases your chances of approval. We don&apos;t just advise. We prepare your complete file.
          </p>
        </motion.div>

        {/* 
          3D PERSPECTIVE CARDS GRID 
        */}
        <div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1500px" }} // Activates 3D depth field for children
        >
          {VISA_SERVICES.map((item) => (
            <Acrylic3DCard key={item.title} item={item} />
          ))}
        </div>

        {/* Bottom CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 flex flex-wrap justify-center gap-5"
        >
          <Link
            href={LINKS.visaServices}
            className="group inline-flex items-center gap-4 rounded-full bg-[#0A3321] py-2.5 pl-6 pr-2.5 font-sans text-sm font-bold text-white shadow-md hover:shadow-lg transition-transform"
          >
            {CTAS.applyVisa}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8B031] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} className="text-[#0A3321]" strokeWidth={2.5} />
            </span>
          </Link>
          
          <Link
            href={LINKS.evisas}
            className="rounded-full border-2 border-[#E8B031] px-7 py-3 font-sans text-sm font-bold text-[#E8B031] transition-all hover:bg-[#E8B031]/10"
          >
            Fast-Track eVisas →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}