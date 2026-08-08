"use client";

import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";

const STEPS = [
  { num: "01", title: "Discovery", body: "Understand your product, users, goals, and technical constraints." },
  { num: "02", title: "Design", body: "Map flows and interfaces so the build starts with total clarity." },
  { num: "03", title: "Engineering", body: "Build with clean, scalable, well-tested code and modern stacks." },
  { num: "04", title: "Deployment", body: "Ship to reliable cloud infrastructure with CI/CD and monitoring." },
  { num: "05", title: "Iteration", body: "Measure, refine, and keep improving after launch." },
] as const;

export default function ProcessNew() {
  return (
    <section
      id="process"
      aria-labelledby="process-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden"
    >
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-[680px] mx-auto mb-[56px]"
        >
          <span className="inline-flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] before:block before:w-[26px] before:h-[2px] before:rounded-full before:bg-gradient-to-r before:from-[#FF4757] before:to-[#9E1424]">
            How we work
          </span>
          <h2
            id="process-new-heading"
            className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-4"
          >
            One product-focused{" "}
            <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
              workflow
            </span>
          </h2>
          <p className="text-muted text-[16.5px] font-rajdhani">
            From first conversation to post-launch improvements, every project moves through five clear stages.
          </p>
        </motion.div>

        {/* Steps grid with connecting line */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Horizontal connector (desktop only) */}
          <div
            aria-hidden
            className="absolute hidden lg:block top-[26px] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-[rgba(214,33,51,0.4)] to-transparent pointer-events-none"
          />

          {STEPS.map(({ num, title, body }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-surface border border-line rounded-[16px] pt-[44px] pb-[22px] px-5 text-center transition-all duration-300 hover:-translate-y-[5px] hover:border-[rgba(214,33,51,0.4)]"
            >
              {/* Step dot */}
              <span className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[26px] h-[26px] rounded-full bg-background border-2 border-primary flex items-center justify-center font-syncopate text-[9.5px] font-black text-primary">
                {num}
              </span>
              <h3 className="font-syncopate text-[15px] font-bold mt-[14px] mb-2">{title}</h3>
              <p className="text-subtle text-[13px] leading-[1.55] font-rajdhani">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
