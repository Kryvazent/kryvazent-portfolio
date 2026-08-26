"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const WEB3FORMS_ACCESS_KEY = "63dbf0c5-d190-432b-a556-4bae4852451c";
const WEB3FORMS_ENDPOINT   = "https://api.web3forms.com/submit";

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $2,500",
  "$2,500 – $6,000",
  "$6,000+",
  "Ongoing / retainer",
];

const CONTACT_ITEMS = [
  { href: "mailto:info@kryvazent.com", Icon: Mail,         label: "Email",     value: "info@kryvazent.com",  sub: "We reply within 24 hours"      },
  { href: "tel:+94704443997",          Icon: Phone,        label: "Phone",     value: "+94 70 444 3997",     sub: "Mon – Fri, 9am – 6pm IST"      },
  { href: "https://wa.me/94704443997", Icon: MessageCircle, label: "WhatsApp", value: "Chat instantly",      sub: "Fastest way to reach us", external: true },
  { href: null,                         Icon: MapPin,       label: "Location",  value: "Colombo, Sri Lanka",  sub: "Western Province, LK"          },
] as const;

/* ── Validation helpers ───────────────────────────────────── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
function isValidName(v: string) {
  return v.trim().length >= 2;
}
function isValidMessage(v: string) {
  return v.trim().length >= 20;
}

type FieldErrors = {
  name?:    string;
  email?:   string;
  message?: string;
};

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!isValidName(name))       errors.name    = "Please enter your full name (at least 2 characters).";
  if (!email.trim())            errors.email   = "Email address is required.";
  else if (!isValidEmail(email)) errors.email  = "Please enter a valid email address.";
  if (!isValidMessage(message)) errors.message = "Please describe your project in at least 20 characters.";
  return errors;
}

/* ── Shared style helpers ─────────────────────────────────── */
const labelCls = "font-syncopate text-[10px] font-bold tracking-[0.14em] uppercase text-muted";

function fieldCls(hasError: boolean) {
  return [
    "w-full bg-background border rounded-[11px] px-4 py-3 text-foreground font-rajdhani text-[14px] outline-none transition-all disabled:opacity-60",
    hasError
      ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
      : "border-line focus:border-primary focus:shadow-[0_0_0_3px_rgba(214,33,51,0.12)]",
  ].join(" ");
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="text-red-500 text-[11.5px] font-rajdhani mt-1 flex items-center gap-1">
      <span aria-hidden>✕</span> {msg}
    </p>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function ContactNew() {
  const [status,    setStatus]    = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [errors,    setErrors]    = useState<FieldErrors>({});
  const [touched,   setTouched]   = useState<Record<string, boolean>>({});

  /* Validate a single field on blur */
  const handleBlur = (field: keyof FieldErrors, value: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const all = validate(
      field === "name"    ? value : "",
      field === "email"   ? value : "",
      field === "message" ? value : ""
    );
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  /* Clear a field error on change once touched */
  const handleChange = (field: keyof FieldErrors, value: string) => {
    if (!touched[field]) return;
    const all = validate(
      field === "name"    ? value : "a",   // pass placeholder for other fields
      field === "email"   ? value : "a@b.com",
      field === "message" ? value : "a".repeat(20)
    );
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd   = new FormData(form);
    const name    = (fd.get("name")    as string) ?? "";
    const email   = (fd.get("email")   as string) ?? "";
    const message = (fd.get("message") as string) ?? "";

    /* Run full validation */
    const errs = validate(name, email, message);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) return; // stop here

    setStatus("sending");
    setStatusMsg("");
    try {
      const res  = await fetch(WEB3FORMS_ENDPOINT, {
        method:  "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body:    JSON.stringify(Object.fromEntries(fd)),
      });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !json.success) throw new Error(json.message ?? "Unable to send message.");
      form.reset();
      setErrors({});
      setTouched({});
      setStatus("success");
      setStatusMsg("Message sent. We'll get back to you soon.");
    } catch (err) {
      setStatus("error");
      setStatusMsg(err instanceof Error ? err.message : "Unable to send message.");
    }
  };

  const isSending = status === "sending";

  return (
    <section
      id="contact"
      aria-labelledby="contact-new-heading"
      className="relative scroll-mt-[86px] py-[104px] overflow-hidden bg-surface-strong border-y border-line"
    >
      <FloatingShapes />
      <div aria-hidden className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div aria-hidden className="absolute top-0 left-0 w-[360px] h-[360px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-x-10 gap-y-8 lg:gap-y-6">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-none lg:pr-2 lg:self-end"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
              Get in touch
            </span>
            <h2
              id="contact-new-heading"
              className="font-syncopate font-bold text-[clamp(1.75rem,4vw,2.7rem)] tracking-[-0.02em] leading-[1.15] mb-4"
            >
              Build Your{" "}
              <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
                Software Project
              </span>
            </h2>
            <p className="text-muted text-[16.5px] font-rajdhani leading-relaxed max-w-[460px]">
              Tell us about your product, timeline, and goals — we&apos;ll come back with a clear plan.
            </p>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-none lg:row-span-2 lg:h-full"
          >
            <form
              className="bg-surface border border-line rounded-[22px] p-6 sm:p-8 backdrop-blur-[10px] h-full flex flex-col"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input type="hidden" name="subject"    value="New Kryvazent website contact request" />
              <input type="hidden" name="from_name"  value="Kryvazent Website" />
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <p className="font-syncopate font-bold text-[15px] mb-6 text-foreground">Send us a message</p>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cn-name" className={labelCls}>
                    Full Name <span className="text-primary" aria-hidden>*</span>
                  </label>
                  <input
                    id="cn-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    disabled={isSending}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "cn-name-err" : undefined}
                    className={fieldCls(!!errors.name)}
                    onBlur={(e) => handleBlur("name", e.target.value)}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <span id="cn-name-err"><FieldError msg={errors.name} /></span>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="cn-email" className={labelCls}>
                    Email <span className="text-primary" aria-hidden>*</span>
                  </label>
                  <input
                    id="cn-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    disabled={isSending}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "cn-email-err" : undefined}
                    className={fieldCls(!!errors.email)}
                    onBlur={(e) => handleBlur("email", e.target.value)}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <span id="cn-email-err"><FieldError msg={errors.email} /></span>
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="cn-budget" className={labelCls}>
                  Budget{" "}
                  <span className="text-subtle normal-case tracking-normal font-rajdhani text-[11px] font-normal">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <select
                    id="cn-budget"
                    name="budget"
                    disabled={isSending}
                    className={`${fieldCls(false)} appearance-none`}
                  >
                    {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <span className="absolute right-4 top-1/2 w-[7px] h-[7px] border-r-2 border-b-2 border-subtle -translate-y-[70%] rotate-45 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1 flex-1 min-h-[140px] mb-5">
                <label htmlFor="cn-message" className={labelCls}>
                  Project Details <span className="text-primary" aria-hidden>*</span>
                </label>
                <textarea
                  id="cn-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your product, goals, and timeline..."
                  required
                  disabled={isSending}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "cn-message-err" : undefined}
                  className={`${fieldCls(!!errors.message)} resize-none flex-1 min-h-[120px]`}
                  onBlur={(e) => handleBlur("message", e.target.value)}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
                <span id="cn-message-err"><FieldError msg={errors.message} /></span>
              </div>

              {/* Submit status */}
              {statusMsg && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-[13.5px] font-semibold mb-4 font-rajdhani ${
                    status === "success" ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {statusMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="mt-auto w-full flex items-center justify-center gap-[10px] px-7 py-[14px] rounded-[12px] font-syncopate text-[13px] font-bold uppercase tracking-[0.04em] text-white bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden group"
              >
                <span className="relative z-10">{isSending ? "Sending…" : "Send Message"}</span>
                <Send className="relative z-10 w-[15px] h-[15px]" />
                <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          </motion.div>

          {/* ── Contact cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-3 lg:order-none flex flex-col gap-3 h-full min-h-0"
          >
            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
              {CONTACT_ITEMS.map(({ href, Icon, label, value, sub, ...rest }) => {
                const inner = (
                  <div className="relative flex flex-col gap-3 h-full p-4 sm:p-5">
                    {href && (
                      <ArrowUpRight aria-hidden className="absolute top-4 right-4 w-3.5 h-3.5 text-primary/50 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                    <span className="w-[40px] h-[40px] rounded-[11px] bg-[rgba(214,33,51,0.10)] border border-[rgba(214,33,51,0.25)] text-primary flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-primary group-hover:text-white">
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-syncopate text-[9px] font-bold tracking-[0.22em] uppercase text-subtle mb-1">{label}</span>
                      <span className="block text-[14px] sm:text-[14.5px] font-semibold font-rajdhani text-foreground leading-snug break-words">{value}</span>
                      <span className="block text-[12px] text-subtle font-rajdhani mt-1">{sub}</span>
                    </div>
                  </div>
                );

                const cardCls = "group relative bg-surface border border-line rounded-[16px] overflow-hidden h-full transition-all duration-200 hover:border-[rgba(214,33,51,0.45)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]";

                return href ? (
                  <a key={label} href={href} {...("external" in rest && rest.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cardCls}>{inner}</a>
                ) : (
                  <div key={label} className={cardCls}>{inner}</div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 bg-[rgba(214,33,51,0.06)] border border-[rgba(214,33,51,0.2)] rounded-[14px] px-5 py-3.5">
              <Clock className="w-[18px] h-[18px] text-primary flex-shrink-0" />
              <div>
                <span className="block font-syncopate text-[10px] font-bold tracking-[0.18em] uppercase text-primary mb-[2px]">Typical response time</span>
                <span className="text-[14px] text-muted font-rajdhani">We respond to all enquiries within 1 business day.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
