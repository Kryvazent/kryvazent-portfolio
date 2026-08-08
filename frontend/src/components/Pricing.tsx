"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight, Cpu, Shield, Zap } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import { useSiteContent } from "./ContentProvider";

const icons = [Zap, Cpu, Shield];

export default function Pricing() {
  const { content } = useSiteContent();
  const { pricing } = content;

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative overflow-hidden bg-surface-strong px-6 py-12 lg:py-20">
      <FloatingShapes />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center lg:mb-12">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary font-syncopate">{pricing.eyebrow}</p>
          <h2 id="pricing-heading" className="mb-3 text-2xl font-bold tracking-normal text-foreground font-syncopate md:text-4xl lg:mb-4">{pricing.title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted font-rajdhani lg:text-base">{pricing.description}</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 pt-3 md:grid-cols-3 lg:gap-6">
          {pricing.plans.map((plan, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.article
                key={`${plan.name}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 lg:p-7 ${
                  plan.highlighted
                    ? "z-10 border-primary bg-background shadow-[0_16px_48px_rgba(214,33,51,0.2)] md:-translate-y-2"
                    : "border border-[#2a2a2a] bg-background shadow-[0_10px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-[#FF1F1F] hover:shadow-[0_16px_40px_rgba(255,31,31,0.2)]"
                }`}
              >
                <div className={`pricing-card-shader ${plan.highlighted ? "pricing-card-shader-strong" : ""}`} aria-hidden="true" />
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[9px] font-bold uppercase tracking-widest text-white font-syncopate shadow-md">
                    Recommended
                  </div>
                )}
                <div className="relative z-10 mb-4 flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${plan.highlighted ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold uppercase text-foreground font-syncopate">{plan.name}</h3>
                </div>
                <p className="relative z-10 mb-5 min-h-10 text-sm leading-relaxed text-muted font-rajdhani">{plan.audience}</p>
                <div className="relative z-10  pb-5">
                  <p className="text-2xl font-bold text-foreground font-syncopate">{plan.price}</p>
                  <p className="mt-1.5 text-xs text-subtle font-rajdhani">{plan.priceNote}</p>
                </div>
                <Link
                  href="/#contact"
                  className={`group/cta relative z-10 mb-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-center text-xs font-bold uppercase tracking-widest font-syncopate transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                    plan.highlighted
                      ? "border-glow bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(214,33,51,0.45)]"
                      : "border border-line bg-surface text-foreground hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(214,33,51,0.35)]"
                  }`}
                >
                  <span className="relative z-10">Book a discovery call</span>
                  <ChevronRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                  />
                </Link>
                <div className="relative z-10 mt-auto space-y-3">
                  {plan.features.filter(Boolean).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3 text-sm leading-snug text-muted font-rajdhani">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
