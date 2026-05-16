"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    text: "They didn't just build us a brand. They built us a cult following. Our conversion rate tripled in exactly 4 weeks.",
    name: "Alex Sterling",
    role: "Founder, Zenith Tech",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    color: "#e1e61b",
    textColor: "#000",
  },
  {
    text: "The speed and quality are unmatched. It feels less like an agency and more like having a world-class team in your own office.",
    name: "Sarah Jenkins",
    role: "CMO, Bloom Studio",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    color: "#6c24d6",
    textColor: "#fff",
  },
  {
    text: "Brutal honesty combined with brilliant execution. They scrapped our 10-week discovery phase and just started shipping hits.",
    name: "Omar Farooq",
    role: "CEO, Desert Ventures",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    color: "#fff",
    textColor: "#000",
  },
  {
    text: "I've worked with top-tier global agencies, but ReWorks brought a Gen Z energy that completely redefined our market presence.",
    name: "Emily Chen",
    role: "Director of Marketing, Nexa",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    color: "#0ea5e9",
    textColor: "#fff",
  },
  {
    text: "They took our scattered, confused brand guidelines and turned them into a conversion machine. Absolutely relentless team.",
    name: "Marcus Thorne",
    role: "Co-Founder, Catalyst",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    color: "#ec4899",
    textColor: "#fff",
  },
  {
    text: "If you want traditional, slow-moving advertising, go elsewhere. If you want results yesterday, hire them.",
    name: "Nina Kraviz",
    role: "VP Growth, Sonic",
    image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    color: "#22c55e",
    textColor: "#fff",
  },
];

// ─── Column Component ────────────────────────────────────────────────────────

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div className={cn("overflow-hidden relative", props.className)}>
      {/* Top and Bottom faded masks for smooth scrolling illusion */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f5f5f5] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f5f5f5] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{
          translateY: props.reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 pt-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((item, i) => (
              <div
                className="p-8 rounded-2xl border-2 border-black flex flex-col justify-between min-h-[240px]"
                key={i}
                style={{
                  backgroundColor: item.color,
                  color: item.textColor,
                  boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
                }}
              >
                <div className="text-lg font-medium leading-snug">
                  &quot;{item.text}&quot;
                </div>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-black/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black bg-black/10 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-black tracking-tight leading-tight uppercase text-sm">
                      {item.name}
                    </div>
                    <div className="leading-tight opacity-75 font-bold text-[10px] tracking-widest uppercase mt-0.5">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  // Split testimonials into 3 arrays for the 3 columns to look staggered
  const col1 = [...testimonials].slice(0, 4);
  const col2 = [...testimonials].slice(2, 6).concat(testimonials.slice(0, 1));
  const col3 = [...testimonials].slice(4, 6).concat(testimonials.slice(0, 3));

  return (
    <section
      id="testimonials"
      className="w-full py-24 md:py-32 bg-[#f5f5f5] overflow-hidden border-t border-black/10 relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='1' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-stretch">
        
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center max-w-lg lg:max-w-md w-full shrink-0 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 border border-black/20 rounded-full px-4 py-1.5 mb-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2 h-2 rounded-full bg-[#6c24d6] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                The Verdict
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-black leading-[1.05] mb-6">
              Don&apos;t just <br />
              take our <br />
              <span className="bg-[#e1e61b] px-2 leading-none inline-block mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black italic">
                word for it.
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-black/70 leading-relaxed font-medium mb-10">
              We work with ambitious founders who demand fast iteration and undeniable results. Here&apos;s what happens when you cut the corporate fluff and focus entirely on conversion.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                    <Image
                      src={`https://i.pravatar.cc/150?u=a042581f4e29026024${i}`}
                      alt="Avatar"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#e1e61b]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-current drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-black/60 mt-1">
                  From 247+ clients
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Scrolling Columns */}
        <div className="flex-1 w-full h-[600px] lg:h-[800px] flex gap-4 lg:gap-6 justify-center">
          <TestimonialsColumn
            testimonials={col1}
            duration={25}
            className="w-full max-w-[320px] hidden sm:block"
          />
          <TestimonialsColumn
            testimonials={col2}
            duration={35}
            reverse
            className="w-full max-w-[320px]"
          />
          <TestimonialsColumn
            testimonials={col3}
            duration={30}
            className="w-full max-w-[320px] hidden md:block"
          />
        </div>

      </div>
    </section>
  );
}