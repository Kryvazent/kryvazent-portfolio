"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";

/* ── Console typing lines ───────────────────────────── */
const LINES: { plain: string; html: string }[] = [
  { plain: "$ kryvazent deploy --production", html: '<span class="text-[#FF4757]">$</span> <span class="text-white">kryvazent deploy --production</span>' },
  { plain: "▸ Compiling application bundle… done", html: '<span class="text-[#7d8598]">▸ Compiling application bundle…</span> <span class="text-[#4ade80]">done</span>' },
  { plain: "▸ Running 214 tests… all passed", html: '<span class="text-[#7d8598]">▸ Running 214 tests…</span> <span class="text-[#4ade80]">all passed</span>' },
  { plain: "▸ Provisioning cloud infrastructure… ready", html: '<span class="text-[#7d8598]">▸ Provisioning cloud infrastructure…</span> <span class="text-[#4ade80]">ready</span>' },
  { plain: "✓ Deployed in 42s — zero downtime", html: '<span class="text-[#4ade80]">✓ Deployed in 42s — zero downtime</span>' },
];

function ConsoleTyping() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [rendered, setRendered] = useState<string[]>([]);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReduced.current) {
      setRendered(LINES.map((l) => l.html));
      setDone(true);
      return;
    }
    if (lineIdx >= LINES.length) { setDone(true); return; }
    const plain = LINES[lineIdx].plain;
    if (charIdx < plain.length) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), 16);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setRendered((prev) => [...prev, LINES[lineIdx].html]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 260);
    return () => clearTimeout(id);
  }, [lineIdx, charIdx]);

  const current = !done && lineIdx < LINES.length ? LINES[lineIdx].plain.slice(0, charIdx) : null;

  return (
    <div className="font-mono text-[12.8px] leading-[2.05] text-[#c7cdd9] min-h-[196px] p-5 overflow-x-auto">
      {rendered.map((html, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
      {current !== null && (
        <div>
          {current}
          <span className="inline-block w-2 h-[15px] bg-[#FF4757] align-[-2px] ml-[3px] animate-[blink_1s_steps(1)_infinite]" />
        </div>
      )}
      {done && (
        <div>
          <span className="text-[#FF4757]">$</span>
          <span className="inline-block w-2 h-[15px] bg-[#FF4757] align-[-2px] ml-[3px] animate-[blink_1s_steps(1)_infinite]" />
        </div>
      )}
    </div>
  );
}

/* ── Hero Tiles ─────────────────────────────────────── */
const TILES = [
  { Icon: Zap, title: "Performance", sub: "Fast, maintainable systems" },
  { Icon: Shield, title: "Secure", sub: "Secure architecture" },
  { Icon: Rocket, title: "Scale", sub: "Cloud ready" },
] as const;

/* ── Main Component ──────────────────────────────────── */
export default function HeroNew() {
  return (
    <header
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-[calc(74px+56px)] pb-[90px] overflow-hidden w-full"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(214,33,51,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(214,33,51,0.06) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%,black,transparent)",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%,black,transparent)",
        }}
      />

      {/* Aurora blobs */}
      <div aria-hidden="true" className="absolute w-[640px] h-[640px] top-[-180px] right-[-140px] rounded-full bg-[rgba(214,33,51,0.14)] blur-[110px] pointer-events-none animate-[drift_16s_ease-in-out_infinite_alternate]" />
      <div aria-hidden="true" className="absolute w-[520px] h-[520px] bottom-[-200px] left-[-160px] rounded-full bg-[rgba(255,71,87,0.08)] blur-[110px] pointer-events-none animate-[drift_16s_ease-in-out_infinite_alternate] [animation-delay:-6s]" />

      {/* Geo shapes */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[420px] h-[230px] opacity-[0.06] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] [clip-path:polygon(100%_0,100%_100%,28%_0)] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[380px] h-[200px] opacity-[0.06] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] [clip-path:polygon(0_100%,0_0,74%_100%)] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)] relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-[60px] items-center w-full">

          {/* ── Left ── */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-[10px] px-4 py-2 rounded-full border border-[rgba(214,33,51,0.35)] bg-[rgba(214,33,51,0.10)] font-syncopate text-[11px] font-semibold tracking-[0.14em] uppercase text-primary mb-[26px]">
              <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_rgba(214,33,51,0.18)] animate-pulse" />
              Accepting new software &amp; AI projects
            </div>

            <h1 className="font-syncopate font-black text-[clamp(2.9rem,7.2vw,5.4rem)] leading-[1.02] tracking-[-0.035em] mb-6">
              Software<br />
              <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent relative">
                Built.
                <span className="absolute left-[2%] bottom-[6px] w-[96%] h-[10px] bg-[rgba(214,33,51,0.10)] rounded-[6px] -z-10" />
              </span>{" "}Properly.
            </h1>

            <p className="text-muted text-[clamp(15.5px,1.5vw,18px)] max-w-[560px] mb-9 leading-relaxed font-rajdhani">
              Kryvazent builds custom web apps, mobile apps, AI-enabled systems, cloud infrastructure, backend platforms,
              and digital product experiences for businesses that need reliable technology.
            </p>

            <div className="flex flex-wrap gap-[14px] items-center mb-[34px]">
              <Link
                href="#contact"
                className="inline-flex items-center gap-[10px] px-7 py-[15px] rounded-[13px] font-syncopate text-[14px] font-semibold text-white bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] transition-all duration-200 relative overflow-hidden group whitespace-nowrap"
              >
                Start a Project
                <ArrowRight className="w-[17px] h-[17px]" />
                <span aria-hidden className="absolute top-0 left-[-80%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 transition-[left_.5s] group-hover:left-[130%]" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-[10px] px-7 py-[15px] rounded-[13px] font-syncopate text-[14px] font-semibold bg-surface border border-line backdrop-blur-[8px] hover:border-primary hover:text-primary hover:-translate-y-[2px] transition-all duration-200 whitespace-nowrap"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 border-t border-line pt-[22px] w-full max-w-[560px]">
              {[
                { val: "100", suffix: "+", label: "Projects delivered" },
                { val: "6", suffix: "", label: "Core service areas" },
                { val: "SL", suffix: " → 🌏", label: "Colombo · global clients" },
              ].map(({ val, suffix, label }, i) => (
                <div
                  key={label}
                  className={`min-w-0 ${i === 0 ? "pr-[18px]" : "px-[18px] border-l border-line"}`}
                >
                  <b className="block font-syncopate text-[21px] font-black tracking-[-0.01em] whitespace-nowrap">
                    {val}<span className="text-primary">{suffix}</span>
                  </b>
                  <small className="text-subtle text-[11px] font-medium tracking-[0.05em] uppercase block leading-snug">{label}</small>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Console + Tiles ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="relative min-w-0 w-full"
          >
            {/* glow behind */}
            <div aria-hidden className="absolute inset-[-40px_-30px] bg-[radial-gradient(closest-side,rgba(214,33,51,0.16),transparent_72%)] pointer-events-none -z-[1]" />

            {/* Console */}
            <div className="relative bg-[#0B0D13] border border-white/[0.10] rounded-[20px] shadow-[0_18px_48px_rgba(0,0,0,0.45)] overflow-hidden">
              {/* top shine */}
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,71,87,0.6)] to-transparent" />

              {/* titlebar */}
              <div className="flex items-center gap-2 px-[18px] py-[14px] border-b border-white/[0.07]">
                <span className="w-[11px] h-[11px] rounded-full bg-[#FF4757]" />
                <span className="w-[11px] h-[11px] rounded-full bg-white/[0.22]" />
                <span className="w-[11px] h-[11px] rounded-full bg-white/[0.12]" />
                <span className="ml-[10px] font-mono text-[11.5px] text-[#8b93a5] tracking-[0.04em] truncate">
                  kryvazent · build-pipeline
                </span>
              </div>

              {/* Console body */}
              <ConsoleTyping />

              {/* footer */}
              <div className="flex items-center justify-between px-5 py-[13px] border-t border-white/[0.07]">
                <div className="flex gap-[7px]">
                  {[0, 0.25, 0.5, 0.75, 1].map((d) => (
                    <span
                      key={d}
                      className="w-[5px] h-[5px] rounded-[2px] bg-[rgba(255,71,87,0.65)] animate-pulse"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10.5px] tracking-[0.22em] text-[#FF4757] uppercase animate-pulse">
                  System Optimal
                </span>
              </div>
            </div>

            {/* Tiles */}
            <div className="grid grid-cols-3 gap-3 mt-[14px]">
              {TILES.map(({ Icon, title, sub }) => (
                <div
                  key={title}
                  className="bg-surface border border-line rounded-[15px] p-[15px_14px] backdrop-blur-[8px] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(214,33,51,0.45)] group"
                >
                  <Icon className="w-[19px] h-[19px] text-primary mb-[9px]" />
                  <b className="block font-syncopate text-[13px] font-bold mb-[2px]">{title}</b>
                  <small className="text-[10px] tracking-[0.09em] uppercase text-subtle leading-snug block">{sub}</small>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* blink keyframe injected */}
      <style>{`@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes drift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(5%,-6%) scale(1.12)}100%{transform:translate(-4%,5%) scale(1.05)}}`}</style>
    </header>
  );
}
