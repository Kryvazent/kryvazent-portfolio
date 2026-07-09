"use client";

import { motion } from "framer-motion";
import FloatingShapes from "./FloatingShapes";
import { useSiteContent } from "./ContentProvider";

const tones = { dark: "bg-[#050505] text-white", gray: "bg-[#4a4a4a] text-white", light: "bg-white text-[#111318]" };

export default function Customers() {
  const { content } = useSiteContent();
  const partners = content.partners.filter((partner) => partner.published);
  if (!partners.length) return null;
  const group = (duplicate = false) => (
    <div aria-hidden={duplicate} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20">
      {partners.map((partner, index) => (
        <motion.div key={`${duplicate}-${partner.name}-${index}`} whileHover={{ y: -4 }} className={`relative flex h-24 w-40 shrink-0 items-center justify-center overflow-hidden border border-line p-4 shadow-xl sm:h-28 sm:w-48 ${tones[partner.tone]}`}>
          {partner.logoUrl ? <img src={partner.logoUrl} alt={`${partner.name} logo`} className="h-full w-full object-contain" /> : <div className="text-center"><strong className="block font-syncopate">{partner.initials || partner.name}</strong>{partner.tagline && <span className="mt-1 block text-[9px] uppercase tracking-widest opacity-70">{partner.tagline}</span>}</div>}
        </motion.div>
      ))}
    </div>
  );
  return (
    <section id="customers" className="relative overflow-hidden border-y border-line bg-surface-strong px-4 py-12 lg:py-28">
      <FloatingShapes />
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <h2 className="mb-10 text-xl font-bold uppercase tracking-[0.2em] font-syncopate md:text-3xl">Verified <span className="text-primary">Network</span> Partners</h2>
        <div className="-mx-4 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max items-center hover:[animation-play-state:paused]">{group()}{group(true)}</div>
        </div>
      </div>
    </section>
  );
}
