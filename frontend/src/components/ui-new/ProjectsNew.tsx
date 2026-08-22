"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const ALL_PROJECTS = [
  {
    image: "/partners/rajapura-bg.png",
    alt: "Rajapura Herbal — herbal product e-commerce platform",
    category: "E-Commerce",
    outcome: "Live product",
    title: "Rajapura Herbal",
    tech: ["Web", "E-Commerce", "Product Catalogue"],
    desc: "A full e-commerce platform for a heritage Sri Lankan herbal brand — built with product catalogues, online ordering, and brand storytelling.",
    useCase: "Herbal & wellness retail",
    link: "https://rajapuraherbal.lk",
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    alt: "Emerge Sri Lanka — community and social impact platform",
    category: "Web Application",
    outcome: "Live platform",
    title: "Emerge Sri Lanka",
    tech: ["Next.js", "Web", "Community Platform"],
    desc: "A digital platform for Emerge Sri Lanka — enabling community engagement, programme visibility, and social impact communication.",
    useCase: "Non-profit & community",
    link: "https://emergesrilanka.org",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    alt: "AI Analytics Dashboard",
    category: "AI Engineering",
    outcome: "Faster reporting",
    title: "AI Analytics Dashboard",
    tech: ["Next.js", "Python", "ML Workflows"],
    desc: "A reporting platform concept for teams that need predictive insights, workflow visibility, and decision-ready dashboards.",
    useCase: "Data-led operations",
    link: null,
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    alt: "Customer Operations Portal",
    category: "Web Application",
    outcome: "Cleaner workflows",
    title: "Customer Operations Portal",
    tech: ["React", "Node.js", "Cloud APIs"],
    desc: "A secure portal pattern for customer records, service requests, internal approvals, notifications, and admin reporting.",
    useCase: "Growing service teams",
    link: null,
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    alt: "Cloud Automation Layer",
    category: "Cloud & DevOps",
    outcome: "Reliable launches",
    title: "Cloud Automation Layer",
    tech: ["Docker", "CI/CD", "Monitoring"],
    desc: "A deployment and infrastructure workflow for applications that need stable releases, monitoring, backups, and scaling paths.",
    useCase: "Production software",
    link: null,
  },
];

/* Only the first 3 shown on the homepage */
const PROJECTS = ALL_PROJECTS.slice(0, 3);

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
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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

              {/* Dark scrim — always dark regardless of theme so text stays readable over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,5,8,0.97)] via-[rgba(4,5,8,0.65)] to-[rgba(4,5,8,0.18)]" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Meta chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-[rgba(214,33,51,0.92)] text-white">
                    {p.category}
                  </span>
                  <span className="font-syncopate text-[9.5px] font-bold tracking-[0.1em] uppercase px-[11px] py-[5px] rounded-full bg-white/[0.15] text-white border border-white/[0.25] backdrop-blur-[6px]">
                    {p.outcome}
                  </span>
                </div>

                <h3 className="text-white font-syncopate text-[19px] font-bold tracking-[-0.01em] mb-[10px]">{p.title}</h3>

                <div className="flex flex-wrap gap-[6px] mb-3">
                  {p.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-white/80 border border-white/[0.25] bg-black/[0.40] px-[9px] py-[3px] rounded-[6px]">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-white/80 text-[13.5px] leading-[1.6] font-rajdhani">{p.desc}</p>

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
        </div>
      </div>
    </section>
  );
}
