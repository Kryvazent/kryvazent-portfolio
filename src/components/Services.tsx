"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layout, Layers, Smartphone } from "lucide-react";

const services = [
  {
    title: "Custom Web Apps",
    description: "High-performance, scalable web applications built with modern frameworks like Next.js and React.",
    icon: <Globe className="w-10 h-10" />,
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile solutions that provide seamless user experiences on iOS and Android.",
    icon: <Smartphone className="w-10 h-10" />,
  },
  {
    title: "Cloud Infrastructure",
    description: "Robust cloud architecture and DevOps services to ensure your application is always available and secure.",
    icon: <Layers className="w-10 h-10" />,
  },
  {
    title: "AI & Machine Learning",
    description: "Integrating intelligent features into your products to drive automation and data-driven insights.",
    icon: <Cpu className="w-10 h-10" />,
  },
  {
    title: "UI/UX Engineering",
    description: "Futuristic designs that focus on usability, keeping users engaged throughout the entire experience.",
    icon: <Layout className="w-10 h-10" />,
  },
  {
    title: "Backend Excellence",
    description: "Scalable backend systems designed to handle massive traffic and complex data processing.",
    icon: <Code2 className="w-10 h-10" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl">
            We specialize in delivering cutting-edge software solutions that solve real-world problems with futuristic technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border-white/5 hover:border-primary/50 transition-colors group"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
