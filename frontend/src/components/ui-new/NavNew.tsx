"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  { label: "Services",  anchor: "services"  },
  { label: "About",     anchor: "about"     },
  { label: "Projects",  anchor: "projects", page: "/projects" },
  { label: "Pricing",   anchor: "pricing"   },
  { label: "FAQ",       anchor: "faq"       },
  { label: "Contact",   anchor: "contact"   },
] as const;

const DRAWER_EXTRA_SECTIONS = [{ label: "Partners", anchor: "customers" }] as const;

const MOBILE_ICON_BTN =
  "max-lg:bg-surface-strong max-lg:shadow-[var(--shadow-sm)] max-lg:w-[42px] max-lg:h-[42px]";

/* ── helpers ─────────────────────────────────────────── */
/** Returns the correct href: anchor on homepage, full path+hash on sub-pages. */
function sectionHref(anchor: string, isHome: boolean): string {
  return isHome ? `#${anchor}` : `/#${anchor}`;
}

/* ── Logo ─────────────────────────────────────────────── */
function Logo({ pill = false, isHome = false }: { pill?: boolean; isHome?: boolean }) {
  return (
    <Link
      href={isHome ? "#hero" : "/"}
      className={cn(
        "flex items-center gap-[11px] no-underline group",
        pill &&
          "max-lg:gap-2.5 max-lg:rounded-full max-lg:border max-lg:border-line max-lg:bg-surface-strong max-lg:py-1.5 max-lg:pl-1.5 max-lg:pr-4 max-lg:shadow-[var(--shadow-sm)]"
      )}
      aria-label="Kryvazent home"
    >
      <span
        className={cn(
          "w-[42px] h-[42px] rounded-[11px] bg-white border border-line flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] flex-shrink-0 transition-transform group-hover:scale-105 overflow-hidden p-1",
          pill && "max-lg:h-[34px] max-lg:w-[34px] max-lg:rounded-full max-lg:border-0 max-lg:p-0.5 max-lg:shadow-none"
        )}
      >
        <Image
          src="/logo_new.png"
          alt="Kryvazent Logo"
          width={32}
          height={32}
          className="object-contain w-full h-full"
          priority
        />
      </span>
      <span className="flex flex-col leading-[1.12]">
        <span
          className={cn(
            "font-syncopate font-black text-[16.5px] tracking-[0.1em] text-foreground",
            pill && "max-lg:text-[13.5px] max-lg:tracking-[0.06em] max-lg:[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]"
          )}
        >
          KRYV<em className="not-italic text-primary">A</em>ZENT
        </span>
        <span className="hidden lg:block text-[8.5px] font-bold tracking-[0.34em] uppercase text-subtle">
          Software Engineering
        </span>
      </span>
    </Link>
  );
}

/* ── Progress Bar ─────────────────────────────────────── */
function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="fixed top-0 left-0 z-[120] h-[3px] rounded-r-full bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] transition-[width_.1s]"
      style={{ width: `${width}%` }}
    />
  );
}

/* ── Theme toggle ─────────────────────────────────────── */
function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read current data-theme set by the inline script (or default)
    const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    const saved = localStorage.getItem("kv-theme") as "dark" | "light" | null;
    const initial = saved ?? current ?? "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("kv-theme", next); } catch (_) {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "w-[41px] h-[41px] rounded-[11px] border border-line bg-surface flex items-center justify-center cursor-pointer text-muted transition-all hover:border-primary hover:text-primary hover:-translate-y-px",
        MOBILE_ICON_BTN
      )}
    >
      {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}

/* ── Back-to-top ──────────────────────────────────────── */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced.current ? "auto" : "smooth" })}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14, pointerEvents: show ? "auto" : "none" }}
      className="fixed bottom-[max(26px,env(safe-area-inset-bottom,0px))] right-[max(26px,env(safe-area-inset-right,0px))] z-[90] w-[46px] h-[46px] rounded-[13px] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white border-0 cursor-pointer flex items-center justify-center shadow-[0_10px_26px_rgba(214,33,51,0.4)] hover:-translate-y-1 transition-transform"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[19px] h-[19px]">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </motion.button>
  );
}

/* ── Main Nav ─────────────────────────────────────────── */
export default function NavNew() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy — only meaningful on the homepage */
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_SECTIONS.map((s) => s.anchor);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [isHome]);

  /* lock body when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <>
      <ProgressBar />

      {/* Skip link */}
      <a
        href={isHome ? "#services" : "/#services"}
        className="fixed top-[-60px] left-4 z-[200] bg-primary text-white px-[18px] py-[10px] rounded-[10px] font-bold no-underline transition-[top_.25s] focus:top-[14px]"
      >
        Skip to content
      </a>

      <nav
        id="navbar"
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] h-[74px] max-lg:h-[72px] flex items-center transition-[background,border-color,box-shadow] duration-300 border-b",
          scrolled
            ? "backdrop-blur-[18px] border-line shadow-[var(--shadow-sm)] max-lg:border-transparent max-lg:shadow-none max-lg:backdrop-blur-none max-lg:![background:transparent]"
            : "border-transparent"
        )}
        style={scrolled ? { background: "var(--nav-bg)" } : undefined}
      >
        <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)] flex items-center justify-between gap-3">
          <Logo pill isHome={isHome} />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_SECTIONS.map(({ label, anchor }) => {
              const href = sectionHref(anchor, isHome);
              const isActive = isHome ? active === anchor : pathname.startsWith(`/${anchor}`);
              return (
                <Link
                  key={anchor}
                  href={href}
                  className={cn(
                    "relative px-[14px] py-[9px] text-[14.5px] font-medium rounded-[9px] transition-colors duration-200 no-underline",
                    isActive
                      ? "text-foreground after:absolute after:left-[14px] after:right-[14px] after:bottom-[2px] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#FF4757] after:to-[#9E1424]"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-[10px]">
            <ThemeToggle />
            <Link
              href={contactHref}
              className="hidden lg:inline-flex items-center justify-center px-5 py-[11px] rounded-[11px] text-[13px] font-semibold font-syncopate bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] transition-all duration-200"
            >
              Start a Project
            </Link>
            <button
              className={cn(
                "flex lg:hidden w-[41px] h-[41px] rounded-[11px] border border-line bg-surface items-center justify-center text-muted hover:border-primary hover:text-primary transition-all",
                MOBILE_ICON_BTN
              )}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-[110] bg-black/55 backdrop-blur-[4px]"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "102%" }} animate={{ x: 0 }} exit={{ x: "102%" }}
              transition={{ type: "tween", duration: 0.38, ease: [0.25, 0.8, 0.3, 1] }}
              aria-label="Mobile menu"
              className="fixed top-0 right-0 bottom-0 z-[115] w-[min(350px,88vw)] flex flex-col bg-surface-strong border-l border-line px-[26px] py-[22px] pb-[30px] overflow-y-auto"
            >
              {/* Drawer head */}
              <div className="flex items-center justify-between mb-[26px]">
                <Logo isHome={isHome} />
                <button
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="w-[41px] h-[41px] rounded-[11px] border border-line bg-surface flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all"
                >
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-1">
                {[...NAV_SECTIONS, ...DRAWER_EXTRA_SECTIONS].map(({ label, anchor }) => (
                  <Link
                    key={anchor}
                    href={sectionHref(anchor, isHome)}
                    onClick={closeDrawer}
                    className="flex items-center justify-between no-underline text-foreground font-syncopate font-semibold text-[17px] px-3 py-[13px] rounded-[12px] transition-colors hover:bg-surface hover:text-primary"
                  >
                    {label}
                    <ChevronRight className="w-[15px] h-[15px] text-subtle" />
                  </Link>
                ))}
              </div>

              <Link
                href={contactHref}
                onClick={closeDrawer}
                className="mt-[22px] w-full flex items-center justify-center px-5 py-[15px] rounded-[13px] font-syncopate font-bold text-[13px] tracking-[0.01em] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] transition-all"
              >
                Start a Project
              </Link>

              {/* Contact info */}
              <div className="mt-auto pt-[26px] border-t border-line flex flex-col gap-3 text-[14px] text-muted">
                <a href="mailto:info@kryvazent.com" className="flex items-center gap-[10px] text-muted no-underline hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  info@kryvazent.com
                </a>
                <a href="tel:+94704443997" className="flex items-center gap-[10px] text-muted no-underline hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  +94 70 444 3997
                </a>
                <span className="flex items-center gap-[10px]">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  Colombo, Sri Lanka
                </span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}
