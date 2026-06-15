"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { springBounce } from "@/lib/animations";

const STATS = [
  { value: 100, suffix: "+", label: "Visa Files Prepared" },
  { value: 580, suffix: "+", label: "Families Satisfied" },
  { value: 1250, suffix: "+", label: "Visas Approved" },
  { value: 24, suffix: "H", label: "Live Support Hours" },
] as const;

/** Hero outer shell: same horizontal padding & width as HeroSection */
const HERO_SHELL = "w-full px-4 md:px-8";
const HERO_RADIUS = "rounded-[2.5rem] lg:rounded-[3.5rem]";

function CountUp({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, motionValue, value, duration]);

  useMotionValueEvent(rounded, "change", (v) => setDisplay(v));

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-label="Statistics"
      className={`${HERO_SHELL} bg-[#FAF8F5] pb-8 pt-6 md:pt-8`}
    >
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={springBounce}
        className={`overflow-hidden bg-forest ${HERO_RADIUS}`}
      >
        <div className="grid grid-cols-2 items-center gap-y-8 px-6 py-8 md:grid-cols-4 md:gap-0 md:px-10 md:py-10">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ ...springBounce, delay: 0.08 * index }}
              className="flex flex-col items-center text-center md:border-r md:border-cream/10 md:last:border-r-0"
            >
              <span className="font-serif-display text-4xl font-bold leading-none text-gold md:text-[2.75rem]">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={1.8 + index * 0.15}
                />
              </span>
              <span className="mt-3 max-w-[9rem] font-sans-body text-[10px] font-medium uppercase leading-snug tracking-[0.16em] text-cream/75 md:text-[11px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
