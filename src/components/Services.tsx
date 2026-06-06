"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layout, Layers, Smartphone } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

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
    <section id="services" className="py-12 lg:py-24 px-6 relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">Software Development Services</h2>
          <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
          <p className="text-muted max-w-2xl text-sm lg:text-base font-rajdhani">
            Kryverzent designs, builds, and scales web apps, mobile apps, AI features, cloud infrastructure, backend systems, APIs, and user-focused digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 lg:p-8 rounded-2xl border-line hover:border-primary/50 transition-colors group"
            >
              <div className="text-primary mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-8 h-8 lg:w-10 lg:h-10" })}
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4 font-syncopate uppercase">{service.title}</h3>
              <p className="text-sm lg:text-base text-muted leading-relaxed font-rajdhani">
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
