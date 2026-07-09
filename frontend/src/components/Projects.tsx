"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import FloatingShapes from "./FloatingShapes";
import { useSiteContent } from "./ContentProvider";

export default function Projects() {
  const { content } = useSiteContent();
  const projects = content.projects.filter((project) => project.published);
  if (!projects.length) return null;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative overflow-hidden bg-surface px-6 py-12 lg:py-24">
      <FloatingShapes />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div><h2 id="projects-heading" className="mb-4 text-2xl font-bold font-syncopate md:text-5xl">Project Capabilities</h2><div className="mb-6 h-1.5 w-20 rounded-full bg-primary" /><p className="max-w-xl text-muted">Software products and technical systems Kryvazent can plan, build, deploy, and improve.</p></div>
          <Link href="/#contact" className="flex items-center gap-2 font-bold text-primary hover:underline">Discuss Your Project <ExternalLink className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          {projects.map((project, index) => (
            <motion.article key={`${project.title}-${index}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="group relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#050505]">
              {/* CMS images may come from any host, so a native image avoids a deploy-time host allowlist. */}
              <img src={project.image} alt={`${project.title} project`} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-8">
                <div className="mb-2 flex justify-between gap-3"><span className="text-xs font-black uppercase tracking-widest text-primary font-syncopate">{project.category}</span><span className="text-[10px] uppercase text-white/70">Outcome: {project.outcome}</span></div>
                <h3 className="mb-3 text-xl font-bold uppercase text-white font-syncopate md:text-3xl">{project.title}</h3>
                <div className="mb-4 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded border border-white/30 bg-black/40 px-2 py-1 text-[9px] uppercase text-white">{tech}</span>)}</div>
                <p className="text-sm text-white/90">{project.description}</p>
                <p className="mt-3 border-t border-white/10 pt-3 text-[10px] uppercase tracking-widest text-white/60">Use case: {project.useCase}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
