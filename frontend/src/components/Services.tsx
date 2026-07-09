"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layout, Layers, Smartphone } from "lucide-react";
import { seoServices, servicePath } from "@/lib/seo";
import FloatingShapes from "./FloatingShapes";

const serviceIcons: Record<string, React.ReactElement<{ className?: string }>> = {
  "custom-web-application-development": <Globe />,
  "mobile-application-development": <Smartphone />,
  "cloud-infrastructure-devops": <Layers />,
  "ai-machine-learning-product-integration": <Cpu />,
  "ui-ux-engineering": <Layout />,
  "backend-api-development": <Code2 />,
};

const Services = () => {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-12 lg:py-24 px-6 relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 lg:mb-16">
          <h2 id="services-heading" className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">Software Development Services</h2>
          <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
          <p className="text-muted max-w-2xl text-sm lg:text-base font-rajdhani">
            Kryvazent designs, builds, and scales web apps, mobile apps, AI features, cloud infrastructure, backend systems, APIs, and user-focused digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {seoServices.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl border-line transition-colors hover:border-primary/50 group"
            >
              <Link href={servicePath(service.slug)} className="block h-full p-6 lg:p-8" aria-label={`Learn more about ${service.title}`}>
                <div className="text-primary mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(serviceIcons[service.slug] ?? <Code2 />, { className: "w-8 h-8 lg:w-10 lg:h-10" })}
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4 font-syncopate uppercase">{service.shortTitle}</h3>
                <p className="text-sm lg:text-base text-muted leading-relaxed font-rajdhani">
                  {service.metadataDescription}
                </p>
                <span className="mt-5 inline-flex text-xs font-bold uppercase text-primary font-syncopate">
                  Learn More
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
