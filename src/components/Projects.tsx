"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Nova Dashboard",
    category: "FinTech / AI",
    description: "A futuristic financial monitoring system with predictive analytics and real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tech: ["Next.js", "Python", "TensorFlow"],
    stats: "40% faster insights",
    client: "Global Bank",
    year: "2099",
  },
  {
    title: "CyberCore CRM",
    category: "SaaS / Cloud",
    description: "Next-gen customer relationship management platform with seamless third-party integrations.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tech: ["React", "Node.js", "AWS"],
    stats: "10k+ active nodes",
    client: "Nexus Solutions",
    year: "2098",
  },
  {
    title: "Aether OS",
    category: "System Software",
    description: "A lightweight, secure operating system designed for edge computing and IoT devices.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tech: ["Rust", "C++", "Docker"],
    stats: "0.5ms latency",
    client: "SpaceX 2.0",
    year: "2099",
  },
  {
    title: "Vortex VR",
    category: "AR/VR / Gaming",
    description: "Immersive virtual reality engine that pushes the limits of real-time rendering and interactivity.",
    image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=800",
    tech: ["Unity", "C#", "Oculus SDK"],
    stats: "120FPS sustained",
    client: "Onyx Games",
    year: "2097",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-12 lg:py-24 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-16 gap-6">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">Selected Projects</h2>
            <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
            <p className="text-gray-400 max-w-xl text-sm lg:text-base font-rajdhani">
              Exploring the frontiers of technology through our latest engineering marvels.
            </p>
          </div>
          <button className="text-primary font-bold hover:underline flex items-center gap-2 text-sm lg:text-base">
            View All Work <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="aspect-[16/9] w-full relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-90 transition-opacity" />
              </div>

              <div className="absolute inset-0 p-4 lg:p-8 flex flex-col justify-end">
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-1 lg:mb-2">
                    <span className="text-primary text-[10px] lg:text-sm font-black uppercase tracking-[0.2em] font-syncopate text-glow">
                      {project.category}
                    </span>
                    <span className="text-[8px] lg:text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                      STAT://{project.stats}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-white mb-2 lg:mb-4 font-syncopate uppercase tracking-tighter leading-none">{project.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-4 lg:mb-6 opacity-100">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 lg:px-3 py-0.5 lg:py-1 text-[8px] lg:text-[10px] border border-white/30 text-white font-mono uppercase rounded-md bg-black/40 backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 lg:space-y-4">
                    <p className="text-gray-100 text-xs lg:text-base max-w-lg font-rajdhani font-medium leading-relaxed drop-shadow-md">
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center border-t border-white/10 pt-2 lg:pt-4">
                      <span className="text-[11px] text-gray-400 font-mono uppercase tracking-widest">
                        CLIENT://{project.client}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono uppercase tracking-widest">
                        YEAR://{project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
