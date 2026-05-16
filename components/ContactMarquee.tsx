"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

export function ContactMarquee() {
  const content = (
    <div className="flex items-center gap-6 shrink-0 pr-6 text-[#e1e61b] text-sm md:text-base tracking-widest uppercase">
      <span>Available Now</span>
      <span className="text-[#e1e61b]">✦</span>
      <span>Let&apos;s Rework Something</span>
      <span className="text-[#e1e61b]">✦</span>
      <span className="flex items-center gap-1">
        <ArrowUpRight className="w-5 h-5" />
        reworks.agency@gmail.com
      </span>
      <span className="text-[#e1e61b]">✦</span>
      <span className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-white" />
        4.9 / 5
      </span>
      <span className="text-[#e1e61b]">✦</span>
      <span className="text-[#e1e61b]">✦</span>
      <span>Free Brand Audit</span>
      <span className="text-[#e1e61b]">✦</span>
    </div>
  );

  return (
    <div className="w-full bg-[#6c24d6] overflow-hidden flex whitespace-nowrap py-3.5 select-none relative z-20">
      <motion.div
        animate={{ x: ["0%", "-40%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 50,
        }}
        className="flex shrink-0 items-center"
      >
        {/* Repeat content enough times to fill screen and loop */}
        {[...Array(8)].map((_, i) => (
          <div key={i}>{content}</div>
        ))}
      </motion.div>
    </div>
  );
}
