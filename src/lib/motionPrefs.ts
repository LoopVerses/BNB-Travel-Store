"use client";

import { useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

export const instantTransition: Transition = { duration: 0 };

export function useMotionPrefs() {
  const reduced = useReducedMotion() ?? false;

  const t = (transition: Transition): Transition =>
    reduced ? instantTransition : transition;

  const spring = (
    config: Transition & { type?: "spring" }
  ): Transition => (reduced ? instantTransition : config);

  const variants = (v: Variants): Variants => {
    if (!reduced) return v;
    return {
      hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
      visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: instantTransition },
    };
  };

  return { reduced, t, spring, variants, instant: instantTransition };
}
