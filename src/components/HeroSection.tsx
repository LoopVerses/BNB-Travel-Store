"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useMotionPrefs } from "@/lib/motionPrefs";
import { useIsMobile } from "@/lib/useMediaQuery";

const JET_WEBP = "/images/hero/private-jet.webp";
const JET_PNG = "/images/hero/private-jet.png";

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

function HeroPrivateJet({
  visible,
  reduced,
  slideEase,
  isMobile,
}: {
  visible: boolean;
  reduced: boolean;
  slideEase: readonly [number, number, number, number];
  isMobile: boolean;
}) {
  const [hasLanded, setHasLanded] = useState(false);
  const noseLeft = -90;
  const startX = isMobile ? "92vw" : "70vw";
  const endX = isMobile ? "1vw" : 24;
  const rumbleX = isMobile ? [-1, 1, -0.5, 0.5, 0] : [-2.5, 2.5, -1.5, 1.5, -2, 2, -1, 1, 0];
  const rumbleY = isMobile ? [0, -1, 0.5, -0.5, 0] : [0, -2, 1, -1.5, 0.5, -1, 0];
  const rumbleZ = isMobile
    ? [noseLeft - 0.25, noseLeft + 0.25, noseLeft - 0.15, noseLeft + 0.15, noseLeft]
    : [noseLeft - 0.55, noseLeft + 0.55, noseLeft - 0.35, noseLeft + 0.35, noseLeft - 0.2, noseLeft + 0.2, noseLeft];

  useEffect(() => {
    if (!visible) setHasLanded(false);
  }, [visible]);

  useEffect(() => {
    if (!visible || reduced) {
      setHasLanded(Boolean(visible && reduced));
      return;
    }
    const timer = window.setTimeout(() => setHasLanded(true), isMobile ? 2400 : 2800);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, isMobile]);

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-[6%] z-[12] max-[380px]:top-[5%] sm:top-[8%] md:top-[6%] lg:top-[4%]"
      style={{ perspective: isMobile ? 900 : 1400 }}
      initial={{ x: reduced ? endX : startX, y: reduced ? 0 : 16, opacity: reduced ? 0.75 : 0, scale: reduced ? 1 : 0.88 }}
      animate={
        visible
          ? { x: endX, y: 0, opacity: 0.82, scale: 1 }
          : { x: startX, y: 16, opacity: 0, scale: 0.88 }
      }
      transition={
        reduced
          ? { duration: 0 }
          : {
              x: { duration: isMobile ? 2.35 : 2.75, delay: 0.2, ease: slideEase },
              y: { duration: isMobile ? 2.35 : 2.75, delay: 0.2, ease: slideEase },
              opacity: { duration: 0.7, delay: 0.15 },
              scale: { duration: isMobile ? 2.35 : 2.75, delay: 0.2, ease: slideEase },
            }
      }
      onAnimationComplete={() => {
        if (visible && !reduced) setHasLanded(true);
      }}
      aria-hidden
    >
      <motion.div
        className={
          isMobile
            ? "relative h-[128px] w-[104px] origin-center will-change-transform max-[380px]:h-[112px] max-[380px]:w-[90px] sm:h-[168px] sm:w-[136px]"
            : "relative h-[200px] w-[162px] origin-center will-change-transform md:h-[300px] md:w-[242px] lg:h-[380px] lg:w-[306px]"
        }
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduced || !visible
            ? { rotateX: isMobile ? 12 : 16, y: 0, x: 0, rotateZ: noseLeft }
            : hasLanded
              ? {
                  rotateX: isMobile ? [12, 14, 12] : [14, 17, 15, 16, 14],
                  x: rumbleX,
                  y: rumbleY,
                  rotateZ: rumbleZ,
                }
              : { rotateX: isMobile ? 13 : 15, y: 0, x: 0, rotateZ: noseLeft }
        }
        transition={
          reduced || !hasLanded
            ? { duration: 0.3 }
            : {
                rotateX: { duration: isMobile ? 5 : 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                x: { duration: isMobile ? 0.16 : 0.14, repeat: Infinity, ease: "linear" },
                y: { duration: isMobile ? 0.13 : 0.11, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: isMobile ? 0.15 : 0.13, repeat: Infinity, ease: "linear" },
              }
        }
      >
        <div
          className={`absolute left-1/2 z-0 -translate-x-1/2 rounded-[100%] bg-black/40 blur-md ${
            isMobile ? "-bottom-2 h-2.5 w-[70%] sm:-bottom-3 sm:h-3" : "-bottom-4 h-5 md:h-6"
          }`}
        />

        {!reduced && visible && hasLanded && (
          <>
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ repeat: Infinity, duration: 0.09 }}
              className={`absolute left-[37%] top-[61%] z-0 rounded-full bg-orange-500 blur-md ${
                isMobile ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-5 w-5 md:h-7 md:w-7"
              }`}
            />
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ repeat: Infinity, duration: 0.09, delay: 0.04 }}
              className={`absolute right-[37%] top-[61%] z-0 rounded-full bg-orange-500 blur-md ${
                isMobile ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-5 w-5 md:h-7 md:w-7"
              }`}
            />
            {!isMobile && (
              <motion.div
                animate={{ height: ["0px", "56px", "88px"], opacity: [0.45, 0.3, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
                className="absolute left-1/2 top-[68%] z-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-white/55 via-white/12 to-transparent sm:w-1"
              />
            )}
          </>
        )}

        <picture className="relative z-10 block h-full w-full drop-shadow-[0_20px_36px_rgba(0,0,0,0.45)] md:drop-shadow-[0_28px_44px_rgba(0,0,0,0.5)]">
          <source srcSet={JET_WEBP} type="image/webp" />
          <img
            src={JET_PNG}
            alt=""
            className="h-full w-full object-contain select-none mix-blend-screen"
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </picture>
      </motion.div>
    </motion.div>
  );
}

function PathIconsLayer({
  pathRef,
  visible,
  reduced,
  staticIcons,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  visible: boolean;
  reduced: boolean;
  staticIcons: boolean;
}) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [iconsRevealed, setIconsRevealed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveStartRef = useRef<number | null>(null);

  const iconProgress = (index: number, base: number) =>
    (ICON_START + base + index * ICON_SPACING) % 1;

  const positionIcons = (base: number) => {
    const path = pathRef.current;
    if (!path) return;

    for (let i = 0; i < PATH_ICONS.length; i++) {
      const el = iconRefs.current[i];
      if (!el) continue;
      applyIconPosition(el, path, iconProgress(i, base % 1), PATH_ICONS[i].rotationOffset);
    }
  };

  useEffect(() => {
    if (!visible) {
      setIconsRevealed(false);
      setIsMoving(false);
      moveStartRef.current = null;
      return;
    }

    if (reduced || staticIcons) {
      setIconsRevealed(true);
      positionIcons(0);
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
  }, [visible, reduced, staticIcons]);

  useAnimationFrame((time) => {
    if (!visible || reduced || staticIcons) return;

    const base =
      isMoving && moveStartRef.current !== null
        ? (time - moveStartRef.current) / 1000 / ICON_LOOP_DURATION
        : 0;

    positionIcons(base);
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
  const cardWidth = compact ? "w-full" : "w-[160px] md:w-[220px] lg:w-[260px]";
  const imgHeight = compact ? "h-[120px] sm:h-[130px]" : "h-[180px] md:h-[260px] lg:h-[320px]";

  return (
    <div className={`relative ${compact ? "" : item.translateY}`}>
      <motion.div
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : compact ? 24 : 100, scale: reduced ? 1 : 0.92 }}
        animate={
          visible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: reduced ? 1 : 0, y: reduced ? 0 : compact ? 24 : 100, scale: reduced ? 1 : 0.92 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { duration: compact ? 0.6 : 0.9, delay: 0.35 + index * 0.1, ease: slideEase }
        }
        className={`will-change-transform ${compact ? cardWidth : ""}`}
      >
        <motion.div
          style={{ rotate: item.rot }}
          animate={visible && !reduced ? { y: [0, compact ? -6 : -8, 0] } : { y: 0 }}
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
          whileHover={reduced || compact ? undefined : { scale: 1.05, rotate: 0, y: -12 }}
          className={`relative cursor-pointer rounded-xl bg-white p-2 pb-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-gold sm:rounded-2xl sm:p-2.5 sm:pb-11 lg:rounded-2xl lg:p-4 lg:pb-16 ${cardWidth}`}
        >
          <div className={`relative w-full overflow-hidden rounded-lg bg-gray-200 ${imgHeight}`}>
            <Image
              src={item.imgUrl}
              alt={item.location}
              fill
              sizes={compact ? "(max-width:640px) 50vw, 240px" : "(max-width:768px) 160px, 260px"}
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
            className={`absolute z-50 flex items-center gap-1.5 rounded-full bg-[#E74C3C] px-2.5 py-1 text-white shadow-xl sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 ${
              compact ? "bottom-2 left-2 right-auto top-auto" : item.tagClass
            }`}
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

function MobileHeroMarquee({
  visible,
  reduced,
}: {
  visible: boolean;
  reduced: boolean;
}) {
  const track = [...POLAROIDS, ...POLAROIDS];

  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0A3321] via-[#0A3321]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0A3321] via-[#0A3321]/80 to-transparent" />

      <motion.div
        className="flex w-max items-end gap-3 px-3 pb-2 pt-2"
        animate={reduced ? { x: 0 } : { x: ["0%", "-50%"] }}
        transition={
          reduced
            ? { duration: 0 }
            : { x: { repeat: Infinity, duration: 22, ease: "linear" } }
        }
      >
        {track.map((item, index) => (
          <motion.div
            key={`${item.location}-${index}`}
            className="relative w-[128px] shrink-0 sm:w-[136px]"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
            animate={
              visible
                ? { opacity: 1, y: reduced ? 0 : [0, -6, 0] }
                : { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.5, delay: (index % 4) * 0.06 },
                    y: {
                      duration: 3.5 + (index % 4) * 0.35,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: 2.4 + (index % 4) * 0.18,
                    },
                  }
            }
          >
            <div
              className="relative rounded-xl bg-white p-1.5 pb-8 shadow-[0_16px_36px_rgba(0,0,0,0.5)] sm:rounded-2xl sm:p-2 sm:pb-9"
              style={{ transform: `rotate(${item.rot}deg)` }}
            >
              <div className="relative h-[96px] w-full overflow-hidden rounded-lg bg-gray-200 sm:h-[104px]">
                <Image
                  src={item.imgUrl}
                  alt={item.location}
                  fill
                  sizes="136px"
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
              <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-[#E74C3C] px-2 py-0.5 text-white shadow-lg sm:bottom-2 sm:left-2 sm:px-2.5 sm:py-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="whitespace-nowrap text-[10px] font-bold tracking-wide sm:text-xs">{item.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default function HeroSection({ visible = false }: { visible?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const { reduced, t } = useMotionPrefs();
  const isMobile = useIsMobile();
  const slideEase = [0.22, 1, 0.36, 1] as const;
  const lineDuration = reduced ? 0 : isMobile ? 2 : LINE_DRAW_DURATION;
  const lineDelay = reduced ? 0 : isMobile ? 0.4 : LINE_DRAW_DELAY;

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#FAF8F5] px-3 pb-6 pt-0 sm:px-4 md:px-8 md:pb-10">
      <div className="relative flex min-h-[580px] flex-col items-center overflow-hidden rounded-[1.5rem] bg-[#0A3321] px-2 pb-0 pt-10 shadow-2xl sm:min-h-[600px] sm:rounded-[2.5rem] sm:pt-14 md:min-h-[750px] md:pb-10 md:pt-16 lg:h-[800px] lg:rounded-[3.5rem]">
        <motion.p
          initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 60 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: reduced ? 1 : 0, x: reduced ? 0 : 60 }}
          transition={t({ duration: 0.85, delay: 0.25, ease: slideEase })}
          className="absolute right-4 top-4 hidden max-w-[200px] text-right font-sans text-[15px] leading-relaxed text-white/90 sm:right-8 sm:top-8 lg:block lg:right-12 lg:top-12"
        >
          Adventure, culture, and comfort all in one journey.
        </motion.p>

        <HeroPrivateJet visible={visible} reduced={reduced} slideEase={slideEase} isMobile={isMobile} />

        <div className="relative z-50 mt-2 w-full shrink-0 self-start px-3 pb-2 sm:mt-4 sm:px-6 sm:pb-4 md:mt-8 md:px-12 md:pb-0 lg:px-16">
          <motion.div
            initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : -80 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: reduced ? 1 : 0, x: reduced ? 0 : -80 }}
            transition={t({ duration: 0.9, delay: 0.12, ease: slideEase })}
            className="relative flex flex-col items-start gap-1 text-left leading-tight sm:gap-0 sm:leading-none"
          >
            <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:flex-nowrap sm:items-baseline sm:gap-x-3 md:gap-x-4">
              <span className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[4.25rem]">
                Your Next
              </span>
              <span
                className="text-[1.65rem] leading-[1.1] text-[#F2B938] sm:text-4xl sm:leading-none md:text-6xl lg:text-[6rem]"
                style={{ fontFamily: '"Caveat", "Dancing Script", cursive' }}
              >
                Unforgettable
              </span>
            </div>

            <div className="mt-0.5 flex flex-col items-start gap-0.5 sm:-mt-3 sm:flex-row sm:flex-nowrap sm:items-baseline sm:gap-x-3 md:gap-x-4">
              <span
                aria-hidden
                className="hidden font-sans text-[4.25rem] font-bold leading-none tracking-tight sm:invisible sm:block"
              >
                Your Ne
              </span>
              <span
                className="text-[1.65rem] leading-[1.1] text-[#F2B938] sm:text-4xl sm:leading-none md:text-6xl lg:text-[6rem]"
                style={{ fontFamily: '"Caveat", "Dancing Script", cursive' }}
              >
                Journey
              </span>
              <span className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[4.25rem]">
                Starts Here
              </span>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute top-[40%] z-20 flex h-[100px] w-full justify-center sm:top-[41%] sm:h-[115px] md:top-[32%] md:h-[300px]">
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
                strokeWidth={isMobile ? 2.5 : 3.5}
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
            <PathIconsLayer pathRef={pathRef} visible={visible} reduced={reduced} staticIcons={false} />
          </div>
        </div>

        {/* Mobile: sliding polaroids — raised up, ~10% bottom clip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[175px] translate-y-3 overflow-hidden sm:h-[180px] sm:translate-y-4 md:hidden">
          <MobileHeroMarquee visible={visible} reduced={reduced} />
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
