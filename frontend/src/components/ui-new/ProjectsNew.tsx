"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { FEATURED_PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsNew() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden bg-surface-strong border-y border-line"
    >
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* Head */}
        <div className="flex flex-wrap gap-5 justify-between items-end mb-[52px]">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
              Capabilities in action
            </span>
            <h2
              id="projects-new-heading"
              className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-3"
            >
              Project{" "}
              <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-muted max-w-[640px] text-[16.5px] font-rajdhani">
              Software products and technical systems Kryvazent can plan, build, deploy, and improve.
            </p>
          </motion.div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-[11px] rounded-[11px] border border-line bg-surface font-syncopate font-bold text-[13px] text-foreground no-underline hover:border-primary hover:text-primary transition-all duration-200"
            >
              <LayoutGrid className="w-[14px] h-[14px]" />
              See More
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-syncopate font-bold text-[14px] no-underline hover:opacity-80 transition-opacity"
            >
              Discuss your project
              <ArrowUpRight className="w-[15px] h-[15px]" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              delay={i * 0.08}
              animateOn="viewport"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
