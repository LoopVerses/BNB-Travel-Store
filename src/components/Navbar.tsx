"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CTAS } from "@/lib/siteConfig";
import { useMotionPrefs } from "@/lib/motionPrefs";

const NAV_LINKS = [
  { label: "Visa Services", href: "/visa-services" },
  { label: "eVisas", href: "/evisas" },
  { label: "Holidays", href: "/holidays" },
  { label: "Umrah", href: "/umrah" },
  { label: "Flights", href: "/flights-hotels" },
  { label: "About", href: "/about" },
];

const SECTION_LINKS = [
  { label: "Hero", href: "#hero" },
  { label: "Mission", href: "#mission" },
  { label: "Destinations", href: "#carousel" },
  { label: "Adventure", href: "#adventure" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(76);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { reduced, t, spring } = useMotionPrefs();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled((prev) => {
      if (latest > 48) return true;
      if (latest < 12) return false;
      return prev;
    });
  });

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setNavHeight(headerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (isMobile = false) =>
    `block rounded-pill border font-sans-body font-medium text-forest transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none cursor-pointer ${
      isMobile
        ? "px-5 py-3 text-sm"
        : "px-3 py-2 text-[11px] lg:px-4 lg:text-xs xl:px-5 xl:text-sm"
    } ${
      scrolled || isMobile
        ? "border-forest/15 bg-white/45"
        : "border-gray-300/80 bg-transparent"
    } hover:border-forest hover:bg-forest hover:text-cream hover:shadow-[0_8px_24px_rgba(26,58,42,0.22)]`;

  return (
    <>
      <div aria-hidden style={{ height: navHeight }} className="w-full shrink-0" />

      <motion.header
        ref={headerRef}
        id="header"
        aria-label="Header"
        className="fixed top-0 left-0 right-0 z-[200] w-full border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-in-out"
        style={{
          backgroundColor: scrolled || menuOpen ? "rgba(245, 240, 232, 0.92)" : "rgba(245, 240, 232, 0)",
          borderColor: scrolled || menuOpen ? "rgba(26, 58, 42, 0.1)" : "transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(26, 58, 42, 0.08)" : "none",
          backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(150%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px) saturate(150%)" : "blur(0px)",
        }}
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -80 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : -80 }}
        transition={t({ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] })}
      >
        <nav className="relative mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center rounded-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
          >
            <Image
              src="/images/logo/logo.png"
              alt="B&B Travel Store"
              width={140}
              height={48}
              className="h-9 w-auto object-contain sm:h-10 md:h-12"
              priority
            />
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 lg:flex lg:gap-2">
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.label}
                whileHover={reduced ? undefined : { y: -2, scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97, y: 0 }}
                transition={spring({ type: "spring", stiffness: 420, damping: 28 })}
              >
                <Link href={link.href} className={linkClass()}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden lg:block">
              <motion.span
                whileHover={reduced ? undefined : { scale: 1.05 }}
                whileTap={reduced ? undefined : { scale: 0.95 }}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-gold py-2 pl-4 pr-2 font-sans-body text-[11px] font-bold text-forest shadow-md transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none md:pl-5 md:text-xs lg:pl-6 lg:text-[13px]"
              >
                {CTAS.whatsapp}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest transition-transform duration-300 group-hover:rotate-45 lg:h-9 lg:w-9">
                  <ArrowUpRight size={16} className="text-white lg:size-[18px]" strokeWidth={2.5} />
                </span>
              </motion.span>
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-forest/15 bg-white/60 text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none lg:hidden"
            >
              {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={t({ duration: 0.25 })}
            className="fixed inset-0 z-[199] bg-forest/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={t({ type: "spring", stiffness: 320, damping: 32 })}
            className="fixed right-0 top-0 z-[201] flex h-full w-[min(100%,320px)] flex-col bg-cream px-6 pb-8 pt-24 shadow-2xl lg:hidden"
          >
            <p className="mb-3 font-sans-body text-xs font-bold uppercase tracking-[0.16em] text-gold">
              Pages
            </p>
            <div className="mb-6 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass(true)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="mb-3 font-sans-body text-xs font-bold uppercase tracking-[0.16em] text-gold">
              Sections
            </p>
            <div className="mb-6 flex flex-col gap-2">
              {SECTION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass(true)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans-body text-sm font-bold text-forest shadow-md focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              {CTAS.whatsapp}
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
