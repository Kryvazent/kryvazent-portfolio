"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Rocket, Shield, Zap } from "lucide-react";

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

const MOBILE_STATS = [
  { Icon: Rocket, value: "100+", label: "Projects Delivered" },
  { Icon: Shield, value: "6", label: "Core Service Areas" },
  { Icon: Globe, value: "SL 🇱🇰", label: "Colombo · Global Clients" },
] as const;

/* ── Mobile device mockup ───────────────────────────── */
function LaptopScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 bg-[#10131A] p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4757]" />
          <span className="text-[5px] font-semibold tracking-[0.14em] text-white/70">ANALYTICS</span>
        </div>
        <div className="flex gap-1">
          <span className="h-1.5 w-7 rounded-full bg-white/10" />
          <span className="h-1.5 w-4 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[
          { n: "128k", l: "Users" },
          { n: "94%", l: "Uptime" },
          { n: "42", l: "Deploys" },
        ].map((s) => (
          <div key={s.l} className="rounded-[4px] bg-white/[0.06] px-1.5 py-1">
            <div className="text-[7px] font-bold leading-none text-white">{s.n}</div>
            <div className="mt-0.5 text-[4.5px] uppercase tracking-wider text-white/40">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="min-h-0 flex-1 rounded-[4px] bg-white/[0.04] px-1.5 py-1">
        <svg viewBox="0 0 140 46" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hero-chart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4757" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF4757" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 34 L18 28 L36 31 L54 18 L72 22 L90 10 L108 14 L140 8 V46 H0 Z" fill="url(#hero-chart)" />
          <path d="M0 34 L18 28 L36 31 L54 18 L72 22 L90 10 L108 14 L140 8" fill="none" stroke="#FF4757" strokeWidth="1.6" />
          <path d="M0 38 L18 33 L36 35 L54 26 L72 28 L90 20 L108 22 L140 16" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.1" />
        </svg>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 bg-[#10131A] p-1.5">
      <div className="mx-auto mt-0.5 h-1 w-6 rounded-full bg-white/15" />
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[5px] font-bold tracking-[0.12em] text-white/80">PROJECTS</span>
        <span className="h-2 w-2 rounded-full bg-[#FF4757]/80" />
      </div>
      <div className="rounded-[5px] bg-gradient-to-br from-[#FF4757] to-[#A31527] px-1.5 py-1.5">
        <div className="text-[4.5px] uppercase tracking-wider text-white/70">Active</div>
        <div className="text-[8px] font-bold leading-none text-white">12</div>
      </div>
      {["Web Platform", "AI Dashboard", "Mobile App"].map((item, i) => (
        <div key={item} className="flex items-center gap-1 rounded-[4px] bg-white/[0.06] px-1 py-1">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-[#FF4757]/25" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[5px] font-semibold text-white/90">{item}</div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#FF4757]" style={{ width: `${70 - i * 16}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroDeviceMockup() {
  return (
    <div className="relative mx-auto mt-1 h-[230px] w-full max-w-[420px] lg:hidden" aria-hidden="true">
      <div className="absolute inset-x-6 bottom-2 h-24 rounded-full bg-[rgba(214,33,51,0.16)] blur-3xl" />

      {/* Laptop */}
      <div className="absolute bottom-[22px] left-[2%] w-[78%] origin-bottom [transform:perspective(980px)_rotateX(14deg)_rotateY(-10deg)]">
        <div className="rounded-t-[12px] bg-[#2B3038] p-[5px] pb-0 shadow-[0_22px_40px_rgba(0,0,0,0.28)]">
          <div className="mx-auto mb-1 h-[3px] w-8 rounded-full bg-black/25" />
          <div className="aspect-[16/10] overflow-hidden rounded-t-[6px] bg-[#0E1118]">
            <LaptopScreen />
          </div>
        </div>
        <div className="relative h-[9px] rounded-b-[3px] bg-[#3A404A]">
          <div className="absolute left-1/2 top-0 h-[4px] w-[18%] -translate-x-1/2 rounded-b-full bg-[#2B3038]" />
        </div>
        <div className="mx-[-6%] h-[4px] rounded-b-[10px] bg-[#4A515C]" />
      </div>

      {/* Phone */}
      <div className="absolute bottom-[10px] right-[5%] w-[27%] origin-bottom [transform:perspective(860px)_rotateX(10deg)_rotateY(-14deg)]">
        <div className="rounded-[18px] border border-black/5 bg-white p-[4px] shadow-[0_18px_36px_rgba(15,23,42,0.22)]">
          <div className="aspect-[9/19] overflow-hidden rounded-[14px] bg-[#0E1118]">
            <PhoneScreen />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */
export default function HeroNew() {
  return (
    <header
      id="hero"
      className="relative min-h-[100svh] max-lg:min-h-0 flex items-center max-lg:items-start pt-[calc(74px+56px)] max-lg:pt-[88px] pb-[90px] max-lg:pb-8 overflow-hidden w-full"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50 max-lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(214,33,51,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(214,33,51,0.06) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%,black,transparent)",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%,black,transparent)",
        }}
      />

      {/* Aurora blobs */}
      <div aria-hidden="true" className="absolute w-[640px] h-[640px] max-lg:w-[340px] max-lg:h-[340px] top-[-180px] max-lg:top-[-80px] right-[-140px] max-lg:right-[-80px] rounded-full bg-[rgba(214,33,51,0.14)] blur-[110px] max-lg:blur-[80px] pointer-events-none animate-[drift_16s_ease-in-out_infinite_alternate]" />
      <div aria-hidden="true" className="absolute w-[520px] h-[520px] max-lg:w-[280px] max-lg:h-[280px] bottom-[-200px] max-lg:bottom-[40px] left-[-160px] max-lg:left-[-60px] rounded-full bg-[rgba(255,71,87,0.08)] max-lg:bg-[rgba(255,71,87,0.14)] blur-[110px] max-lg:blur-[70px] pointer-events-none animate-[drift_16s_ease-in-out_infinite_alternate] [animation-delay:-6s]" />
      <div aria-hidden="true" className="hidden max-lg:block absolute w-[260px] h-[260px] bottom-[-20px] right-[-40px] rounded-full bg-[rgba(214,33,51,0.10)] blur-[70px] pointer-events-none" />

      {/* Geo shapes */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[420px] h-[230px] opacity-[0.06] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] [clip-path:polygon(100%_0,100%_100%,28%_0)] pointer-events-none max-lg:hidden" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[380px] h-[200px] opacity-[0.06] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] [clip-path:polygon(0_100%,0_0,74%_100%)] pointer-events-none max-lg:hidden" />

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)] relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-[60px] max-lg:gap-6 items-center w-full">

          {/* ── Left ── */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-syncopate max-lg:[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] font-black max-lg:font-extrabold text-[clamp(2.9rem,7.2vw,5.4rem)] max-lg:text-[clamp(2.35rem,11vw,3rem)] leading-[1.02] max-lg:leading-[1.08] tracking-[-0.035em] max-lg:tracking-[-0.04em] mb-6 max-lg:mb-4">
              Software<br />
              <span className="relative bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent max-lg:bg-none max-lg:text-primary">
                Built.
                <span className="absolute left-[2%] bottom-[6px] -z-10 h-[10px] w-[96%] rounded-[6px] bg-[rgba(214,33,51,0.10)] max-lg:bottom-[6px] max-lg:left-0 max-lg:h-[3px] max-lg:w-[2.4rem] max-lg:rounded-full max-lg:bg-primary" />
              </span>
              <span className="max-lg:block"> Properly.</span>
            </h1>

            <p className="text-muted text-[clamp(15.5px,1.5vw,18px)] max-lg:text-[15px] max-w-[560px] mb-9 max-lg:mb-6 leading-relaxed font-rajdhani max-lg:[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]">
              Kryvazent builds custom web apps, mobile apps, AI-enabled systems, cloud infrastructure, backend platforms,
              and digital product experiences for businesses that need reliable technology.
            </p>

            <div className="flex flex-wrap max-lg:flex-nowrap gap-[14px] max-lg:gap-2.5 items-center mb-[34px] max-lg:mb-5">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-[10px] max-lg:gap-1.5 px-7 py-[15px] max-lg:px-3.5 max-lg:py-3 max-lg:flex-1 rounded-[13px] max-lg:rounded-[12px] font-syncopate max-lg:[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[14px] max-lg:text-[13px] font-semibold text-white bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] transition-all duration-200 relative overflow-hidden group whitespace-nowrap"
              >
                Start a Project
                <ArrowRight className="w-[17px] h-[17px] max-lg:w-4 max-lg:h-4" />
                <span aria-hidden className="absolute top-0 left-[-80%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 transition-[left_.5s] group-hover:left-[130%]" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-[10px] max-lg:gap-1.5 px-7 py-[15px] max-lg:px-3.5 max-lg:py-3 max-lg:flex-1 rounded-[13px] max-lg:rounded-[12px] font-syncopate max-lg:[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[14px] max-lg:text-[13px] font-semibold bg-surface max-lg:bg-surface-strong border border-line max-lg:border-transparent max-lg:shadow-[var(--shadow-sm)] backdrop-blur-[8px] hover:border-primary hover:text-primary hover:-translate-y-[2px] transition-all duration-200 whitespace-nowrap"
              >
                Explore Services
                <ArrowRight className="hidden max-lg:block w-4 h-4" />
              </Link>
            </div>

            {/* Stats — desktop */}
            <div className="hidden lg:grid grid-cols-3 border-t border-line pt-[22px] w-full max-w-[560px]">
              <div className="min-w-0 pr-[18px]">
                <b className="block font-syncopate text-[21px] font-black tracking-[-0.01em] whitespace-nowrap">
                  100<span className="text-primary">+</span>
                </b>
                <small className="text-subtle text-[11px] font-medium tracking-[0.05em] uppercase block leading-snug">Projects delivered</small>
              </div>

              <div className="min-w-0 px-[18px] border-l border-line">
                <b className="block font-syncopate text-[21px] font-black tracking-[-0.01em] whitespace-nowrap">
                  6
                </b>
                <small className="text-subtle text-[11px] font-medium tracking-[0.05em] uppercase block leading-snug">Core service areas</small>
              </div>

              <div className="min-w-0 px-[18px] border-l border-line">
                <b className="flex items-center gap-[6px] font-syncopate text-[21px] font-black tracking-[-0.01em] whitespace-nowrap">
                  SL
                  <span className="text-primary text-[18px]">→</span>
                  <img
                    src="https://flagcdn.com/w40/lk.png"
                    alt="Sri Lanka flag"
                    width={24}
                    height={16}
                    className="inline-block rounded-[3px] shadow-sm"
                    loading="eager"
                  />
                </b>
                <small className="text-subtle text-[11px] font-medium tracking-[0.05em] uppercase block leading-snug">Colombo · global clients</small>
              </div>
            </div>

            {/* Stats — mobile card */}
            <div className="lg:hidden grid grid-cols-3 rounded-[18px] border border-line bg-surface-strong px-3 py-3.5 shadow-[var(--shadow-sm)]">
              {MOBILE_STATS.map(({ Icon, value, label }) => (
                <div key={label} className="flex min-w-0 flex-col items-start gap-1.5 px-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(214,33,51,0.10)]">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <b className="block [font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[15px] font-extrabold leading-none tracking-tight text-foreground">
                    {value}
                  </b>
                  <small className="block [font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[9px] font-medium leading-tight text-subtle">
                    {label}
                  </small>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Console + Tiles (desktop) / devices (mobile) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="relative min-w-0 w-full"
          >
            <HeroDeviceMockup />

            {/* glow behind */}
            <div aria-hidden className="absolute inset-[-40px_-30px] bg-[radial-gradient(closest-side,rgba(214,33,51,0.16),transparent_72%)] pointer-events-none -z-[1] hidden lg:block" />

            {/* Console — desktop / tablet */}
            <div className="hidden lg:block relative bg-[#0B0D13] border border-white/[0.10] rounded-[20px] shadow-[0_18px_48px_rgba(0,0,0,0.45)] overflow-hidden">
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
            <div className="hidden lg:grid grid-cols-3 gap-3 mt-[14px]">
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
