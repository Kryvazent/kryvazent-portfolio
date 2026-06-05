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
    <section id="customers" className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-12">
          Trusted by Industry Leaders
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-50">
          {customers.map((customer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span className="text-xl font-black tracking-tighter text-white">{customer.name}</span>
              <span className="text-[10px] text-primary font-bold">{customer.industry}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Customers;
