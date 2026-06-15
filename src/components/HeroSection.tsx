"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useMotionPrefs } from "@/lib/motionPrefs";

const SVG_VIEWBOX = { width: 1440, height: 300 };
const WAVE_PATH = "M -50 200 Q 200 50 450 150 T 950 150 Q 1200 50 1500 200";

const LINE_DRAW_DELAY = 1.0;
const LINE_DRAW_DURATION = 3.0;
const LINE_DONE = LINE_DRAW_DELAY + LINE_DRAW_DURATION;

const SolidPlane = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-white drop-shadow-md lg:h-9 lg:w-9" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);
const SolidBus = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-white drop-shadow-md lg:h-9 lg:w-9" fill="currentColor">
    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
  </svg>
);
const SolidShip = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-white drop-shadow-md lg:h-9 lg:w-9" fill="currentColor">
    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
  </svg>
);

const PATH_ICON_COUNT = 3;
const ICON_LOOP_DURATION = 100;
const ICON_SPACING = 1 / PATH_ICON_COUNT;
const ICON_START = 0.08;

const PATH_ICONS = [
  { Icon: SolidPlane, rotationOffset: 90 },
  { Icon: SolidBus, rotationOffset: 0 },
  { Icon: SolidShip, rotationOffset: 0 },
] as const;

const POLAROIDS = [
  { location: "Canada", imgUrl: "/images/hero/canada.jpg", rot: 5, translateY: "md:translate-y-12", tagClass: "top-[30%] -right-5" },
  { location: "New Zealand", imgUrl: "/images/hero/new%20zealand.jpg", rot: -4, translateY: "md:-translate-y-6", tagClass: "top-[25%] -left-6" },
  { location: "Thailand", imgUrl: "/images/hero/thailand.jpg", rot: 5, translateY: "md:-translate-y-6", tagClass: "top-[25%] -right-4" },
  { location: "Italy", imgUrl: "/images/hero/itlay.jpg", rot: -5, translateY: "md:translate-y-12", tagClass: "top-[45%] -left-5" },
] as const;

function getPointOnPath(path: SVGPathElement, progress: number) {
  const length = path.getTotalLength();
  const at = Math.max(0, Math.min(1, progress)) * length;
  const point = path.getPointAtLength(at);
  const ahead = path.getPointAtLength(Math.min(at + 3, length));
  const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
  return {
    left: (point.x / SVG_VIEWBOX.width) * 100,
    top: (point.y / SVG_VIEWBOX.height) * 100,
    angle,
  };
}

function applyIconPosition(
  el: HTMLDivElement,
  path: SVGPathElement,
  progress: number,
  rotationOffset: number
) {
  const pos = getPointOnPath(path, progress);
  el.style.left = `${pos.left}%`;
  el.style.top = `${pos.top}%`;
  el.style.transform = `translate(-50%, -50%) rotate(${pos.angle + rotationOffset}deg)`;
}

function PathIconsLayer({
  pathRef,
  visible,
  reduced,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  visible: boolean;
  reduced: boolean;
}) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [iconsRevealed, setIconsRevealed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveStartRef = useRef<number | null>(null);

  const iconProgress = (index: number, base: number) =>
    (ICON_START + base + index * ICON_SPACING) % 1;

  useEffect(() => {
    if (!visible) {
      setIconsRevealed(false);
      setIsMoving(false);
      moveStartRef.current = null;
      return;
    }

    if (reduced) {
      setIconsRevealed(true);
      return;
    }

    const revealTimer = window.setTimeout(
      () => setIconsRevealed(true),
      (LINE_DONE + 0.15) * 1000
    );
    const moveTimer = window.setTimeout(() => {
      moveStartRef.current = performance.now();
      setIsMoving(true);
    }, (LINE_DONE + 0.9) * 1000);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(moveTimer);
    };
  }, [visible, reduced]);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    if (!path || !visible || reduced) return;

    const base =
      isMoving && moveStartRef.current !== null
        ? (time - moveStartRef.current) / 1000 / ICON_LOOP_DURATION
        : 0;

    for (let i = 0; i < PATH_ICONS.length; i++) {
      const el = iconRefs.current[i];
      if (!el) continue;
      applyIconPosition(el, path, iconProgress(i, base % 1), PATH_ICONS[i].rotationOffset);
    }
  });

  if (!visible) return null;

  return (
    <>
      {PATH_ICONS.map(({ Icon }, index) => (
        <div
          key={index}
          ref={(node) => {
            iconRefs.current[index] = node;
          }}
          className="pointer-events-none absolute z-20 will-change-transform transition-opacity duration-700 ease-out"
          style={{ opacity: iconsRevealed ? 1 : 0 }}
        >
          <Icon />
        </div>
      ))}
    </>
  );
}

function PolaroidCard({
  item,
  index,
  visible,
  reduced,
  slideEase,
  compact = false,
}: {
  item: (typeof POLAROIDS)[number];
  index: number;
  visible: boolean;
  reduced: boolean;
  slideEase: readonly [number, number, number, number];
  compact?: boolean;
}) {
  const cardWidth = compact ? "w-[240px] shrink-0 snap-center" : "w-[160px] md:w-[220px] lg:w-[260px]";
  const imgHeight = compact ? "h-[200px]" : "h-[180px] md:h-[260px] lg:h-[320px]";

  return (
    <div className={`relative ${compact ? "" : item.translateY}`}>
      <motion.div
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 100, scale: reduced ? 1 : 0.92 }}
        animate={
          visible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: reduced ? 1 : 0, y: reduced ? 0 : 100, scale: reduced ? 1 : 0.92 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.9, delay: 0.35 + index * 0.1, ease: slideEase }
        }
        className={`will-change-transform ${compact ? cardWidth : ""}`}
      >
        <motion.div
          style={{ rotate: compact ? 0 : item.rot }}
          animate={visible && !reduced && !compact ? { y: [0, -8, 0] } : { y: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: 2.8 + index * 0.15,
                  },
                }
          }
          whileHover={reduced ? undefined : { scale: 1.05, rotate: 0, y: -12 }}
          className={`relative cursor-pointer rounded-xl bg-white p-2.5 pb-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-gold lg:rounded-2xl lg:p-4 lg:pb-16 ${cardWidth}`}
        >
          <div className={`relative w-full overflow-hidden rounded-lg bg-gray-200 ${imgHeight}`}>
            <Image
              src={item.imgUrl}
              alt={item.location}
              fill
              sizes={compact ? "240px" : "(max-width:768px) 160px, 260px"}
              className="object-cover"
              priority={index < 2}
            />
          </div>

          <motion.div
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.55 + index * 0.1, ease: slideEase }
            }
            className={`absolute z-50 flex items-center gap-1.5 rounded-full bg-[#E74C3C] px-3 py-1.5 text-white shadow-xl lg:px-4 lg:py-2 ${item.tagClass}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 lg:h-4 lg:w-4">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="whitespace-nowrap text-xs font-bold tracking-wide lg:text-sm">{item.location}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroSection({ visible = false }: { visible?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const { reduced, t } = useMotionPrefs();
  const slideEase = [0.22, 1, 0.36, 1] as const;
  const lineDuration = reduced ? 0 : LINE_DRAW_DURATION;
  const lineDelay = reduced ? 0 : LINE_DRAW_DELAY;

  return (
    <section id="hero" className="relative w-full bg-[#FAF8F5] px-3 pb-6 pt-0 sm:px-4 md:px-8 md:pb-10">
      <div className="relative flex min-h-[620px] flex-col items-center overflow-hidden rounded-[1.75rem] bg-[#0A3321] px-2 pb-32 pt-14 shadow-2xl sm:min-h-[680px] sm:rounded-[2.5rem] sm:pt-16 md:min-h-[750px] md:pb-10 lg:h-[800px] lg:rounded-[3.5rem]">
        <motion.p
          initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 60 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: reduced ? 1 : 0, x: reduced ? 0 : 60 }}
          transition={t({ duration: 0.85, delay: 0.25, ease: slideEase })}
          className="absolute right-4 top-4 hidden max-w-[200px] text-right font-sans text-[15px] leading-relaxed text-white/90 sm:right-8 sm:top-8 lg:block lg:right-12 lg:top-12"
        >
          Adventure, culture, and comfort all in one journey.
        </motion.p>

        <div className="pointer-events-none z-30 mt-4 w-full self-start px-4 sm:mt-6 sm:px-6 md:mt-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : -80 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: reduced ? 1 : 0, x: reduced ? 0 : -80 }}
            transition={t({ duration: 0.9, delay: 0.12, ease: slideEase })}
            className="flex flex-col items-start gap-1 text-left leading-none sm:gap-0"
          >
            <div className="flex flex-col items-start gap-0 sm:flex-row sm:flex-nowrap sm:items-baseline sm:gap-x-3 md:gap-x-4">
              <span className="font-sans text-4xl font-bold tracking-tight text-white md:text-[4.25rem]">
                Your Next
              </span>
              <span
                className="text-5xl leading-none text-[#F2B938] md:text-6xl lg:text-[6rem]"
                style={{ fontFamily: '"Caveat", "Dancing Script", cursive' }}
              >
                Unforgettable
              </span>
            </div>

            <div className="mt-1 flex flex-col items-start gap-0 sm:-mt-3 sm:flex-row sm:flex-nowrap sm:items-baseline sm:gap-x-3 md:gap-x-4">
              <span
                aria-hidden
                className="hidden font-sans text-[4.25rem] font-bold leading-none tracking-tight sm:invisible sm:block"
              >
                Your Ne
              </span>
              <span
                className="text-5xl leading-none text-[#F2B938] md:text-6xl lg:text-[6rem]"
                style={{ fontFamily: '"Caveat", "Dancing Script", cursive' }}
              >
                Journey
              </span>
              <span className="font-sans text-4xl font-bold tracking-tight text-white md:text-[4.25rem]">
                Starts Here
              </span>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute top-[32%] z-10 flex h-[180px] w-full justify-center sm:top-[35%] sm:h-[240px] md:h-[300px]">
          <div className="relative h-full w-full max-w-[1400px]">
            <svg
              viewBox={`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`}
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <path ref={pathRef} d={WAVE_PATH} fill="none" stroke="none" />
              <motion.path
                d={WAVE_PATH}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="3.5"
                fill="none"
                strokeDasharray="15 15"
                strokeLinecap="butt"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: reduced ? 1 : 0 }}
                transition={{
                  pathLength: { duration: lineDuration, ease: "easeInOut", delay: lineDelay },
                }}
              />
            </svg>
            <PathIconsLayer pathRef={pathRef} visible={visible} reduced={reduced} />
          </div>
        </div>

        {/* Mobile: horizontal scroll polaroids */}
        <div className="pointer-events-auto absolute bottom-3 left-0 right-0 z-40 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {POLAROIDS.map((item, index) => (
              <PolaroidCard
                key={item.location}
                item={item}
                index={index}
                visible={visible}
                reduced={reduced}
                slideEase={slideEase}
                compact
              />
            ))}
          </div>
        </div>

        {/* Desktop: overlapping polaroids */}
        <div className="pointer-events-auto absolute -bottom-[80px] z-40 hidden w-full items-start justify-center gap-4 px-4 md:flex md:gap-8 lg:gap-12">
          {POLAROIDS.map((item, index) => (
            <PolaroidCard
              key={item.location}
              item={item}
              index={index}
              visible={visible}
              reduced={reduced}
              slideEase={slideEase}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
