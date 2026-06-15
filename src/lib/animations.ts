export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const springBounce = {
  type: "spring" as const,
  stiffness: 90,
  damping: 16,
  mass: 0.85,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 75,
  damping: 20,
  mass: 0.9,
};

export const viewportOnce = { once: true, amount: 0.2 } as const;
export const viewportOnceWide = { once: true, amount: 0.15 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springBounce,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springBounce,
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springBounce,
  },
};

export const slideFromBottom = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springBounce,
  },
};

/** Section header: bouncy fade up */
export const sectionHeader = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 14, mass: 0.9 },
  },
};
