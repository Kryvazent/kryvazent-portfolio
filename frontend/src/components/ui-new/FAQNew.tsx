"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What does Kryvazent do?",
    a: "Kryvazent is a software development and technology engineering company that builds custom web applications, mobile apps, AI-enabled systems, cloud infrastructure, backend platforms, APIs, and UI/UX experiences.",
  },
  {
    q: "Where is Kryvazent based?",
    a: "Kryvazent is based in Colombo, Western Province, Sri Lanka, and works with clients in Sri Lanka and international markets.",
  },
  {
    q: "What services does Kryvazent provide?",
    a: "Kryvazent provides custom web app development, mobile app development, AI product integration, cloud infrastructure, DevOps, backend development, API architecture, and UI/UX engineering.",
  },
  {
    q: "Can Kryvazent help startups and growing businesses?",
    a: "Yes. Kryvazent works with startups, growing businesses, and organizations that need reliable software engineering for new products, modernization, automation, or scalable digital systems.",
  },
  {
    q: "How can I start a project with Kryvazent?",
    a: "You can contact Kryvazent by email, phone, or the website contact form with a short description of your product, business goal, timeline, and technical needs.",
  },
] as const;

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-[15px] overflow-hidden mb-3 transition-colors duration-300 ${
        open ? "border-[rgba(214,33,51,0.45)] bg-surface" : "border-line bg-surface"
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-[18px] bg-transparent border-0 text-left px-[22px] py-5 cursor-pointer font-syncopate text-[15.5px] font-semibold text-foreground"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{q}</span>
        <span
          className={`w-[30px] h-[30px] rounded-[9px] flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
            open
              ? "rotate-45 bg-primary text-white"
              : "bg-[rgba(214,33,51,0.10)] text-primary"
          }`}
        >
          <Plus className="w-[15px] h-[15px]" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-[22px] pb-[22px] text-muted text-[14.5px] leading-[1.7] max-w-[700px] font-rajdhani">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQNew() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      aria-labelledby="faq-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-[640px] mx-auto mb-12"
        >
          <span className="inline-flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
            Good to know
          </span>
          <h2
            id="faq-new-heading"
            className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-4"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted text-[16.5px] font-rajdhani">
            Answers for businesses comparing software development, AI product engineering, cloud infrastructure, and
            digital product partners.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-[820px] mx-auto">
          {FAQS.map(({ q, a }, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <FAQItem
                q={q}
                a={a}
                open={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
