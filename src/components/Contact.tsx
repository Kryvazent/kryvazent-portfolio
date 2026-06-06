"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 lg:py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">Let's Build the Future</h2>
            <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
            <p className="text-gray-400 max-w-md mb-8 lg:mb-12 text-sm lg:text-base font-rajdhani">
              Ready to take your software to the next level? Contact us today for a consultation on how Kryverzent can help you engineering excellence.
            </p>

            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center gap-4 lg:gap-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500 uppercase font-bold tracking-widest font-syncopate">Email Us</p>
                  <p className="text-base lg:text-lg font-medium font-rajdhani">info@kryverzent.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500 uppercase font-bold tracking-widest font-syncopate">Call Us</p>
                  <p className="text-base lg:text-lg font-medium font-rajdhani">+94 70 444 3997</p>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500 uppercase font-bold tracking-widest font-syncopate">Visit Us</p>
                  <p className="text-base lg:text-lg font-medium leading-tight font-rajdhani">Colombo,<br />Western Province, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 lg:p-12 rounded-3xl border-white/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 font-syncopate">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors font-rajdhani"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 font-syncopate">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors font-rajdhani"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400 font-syncopate">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors resize-none font-rajdhani"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all border-glow font-syncopate text-xs uppercase tracking-widest"
              >
                Send Transmission <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
