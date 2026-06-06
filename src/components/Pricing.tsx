"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Cpu } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

const plans = [
  {
    name: "BASE_CORE",
    price: "4,999",
    description: "Essential systems for startups and small tech foundries.",
    features: ["Single Core Architecture", "Standard Security Layer", "Weekly System Sync", "Cloud Deployment"],
    icon: Zap,
    highlight: false,
  },
  {
    name: "ADVANCED_SYSTEM",
    price: "12,999",
    description: "Optimized performance for scaling digital frontiers.",
    features: ["Multi-Core Architecture", "Advanced HUD Security", "24/7 Priority Uplink", "Auto-Scaling Nodes", "AI Integration V1"],
    icon: Cpu,
    highlight: true,
  },
  {
    name: "ELITE_ENTERPRISE",
    price: "Custom",
    description: "Total tech dominance for global conglomerates.",
    features: ["Infinite Architecture", "Quantum-Safe Encryption", "Dedicated On-Site Uplink", "Full AI Autonomous Systems", "Zero Latency Global Grid"],
    icon: Shield,
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-12 lg:py-32 px-6 bg-surface-strong relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 lg:mb-20">
          <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-normal text-foreground font-syncopate mb-4 lg:mb-6">
            System <span className="text-primary">Tiers</span>
          </h2>
          <p className="text-muted font-rajdhani max-w-2xl mx-auto text-sm lg:text-lg">
            Choose the level of engineering required for your mission. Transparent pricing, no hidden protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-6 lg:p-8 rounded-3xl border ${
                plan.highlight
                  ? "bg-primary/5 border-primary shadow-[0_0_30px_rgba(214,33,51,0.2)]"
                  : "bg-surface border-line"
              } flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 lg:-top-4 left-1/2 -translate-x-1/2 px-3 lg:px-4 py-1 bg-primary text-white text-[8px] lg:text-[10px] font-bold uppercase tracking-widest rounded-full font-syncopate">
                  Recommended
                </div>
              )}

              <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className={`p-2 lg:p-3 rounded-xl ${plan.highlight ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                  <plan.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground font-syncopate uppercase tracking-normal">
                  {plan.name}
                </h3>
              </div>

              <div className="mb-4 lg:mb-8">
                <span className="text-3xl lg:text-4xl font-bold text-foreground font-syncopate">
                  {plan.price === "Custom" ? "" : "$"}{plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-subtle text-xs lg:text-sm ml-2 font-mono">/MO</span>}
              </div>

              <p className="text-muted text-xs lg:text-sm mb-6 lg:mb-8 font-rajdhani leading-relaxed">
                {plan.description}
              </p>

              <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted font-rajdhani">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs font-syncopate transition-all ${
                plan.highlight
                  ? "bg-primary text-white hover:bg-primary/90 border-glow"
                  : "bg-surface text-foreground hover:bg-primary/10 border border-line"
              }`}>
                Initialize Tier
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
