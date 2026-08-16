"use client";

import { motion } from "framer-motion";
import { Cloud, Code2, Cpu, Globe, Layout, Smartphone } from "lucide-react";

const CAPABILITIES = [
  { name: "Web Apps", status: "Dashboards & portals", Icon: Globe },
  { name: "AI Systems", status: "Workflows & insight", Icon: Cpu },
  { name: "Cloud", status: "CI/CD & scale", Icon: Cloud },
  { name: "Mobile", status: "iOS & Android", Icon: Smartphone },
] as const;

const PIPELINE = ["Plan", "Build", "Deploy", "Improve"] as const;

export default function ProjectsHeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.14 }}
      className="relative hidden lg:block px-2 py-6"
      aria-hidden="true"
    >
      <div className="absolute inset-[-24px] bg-[radial-gradient(closest-side,rgba(214,33,51,0.14),transparent_72%)] pointer-events-none -z-[1]" />

      <div className="relative rounded-[22px] border border-line bg-surface-strong shadow-[var(--shadow)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,71,87,0.55)] to-transparent" />

        <div className="flex items-center justify-between gap-3 px-5 py-[13px] border-b border-line">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-[10px] h-[10px] rounded-full bg-[#FF4757]" />
            <span className="w-[10px] h-[10px] rounded-full bg-foreground/20" />
            <span className="w-[10px] h-[10px] rounded-full bg-foreground/12" />
            <span className="ml-2 font-mono text-[11.5px] text-subtle tracking-[0.04em] truncate">
              kryvazent · delivery
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-syncopate text-[9.5px] font-bold tracking-[0.18em] uppercase text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live
          </span>
        </div>

        <div className="p-5">
          <p className="font-syncopate text-[10px] font-bold tracking-[0.18em] uppercase text-subtle mb-3">
            Delivery pipeline
          </p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {PIPELINE.map((step, i) => (
              <div
                key={step}
                className={[
                  "rounded-[10px] px-2 py-2 text-center border",
                  i === 2
                    ? "border-primary/40 bg-[rgba(214,33,51,0.10)]"
                    : "border-line bg-surface",
                ].join(" ")}
              >
                <span className="block font-syncopate text-[10px] font-bold tracking-[0.06em] uppercase text-foreground">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CAPABILITIES.map(({ name, status, Icon }) => (
              <div
                key={name}
                className="rounded-[14px] border border-line bg-surface p-3.5 transition-colors hover:border-[rgba(214,33,51,0.4)]"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(214,33,51,0.10)]">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="font-syncopate text-[11px] font-bold tracking-[-0.01em]">
                    {name}
                  </span>
                </div>
                <p className="text-[11.5px] text-muted font-rajdhani leading-snug">{status}</p>
                <div className="mt-3 h-[3px] w-10 rounded-full bg-gradient-to-r from-[#FF4757] to-[#A31527]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-line">
          <div>
            <b className="block font-syncopate text-[15px] font-black tracking-[-0.02em]">
              6<span className="text-primary">+</span>
            </b>
            <small className="text-subtle text-[10px] font-medium tracking-[0.08em] uppercase">
              Capability areas
            </small>
          </div>
          <div className="text-right">
            <b className="block font-syncopate text-[15px] font-black tracking-[-0.02em]">
              100<span className="text-primary">+</span>
            </b>
            <small className="text-subtle text-[10px] font-medium tracking-[0.08em] uppercase">
              Projects delivered
            </small>
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -left-4 flex items-center gap-2 rounded-full border border-line bg-background px-3.5 py-2 font-syncopate text-[11px] font-semibold shadow-[var(--shadow-sm)] animate-[float-chip_6s_ease-in-out_infinite]">
        <Code2 className="h-3.5 w-3.5 text-primary" />
        Backend & APIs
      </div>
      <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-line bg-background px-3.5 py-2 font-syncopate text-[11px] font-semibold shadow-[var(--shadow-sm)] animate-[float-chip_6s_ease-in-out_infinite] [animation-delay:-3s]">
        <Layout className="h-3.5 w-3.5 text-primary" />
        UI/UX Engineering
      </div>

      <div className="absolute -top-5 -right-5 w-[72px] h-[72px] border-t-2 border-r-2 border-primary/25 rounded-tr-2xl pointer-events-none" />
      <div className="absolute -bottom-5 -left-5 w-[72px] h-[72px] border-b-2 border-l-2 border-primary/25 rounded-bl-2xl pointer-events-none" />

      <style>{`@keyframes float-chip{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </motion.div>
  );
}
