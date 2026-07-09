"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FloatingShapes from "./FloatingShapes";

const projects = [
  {
    title: "AI Analytics Dashboard",
    category: "AI Product Engineering",
    description: "A reporting platform concept for teams that need predictive insights, workflow visibility, and decision-ready dashboards.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tech: ["Next.js", "Python", "ML Workflows"],
    outcome: "Faster reporting",
    useCase: "Data-led operations",
  },
  {
    title: "Customer Operations Portal",
    category: "Web Application Development",
    description: "A secure portal pattern for customer records, service requests, internal approvals, notifications, and admin reporting.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tech: ["React", "Node.js", "Cloud APIs"],
    outcome: "Cleaner workflows",
    useCase: "Growing service teams",
  },
  {
    title: "Cloud Automation Layer",
    category: "Cloud and DevOps",
    description: "A deployment and infrastructure workflow for applications that need stable releases, monitoring, backups, and scaling paths.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tech: ["Docker", "CI/CD", "Monitoring"],
    outcome: "Reliable launches",
    useCase: "Production software",
  },
  {
    title: "Mobile Booking Experience",
    category: "Mobile App Development",
    description: "A mobile app pattern for booking, customer accounts, notifications, payments, admin operations, and service updates.",
    image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=800",
    tech: ["Mobile UI", "APIs", "Payments"],
    outcome: "Smoother booking",
    useCase: "Customer products",
  },
];

const Projects = () => {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-12 lg:py-24 px-6 bg-surface relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-16 gap-6">
          <div>
            <h2 id="projects-heading" className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">Project Capabilities</h2>
            <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
            <p className="text-muted max-w-xl text-sm lg:text-base font-rajdhani">
              Examples of software products and technical systems Kryvazent can plan, design, build, deploy, and improve.
            </p>
          </div>
          <Link href="/#contact" className="text-primary font-bold hover:underline flex items-center gap-2 text-sm lg:text-base">
            Discuss Your Project <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="aspect-[16/9] w-full relative">
                <Image
                  src={project.image}
                  alt={`${project.title} software project example`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-90 transition-opacity" />
              </div>

              <div className="absolute inset-0 p-4 lg:p-8 flex flex-col justify-end">
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-1 lg:mb-2">
                    <span className="text-primary text-[10px] lg:text-sm font-black uppercase tracking-[0.2em] font-syncopate text-glow">
                      {project.category}
                    </span>
                    <span className="text-[8px] lg:text-[10px] text-white/70 font-mono uppercase tracking-widest">
                      OUTCOME://{project.outcome}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-white mb-2 lg:mb-4 font-syncopate uppercase tracking-normal leading-none">{project.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-4 lg:mb-6 opacity-100">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 lg:px-3 py-0.5 lg:py-1 text-[8px] lg:text-[10px] border border-white/30 text-white font-mono uppercase rounded-md bg-black/40 backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 lg:space-y-4">
                    <p className="text-white/90 text-xs lg:text-base max-w-lg font-rajdhani font-medium leading-relaxed drop-shadow-md">
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center border-t border-white/10 pt-2 lg:pt-4">
                      <span className="text-[11px] text-white/70 font-mono uppercase tracking-widest">
                        USE_CASE://{project.useCase}
                      </span>
                      <span className="text-[11px] text-white/70 font-mono uppercase tracking-widest">
                        DELIVERY://PLANNED_BUILD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
