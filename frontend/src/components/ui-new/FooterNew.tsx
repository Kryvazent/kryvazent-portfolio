"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, Globe, MapPin, MessageCircle } from "lucide-react";

/* ── helpers ─────────────────────────────────────────── */
function sectionHref(anchor: string, isHome: boolean): string {
  return isHome ? `#${anchor}` : `/#${anchor}`;
}

/* ── Data ─────────────────────────────────────────────── */
const COMPANY_SECTIONS = [
  { label: "About",    anchor: "about"     },
  { label: "Projects", anchor: "projects", page: "/projects" },
  { label: "Partners", anchor: "customers" },
  { label: "Pricing",  anchor: "pricing"   },
  { label: "FAQ",      anchor: "faq"       },
];

const SERVICE_SECTIONS = [
  { label: "Custom Web Apps",        anchor: "services" },
  { label: "Mobile Development",     anchor: "services" },
  { label: "AI Product Engineering", anchor: "services" },
  { label: "Cloud & DevOps",         anchor: "services" },
  { label: "Backend & APIs",         anchor: "services" },
  { label: "UI/UX Engineering",      anchor: "services" },
];

const SOCIAL = [
  { href: "mailto:info@kryvazent.com",       label: "Email",     Icon: Mail,        external: false },
  { href: "https://wa.me/94704443997",        label: "WhatsApp",  Icon: MessageCircle, external: true  },
  { href: "tel:+94704443997",                label: "Phone",     Icon: Phone,       external: false },
  { href: "https://www.kryvazent.com",        label: "Website",   Icon: Globe,       external: true  },
];

const CONTACT_ITEMS = [
  { href: "mailto:info@kryvazent.com", Icon: Mail,  text: "info@kryvazent.com"       },
  { href: "tel:+94704443997",         Icon: Phone, text: "+94 70 444 3997"           },
  { href: "https://www.kryvazent.com", Icon: Globe, text: "www.kryvazent.com", external: true },
  { href: null,                        Icon: MapPin, text: "Colombo, Western Province, Sri Lanka" },
];

/* ── Logo ─────────────────────────────────────────────── */
function Logo({ isHome = false }: { isHome?: boolean }) {
  return (
    <Link href={isHome ? "#hero" : "/"} className="inline-flex items-center gap-[11px] no-underline group">
      <span className="w-[42px] h-[42px] rounded-[11px] bg-white border border-line flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] flex-shrink-0 overflow-hidden transition-transform group-hover:scale-105">
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

/* ── Collapsible section removed — no longer used on mobile ── */

/* ── Footer ───────────────────────────────────────────── */
export default function FooterNew() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const year = new Date().getFullYear();
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <footer className="border-t border-line bg-surface-strong pt-10 pb-6 lg:pt-16 lg:pb-8">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* ══════════════════════════════════════
            MOBILE  < lg
        ══════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center text-center pb-6">

          {/* Brand */}
          <Logo isHome={isHome} />
          <p className="text-muted text-[13.5px] mt-4 mb-6 font-rajdhani leading-relaxed max-w-[300px]">
            Reliable software engineering for web, mobile, AI, cloud, and everything in between.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mb-8">
            {SOCIAL.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="w-[42px] h-[42px] rounded-[11px] border border-line bg-surface flex items-center justify-center text-muted transition-all hover:border-primary hover:text-primary"
              >
                <Icon className="w-[17px] h-[17px]" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={contactHref}
            className="w-full max-w-[320px] flex items-center justify-center py-[14px] rounded-[12px] font-syncopate text-[12px] font-bold uppercase tracking-[0.06em] text-white bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] shadow-[0_8px_22px_rgba(214,33,51,0.3)] hover:-translate-y-[1px] transition-all"
          >
            Start a Project
          </Link>
        </div>

        {/* ══════════════════════════════════════
            DESKTOP  ≥ lg  — unchanged 4-col grid
        ══════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 mb-12">

          {/* Brand col */}
          <div>
            <Logo isHome={isHome} />
            <p className="text-muted text-[14px] mt-4 mb-[22px] max-w-[300px] font-rajdhani leading-relaxed">
              Reliable software engineering for web, mobile, AI, cloud, and everything in between.
            </p>
            <div className="flex gap-[10px]">
              {SOCIAL.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
              {COMPANY_SECTIONS.map(({ label, anchor }) => (
                <li key={label}>
                  <Link href={sectionHref(anchor, isHome)} className="text-muted text-[14px] no-underline transition-colors hover:text-primary font-rajdhani">
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
              {SERVICE_SECTIONS.map(({ label, anchor }) => (
                <li key={label}>
                  <Link href={sectionHref(anchor, isHome)} className="text-muted text-[14px] no-underline transition-colors hover:text-primary font-rajdhani">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="font-syncopate text-[12px] font-bold tracking-[0.2em] uppercase text-foreground mb-[18px]">Contact</h4>
            <ul className="flex flex-col gap-[11px] list-none p-0 m-0">
              {CONTACT_ITEMS.map(({ href, Icon, text, ...rest }) => (
                <li key={text} className="flex items-start gap-[10px] text-muted text-[14px]">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-[3px]" />
                  {href ? (
                    <a
                      href={href}
                      {...("external" in rest && rest.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-muted no-underline hover:text-primary transition-colors font-rajdhani"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="font-rajdhani">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar — both layouts ── */}
        <div className="border-t border-line pt-5 lg:pt-[26px] flex flex-col sm:flex-row gap-3 sm:gap-[14px] justify-between items-start sm:items-center text-subtle text-[13px] lg:text-[13.5px] font-rajdhani mt-5 lg:mt-0">
          <p>© {year} Kryvazent. All rights reserved.</p>
          <div className="flex gap-5 sm:gap-[22px]">
            <Link href="/privacy/" className="text-subtle no-underline hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms/"   className="text-subtle no-underline hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
