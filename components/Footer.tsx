"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const QUICK_LINKS = [
  { name: "About", href: "#about" },
  { name: "Case Studies", href: "#work" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const SIGNALS = [
  { name: "Testimonials", href: "#testimonials" },
  { name: "Newsletter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Parallax transform for the giant marquee text
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <footer 
      ref={containerRef} 
      className="relative bg-[#0A0A0A] text-white overflow-hidden pt-32 pb-8"
    >
      {/* ─── Depth & Texture ─── */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Background radial glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6c24d6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[10%] w-[800px] h-[400px] bg-[#e1e61b]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ─── Top Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Brand Col */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            <div className="mb-6 scale-90 origin-left brightness-0 invert opacity-90">
              <Logo />
            </div>
            
            <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-sm font-light">
              A Gen Z-led digital marketing agency in Dubai.<br />
              Branding • Video • Social • Digital.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-[#d4d81a]/10 border border-[#d4d81a]/20 text-[#d4d81a] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,216,26,0.08)] backdrop-blur-sm transition-all hover:bg-[#d4d81a]/20 cursor-default">
                AWWWARDS • SOTY 2024
              </div>
              <div className="px-4 py-2 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.08)] backdrop-blur-sm transition-all hover:bg-[#3b82f6]/20 cursor-default">
                FWA • AGENCY 2025
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-3 hidden lg:block" /> {/* Spacer */}

          {/* Links Cols */}
          <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-8">
            <h3 className="text-[#d4d81a] text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 drop-shadow-[0_0_8px_rgba(212,216,26,0.3)]">
              <div className="w-1 h-3 bg-[#d4d81a] rounded-sm" /> 
              Quick Links
            </h3>
            <ul className="flex flex-col gap-5">
              {QUICK_LINKS.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm font-medium w-fit">
                    <span className="relative pb-1">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-8">
            <h3 className="text-[#d4d81a] text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 drop-shadow-[0_0_8px_rgba(212,216,26,0.3)]">
              <div className="w-1 h-3 bg-[#d4d81a] rounded-sm" /> 
              Signals
            </h3>
            <ul className="flex flex-col gap-5">
              {SIGNALS.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm font-medium w-fit">
                    <span className="relative pb-1">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ─── Translucent Divider ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* ─── Premium Marquee ─── */}
        <div className="w-full overflow-hidden relative mb-16 select-none">
          <motion.div 
            style={{ x: marqueeX }}
            className="flex whitespace-nowrap items-center gap-12"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                {/* Outlined variant */}
                <span 
                  className="text-[8rem] lg:text-[13rem] font-black text-transparent leading-none bg-clip-text bg-gradient-to-b from-white/10 to-white/0 select-none" 
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
                >
                  Works
                </span>
                
                <Star className="w-16 h-16 lg:w-20 lg:h-20 text-[#3b82f6] fill-[#3b82f6] opacity-60 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] shrink-0" />
                
                {/* Solid variant */}
                <span className="text-[8rem] lg:text-[13rem] font-black text-[#d4d81a] leading-none drop-shadow-[0_0_60px_rgba(212,216,26,0.15)] select-none">
                  ReWorks
                </span>
                
                <Star className="w-16 h-16 lg:w-20 lg:h-20 text-[#6c24d6] fill-[#6c24d6] opacity-60 drop-shadow-[0_0_30px_rgba(108,36,214,0.8)] shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── Soft Bottom Divider ─── */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* ─── Metadata Bottom ─── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-white/30">
          <div>
            © {new Date().getFullYear()} REWORKS AGENCY • ALL RIGHTS RESERVED
          </div>
          
          <div className="flex items-center gap-3">
            DUBAI • MUMBAI • 
            <span className="flex items-center gap-1.5 text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" /> 
              LIVE
            </span>
          </div>
          
          <div>
            v2.6.0 • MADE WITH <span className="text-red-500/80 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">♥</span> & CAFFEINE
          </div>
        </div>

      </div>
    </footer>
  );
}
