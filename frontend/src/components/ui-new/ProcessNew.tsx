"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code2, Rocket, RefreshCw } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const STEPS = [
  { num: "01", title: "Discovery",    body: "Understand your product, users, goals, and technical constraints.", Icon: Search     },
  { num: "02", title: "Design",       body: "Map flows and interfaces so the build starts with total clarity.",  Icon: Palette    },
  { num: "03", title: "Engineering",  body: "Build with clean, scalable, well-tested code and modern stacks.",   Icon: Code2      },
  { num: "04", title: "Deployment",   body: "Ship to reliable cloud infrastructure with CI/CD and monitoring.",  Icon: Rocket     },
  { num: "05", title: "Iteration",    body: "Measure, refine, and keep improving after launch.",                 Icon: RefreshCw  },
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

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-[680px] mx-auto mb-[56px]"
        >
          <span className="inline-flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
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

        {/* ══════════════════════════════════════
            DESKTOP  ≥ lg  — 5-column dot grid
        ══════════════════════════════════════ */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-5 gap-4">
            {/* Horizontal connector */}
            <div
              aria-hidden
              className="absolute top-[26px] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-[rgba(214,33,51,0.4)] to-transparent pointer-events-none"
            />
            {STEPS.map(({ num, title, body, Icon }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-surface border border-line rounded-[16px] pt-[44px] pb-[22px] px-5 text-center transition-all duration-300 hover:-translate-y-[5px] hover:border-[rgba(214,33,51,0.4)] group"
              >
                {/* Dot */}
                <span className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[26px] h-[26px] rounded-full bg-background border-2 border-primary flex items-center justify-center font-syncopate text-[9.5px] font-black text-primary z-10">
                  {num}
                </span>
                <div className="flex justify-center mb-3">
                  <span className="w-10 h-10 rounded-[10px] bg-[rgba(214,33,51,0.10)] border border-[rgba(214,33,51,0.22)] flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                </div>
                <h3 className="font-syncopate text-[15px] font-bold mb-2">{title}</h3>
                <p className="text-subtle text-[13px] leading-[1.55] font-rajdhani">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            MOBILE / TABLET  < lg
            2-column grid, horizontal cards:
            [icon accent | title + body | number]
            with a dashed vertical connector
        ══════════════════════════════════════ */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0">
          {STEPS.map(({ num, title, body, Icon }, i) => {
            const isLast = i === STEPS.length - 1;
            // On sm (2-col): left column = even indices, right column = odd
            // We want the dashed line to run inside each column, so we handle
            // it as a ::after pseudo via a wrapper div.
            return (
              <div key={num} className="relative flex flex-col">
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative flex items-stretch bg-surface border border-line rounded-[16px] overflow-hidden mb-3 transition-all duration-300 hover:border-[rgba(214,33,51,0.4)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] group"
                >
                  {/* Left accent block — diagonal clip on the right edge */}
                  <div
                    className="relative flex-shrink-0 w-[80px] flex items-center justify-center bg-gradient-to-br from-[#D62133] to-[#9E1424]"
                    style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}
                  >
                    <Icon className="w-[26px] h-[26px] text-white drop-shadow-sm" />
                  </div>

                  {/* Middle: title + body */}
                  <div className="flex-1 py-4 px-4 min-w-0">
                    <h3 className="font-syncopate text-[14px] font-bold mb-1 leading-tight">{title}</h3>
                    <p className="text-subtle text-[12.5px] leading-[1.55] font-rajdhani">{body}</p>
                  </div>

                  {/* Right: step number bubble */}
                  <div className="flex-shrink-0 flex items-center justify-center pr-4 pl-2">
                    <span className="w-[36px] h-[36px] rounded-full border-2 border-primary bg-background flex items-center justify-center font-syncopate text-[10px] font-black text-primary">
                      {num}
                    </span>
                  </div>
                </motion.div>

                {/* Dashed vertical connector (hidden after last item in each column) */}
                {!isLast && (
                  <div
                    aria-hidden
                    className="self-center w-px h-3 mb-0"
                    style={{
                      background: "repeating-linear-gradient(to bottom,rgba(214,33,51,0.5) 0px,rgba(214,33,51,0.5) 4px,transparent 4px,transparent 8px)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
