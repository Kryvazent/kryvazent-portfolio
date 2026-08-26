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

type PhotoPartner = {
  type: "photo";
  name: string;
  initials: string;
  tagline: string;
  src: string;
};

type Partner = LogoPartner | PhotoPartner;

const PARTNERS: Partner[] = [
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
      {partner.type === "photo" && <PhotoCard partner={partner} />}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marquee row
   Renders the list enough times to fill the viewport, then
   animates exactly -50% so the loop is seamless at any count.
───────────────────────────────────────────────────────────── */
function MarqueeRow({ partners }: { partners: Partner[] }) {
  // Duplicate the array so each "half" has enough cards to fill wide screens
  const doubled = [...partners, ...partners, ...partners, ...partners];
  return (
    <div
      className="flex w-max"
      style={{ animation: "partners-marquee 18s linear infinite" }}
    >
      {/* First half — visible */}
      <div className="flex shrink-0 items-center gap-5 pr-5">
        {doubled.map((p, i) => (
          <PartnerCard key={`a-${i}`} partner={p} />
        ))}
      </div>
      {/* Second half — seamless duplicate (aria-hidden) */}
      <div aria-hidden className="flex shrink-0 items-center gap-5 pr-5">
        {doubled.map((p, i) => (
          <PartnerCard key={`b-${i}`} partner={p} />
        ))}
      </div>
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
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
