"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Cpu, Layers, Code2, Layout, ArrowRight } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const SERVICES = [
  {
    num: "01",
    Icon: Globe,
    name: "Custom Web Apps",
    desc: "Custom web application development for dashboards, portals, SaaS platforms, internal tools, APIs, and customer-facing products.",
  },
  {
    num: "02",
    Icon: Smartphone,
    name: "Mobile Development",
    desc: "Mobile app development for iOS, Android, cross-platform products, booking apps, commerce apps, and customer experiences.",
  },
  {
    num: "03",
    Icon: Cpu,
    name: "AI Product Engineering",
    desc: "AI product development for automation, intelligent search, recommendations, document workflows, ML features, and product integrations.",
  },
  {
    num: "04",
    Icon: Layers,
    name: "Cloud & DevOps",
    desc: "Cloud infrastructure and DevOps services for hosting, CI/CD, databases, monitoring, APIs, and scalable production systems.",
  },
  {
    num: "05",
    Icon: Code2,
    name: "Backend & APIs",
    desc: "Backend development and API services for databases, authentication, integrations, admin tools, and scalable application architecture.",
  },
  {
    num: "06",
    Icon: Layout,
    name: "UI/UX Engineering",
    desc: "UI/UX engineering for web apps, mobile apps, dashboards, SaaS platforms, landing pages, accessibility, and responsive interfaces.",
  },
] as const;

export default function ServicesNew() {
  return (
    <section
      id="services"
      aria-labelledby="services-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden"
    >
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-[56px]"
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
            What we do
          </span>
          <h2
            id="services-new-heading"
            className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-4"
          >
            Software Development{" "}
            <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-muted max-w-[640px] text-[16.5px] font-rajdhani">
            Kryvazent designs, builds, and scales web apps, mobile apps, AI features, cloud infrastructure, backend
            systems, APIs, and user-focused digital products.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ num, Icon, name, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
            >
              <Link
                href="#contact"
                className="group relative flex flex-col bg-surface border border-line rounded-[18px] p-[30px_28px] overflow-hidden no-underline color-inherit transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(214,33,51,0.4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] block h-full
                  after:absolute after:top-0 after:left-[12%] after:right-[12%] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#FF4757] after:to-[#9E1424] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {/* Number */}
                <span className="absolute top-[22px] right-6 font-syncopate font-black text-[14px] text-subtle opacity-55">{num}</span>

                {/* Icon */}
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(214,33,51,0.10)] border border-[rgba(214,33,51,0.25)] flex items-center justify-center text-primary mb-5 transition-transform duration-300 group-hover:scale-[1.08] group-hover:-rotate-[4deg]">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-syncopate text-[17.5px] font-bold tracking-[-0.01em] mb-[10px] text-foreground">{name}</h3>
                <p className="text-muted text-[14.5px] leading-[1.65] font-rajdhani flex-1">{desc}</p>

                <span className="inline-flex items-center gap-[7px] mt-[18px] font-syncopate text-[12.5px] font-bold text-primary tracking-[0.04em]">
                  Learn more
                  <ArrowRight className="w-[14px] h-[14px] transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
