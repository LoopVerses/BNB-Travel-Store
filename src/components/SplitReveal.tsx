"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface SplitRevealProps {
  onComplete: () => void;
}

// 8 Stable and highly-detailed travel images
const LEFT_IMAGES = [
  "https://picsum.photos/seed/l1/300/350",
  "https://picsum.photos/seed/l2/300/350",
  "https://picsum.photos/seed/l3/300/350",
  "https://picsum.photos/seed/l4/300/350",
];

const RIGHT_IMAGES = [
  "https://picsum.photos/seed/r1/300/350",
  "https://picsum.photos/seed/r2/300/350",
  "https://picsum.photos/seed/r3/300/350",
  "https://picsum.photos/seed/r4/300/350",
];

export default function SplitReveal({ onComplete }: SplitRevealProps) {
  const [engineStart, setEngineStart] = useState(false);
  const leftPageControls = useAnimation();
  const rightPageControls = useAnimation();
  const planeControls = useAnimation();
  const smokeControls = useAnimation();

  useEffect(() => {
    const playCgiSequence = async () => {
      // 1. INITIAL STATE: Plane sitting at the bottom of the seam
      planeControls.set({ y: "75vh", scale: 0.95, x: "-50%" });
      
      // Hold state for 1.5 seconds so user can see the plane and the photo wall
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. ENGINE START: Minor shaking and exhaust fires ignite
      setEngineStart(true);
      await planeControls.start({
        y: "73vh",
        x: ["-50.5%", "-49.5%", "-50.2%", "-49.8%", "-50%"],
        transition: { duration: 0.8, ease: "linear" }
      });

      // 3. GRACEFUL ASCENT: Plane slowly and elegantly ascends
      smokeControls.start({ height: "250px", opacity: [0.6, 0], transition: { duration: 2.0, ease: "easeOut" } });
      
      planeControls.start({
        y: "-110vh",
        scale: 1.8,
        transition: { duration: 2.5, ease: [0.25, 1, 0.5, 1] as const },
      });

      // 4. BOOK REVEAL: Left and Right panels slide open smoothly
      await new Promise((resolve) => setTimeout(resolve, 600));

      const bookTransition = { duration: 1.4, ease: [0.76, 0, 0.24, 1] as const };
      leftPageControls.start({ x: "-100%", transition: bookTransition });
      await rightPageControls.start({ x: "100%", transition: bookTransition });

      // Trigger main site render
      onComplete();
    };

    playCgiSequence();
  }, [planeControls, leftPageControls, rightPageControls, smokeControls, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-hidden pointer-events-none flex">
      
      {/* 
        LEFT PAGE (Slides Left)
        - Filled with 4 travel images in a clean 2x2 grid.
        - Gold page-edge line on the right seam.
      */}
      <motion.div
        animate={leftPageControls}
        initial={{ x: 0 }}
        className="absolute left-0 top-0 w-1/2 h-full bg-[#0A3321] border-r-2 border-[#E8B031]/30 z-10 will-change-transform grid grid-cols-2 gap-2 p-3 overflow-hidden"
      >
        {LEFT_IMAGES.map((src, i) => (
          <div key={i} className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0D3A26]">
            {/* Added overlay to keep the dark premium forest green theme */}
            <div className="absolute inset-0 bg-[#0A3321]/20 z-10" />
            <img src={src} alt="Travel mosaic" className="w-full h-full object-cover opacity-80" />
          </div>
        ))}
      </motion.div>

      {/* 
        RIGHT PAGE (Slides Right)
        - Filled with another 4 travel images in a 2x2 grid.
        - Gold page-edge line on the left seam.
      */}
      <motion.div
        animate={rightPageControls}
        initial={{ x: 0 }}
        className="absolute right-0 top-0 w-1/2 h-full bg-[#0A3321] border-l-2 border-[#E8B031]/30 z-10 will-change-transform grid grid-cols-2 gap-2 p-3 overflow-hidden"
      >
        {RIGHT_IMAGES.map((src, i) => (
          <div key={i} className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0D3A26]">
            <div className="absolute inset-0 bg-[#0A3321]/20 z-10" />
            <img src={src} alt="Travel mosaic" className="w-full h-full object-cover opacity-80" />
          </div>
        ))}
      </motion.div>

      {/* 
        3D METALLIC JET LAYER
        Draws exhaust flames and smoke trails on takeoff.
      */}
      <motion.div
        animate={planeControls}
        style={{ left: "50%", x: "-50%" }}
        className="absolute z-50 origin-bottom will-change-transform w-[220px] h-[280px] md:w-[320px] md:h-[400px]"
      >
        
        {/* Glow exhaust effects */}
        {engineStart && (
          <>
            {/* Left Engine fire */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute left-[33%] top-[60%] w-8 h-8 bg-orange-500 rounded-full blur-md z-0"
            />
            {/* Right Engine fire */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute right-[33%] top-[60%] w-8 h-8 bg-orange-500 rounded-full blur-md z-0"
            />
            
            {/* Single Elegant Smoke Trail */}
            <motion.div
              animate={smokeControls}
              initial={{ height: 0, opacity: 0 }}
              style={{ left: "50%", x: "-50%" }}
              className="absolute top-[60%] w-1 md:w-1.5 bg-gradient-to-b from-white/70 via-white/20 to-transparent origin-top z-0"
            />
          </>
        )}

        {/* HIGH-FIDELITY VECTOR AIRLINER */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)] relative z-10">
          <defs>
            <linearGradient id="fuselage" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="45%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="wings" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Swept Wings */}
          <path d="M50 42 L5 64 L5 70 L50 54 L95 70 L95 64 Z" fill="url(#wings)" stroke="#64748B" strokeWidth="0.5" />
          
          {/* Horizontal Tail Stabilizers */}
          <path d="M50 82 L28 92 L28 95 L50 88 L72 95 L72 92 Z" fill="url(#wings)" />

          {/* Main Cabin Fuselage */}
          <path d="M50 12 C47 12 45 22 45 32 L45 86 C45 91 47 93 50 93 C52 93 55 91 55 86 L55 32 C55 22 53 12 50 12 Z" fill="url(#fuselage)" />

          {/* Left Wing Engine */}
          <rect x="29" y="55" width="7" height="15" rx="3.5" fill="#475569" stroke="#1E293B" strokeWidth="0.5" />
          <path d="M29 65 L36 65" stroke="#F1F5F9" strokeWidth="0.5" />

          {/* Right Wing Engine */}
          <rect x="64" y="55" width="7" height="15" rx="3.5" fill="#475569" stroke="#1E293B" strokeWidth="0.5" />
          <path d="M64 65 L71 65" stroke="#F1F5F9" strokeWidth="0.5" />

          {/* Cockpit Window */}
          <path d="M47.5 22 C48 21.2 52 21.2 52.5 22 C51.5 23 48.5 23 47.5 22 Z" fill="#0F172A" />

          {/* Wing Tip Lights */}
          <circle cx="5" cy="64.5" r="1" fill="#EF4444" />
          <circle cx="95" cy="64.5" r="1" fill="#22C55E" />
        </svg>

      </motion.div>

    </div>
  );
}