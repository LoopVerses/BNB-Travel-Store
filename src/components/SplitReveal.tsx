"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/lib/useMediaQuery";

interface SplitRevealProps {
  onComplete: () => void;
}

const LEFT_IMAGES = [
  "/images/hero/canada.jpg",
  "/images/hero/new%20zealand.jpg",
  "/images/hero/thailand.jpg",
  "/images/hero/itlay.jpg",
];

const RIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400",
  "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400",
  "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=400",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=400",
];

function MosaicTile({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const isRemote = src.startsWith("http");

  return (
    <div className="relative min-h-0 w-full overflow-hidden rounded-lg bg-[#0D3A26] sm:rounded-2xl aspect-[4/5] sm:aspect-auto sm:h-full">
      <div className="absolute inset-0 z-10 bg-[#0A3321]/25" />
      {isRemote ? (
        <img src={src} alt={alt} className="h-full w-full object-cover opacity-85" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 25vw, 20vw"
          className="object-cover opacity-85"
          priority={priority}
        />
      )}
    </div>
  );
}

export default function SplitReveal({ onComplete }: SplitRevealProps) {
  const [engineStart, setEngineStart] = useState(false);
  const leftPageControls = useAnimation();
  const rightPageControls = useAnimation();
  const planeControls = useAnimation();
  const smokeControls = useAnimation();
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const playCgiSequence = async () => {
      const planeStartY = isMobile ? "70dvh" : "75vh";
      const planeShakeY = isMobile ? "68dvh" : "73vh";
      const planeEndY = isMobile ? "-95dvh" : "-110vh";
      const planeEndScale = isMobile ? 1.45 : 1.8;
      const holdMs = isMobile ? 1100 : 1500;
      const bookDuration = isMobile ? 1.1 : 1.4;
      const revealDelay = isMobile ? 450 : 600;

      planeControls.set({ y: planeStartY, scale: isMobile ? 0.82 : 0.95, x: "-50%" });

      await new Promise((resolve) => setTimeout(resolve, holdMs));

      setEngineStart(true);
      await planeControls.start({
        y: planeShakeY,
        x: ["-50.5%", "-49.5%", "-50.2%", "-49.8%", "-50%"],
        transition: { duration: isMobile ? 0.65 : 0.8, ease: "linear" },
      });

      smokeControls.start({
        height: isMobile ? "180px" : "250px",
        opacity: [0.6, 0],
        transition: { duration: isMobile ? 1.6 : 2.0, ease: "easeOut" },
      });

      planeControls.start({
        y: planeEndY,
        scale: planeEndScale,
        transition: { duration: isMobile ? 2.1 : 2.5, ease: [0.25, 1, 0.5, 1] as const },
      });

      await new Promise((resolve) => setTimeout(resolve, revealDelay));

      const bookTransition = { duration: bookDuration, ease: [0.76, 0, 0.24, 1] as const };
      leftPageControls.start({ x: "-100%", transition: bookTransition });
      await rightPageControls.start({ x: "100%", transition: bookTransition });

      onComplete();
    };

    playCgiSequence();
  }, [
    planeControls,
    leftPageControls,
    rightPageControls,
    smokeControls,
    onComplete,
    isMobile,
    reduced,
  ]);

  const panelClass =
    "absolute top-0 h-full w-1/2 will-change-transform overflow-hidden bg-[#0A3321] grid grid-cols-2 grid-rows-2 gap-1.5 p-2 sm:gap-2 sm:p-3";

  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden bg-white pointer-events-none">
      <motion.div
        animate={leftPageControls}
        initial={{ x: 0 }}
        className={`${panelClass} left-0 border-r border-[#E8B031]/35 sm:border-r-2`}
      >
        {LEFT_IMAGES.map((src, i) => (
          <MosaicTile key={src} src={src} alt={`Travel ${i + 1}`} priority={i < 2} />
        ))}
      </motion.div>

      <motion.div
        animate={rightPageControls}
        initial={{ x: 0 }}
        className={`${panelClass} right-0 border-l border-[#E8B031]/35 sm:border-l-2`}
      >
        {RIGHT_IMAGES.map((src, i) => (
          <MosaicTile key={src} src={src} alt={`Destination ${i + 1}`} />
        ))}
      </motion.div>

      <motion.div
        animate={planeControls}
        style={{ left: "50%", x: "-50%" }}
        className="absolute z-50 h-[155px] w-[120px] origin-bottom will-change-transform sm:h-[230px] sm:w-[200px] md:h-[400px] md:w-[320px]"
      >
        {engineStart && (
          <>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute left-[33%] top-[60%] z-0 h-5 w-5 rounded-full bg-orange-500 blur-md sm:h-8 sm:w-8"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute right-[33%] top-[60%] z-0 h-5 w-5 rounded-full bg-orange-500 blur-md sm:h-8 sm:w-8"
            />
            <motion.div
              animate={smokeControls}
              initial={{ height: 0, opacity: 0 }}
              style={{ left: "50%", x: "-50%" }}
              className="absolute top-[60%] z-0 w-0.5 origin-top bg-gradient-to-b from-white/70 via-white/20 to-transparent sm:w-1.5"
            />
          </>
        )}

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 h-full w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)] sm:drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)]"
        >
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
          <path d="M50 42 L5 64 L5 70 L50 54 L95 70 L95 64 Z" fill="url(#wings)" stroke="#64748B" strokeWidth="0.5" />
          <path d="M50 82 L28 92 L28 95 L50 88 L72 95 L72 92 Z" fill="url(#wings)" />
          <path d="M50 12 C47 12 45 22 45 32 L45 86 C45 91 47 93 50 93 C52 93 55 91 55 86 L55 32 C55 22 53 12 50 12 Z" fill="url(#fuselage)" />
          <rect x="29" y="55" width="7" height="15" rx="3.5" fill="#475569" stroke="#1E293B" strokeWidth="0.5" />
          <path d="M29 65 L36 65" stroke="#F1F5F9" strokeWidth="0.5" />
          <rect x="64" y="55" width="7" height="15" rx="3.5" fill="#475569" stroke="#1E293B" strokeWidth="0.5" />
          <path d="M64 65 L71 65" stroke="#F1F5F9" strokeWidth="0.5" />
          <path d="M47.5 22 C48 21.2 52 21.2 52.5 22 C51.5 23 48.5 23 47.5 22 Z" fill="#0F172A" />
          <circle cx="5" cy="64.5" r="1" fill="#EF4444" />
          <circle cx="95" cy="64.5" r="1" fill="#22C55E" />
        </svg>
      </motion.div>
    </div>
  );
}
