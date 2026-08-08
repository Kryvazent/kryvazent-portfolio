"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code2, Rocket, RefreshCw, type LucideIcon } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const STEPS = [
  { num: "01", title: "Discovery",    body: "Understand your product, users, goals, and technical constraints.", Icon: Search     },
  { num: "02", title: "Design",       body: "Map flows and interfaces so the build starts with total clarity.",  Icon: Palette    },
  { num: "03", title: "Engineering",  body: "Build with clean, scalable, well-tested code and modern stacks.",   Icon: Code2      },
  { num: "04", title: "Deployment",   body: "Ship to reliable cloud infrastructure with CI/CD and monitoring.",  Icon: Rocket     },
  { num: "05", title: "Iteration",    body: "Measure, refine, and keep improving after launch.",                 Icon: RefreshCw  },
] as const;

/* ── Desktop card — matches reference image style ── */
function DesktopCard({
  num, title, body, Icon, delay,
}: {
  num: string; title: string; body: string; Icon: LucideIcon; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative bg-surface border border-line rounded-[20px] p-7 overflow-hidden
        transition-all duration-300 hover:-translate-y-[5px] hover:border-[rgba(214,33,51,0.4)]
        hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] flex flex-col justify-between min-h-[200px]"
    >
      {/* Decorative circular blob behind icon */}
      <div
        aria-hidden
        className="absolute bottom-[-28px] right-[-28px] w-[130px] h-[130px] rounded-full
          bg-[rgba(214,33,51,0.07)] transition-all duration-500 group-hover:bg-[rgba(214,33,51,0.12)]
          group-hover:scale-110 pointer-events-none"
      />

      {/* Top: title + body */}
      <div>
        <h3 className="font-syncopate text-[18px] font-bold mb-3 text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-muted text-[14px] leading-[1.65] font-rajdhani max-w-[340px]">{body}</p>
      </div>

      {/* Bottom row: step number left, icon right */}
      <div className="flex items-end justify-between mt-6">
        <span className="font-syncopate text-[28px] font-black text-primary leading-none">
          {num}
        </span>
        <div
          className="relative w-[52px] h-[52px] rounded-full border-2 border-[rgba(214,33,51,0.25)]
            bg-[rgba(214,33,51,0.08)] flex items-center justify-center text-primary z-10
            transition-all duration-300 group-hover:border-primary group-hover:bg-[rgba(214,33,51,0.16)]
            group-hover:scale-110"
        >
          <Icon className="w-[22px] h-[22px]" />
        </div>
      </div>
    </motion.div>
  );
}

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
            DESKTOP  ≥ lg
            Reference style: title top-left,
            body below, step number bottom-left
            in primary colour, large icon
            bottom-right on a circular blob bg.
            Laid out as 2+3 row (first row 2 cards,
            second row 3 cards) to fill nicely.
        ══════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col gap-5">
          {/* Row 1 — 2 wide cards */}
          <div className="grid grid-cols-2 gap-5">
            {STEPS.slice(0, 2).map(({ num, title, body, Icon }, i) => (
              <DesktopCard key={num} num={num} title={title} body={body} Icon={Icon} delay={i * 0.08} />
            ))}
          </div>
          {/* Row 2 — 3 standard cards */}
          <div className="grid grid-cols-3 gap-5">
            {STEPS.slice(2).map(({ num, title, body, Icon }, i) => (
              <DesktopCard key={num} num={num} title={title} body={body} Icon={Icon} delay={(i + 2) * 0.08} />
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
