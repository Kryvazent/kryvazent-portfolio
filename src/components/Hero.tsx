"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Rocket, Shield, Zap, Twitter, Github, MessageSquare } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <FloatingShapes />
      {/* Background elements */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      {/* Decorative HUD Elements */}
      <div className="absolute top-40 left-10 hidden lg:block opacity-40">
        <div className="text-[10px] font-mono text-primary space-y-1">
          <p>SCANNING_CORE_SYSTEMS...</p>
          <p>LATENCY: 0.002ms</p>
          <p>UPTIME: 99.999%</p>
          <div className="w-32 h-1 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{ x: [-128, 128] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-10 hidden lg:block opacity-40">
        <div className="text-[10px] font-mono text-primary text-right space-y-1">
          <p>LOC: 40.7128° N, 74.0060° W</p>
          <p>PROTOCOL: KRYV_2099</p>
          <p>STATUS: ACTIVE</p>
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">

          {/* Main Title Content */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] font-syncopate">
                  System Initialized
                </span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9] font-syncopate uppercase">
                Future <br />
                <span className="text-primary text-glow">Built.</span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-rajdhani font-medium">
                Kryverzent is a high-performance technology foundry. We engineer scalable systems, AI-driven architectures, and digital experiences that redefine the modern frontier.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all border-glow flex items-center justify-center gap-3 group font-syncopate">
                    Deploy System Now
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-4 py-2 px-4 glass rounded-xl">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2">
                      <MessageSquare className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-primary/60">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  LIMITED SLOTS FOR Q3 2099 REMAINING
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bento Grid HUD Content */}
          <div className="lg:col-span-5 w-full perspective-1000">
            <motion.div
              style={{ y: y1, rotateX: rotate }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 glass-dark p-6 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="flex justify-between items-start mb-4">
                  <Zap className="text-primary w-6 h-6" />
                  <span className="text-[10px] font-mono text-gray-500">OPTIMIZED_V01</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-syncopate uppercase">Performance</h3>
                <p className="text-xs text-gray-400 font-rajdhani uppercase tracking-wider leading-relaxed">
                  Sub-millisecond latency for global scale applications.
                </p>
              </div>

              <div className="glass-dark p-6 border border-white/5 relative overflow-hidden group">
                <Shield className="text-primary w-6 h-6 mb-4" />
                <h3 className="text-sm font-bold text-white mb-1 font-syncopate uppercase">Secure</h3>
                <p className="text-[10px] text-gray-500 font-mono">ENCRYPTION: AES-256</p>
              </div>

              <div className="glass-dark p-6 border border-white/5 relative overflow-hidden group">
                <Rocket className="text-primary w-6 h-6 mb-4" />
                <h3 className="text-sm font-bold text-white mb-1 font-syncopate uppercase">Scale</h3>
                <p className="text-[10px] text-gray-500 font-mono">NODES: 4,096+</p>
              </div>

              <div className="col-span-2 glass p-4 border border-primary/20 flex items-center justify-between">
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-primary/50"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-primary animate-pulse uppercase tracking-[0.2em]">System Optimal</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
