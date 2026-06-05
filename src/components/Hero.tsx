"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Rocket, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Future of Software Development
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 leading-none font-[family-name:var(--font-orbitron)]">
            ENGINEERING THE <br />
            <span className="text-primary text-glow">IMPOSSIBLE.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            At Kryverzent, we build high-performance software solutions that push the boundaries of technology. Futuristic, scalable, and relentlessly efficient.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:scale-105 transition-all border-glow flex items-center gap-2 group">
              Start Your Project
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl glass text-white font-bold text-lg hover:bg-white/10 transition-all">
              View Our Work
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center gap-2">
            <Zap className="text-primary w-8 h-8" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Ultra Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="text-primary w-8 h-8" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Secure by Design</span>
          </div>
          <div className="flex flex-col items-center gap-2 hidden md:flex">
            <Rocket className="text-primary w-8 h-8" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Scalable Tech</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
