"use client";

import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

interface SplitRevealProps {
  onComplete: () => void;
}

export default function SplitReveal({ onComplete }: SplitRevealProps) {
  const topControls = useAnimation();
  const bottomControls = useAnimation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const runSequence = async () => {
      if (reduced) {
        onComplete();
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      const transitionObj = {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as const,
      };

      topControls.start({ y: "-100%", transition: transitionObj });
      bottomControls.start({ y: "100%", transition: transitionObj }).then(() => {
        onComplete();
      });
    };

    runSequence();
  }, [topControls, bottomControls, onComplete, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-col">
      <motion.div
        animate={topControls}
        className="flex h-1/2 w-full items-end justify-center overflow-hidden bg-[#0D3A26]"
      >
        <div className="h-[8vh] w-full border-b-2 border-[#0D3A26] bg-[#F9F6F0]" />
      </motion.div>

      <motion.div
        animate={bottomControls}
        className="flex h-1/2 w-full items-start justify-center overflow-hidden bg-[#0D3A26]"
      >
        <div className="h-[8vh] w-full border-t-2 border-[#0D3A26] bg-[#F9F6F0]" />
      </motion.div>
    </div>
  );
}
