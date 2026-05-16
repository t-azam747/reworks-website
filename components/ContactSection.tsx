"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Form Input Components ──────────────────────────────────────────────────

function Input({ label, type = "text", placeholder, required = false }: { label: string, type?: string, placeholder?: string, required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 ml-1">
        {label} {required && <span className="text-[#6c24d6]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/60 backdrop-blur-md border border-white/80 text-black placeholder:text-black/30 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-[#6c24d6]/30 focus:ring-4 focus:ring-[#6c24d6]/10 focus:shadow-sm"
      />
    </div>
  );
}

function Select({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 ml-1">
        {label}
      </label>
      <div className="relative">
        <select className="w-full appearance-none bg-white/60 backdrop-blur-md border border-white/80 text-black rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-[#6c24d6]/30 focus:ring-4 focus:ring-[#6c24d6]/10 focus:shadow-sm cursor-pointer">
          <option value="" disabled selected hidden>Select an option...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function ContactSection() {
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

  return (
    <section 
      id="contact" 
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#faf9f6]"
    >
      {/* ─── Cinematic Background Effects ─── */}
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      {/* Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 30, -20, 0], 
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[#e1e61b]/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 30, 0], 
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.1, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#6c24d6]/15 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-12">
        
        {/* ─── Left: Typography & Info ─── */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-white/60 backdrop-blur-sm border border-black/5 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                ✦ Say Hi
              </span>
            </div>

            <h2 className="text-6xl md:text-[5.5rem] font-black tracking-tighter text-black leading-[0.9] mb-8">
              Let&apos;s <span className="text-[#6c24d6] italic">rework</span><br />
              something<br />
              <span className="relative inline-block">
                <span className="relative z-10">big.</span>
                <span className="absolute inset-x-0 bottom-2 md:bottom-3 h-4 md:h-6 bg-[#e1e61b]/60 -z-0 rounded-sm" />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-black/60 leading-relaxed font-medium mb-12 max-w-md">
              Send a line — or request a free brand audit. We read every message and respond within one business day. Usually much sooner.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Info rows */}
            {[
              { label: "Email", value: "reworks.agency@gmail.com" },
              { label: "Dubai", value: "Business Bay, Dubai — UAE" },
              { label: "Mumbai", value: "Bandra West, Mumbai 400050" },
              { label: "Hours", value: "Sun–Thu • 09:00 – 18:00 GST" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/5 group cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-12">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 w-16">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-black/80 group-hover:text-black transition-colors">
                    {item.value}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-black/20 group-hover:text-[#6c24d6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 hidden sm:block" />
              </div>
            ))}

            {/* Social pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {["Instagram", "Behance", "LinkedIn", "Dribbble", "Vimeo", "GitHub"].map((social) => (
                <a 
                  key={social}
                  href="#"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-black/5 text-xs font-bold tracking-wide text-black/70 hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {social} <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Right: Glassmorphic Form ─── */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex-1 w-full max-w-xl mx-auto lg:mx-0"
        >
          <div className="relative group">
            {/* Form Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6c24d6]/20 to-[#e1e61b]/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Form Container */}
            <div className="relative w-full bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[2rem] p-8 md:p-10 flex flex-col gap-6 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:bg-white/50">
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input label="Name" placeholder="Jane Doe" required />
                </div>
                <div className="flex-1">
                  <Input label="Email" type="email" placeholder="jane@company.com" required />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Select label="Service" options={["Branding & Design", "Social Media", "Motion & Video", "Web Development", "Full Audit"]} />
                </div>
                <div className="flex-1">
                  <Select label="Budget" options={["$5K - $10K", "$10K - $25K", "$25K - $50K", "$50K+"]} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 ml-1">
                  Tell Us More
                </label>
                <textarea 
                  rows={4}
                  placeholder="One-liner about your project..."
                  className="w-full resize-none bg-white/60 backdrop-blur-md border border-white/80 text-black placeholder:text-black/30 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white focus:border-[#6c24d6]/30 focus:ring-4 focus:ring-[#6c24d6]/10 focus:shadow-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 mt-2 border-t border-black/5">
                <div className="flex items-center gap-2 text-black/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    All fields optional • No spam
                  </span>
                </div>

                <motion.button
                  onHoverStart={() => setIsHoveringSubmit(true)}
                  onHoverEnd={() => setIsHoveringSubmit(false)}
                  className="relative flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-xs font-bold uppercase tracking-wider text-white overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all hover:scale-105 hover:shadow-[0_12px_24px_rgba(108,36,214,0.3)]"
                >
                  {/* Glow effect inside button */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-[#6c24d6] to-[#e1e61b] opacity-0 transition-opacity duration-300",
                      isHoveringSubmit && "opacity-100"
                    )}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Transmit <ArrowUpRight className={cn("w-4 h-4 transition-transform duration-300", isHoveringSubmit && "translate-x-1 -translate-y-1")} />
                  </span>
                </motion.button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
