"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, Target, Users } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

/* Animated counter */
function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (prefersReduced) { setCount(target); return; }
          const dur = 1600;
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    const parent = el.closest(".about-visual-wrap");
    if (parent) obs.observe(parent);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

const POINTS = [
  {
    Icon: Target,
    title: "Our Mission",
    body: "To build practical software that makes business workflows faster, clearer, and easier to scale.",
  },
  {
    Icon: Users,
    title: "Our Approach",
    body: "Discovery, design, engineering, deployment, and iteration handled with one product-focused workflow.",
  },
] as const;

export default function AboutNew() {
  return (
    <section
      id="about"
      aria-labelledby="about-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden bg-surface-strong border-y border-line"
    >
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[64px] items-center">

          {/* ── Left text ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
              Who we are
            </span>
            <h2
              id="about-new-heading"
              className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-4"
            >
              About{" "}
              <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
                Kryvazent
              </span>
            </h2>

            <p className="text-muted text-[16px] mb-4 max-w-[600px] leading-relaxed font-rajdhani">
              Kryvazent is a software development and technology engineering company based in Colombo, Western Province,
              Sri Lanka. We help teams turn product ideas, operational problems, and growth goals into reliable digital
              systems.
            </p>
            <p className="text-muted text-[16px] leading-relaxed max-w-[600px] font-rajdhani">
              Our work covers product planning, web applications, mobile apps, backend systems, APIs, cloud
              infrastructure, AI-enabled features, and UI/UX engineering for startups and growing businesses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[30px]">
              {POINTS.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-surface border border-line rounded-[16px] p-5 transition-all duration-300 hover:border-[rgba(214,33,51,0.4)] hover:-translate-y-[3px]"
                >
                  <Icon className="w-[22px] h-[22px] text-primary mb-3" />
                  <h3 className="font-syncopate text-[15px] font-bold mb-[6px]">{title}</h3>
                  <p className="text-subtle text-[13.5px] leading-[1.6] font-rajdhani">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="about-visual-wrap relative aspect-[1/0.92] rounded-[26px] border border-line bg-surface overflow-hidden flex items-center justify-center">
              {/* Rings */}
              {[56, 76, 96].map((pct) => (
                <span
                  key={pct}
                  className="absolute rounded-full border pointer-events-none"
                  style={{
                    width: `${pct}%`,
                    aspectRatio: "1",
                    borderColor:
                      pct === 56
                        ? "rgba(214,33,51,0.22)"
                        : pct === 76
                        ? "rgba(214,33,51,0.13)"
                        : "rgba(214,33,51,0.07)",
                  }}
                />
              ))}

              {/* Centre stat */}
              <div className="relative z-10 text-center">
                <div className="font-syncopate font-black text-[clamp(3.4rem,7vw,5rem)] leading-[1] tracking-[-0.03em]">
                  <CountUp target={100} />
                  <span className="text-primary">+</span>
                </div>
                <div className="font-syncopate text-[11.5px] font-bold tracking-[0.3em] uppercase text-primary mt-3">
                  Projects Delivered
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute top-[9%] left-[7%] flex items-center gap-[9px] bg-background border border-line rounded-full px-4 py-[9px] font-syncopate text-[12px] font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-[float_6s_ease-in-out_infinite] z-[2]">
                <MapPin className="w-[15px] h-[15px] text-primary" />
                Colombo HQ
              </div>
              <div className="absolute bottom-[11%] right-[8%] flex items-center gap-[9px] bg-background border border-line rounded-full px-4 py-[9px] font-syncopate text-[12px] font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-[float_6s_ease-in-out_infinite] [animation-delay:-3s] z-[2]">
                <Zap className="w-[15px] h-[15px] text-primary" />
                Product-focused
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </section>
  );
}
