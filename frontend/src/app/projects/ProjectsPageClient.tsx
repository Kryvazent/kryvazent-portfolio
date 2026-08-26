"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { ALL_PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ui-new/ProjectCard";

const ALL_LABEL = "All";

export default function ProjectsPageClient() {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(ALL_PROJECTS.map((p) => p.category)));
    return [ALL_LABEL, ...cats];
  }, []);

  const [active, setActive] = useState(ALL_LABEL);

  const filtered = useMemo(
    () =>
      active === ALL_LABEL
        ? ALL_PROJECTS
        : ALL_PROJECTS.filter((p) => p.category === active),
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
              <ProjectCard
                key={p.title}
                project={p}
                delay={i * 0.06}
                animateOn="immediate"
              />
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
