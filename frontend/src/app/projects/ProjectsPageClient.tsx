"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { ALL_PROJECTS } from "@/data/projects";

const ALL_LABEL = "All";

export default function ProjectsPageClient() {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(ALL_PROJECTS.map((p) => p.category)));
    return [ALL_LABEL, ...cats];
  }, []);

  const [active, setActive] = useState(ALL_LABEL);

  const filtered = useMemo(
    () => (active === ALL_LABEL ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section
      aria-labelledby="projects-page-grid-heading"
      className="relative overflow-hidden bg-surface-strong border-y border-line py-[72px]"
    >
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-[52px]">
          <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-subtle font-syncopate mr-1">
            <SlidersHorizontal className="w-[13px] h-[13px]" />
            Filter
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                "px-[14px] py-[7px] rounded-full font-syncopate text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-200",
                active === cat
                  ? "bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white shadow-[0_6px_18px_rgba(214,33,51,0.35)]"
                  : "border border-line bg-surface text-muted hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Visually hidden heading for a11y */}
        <h2 id="projects-page-grid-heading" className="sr-only">
          All Projects
        </h2>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="group relative rounded-[20px] overflow-hidden border border-line aspect-[4/4.6] transition-all duration-300 hover:-translate-y-[7px] hover:border-[rgba(214,33,51,0.45)] hover:shadow-[var(--shadow)]"
                style={{ background: "var(--surface-strong)" }}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover grayscale brightness-[0.85] transition-all duration-[800ms] group-hover:scale-[1.08] group-hover:grayscale-0 group-hover:brightness-90"
                  loading="lazy"
                />

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,5,8,0.97)] via-[rgba(4,5,8,0.65)] to-[rgba(4,5,8,0.18)]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-[rgba(214,33,51,0.92)] text-white">
                      {p.category}
                    </span>
                    <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-white/[0.15] text-white border border-white/[0.25] backdrop-blur-[6px]">
                      {p.outcome}
                    </span>
                  </div>

                  <h3 className="text-white font-syncopate text-[19px] font-bold tracking-[-0.01em] mb-[10px]">
                    {p.title}
                  </h3>

                  <div className="flex flex-wrap gap-[6px] mb-3">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-white/80 border border-white/[0.25] bg-black/[0.40] px-[9px] py-[3px] rounded-[6px]"
                      >
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
                        Visit Site
                        <ArrowUpRight className="w-[11px] h-[11px]" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted font-rajdhani text-[16px]">
            No projects in this category yet.
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-syncopate font-bold text-foreground text-[18px] mb-1">
              Have a project in mind?
            </p>
            <p className="text-muted font-rajdhani text-[15px]">
              Let&apos;s scope it together and build something that works.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-[13px] rounded-[11px] font-syncopate font-bold text-[13px] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] transition-all duration-200 whitespace-nowrap"
          >
            Discuss Your Project
            <ArrowUpRight className="w-[15px] h-[15px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
