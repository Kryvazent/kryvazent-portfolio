"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight, Zap, Cpu, Shield } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const PLANS = [
  {
    Icon: Zap,
    name: "Starter",
    audience: "For founders and small teams launching a first product",
    price: "$2,500",
    pricePrefix: "Starting at",
    note: "Fixed scope, quoted after a short discovery call",
    highlighted: false,
    features: [
      "1 platform (web or mobile)",
      "Up to 2 core user flows fully built",
      "Basic admin/backend setup",
      "2 weeks of post-launch support",
    ],
  },
  {
    Icon: Cpu,
    name: "Growth",
    audience: "For businesses scaling an existing product or adding new capability",
    price: "$6,000",
    pricePrefix: "Starting at",
    note: "Scoped per project",
    highlighted: true,
    badge: "Recommended",
    features: [
      "Web + mobile, or web + API/backend",
      "Custom integrations (payments, auth, third-party APIs)",
      "Cloud deployment & basic DevOps setup",
      "1 month of post-launch support",
    ],
  },
  {
    Icon: Shield,
    name: "Enterprise",
    audience: "For organizations needing ongoing development, infrastructure, or AI capability",
    price: "Custom quote",
    pricePrefix: "",
    note: "Book a call to scope",
    highlighted: false,
    features: [
      "Multi-platform builds and complex backend architecture",
      "AI/ML integration",
      "Advanced DevOps and dedicated support",
      "Ongoing engagement (monthly retainer available)",
    ],
  },
] as const;

export default function PricingNew() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden bg-surface-strong border-y border-line"
    >
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-[640px] mx-auto mb-[56px]"
        >
          <span className="inline-flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] before:block before:w-[26px] before:h-[2px] before:rounded-full before:bg-gradient-to-r before:from-[#FF4757] before:to-[#9E1424]">
            Pricing tiers
          </span>
          <h2
            id="pricing-new-heading"
            className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-4"
          >
            A clear{" "}
            <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
              starting point
            </span>
          </h2>
          <p className="text-muted text-[16.5px] font-rajdhani">
            Every project is scoped around the product, timeline, and technical requirements. These starting prices
            help you choose the right level of engagement.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] items-stretch mt-2">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex flex-col rounded-[22px] p-[32px_28px] overflow-hidden transition-all duration-300
                ${
                  plan.highlighted
                    ? "border-0 shadow-[0_22px_56px_rgba(214,33,51,0.22)] md:-translate-y-[10px] md:hover:-translate-y-[15px]"
                    : "border border-line bg-background hover:-translate-y-[6px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-[rgba(214,33,51,0.35)]"
                }`}
              style={
                plan.highlighted
                  ? {
                      background: "linear-gradient(var(--background),var(--background)) padding-box, linear-gradient(135deg,#FF4757,#D62133,#A31527) border-box",
                      border: "1.5px solid transparent",
                    }
                  : {}
              }
            >
              {/* Shader glow */}
              <div className="pricing-card-shader" aria-hidden="true" />
              {plan.highlighted && <div className="pricing-card-shader-strong" aria-hidden="true" />}

              {/* Badge */}
              {"badge" in plan && plan.badge && (
                <span className="absolute top-4 right-4 bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white font-syncopate text-[10px] font-bold tracking-[0.14em] uppercase px-[13px] py-[6px] rounded-full shadow-[0_4px_14px_rgba(214,33,51,0.4)] z-10">
                  {plan.badge}
                </span>
              )}

              {/* Head */}
              <div className="relative z-10 flex items-center gap-[13px] mb-[14px]">
                <div
                  className={`w-[46px] h-[46px] rounded-[13px] flex items-center justify-center flex-shrink-0 ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white shadow-[0_6px_18px_rgba(214,33,51,0.4)]"
                      : "bg-[rgba(214,33,51,0.10)] text-primary border border-[rgba(214,33,51,0.25)]"
                  }`}
                >
                  <plan.Icon className="w-[21px] h-[21px]" />
                </div>
                <h3 className="font-syncopate text-[18px] font-bold">{plan.name}</h3>
              </div>

              <p className="relative z-10 text-muted text-[14px] leading-[1.55] min-h-[44px] mb-5 font-rajdhani">{plan.audience}</p>

              <div className="relative z-10 pb-5">
                <p className="font-syncopate font-black text-[26px] tracking-[-0.02em]">
                  {plan.pricePrefix && <small className="text-[13px] font-semibold text-muted tracking-normal">{plan.pricePrefix} </small>}
                  {plan.price}
                </p>
                <p className="text-subtle text-[12.5px] mt-[6px] font-rajdhani">{plan.note}</p>
              </div>

              <Link
                href="#contact"
                className={`relative z-10 mb-[26px] flex w-full items-center justify-center gap-2 overflow-hidden rounded-[12px] py-[14px] font-syncopate text-[12px] font-bold uppercase tracking-[0.04em] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group/cta
                  ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white hover:shadow-[0_0_24px_rgba(214,33,51,0.45)]"
                      : "border border-line bg-surface text-foreground hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(214,33,51,0.35)]"
                  }`}
              >
                <span className="relative z-10">Book a discovery call</span>
                <ChevronRight className="relative z-10 w-[14px] h-[14px] transition-transform group-hover/cta:translate-x-1" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                />
              </Link>

              {/* Features */}
              <div className="relative z-10 mt-auto flex flex-col gap-[13px] pt-[22px] border-t border-line">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-[11px] text-[14px] text-muted leading-snug font-rajdhani">
                    <Check className="mt-[2px] w-[17px] h-[17px] flex-shrink-0 text-primary" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
