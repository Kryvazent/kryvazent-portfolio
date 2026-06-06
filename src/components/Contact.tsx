"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

const WEB3FORMS_ACCESS_KEY = "63dbf0c5-d190-432b-a556-4bae4852451c";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Message sent successfully. We will get back to you soon.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to send your message right now.");
    }
  };

  const isSending = status === "sending";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-12 lg:py-24 px-6 relative overflow-hidden">
      <FloatingShapes />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 id="contact-heading" className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">Build Your Software Project</h2>
            <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
            <p className="text-muted max-w-md mb-8 lg:mb-12 text-sm lg:text-base font-rajdhani">
              Talk to Kryvazent about custom web applications, mobile apps, AI features, cloud infrastructure, backend systems, or UI/UX engineering for your next product.
            </p>

            <address className="space-y-6 lg:space-y-8 not-italic">
              <div className="flex items-center gap-4 lg:gap-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-subtle uppercase font-bold tracking-widest font-syncopate">Email Us</p>
                  <a href="mailto:info@kryvazent.com" className="text-base lg:text-lg font-medium font-rajdhani hover:text-primary transition-colors">
                    info@kryvazent.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-subtle uppercase font-bold tracking-widest font-syncopate">Call Us</p>
                  <a href="tel:+94704443997" className="text-base lg:text-lg font-medium font-rajdhani hover:text-primary transition-colors">
                    +94 70 444 3997
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-subtle uppercase font-bold tracking-widest font-syncopate">Visit Us</p>
                  <p className="text-base lg:text-lg font-medium leading-tight font-rajdhani">Colombo,<br />Western Province, Sri Lanka</p>
                </div>
              </div>
            </address>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 lg:p-12 rounded-3xl border-line"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input type="hidden" name="subject" value="New Kryvazent website contact request" />
              <input type="hidden" name="from_name" value="Kryvazent Website" />
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-muted font-syncopate">Full Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    disabled={isSending}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors font-rajdhani"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-muted font-syncopate">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    disabled={isSending}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors font-rajdhani"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-muted font-syncopate">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  disabled={isSending}
                  className="w-full bg-surface border border-line rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors resize-none font-rajdhani"
                />
              </div>
              {statusMessage && (
                <p
                  className={`text-sm font-semibold font-rajdhani ${status === "success" ? "text-primary" : "text-red-500"}`}
                  role="status"
                  aria-live="polite"
                >
                  {statusMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 transition-all border-glow font-syncopate text-xs uppercase tracking-widest"
              >
                {isSending ? "Sending..." : "Send Transmission"} <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
