"use client";

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

function MosaicTile({ src, alt }: { src: string; alt: string }) {
  const isRemote = src.startsWith("http");

  return (
    <div className="relative min-h-0 w-full overflow-hidden rounded-lg bg-[#0D3A26] sm:rounded-2xl aspect-[4/5] sm:aspect-auto sm:h-full">
      <div className="absolute inset-0 z-10 bg-[#0A3321]/25" />
      <img src={src} alt={alt} className="h-full w-full object-cover opacity-85" loading="eager" />
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

      // Jet stream starts at rear engines
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
          <MosaicTile key={src} src={src} alt={`Travel ${i + 1}`} />
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

      {/* 
        3D BRONZE PRIVATE JET CONTAINER (With standard high-performance Img tag)
        Hardware-accelerated and detailed with high-end dropping shadows.
      */}
      <motion.div
        animate={planeControls}
        style={{ left: "50%", x: "-50%" }}
        className="absolute z-50 h-[155px] w-[120px] origin-bottom will-change-transform sm:h-[230px] sm:w-[200px] md:h-[400px] md:w-[320px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
      >
        {engineStart && (
          <>
            {/* Glowing flame at Left Rear Engine turbine */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute left-[37%] top-[61%] z-0 h-5 w-5 rounded-full bg-orange-500 blur-md sm:h-8 sm:w-8"
            />
            {/* Glowing flame at Right Rear Engine turbine */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute right-[37%] top-[61%] z-0 h-5 w-5 rounded-full bg-orange-500 blur-md sm:h-8 sm:w-8"
            />
            {/* Jet smoke trail aligned perfectly to the rear turbines */}
            <motion.div
              animate={smokeControls}
              initial={{ height: 0, opacity: 0 }}
              style={{ left: "50%", x: "-50%" }}
              className="absolute top-[68%] z-0 w-0.5 origin-top bg-gradient-to-b from-white/70 via-white/20 to-transparent sm:w-1.5"
            />
          </>
        )}

        {/* 
          Fixed Standard Img Tag:
          Prevents Next.js layout engine lag and displays the private jet cutout instantly.
        */}
        <img
          src="/images/hero/private-jet.png"
          alt="Metallic Bronze Private Jet"
          className="w-full h-full object-contain relative z-10 select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}