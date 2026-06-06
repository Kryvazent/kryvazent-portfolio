"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Target, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-12 lg:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">About <span className="text-primary">Kryverzent</span></h2>
            <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-6 lg:mb-8" />

            <p className="text-gray-400 text-sm lg:text-lg mb-4 lg:mb-6 leading-relaxed font-rajdhani">
              Founded at the intersection of imagination and engineering, Kryverzent is a premier software development firm dedicated to building the infrastructure of tomorrow.
            </p>
            <p className="text-gray-400 text-sm lg:text-lg mb-8 lg:mb-10 leading-relaxed font-rajdhani">
              We don't just write code; we architect experiences. Our team of elite engineers and visionary designers work in tandem to deliver solutions that are as beautiful as they are powerful.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary"><Target className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1">Our Mission</h4>
                  <p className="text-sm text-gray-500">To accelerate the transition to a more efficient, automated future.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary"><Users className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1">Our Team</h4>
                  <p className="text-sm text-gray-500">A global collective of world-class developers and creative thinkers.</p>
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
            <div className="aspect-square rounded-3xl overflow-hidden glass border-white/10 p-6 lg:p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              <Cpu className="w-32 h-32 lg:w-48 lg:h-48 text-primary opacity-20 absolute" />
              <div className="relative z-10 text-center">
                <div className="text-4xl lg:text-6xl font-black text-white mb-2 font-syncopate">100+</div>
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
