"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Rocket, Shield, Zap, Twitter, Github, MessageSquare } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import ThreeScene from "./ThreeScene";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      <FloatingShapes />
      {/* Background elements */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <ThreeScene
        variant="orbital"
        className="absolute inset-y-24 right-[-18vw] z-[1] hidden h-[68vh] min-h-[380px] w-[58vw] opacity-45 md:block lg:right-[-8vw] lg:opacity-55"
      />

      {/* Decorative HUD Elements */}
      <div className="absolute top-40 left-10 hidden lg:block opacity-40">
        <div className="text-[10px] font-mono text-primary space-y-1">
          <p>SCANNING_CORE_SYSTEMS...</p>
          <p>LATENCY: 0.002ms</p>
          <p>UPTIME: 99.999%</p>
          <div className="w-32 h-1 bg-line overflow-hidden">
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
          <p>LOC: 40.7128 N, 74.0060 W</p>
          <p>PROTOCOL: KRYV_2099</p>
          <p>STATUS: ACTIVE</p>
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Main Title Content */}
          <div className="lg:col-span-7 text-left w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] font-syncopate">
                  Software Engineering Studio
                </span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-normal text-foreground mb-6 lg:mb-8 leading-[0.9] font-syncopate uppercase">
                Software <br />
                <span className="text-primary text-glow">Built.</span>
              </h1>

              <p className="max-w-xl text-base lg:text-xl text-muted mb-8 lg:mb-12 leading-relaxed font-rajdhani font-medium">
                Kryverzent builds custom web apps, mobile apps, AI-enabled systems, cloud infrastructure, backend platforms, and digital product experiences for businesses that need reliable technology.
              </p>

              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                  <button className="w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-5 bg-primary text-white font-bold text-xs lg:text-sm tracking-widest uppercase hover:scale-105 transition-all border-glow flex items-center justify-center gap-3 group font-syncopate">
                    Start a Project
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-4 py-2 px-4 glass rounded-xl w-full sm:w-auto justify-center">
                    <a href="#" className="text-muted hover:text-primary transition-colors p-2">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted hover:text-primary transition-colors p-2">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted hover:text-primary transition-colors p-2">
                      <MessageSquare className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-primary/60 justify-center lg:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  ACCEPTING NEW SOFTWARE AND AI PROJECTS
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
              className="grid grid-cols-2 gap-3 lg:gap-4"
            >
              <div className="col-span-2 glass-dark p-4 lg:p-6 border border-line relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="flex justify-between items-start mb-2 lg:mb-4">
                  <Zap className="text-primary w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="text-[8px] lg:text-[10px] font-mono text-subtle">WEB_MOBILE_AI</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground mb-1 lg:mb-2 font-syncopate uppercase">Performance</h3>
                <p className="text-[10px] lg:text-xs text-muted font-rajdhani uppercase tracking-wider leading-relaxed">
                  Fast, maintainable software systems for real business operations.
                </p>
              </div>

              <div className="glass-dark p-4 lg:p-6 border border-line relative overflow-hidden group">
                <Shield className="text-primary w-5 h-5 lg:w-6 lg:h-6 mb-2 lg:mb-4" />
                <h3 className="text-xs lg:text-sm font-bold text-foreground mb-1 font-syncopate uppercase">Secure</h3>
                <p className="text-[8px] lg:text-[10px] text-subtle font-mono">SECURE ARCHITECTURE</p>
              </div>

              <div className="glass-dark p-4 lg:p-6 border border-line relative overflow-hidden group">
                <Rocket className="text-primary w-5 h-5 lg:w-6 lg:h-6 mb-2 lg:mb-4" />
                <h3 className="text-xs lg:text-sm font-bold text-foreground mb-1 font-syncopate uppercase">Scale</h3>
                <p className="text-[8px] lg:text-[10px] text-subtle font-mono">CLOUD READY</p>
              </div>

              <div className="col-span-2 glass p-3 lg:p-4 border border-primary/20 flex items-center justify-between">
                <div className="flex gap-1.5 lg:gap-2">
                  {[1,2,3,4,5].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-primary/50"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span className="text-[8px] lg:text-[10px] font-mono text-primary animate-pulse uppercase tracking-[0.2em]">System Optimal</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
