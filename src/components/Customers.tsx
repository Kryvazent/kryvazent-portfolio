"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Shield, Cpu, Zap, Rocket, Activity, GraduationCap, Crown, Glasses } from "lucide-react";

const customers = [
  { name: "Rajapura", industry: "Heritage & Supply", icon: Crown },
  { name: "EMergeSL", industry: "Education & Tech", icon: GraduationCap },
  { name: "Vision Expert", industry: "Optical Engineering", icon: Glasses },
  { name: "Quantum", industry: "Cybersecurity", icon: Shield },
  { name: "Stellar", industry: "Aerospace", icon: Rocket },
  { name: "Nexus", industry: "Global Logistics", icon: Zap },
];

const Customers = () => {
  return (
    <section id="customers" className="py-12 lg:py-32 px-6 border-y border-white/5 bg-black relative overflow-hidden">
      {/* Decorative scanline for this section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(214,33,51,0.03)_50%,transparent_100%)] w-1/2 h-full -skew-x-12 animate-[pulse_4s_infinite]" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-xl md:text-3xl font-bold uppercase tracking-[0.2em] lg:tracking-[0.3em] text-white mb-12 lg:mb-20 font-syncopate">
          Verified <span className="text-primary">Network</span> Partners
        </h2>

        <div className="relative flex overflow-x-hidden group">
          <div className="py-6 lg:py-12 animate-marquee flex items-center whitespace-nowrap gap-6 lg:gap-24">
            {[...customers, ...customers].map((customer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 md:gap-6 min-w-[250px] md:min-w-[300px] glass p-4 md:p-6 border-l-4 border-l-primary cursor-pointer group"
              >
                <div className="p-2 lg:p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <customer.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg lg:text-xl font-bold tracking-tighter text-white font-syncopate uppercase">
                    {customer.name}
                  </span>
                  <span className="text-[8px] lg:text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    IND://{customer.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="absolute top-0 py-6 lg:py-12 animate-marquee2 flex items-center whitespace-nowrap gap-6 lg:gap-24">
            {[...customers, ...customers].map((customer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 md:gap-6 min-w-[200px] lg:min-w-[300px] glass p-4 md:p-6 border-l-4 border-l-primary cursor-pointer group"
              >
                <div className="p-2 lg:p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <customer.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg lg:text-xl font-bold tracking-tighter text-white font-syncopate uppercase">
                    {customer.name}
                  </span>
                  <span className="text-[8px] lg:text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    IND://{customer.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
