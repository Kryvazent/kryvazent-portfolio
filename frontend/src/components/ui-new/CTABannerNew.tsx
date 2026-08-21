"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABannerNew() {
  return (
    <section className="relative scroll-mt-[86px] py-[104px] pt-0 overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[26px] px-10 py-16 text-center overflow-hidden border border-[rgba(214,33,51,0.3)]"
          style={{
            background:
              "linear-gradient(160deg,rgba(214,33,51,0.14),rgba(214,33,51,0.03) 55%), var(--background)",
          }}
        >
          {/* Corner geo shapes */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-[300px] h-[160px] opacity-10 bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] [clip-path:polygon(100%_0,100%_100%,28%_0)] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-[260px] h-[140px] opacity-10 bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] [clip-path:polygon(0_100%,0_0,74%_100%)] pointer-events-none"
          />

          <h2 className="relative z-10 font-syncopate font-black text-[clamp(1.7rem,3.6vw,2.6rem)] tracking-[-0.02em] mb-[14px]">
            Have a product in mind?
            <br />
            <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
              Let&apos;s build it.
            </span>
          </h2>
          <p className="relative z-10 text-muted max-w-[520px] mx-auto mb-[30px] text-[16px] font-rajdhani">
            Tell us about your idea, timeline, and goals — we&apos;ll come back with a clear plan and a starting point.
          </p>
          <Link
            href="#contact"
            className="relative z-10 inline-flex items-center gap-[10px] px-7 py-[15px] rounded-[13px] font-syncopate text-[14px] font-semibold text-white bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] transition-all duration-200 overflow-hidden group whitespace-nowrap"
          >
            Get in Touch
            <ArrowRight className="w-[17px] h-[17px]" />
            <span aria-hidden className="absolute top-0 left-[-80%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 transition-[left_.5s] group-hover:left-[130%]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
