"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, Building2, Cloud, Crown, Database, Glasses, Shield, type LucideIcon } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

type LogoTone = "dark" | "gray" | "light";

interface PartnerLogo {
  name: string;
  initials?: string;
  tagline?: string;
  imageSrc?: string;
  icon?: LucideIcon;
  tone: LogoTone;
  wide?: boolean;
}

const partnerLogos: PartnerLogo[] = [
  {
    name: "Vision Expert",
    tagline: "Optical Studio",
    icon: Glasses,
    tone: "dark",
  },
  {
    name: "Rajapura",
    tagline: "Since 1973",
    icon: Crown,
    tone: "gray",
  },
  {
    name: "EMergeSL",
    imageSrc: "/partners/emergesl.jpeg",
    tone: "light",
    wide: true,
  },
  {
    name: "Quantum",
    initials: "Q",
    icon: Shield,
    tone: "dark",
  },
  {
    name: "MedNova",
    initials: "MN",
    icon: Activity,
    tone: "light",
  },
  {
    name: "CloudForge",
    initials: "CF",
    icon: Cloud,
    tone: "gray",
  },
  {
    name: "DataNest",
    initials: "DN",
    icon: Database,
    tone: "light",
  },
  {
    name: "Vertex Labs",
    initials: "VL",
    icon: Building2,
    tone: "dark",
  },
];

const logoToneClasses: Record<LogoTone, string> = {
  dark: "bg-[#050505] text-white",
  gray: "bg-[#4a4a4a] text-white",
  light: "bg-white text-[#111318]",
};

const PartnerLogoTile = ({ logo, index }: { logo: PartnerLogo; index: number }) => {
  const Icon = logo.icon;
  const sizeClasses = logo.wide
    ? "h-24 w-[260px] sm:h-28 sm:w-[320px]"
    : "h-24 w-24 sm:h-28 sm:w-28";
  const labelClasses = logo.initials ? "text-sm sm:text-base" : "text-[10px] sm:text-xs";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`relative flex ${sizeClasses} shrink-0 items-center justify-center overflow-hidden border border-line shadow-[0_12px_32px_rgba(0,0,0,0.08)] ${logoToneClasses[logo.tone]}`}
    >
      {logo.imageSrc ? (
        <Image
          src={logo.imageSrc}
          alt={`${logo.name} logo`}
          fill
          sizes="(max-width: 640px) 220px, 310px"
          className="object-contain p-4 grayscale contrast-125"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center">
          {Icon && <Icon className="mb-2 h-7 w-7 opacity-80" />}
          <span className={`${labelClasses} font-black leading-tight tracking-normal font-syncopate`}>
            {logo.initials ?? logo.name}
          </span>
          {logo.tagline && (
            <span className="mt-1 text-[8px] uppercase tracking-[0.18em] opacity-70 font-rajdhani">
              {logo.tagline}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

const Customers = () => {
  const renderLogoGroup = (ariaHidden = false) => (
    <div
      className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 md:gap-24 md:pr-24 lg:gap-28 lg:pr-28"
      aria-hidden={ariaHidden}
    >
      {partnerLogos.map((logo, index) => (
        <PartnerLogoTile key={`${ariaHidden ? "duplicate" : "primary"}-${logo.name}`} logo={logo} index={index} />
      ))}
    </div>
  );

  return (
    <section id="customers" aria-labelledby="customers-heading" className="py-12 lg:py-28 px-4 sm:px-6 border-y border-line bg-surface-strong relative overflow-hidden">
      <FloatingShapes />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 id="customers-heading" className="text-xl md:text-3xl font-bold uppercase tracking-[0.16em] lg:tracking-[0.3em] text-foreground mb-8 lg:mb-12 font-syncopate">
          Verified <span className="text-primary">Network</span> Partners
        </h2>

        <div className="relative -mx-4 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:-mx-6 lg:py-6">
          <div className="animate-marquee flex w-max items-center hover:[animation-play-state:paused]">
            {renderLogoGroup()}
            {renderLogoGroup(true)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
