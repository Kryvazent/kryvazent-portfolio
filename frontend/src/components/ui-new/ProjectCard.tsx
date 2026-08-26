"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  delay?: number;
  animateOn?: "viewport" | "immediate";
}

export default function ProjectCard({
  project: p,
  delay = 0,
  animateOn = "viewport",
}: ProjectCardProps) {
  const motionProps: HTMLMotionProps<"article"> =
    animateOn === "viewport"
      ? {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.35, delay },
        }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, scale: 0.94 },
          transition: { duration: 0.3, delay },
        };

  return (
    <motion.article
      layout
      {...motionProps}
      className="project-card-frame group relative rounded-[20px] overflow-hidden border border-line aspect-[4/4.6] transition-all duration-300 hover:-translate-y-[7px] hover:border-[rgba(214,33,51,0.45)] hover:shadow-[var(--shadow)]"
      style={{ background: "var(--surface-strong)" }}
    >
      {/* ── Image — fills the entire card in both themes ── */}
      <Image
        src={p.image}
        alt={p.alt}
        fill
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        className="project-card-img object-cover transition-all duration-[800ms] group-hover:scale-[1.06]"
        loading="lazy"
      />

      {/* ══════════════════════════════════════════
          DARK THEME OVERLAY
          Gradient scrim + all text over the photo.
          Hidden in light mode via CSS (.pc-dark).
      ══════════════════════════════════════════ */}
      <div className="pc-dark absolute inset-0 flex flex-col justify-end p-6">
        {/* scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,5,8,0.96)] via-[rgba(4,5,8,0.68)] to-[rgba(4,5,8,0.20)] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-end h-full">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-[rgba(214,33,51,0.92)] text-white">
              {p.category}
            </span>
            <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full backdrop-blur-[6px] bg-white/[0.15] text-white border border-white/[0.25]">
              {p.outcome}
            </span>
          </div>
          <h3 className="text-white font-syncopate text-[19px] font-bold tracking-[-0.01em] mb-[10px]">
            {p.title}
          </h3>
          <div className="flex flex-wrap gap-[6px] mb-3">
            {p.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] text-white/80 border border-white/[0.25] bg-black/[0.40] px-[9px] py-[3px] rounded-[6px]">
                {t}
              </span>
            ))}
          </div>
          <p className="text-white/80 text-[13.5px] leading-[1.6] font-rajdhani">
            {p.description}
          </p>
          <div className="mt-3 pt-3 border-t border-white/[0.15] flex items-center justify-between gap-2">
            <p className="font-syncopate text-[10px] font-semibold tracking-[0.14em] uppercase text-white/50">
              Use case · {p.useCase}
            </p>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-syncopate text-[10px] font-bold tracking-[0.1em] uppercase text-primary hover:opacity-80 transition-opacity whitespace-nowrap"
                aria-label={`Visit ${p.title} website`}
              >
                Visit Site <ArrowUpRight className="w-[11px] h-[11px]" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          LIGHT THEME OVERLAY
          Single absolutely-positioned div covers
          the bottom ~60% of the card. The top
          portion is a CSS gradient fade from fully
          transparent → white, so there is no hard
          edge div that can glitch on hover.
          Hidden in dark mode via CSS (.pc-light).
      ══════════════════════════════════════════ */}
      <div
        className="pc-light absolute inset-x-0 bottom-0 hidden flex-col"
        style={{ height: "62%" }}
      >
        {/*
          Single background div — top 28% fades from white/0 to white,
          bottom 72% is solid white. No child div boundary = no seam.
        */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 28%, #ffffff 100%)",
          }}
        />

        {/* Content sits in the solid-white zone — pt-8 clears the 28% fade at any card size */}
        <div className="relative flex flex-col h-full px-5 pb-5 pt-8 overflow-hidden">
          <div className="flex flex-wrap gap-2 mb-[10px]">
            <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-[rgba(214,33,51,0.92)] text-white">
              {p.category}
            </span>
            <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-white text-[#525E6E] border border-[rgba(31,41,55,0.18)]">
              {p.outcome}
            </span>
          </div>
          <h3 className="text-[#232E3B] font-syncopate text-[17px] font-bold tracking-[-0.01em] mb-[8px] leading-[1.2]">
            {p.title}
          </h3>
          <div className="flex flex-wrap gap-[5px] mb-[9px]">
            {p.tech.map((t) => (
              <span key={t} className="font-mono text-[9.5px] text-[#525E6E] border border-[rgba(31,41,55,0.14)] bg-[#F4F5F7] px-[8px] py-[3px] rounded-[5px]">
                {t}
              </span>
            ))}
          </div>
          <p className="text-[#525E6E] text-[12.5px] leading-[1.55] font-rajdhani flex-1 min-h-0 line-clamp-3">
            {p.description}
          </p>
          <div className="mt-auto pt-[10px] border-t border-[rgba(31,41,55,0.09)] flex items-center justify-between gap-2">
            <p className="font-syncopate text-[9px] font-semibold tracking-[0.13em] uppercase text-[#8A93A1]">
              Use case · {p.useCase}
            </p>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-syncopate text-[10px] font-bold tracking-[0.1em] uppercase text-primary hover:opacity-80 transition-opacity whitespace-nowrap"
                aria-label={`Visit ${p.title} website`}
              >
                Visit Site <ArrowUpRight className="w-[11px] h-[11px]" />
              </a>
            )}
          </div>
        </div>
      </div>

    </motion.article>
  );
}
