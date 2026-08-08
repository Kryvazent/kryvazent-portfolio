"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { primaryNavLinks } from "@/lib/seo";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      aria-label="Primary navigation"
      className={cn(
        "fixed top-0 z-50 w-full border-b border-line bg-background px-4 transition-[padding,box-shadow] duration-300 sm:px-6",
        isScrolled
          ? "py-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          : "py-4 shadow-none"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-line transition-transform group-hover:scale-105 sm:h-11 sm:w-11">
            <Image
              src="/logo_new.png"
              alt="Kryvazent Logo"
              fill
              sizes="44px"
              className="object-contain p-0.5"
              priority
            />
          </div>
          <span className="font-syncopate text-base font-bold uppercase tracking-normal text-foreground transition-colors group-hover:text-primary sm:text-lg">
            Kryvazent
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-3 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-red"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-line p-2 text-foreground transition-colors hover:bg-surface-strong hover:text-primary md:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-1 py-4">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-3 font-rajdhani text-lg font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 w-full rounded-lg bg-primary py-3.5 text-center font-syncopate text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-red"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
