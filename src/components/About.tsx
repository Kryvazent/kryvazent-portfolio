"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Target, Users } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-12 lg:py-24 px-6 relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="about-heading" className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">About <span className="text-primary">Kryvazent</span></h2>
            <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-6 lg:mb-8" />

            <p className="text-muted text-sm lg:text-lg mb-4 lg:mb-6 leading-relaxed font-rajdhani">
              Kryvazent is a software development and technology engineering company based in Colombo, Western Province, Sri Lanka. We help teams turn product ideas, operational problems, and growth goals into reliable digital systems.
            </p>
            <p className="text-muted text-sm lg:text-lg mb-8 lg:mb-10 leading-relaxed font-rajdhani">
              Our work covers product planning, web applications, mobile apps, backend systems, APIs, cloud infrastructure, AI-enabled features, and UI/UX engineering for startups and growing businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary"><Target className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold mb-1">Our Mission</h3>
                  <p className="text-sm text-subtle">To build practical software that makes business workflows faster, clearer, and easier to scale.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary"><Users className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold mb-1">Our Approach</h3>
                  <p className="text-sm text-subtle">Discovery, design, engineering, deployment, and iteration handled with one product-focused workflow.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass border-line p-6 lg:p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              <Cpu className="w-32 h-32 lg:w-48 lg:h-48 text-primary opacity-20 absolute" />
              <div className="relative z-10 text-center">
                <div className="text-4xl lg:text-6xl font-black text-foreground mb-2 font-syncopate">100+</div>
                <div className="text-primary font-bold uppercase tracking-widest text-[10px] lg:text-sm font-syncopate">Projects Delivered</div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
