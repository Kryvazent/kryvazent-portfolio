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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      aria-label="Primary navigation"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 py-4",
        isScrolled ? "glass border-b border-line py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_0_22px_rgba(255,255,255,0.18)] ring-1 ring-white/70 transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
            <Image
              src="/logo_new.png"
              alt="Kryvazent Logo"
              fill
              sizes="48px"
              className="object-contain p-1"
            />
          </div>
          <span className="text-base font-bold tracking-normal text-primary uppercase font-syncopate sm:text-xl">
            Kryvazent
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/80 transition-all border-glow"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-line mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted hover:text-primary transition-colors font-rajdhani"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-xl bg-primary text-white font-bold tracking-widest uppercase text-sm font-syncopate border-glow"
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
