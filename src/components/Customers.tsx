"use client";

import React from "react";
import { motion } from "framer-motion";

const customers = [
  { name: "TechNova", industry: "Cloud Computing" },
  { name: "Aetheria", industry: "Renewable Energy" },
  { name: "Veridian", industry: "Biotech" },
  { name: "Quantum", industry: "Cybersecurity" },
  { name: "Stellar", industry: "Aerospace" },
  { name: "Nexus", industry: "Global Logistics" },
];

const Customers = () => {
  return (
    <section id="customers" className="py-20 px-6 border-y border-white/5 bg-black relative overflow-hidden">
      {/* Decorative scanline for this section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(214,33,51,0.03)_50%,transparent_100%)] w-1/2 h-full -skew-x-12 animate-[pulse_4s_infinite]" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/60 mb-16 font-syncopate">
          Verified Network Partners
        </h2>

        <div className="relative flex overflow-x-hidden group">
          <div className="py-12 animate-marquee flex items-center whitespace-nowrap gap-12 lg:gap-24">
            {[...customers, ...customers].map((customer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, color: "#D62133" }}
                className="flex flex-col items-start justify-center min-w-[200px] border-l border-primary/20 pl-6 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white font-syncopate uppercase">
                    {customer.name}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  IND://{customer.industry}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="absolute top-0 py-12 animate-marquee2 flex items-center whitespace-nowrap gap-12 lg:gap-24">
            {[...customers, ...customers].map((customer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, color: "#D62133" }}
                className="flex flex-col items-start justify-center min-w-[200px] border-l border-primary/20 pl-6 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white font-syncopate uppercase">
                    {customer.name}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  IND://{customer.industry}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
