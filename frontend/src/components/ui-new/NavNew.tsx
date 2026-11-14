"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronRight, Mail, Phone, MapPin, Package, ArrowUpRight, QrCode, Award } from "lucide-react";
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

const PRODUCT_LINKS = [
  { label: "QR Code Generator", href: "https://qr-code-generator-tan-zeta.vercel.app/", description: "Create branded QR codes" },
  { label: "Bulk Email Sender", href: "https://react-sepia-beta.vercel.app/", description: "Personalized email campaigns" },
  { label: "Bulk Certificate Generator", href: "https://msa-certificate-generator.vercel.app/", description: "Design attendance certificates" },
] as const;

const MOBILE_ICON_BTN =
  "max-lg:bg-surface-strong max-lg:shadow-[var(--shadow-sm)] max-lg:w-[42px] max-lg:h-[42px]";

/* â”€â”€ helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/** Returns the correct href: anchor on homepage, full path+hash on sub-pages. */
function sectionHref(anchor: string, isHome: boolean): string {
  return isHome ? `#${anchor}` : `/#${anchor}`;
}

/* â”€â”€ Logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ Theme toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kv-theme") as "dark" | "light" | null;
    const fromDom = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    const initial = saved ?? fromDom ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("kv-theme", next); } catch (_) {}
  };

  // Render a neutral placeholder until mounted to avoid SSR/client mismatch
  const icon = !mounted ? null : theme === "dark"
    ? <Sun className="w-[18px] h-[18px]" />
    : <Moon className="w-[18px] h-[18px]" />;

  const label = !mounted
    ? "Toggle theme"
    : theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className={cn(
        "w-[41px] h-[41px] rounded-[11px] border border-line bg-surface flex items-center justify-center cursor-pointer text-muted transition-all hover:border-primary hover:text-primary hover:-translate-y-px",
        MOBILE_ICON_BTN
      )}
    >
      {icon}
    </button>
  );
}

/* â”€â”€ Back-to-top â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ Main Nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function NavNew() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy â€” only meaningful on the homepage */
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
            <div className="relative hidden lg:block">
              <button type="button" onClick={() => setProductsOpen((open) => !open)} aria-label="Show Kryvazent products" aria-expanded={productsOpen} className="h-[42px] rounded-[11px] border border-line bg-surface px-3 flex items-center justify-center gap-2 text-muted hover:border-primary hover:text-primary transition-all">
                <Package className="w-[18px] h-[18px]" /><span className="text-[13px] font-semibold">Products</span>
              </button>
              {productsOpen && <div className="absolute right-0 top-[52px] z-[120] w-[360px] overflow-hidden rounded-[20px] border border-line bg-surface-strong shadow-[0_24px_70px_rgba(18,24,32,0.22)] ring-1 ring-black/[0.03]">
                <div className="flex items-center justify-between border-b border-line bg-[linear-gradient(115deg,rgba(255,71,87,0.12),transparent_70%)] px-5 py-4">
                  <div><p className="m-0 text-[10px] font-bold uppercase tracking-[0.2em] text-primary font-syncopate">Kryvazent products</p><p className="mt-1 mb-0 text-[12px] text-muted">Small tools, ready to use</p></div>
                  <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">03 PRODUCTS</span>
                </div>
                <div className="p-2.5">
                  {PRODUCT_LINKS.map((product, index) => { const ProductIcon = [QrCode, Mail, Award][index]; return <a key={product.href} href={product.href} target="_blank" rel="noopener noreferrer" onClick={() => setProductsOpen(false)} className="group flex items-center gap-3 rounded-[13px] px-3 py-3 text-foreground no-underline transition-all duration-200 hover:bg-surface hover:shadow-[0_5px_18px_rgba(20,25,32,0.06)]">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] border border-primary/10 bg-primary/[0.07] text-primary transition-colors group-hover:bg-primary group-hover:text-white"><ProductIcon className="h-[19px] w-[19px]" strokeWidth={1.8}/></span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1"><strong className="text-[13px] font-semibold leading-tight">{product.label}</strong><small className="text-[12px] leading-snug text-muted">{product.description}</small></span>
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-subtle transition-all group-hover:bg-primary/10 group-hover:text-primary"><ArrowUpRight className="h-4 w-4"/></span>
                  </a>})}
                </div>
                <div className="flex items-center gap-2 border-t border-line px-5 py-3 text-[10px] text-muted"><Package className="h-3.5 w-3.5 text-primary"/>Built by Kryvazent Software Engineering</div>
              </div>}
            </div>            <ThemeToggle />
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
              <div className="mt-5 border-t border-line pt-5">
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary font-syncopate">Kryvazent products</p>
                {PRODUCT_LINKS.map((product) => <a key={product.href} href={product.href} target="_blank" rel="noopener noreferrer" onClick={closeDrawer} className="flex items-center justify-between gap-3 rounded-[12px] px-3 py-[12px] text-foreground no-underline hover:bg-surface transition-colors"><span className="flex items-center gap-3"><Package className="w-[17px] h-[17px] text-primary"/><span className="font-syncopate font-semibold text-[12px]">{product.label}</span></span><ArrowUpRight className="w-[15px] h-[15px] text-subtle"/></a>)}
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


