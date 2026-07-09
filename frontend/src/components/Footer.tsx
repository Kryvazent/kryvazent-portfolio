"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Share2, Globe, Cpu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_0_18px_rgba(255,255,255,0.14)] ring-1 ring-white/70">
              <Image src="/logo_new.png" alt="Kryvazent Logo" fill sizes="40px" className="object-contain p-1" />
            </div>
            <span className="text-lg font-bold tracking-normal uppercase font-syncopate text-primary">Kryvazent</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="mailto:info@kryvazent.com" className="text-subtle hover:text-primary transition-colors" aria-label="Email Kryvazent">
              <MessageSquare className="w-5 h-5" />
            </Link>
            <Link href="/" className="text-subtle hover:text-primary transition-colors" aria-label="Share Kryvazent website">
              <Share2 className="w-5 h-5" />
            </Link>
            <Link href="/" className="text-subtle hover:text-primary transition-colors" aria-label="Kryvazent website">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="/#services" className="text-subtle hover:text-primary transition-colors" aria-label="Kryvazent services">
              <Cpu className="w-5 h-5" />
            </Link>
          </div>

          <div className="text-subtle text-sm font-rajdhani">
            <p>Copyright {new Date().getFullYear()} Kryvazent Systems Inc. All rights reserved.</p>
            <div className="mt-1 flex justify-center gap-3 md:justify-start">
              <Link href="/privacy/" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms/" className="hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
