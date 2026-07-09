"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Cpu, Shield, Zap } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import { useSiteContent } from "./ContentProvider";

const icons = [Zap, Cpu, Shield];

export default function Pricing() {
  const { content } = useSiteContent();
  const { pricing } = content;

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative overflow-hidden bg-surface-strong px-6 py-12 lg:py-32">
      <FloatingShapes />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center lg:mb-20">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary font-syncopate">{pricing.eyebrow}</p>
          <h2 id="pricing-heading" className="mb-4 text-2xl font-bold tracking-normal text-foreground font-syncopate md:text-5xl lg:mb-6">{pricing.title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted font-rajdhani lg:text-lg">{pricing.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-8">
          {pricing.plans.map((plan, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.article
                key={`${plan.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-3xl border p-6 lg:p-8 ${plan.highlighted ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(214,33,51,0.2)]" : "border-line bg-surface"}`}
              >
                {plan.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[9px] font-bold uppercase tracking-widest text-white font-syncopate">Recommended</div>}
                <div className="mb-5 flex items-center gap-3">
                  <div className={`rounded-xl p-3 ${plan.highlighted ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}><Icon className="h-6 w-6" /></div>
                  <h3 className="text-lg font-bold uppercase text-foreground font-syncopate lg:text-xl">{plan.name}</h3>
                </div>
                <p className="mb-6 min-h-12 text-sm leading-relaxed text-muted font-rajdhani lg:text-base">{plan.audience}</p>
                <div className="mb-7">
                  <p className="text-2xl font-bold text-foreground font-syncopate lg:text-3xl">{plan.price}</p>
                  <p className="mt-2 text-xs text-subtle font-rajdhani">{plan.priceNote}</p>
                </div>
                <div className="mb-9 flex-grow space-y-4">
                  {plan.features.filter(Boolean).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3 text-sm text-muted font-rajdhani">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/#contact" className={`w-full rounded-xl py-4 text-center text-xs font-bold uppercase tracking-widest font-syncopate transition-all ${plan.highlighted ? "border-glow bg-primary text-white hover:bg-primary/90" : "border border-line bg-surface text-foreground hover:bg-primary/10"}`}>Book a discovery call</Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
