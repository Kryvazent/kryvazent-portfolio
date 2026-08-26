"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";

/* ─────────────────────────────────────────────────────────────
   Partner data
   Each partner is one of three visual variants:
   • "logo"   — white card, image/logo fills the card
   • "text"   — solid coloured card, initials + tagline
   • "photo"  — full-bleed photo background + dark scrim + text
───────────────────────────────────────────────────────────── */
type LogoPartner = {
  type: "logo";
  name: string;
  src: string;
};

type TextPartner = {
  type: "text";
  name: string;
  initials: string;
  tagline: string;
  bg: string;      // any valid CSS background colour
  color: string;   // text colour
};

type PhotoPartner = {
  type: "photo";
  name: string;
  initials: string;
  tagline: string;
  src: string;
};

type Partner = LogoPartner | TextPartner | PhotoPartner;

const PARTNERS: Partner[] = [
  {
    type: "text",
    name: "Vision Expert",
    initials: "VE",
    tagline: "Optical Studio",
    bg: "#050505",
    color: "#ffffff",
  },
  {
    type: "photo",
    name: "Rajapura",
    initials: "Rajapura",
    tagline: "Since 1973",
    src: "/partners/rajapura1.png",
  },
  {
    type: "logo",
    name: "EMergeSL",
    src: "/partners/emergesl.jpeg",
  },
];

/* ─────────────────────────────────────────────────────────────
   Card variants
───────────────────────────────────────────────────────────── */
function LogoCard({ partner }: { partner: LogoPartner }) {
  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      <Image
        src={partner.src}
        alt={`${partner.name} logo`}
        fill
        className="object-contain p-3"
        sizes="190px"
      />
    </div>
  );
}

function TextCard({ partner }: { partner: TextPartner }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center text-center px-3"
      style={{ background: partner.bg, color: partner.color }}
    >
      <strong className="block font-syncopate font-black text-[16px] tracking-[0.06em] leading-none">
        {partner.initials}
      </strong>
      {partner.tagline && (
        <span className="mt-[6px] block font-syncopate text-[9px] uppercase tracking-[0.18em] opacity-60">
          {partner.tagline}
        </span>
      )}
    </div>
  );
}

function PhotoCard({ partner }: { partner: PhotoPartner }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={partner.src}
        alt={partner.name}
        fill
        className="object-cover"
        sizes="190px"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single card wrapper — shared sizing, border, hover
───────────────────────────────────────────────────────────── */
function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-24 w-[190px] shrink-0 overflow-hidden rounded-[16px] border border-line shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-[border-color] duration-300 hover:border-[rgba(214,33,51,0.4)]"
    >
      {partner.type === "logo"  && <LogoCard  partner={partner} />}
      {partner.type === "text"  && <TextCard  partner={partner} />}
      {partner.type === "photo" && <PhotoCard partner={partner} />}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marquee row — renders 4 copies for seamless infinite scroll
───────────────────────────────────────────────────────────── */
function MarqueeRow({ partners }: { partners: Partner[] }) {
  const copies = [0, 1, 2, 3];
  return (
    <div
      className="flex w-max"
      style={{ animation: "partners-marquee 20s linear infinite" }}
    >
      {copies.map((copyIdx) => (
        <div
          key={copyIdx}
          aria-hidden={copyIdx > 0}
          className="flex shrink-0 items-center gap-5 pr-5"
        >
          {partners.map((p, i) => (
            <PartnerCard key={`${copyIdx}-${i}`} partner={p} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function PartnersNew() {
  return (
    <section
      id="customers"
      aria-labelledby="partners-heading"
      className="relative scroll-mt-[86px] py-[76px] overflow-hidden border-y border-line bg-surface-strong"
    >
      <FloatingShapes />

      {/* Heading */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)] mb-10 text-center">
        <span className="inline-flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
          Trusted network
        </span>
        <h2
          id="partners-heading"
          className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15]"
        >
          Verified{" "}
          <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
            Network
          </span>{" "}
          Partners
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="relative z-10 overflow-hidden py-2"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <MarqueeRow partners={PARTNERS} />
      </div>

      <style>{`
        @keyframes partners-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
}
