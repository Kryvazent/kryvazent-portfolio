"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Globe, MapPin, MessageCircle } from "lucide-react";

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Partners", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const SERVICE_LINKS = [
  "Custom Web Apps",
  "Mobile Development",
  "AI Product Engineering",
  "Cloud & DevOps",
  "Backend & APIs",
  "UI/UX Engineering",
];

const SOCIAL = [
  { href: "mailto:info@kryvazent.com", label: "Email", Icon: Mail },
  { href: "https://wa.me/94704443997", label: "WhatsApp", Icon: MessageCircle, external: true },
  { href: "tel:+94704443997", label: "Phone", Icon: Phone },
  { href: "https://www.kryvazent.com", label: "Website", Icon: Globe, external: true },
];

function Logo() {
  return (
    <Link href="#hero" className="flex items-center gap-[11px] no-underline group">
      <span className="w-[42px] h-[42px] rounded-[11px] bg-white border border-line flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] flex-shrink-0 overflow-hidden">
        <Image src="/logo_new.png" alt="Kryvazent Logo" width={30} height={30} className="object-contain p-0.5" />
      </span>
      <span className="flex flex-col leading-[1.12]">
        <span className="font-syncopate font-black text-[16.5px] tracking-[0.1em] text-foreground">
          KRYV<em className="not-italic text-primary">A</em>ZENT
        </span>
        <span className="text-[8.5px] font-bold tracking-[0.34em] uppercase text-subtle">Software Engineering</span>
      </span>
    </Link>
  );
}

export default function FooterNew() {
  return (
    <footer className="border-t border-line bg-surface-strong pt-16 pb-[30px]">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 mb-12">

          {/* Brand col */}
          <div>
            <Logo />
            <p className="text-muted text-[14px] mt-4 mb-[22px] max-w-[300px] font-rajdhani leading-relaxed">
              Reliable software engineering for web, mobile, AI, cloud, and everything in between.
            </p>
            <div className="flex gap-[10px]">
              {SOCIAL.map(({ href, label, Icon, ...rest }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...("external" in rest ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-[41px] h-[41px] rounded-[11px] border border-line bg-surface flex items-center justify-center text-muted transition-all hover:border-primary hover:text-primary hover:-translate-y-px"
                >
                  <Icon className="w-[17px] h-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Company col */}
          <div>
            <h4 className="font-syncopate text-[12px] font-bold tracking-[0.2em] uppercase text-foreground mb-[18px]">Company</h4>
            <ul className="flex flex-col gap-[11px] list-none p-0 m-0">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-muted text-[14px] no-underline transition-colors hover:text-primary font-rajdhani">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col */}
          <div>
            <h4 className="font-syncopate text-[12px] font-bold tracking-[0.2em] uppercase text-foreground mb-[18px]">Services</h4>
            <ul className="flex flex-col gap-[11px] list-none p-0 m-0">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <Link href="#services" className="text-muted text-[14px] no-underline transition-colors hover:text-primary font-rajdhani">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="font-syncopate text-[12px] font-bold tracking-[0.2em] uppercase text-foreground mb-[18px]">Contact</h4>
            <ul className="flex flex-col gap-[11px] list-none p-0 m-0">
              <li className="flex items-start gap-[10px] text-muted text-[14px]">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-[3px]" />
                <a href="mailto:info@kryvazent.com" className="text-muted no-underline hover:text-primary transition-colors font-rajdhani">
                  info@kryvazent.com
                </a>
              </li>
              <li className="flex items-start gap-[10px] text-muted text-[14px]">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-[3px]" />
                <a href="tel:+94704443997" className="text-muted no-underline hover:text-primary transition-colors font-rajdhani">
                  +94 70 444 3997
                </a>
              </li>
              <li className="flex items-start gap-[10px] text-muted text-[14px]">
                <Globe className="w-4 h-4 text-primary flex-shrink-0 mt-[3px]" />
                <a href="https://www.kryvazent.com" target="_blank" rel="noopener noreferrer" className="text-muted no-underline hover:text-primary transition-colors font-rajdhani">
                  www.kryvazent.com
                </a>
              </li>
              <li className="flex items-start gap-[10px] text-muted text-[14px]">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-[3px]" />
                <span className="font-rajdhani">Colombo, Western Province,<br />Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-[26px] flex flex-wrap gap-[14px] justify-between items-center text-subtle text-[13.5px] font-rajdhani">
          <p>© {new Date().getFullYear()} Kryvazent Systems Inc. All rights reserved.</p>
          <div className="flex gap-[22px]">
            <Link href="/privacy/" className="text-subtle no-underline hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="text-subtle no-underline hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
