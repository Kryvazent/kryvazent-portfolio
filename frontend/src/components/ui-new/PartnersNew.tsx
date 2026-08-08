"use client";

import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import { useSiteContent } from "@/components/ContentProvider";

/** Map CMS tone → card background + text */
const TONE_CLS = {
  dark:  "bg-[#050505] text-white",
  gray:  "bg-[#4a4a4a] text-white",
  light: "bg-white text-[#111318]",
} as const;

/** Static fallback shown while content loads or if API fails */
const FALLBACK = [
  { name: "Vision Expert", tagline: "Optical Studio", logoUrl: "", initials: "VE", tone: "dark"  as const },
  { name: "Rajapura",      tagline: "Since 1973",     logoUrl: "", initials: "R",  tone: "gray"  as const },
  { name: "EMergeSL",      tagline: "",               logoUrl: "/partners/emergesl.jpeg", initials: "ES", tone: "light" as const },
  { name: "Vision Expert", tagline: "Optical Studio", logoUrl: "", initials: "VE", tone: "dark"  as const },
  { name: "Rajapura",      tagline: "Since 1973",     logoUrl: "", initials: "R",  tone: "gray"  as const },
  { name: "EMergeSL",      tagline: "",               logoUrl: "/partners/emergesl.jpeg", initials: "ES", tone: "light" as const },
];

type Partner = {
  name: string;
  tagline: string;
  logoUrl: string;
  initials: string;
  tone: "dark" | "gray" | "light";
};

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
        relative flex h-24 w-[190px] shrink-0 items-center justify-center
        overflow-hidden rounded-[16px] border border-line p-4
        shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        transition-[border-color,transform] duration-300
        hover:border-[rgba(214,33,51,0.4)]
        ${TONE_CLS[partner.tone]}
      `}
    >
      {partner.logoUrl ? (
        <img
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="text-center">
          <strong className="block font-syncopate font-black text-[16px] tracking-[0.06em]">
            {partner.initials || partner.name}
          </strong>
          {partner.tagline && (
            <span className="mt-1 block text-[9px] uppercase tracking-[0.16em] opacity-70">
              {partner.tagline}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

function Group({ partners, duplicate = false }: { partners: Partner[]; duplicate?: boolean }) {
  return (
    <div aria-hidden={duplicate} className="flex shrink-0 items-center gap-5 pr-5">
      {partners.map((partner, i) => (
        <PartnerCard key={`${duplicate ? "d" : "o"}-${partner.name}-${i}`} partner={partner} />
      ))}
    </div>
  );
}

export default function PartnersNew() {
  const { content, isLoaded } = useSiteContent();

  // Use live CMS data when loaded, otherwise show fallback — never return null
  const published = isLoaded
    ? content.partners.filter((p) => p.published)
    : [];

  const partners: Partner[] = published.length > 0 ? published : FALLBACK;

  return (
    <section
      id="customers"
      aria-labelledby="partners-new-heading"
      className="relative scroll-mt-[86px] py-[76px] overflow-hidden border-y border-line bg-surface-strong"
    >
      <FloatingShapes />

      {/* Heading */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)] mb-10 text-center">
        <span className="inline-flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
          Trusted network
        </span>
        <h2
          id="partners-new-heading"
          className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15]"
        >
          Verified{" "}
          <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
            Network
          </span>{" "}
          Partners
        </h2>
      </div>

      {/* Marquee — tile 4× so short lists never show a gap */}
      <div
        className="relative z-10 overflow-hidden py-2"
        style={{
          WebkitMaskImage: "linear-gradient(to right,transparent,black 8%,black 92%,transparent)",
          maskImage:       "linear-gradient(to right,transparent,black 8%,black 92%,transparent)",
        }}
      >
        <div
          className="flex w-max hover:[animation-play-state:paused]"
          style={{ animation: "marquee-partners-new 18s linear infinite" }}
        >
          {/* Render 4 copies: the first 2 are the "real" set, the second 2 are
              the seamless duplicate. translateX(-50%) snaps back to start. */}
          <Group partners={partners} />
          <Group partners={partners} />
          <Group partners={partners} duplicate />
          <Group partners={partners} duplicate />
        </div>
      </div>

      <style>{`
        @keyframes marquee-partners-new {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
