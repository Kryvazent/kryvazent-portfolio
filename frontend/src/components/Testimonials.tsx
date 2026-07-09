"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "./ContentProvider";

export default function Testimonials() {
  const { content } = useSiteContent();
  const testimonials = content.testimonials.filter((item) => item.published);
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="bg-surface-strong px-6 py-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-2xl font-bold font-syncopate md:text-5xl">Client Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.figure key={`${item.name}-${index}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-7">
              <Quote className="mb-5 h-7 w-7 text-primary" />
              <blockquote className="mb-6 text-lg leading-relaxed text-foreground">“{item.quote}”</blockquote>
              <figcaption><strong className="block">{item.name}</strong><span className="text-sm text-muted">{item.role}{item.company ? `, ${item.company}` : ""}</span></figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
