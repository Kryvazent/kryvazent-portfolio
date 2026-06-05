"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Cpu } from "lucide-react";

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
    <section id="pricing" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white font-syncopate mb-6">
            System <span className="text-primary">Tiers</span>
          </h2>
          <p className="text-gray-400 font-rajdhani max-w-2xl mx-auto text-lg">
            Choose the level of engineering required for your mission. Transparent pricing, no hidden protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl border ${
                plan.highlight
                  ? "bg-primary/5 border-primary shadow-[0_0_30px_rgba(214,33,51,0.2)]"
                  : "bg-white/5 border-white/10"
              } flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full font-syncopate">
                  Recommended
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${plan.highlight ? "bg-primary text-white" : "bg-white/10 text-primary"}`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-syncopate uppercase tracking-tight">
                  {plan.name}
                </h3>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white font-syncopate">
                  {plan.price === "Custom" ? "" : "$"}{plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-gray-500 text-sm ml-2 font-mono">/MO</span>}
              </div>

              <p className="text-gray-400 text-sm mb-8 font-rajdhani leading-relaxed">
                {plan.description}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-rajdhani">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs font-syncopate transition-all ${
                plan.highlight
                  ? "bg-primary text-white hover:bg-primary/90 border-glow"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
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
