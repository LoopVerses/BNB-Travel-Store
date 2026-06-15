"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface InitialLoaderProps {
  onComplete: () => void;
}

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const delay = reduced ? 0 : 500;
    const timer = window.setTimeout(onComplete, delay);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-forest"
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
      aria-hidden
    >
      <div
        className={`h-10 w-10 rounded-full border-2 border-gold/30 border-t-gold ${reduced ? "" : "animate-pulse"}`}
      />
    </motion.div>
  );
}
