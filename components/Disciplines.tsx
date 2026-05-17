"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Discipline = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  bg: string;
  image: string;
  text: "white" | "black";
};

const disciplines: Discipline[] = [
  {
    number: "01",
    title: "Branding & Design.",
    description:
      "From scattered visuals to a system that scales — strategy-led, culture-aware, conversion-ready.",
    tags: ["Brand Identity", "Visual Systems", "Campaign Creative", "Guidelines & Type"],
    bg: "#6c24d6",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    text: "white",
  },
  {
    number: "02",
    title: "Video, Animation & Motion.",
    description:
      "Brands that move get remembered — TikTok, Instagram, YouTube, ready-to-post.",
    tags: ["Brand Films", "Social Reels", "2D / 3D Animation", "Motion Graphics"],
    bg: "#111111",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2564&auto=format&fit=crop",
    text: "white",
  },
  {
    number: "03",
    title: "Social Media Marketing.",
    description:
      "Grow the right audience, not just a big one — Meta, TikTok, Instagram, LinkedIn.",
    tags: ["Community Management", "Paid Social", "Content Production"],
    bg: "#ffffff",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    text: "white",
  },
  {
    number: "04",
    title: "Digital Development.",
    description:
      "Websites that look right and convert right — fast, sharp, SEO-ready, mobile-first.",
    tags: ["Websites & Landing Pages", "UX / UI", "E-Commerce", "Campaign Builds"],
    bg: "#e1e61b",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    text: "white",
  },
];

// Shared spring config
const SPRING = { type: "spring" as const, stiffness: 340, damping: 30, mass: 0.8 };
const SPRING_SLOW = { type: "spring" as const, stiffness: 260, damping: 28, mass: 1 };

export function Disciplines() {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="w-full bg-white py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 border border-black/20 rounded-full px-4 py-1.5 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#6c24d6]" />
            <span className="text-xs font-bold uppercase tracking-widest text-black/60">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-black leading-[1.05] max-w-2xl">
            Four <span className="text-[#e1e61b] drop-shadow-lg italic" style={{ WebkitTextStroke: "1px #282727ff" }} >Disciplines</span>,<br />one <span className="text-[#6c24d6]">Studio.</span>
          </h2>
        </div>

        {/* ── Desktop: Horizontal Accordion (md+) ─────────────────── */}
        <motion.div layout className="hidden md:flex w-full items-stretch gap-3 h-[520px]">
          {disciplines.map((disc, index) => {
            const isActive = active === index;
            const isLight = disc.text === "black";

            return (
              <motion.div
                key={index}
                layout
                className="relative cursor-pointer overflow-hidden rounded-3xl flex-shrink-0 group"
                style={{
                  backgroundColor: disc.bg,
                  flexGrow: isActive ? 3 : 1,
                  outline: disc.bg === "#ffffff" ? "1px solid #e5e7eb" : "none",
                }}
                transition={SPRING}
                onClick={() => setActive(index)}
                onHoverStart={() => setActive(index)}
              >
                {/* Background Image with Hover Scale */}
                <motion.div
                  className="absolute inset-0 w-full h-full z-0"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={disc.image}
                    alt={disc.title}
                    className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                </motion.div>

                {/* Number + Arrow row */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span
                    className={cn(
                      "text-xs font-black tracking-widest opacity-60",
                      isLight ? "text-black" : "text-white"
                    )}
                  >
                    {disc.number}
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ ...SPRING, stiffness: 400, damping: 26 }}
                      >
                        <ArrowRight
                          className={cn("w-5 h-5", isLight ? "text-black" : "text-white")}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom content block */}
                <div className="absolute bottom-8 left-6 right-6 z-10 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                      <motion.h3
                        key="horizontal"
                        className={cn(
                          "font-black tracking-tight leading-tight mb-4 text-3xl md:text-4xl italic",
                          isLight ? "text-black" : "text-white"
                        )}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={SPRING_SLOW}
                      >
                        {disc.title}
                      </motion.h3>
                    ) : (
                      <motion.h3
                        key="vertical"
                        className={cn(
                          "font-black tracking-tight leading-tight text-base [writing-mode:vertical-rl] rotate-180 mb-4",
                          isLight ? "text-black" : "text-white"
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        {disc.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                        }}
                      >
                        <motion.p
                          className={cn(
                            "text-sm leading-relaxed mb-5 opacity-80",
                            isLight ? "text-black" : "text-white"
                          )}
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0, transition: SPRING },
                          }}
                        >
                          {disc.description}
                        </motion.p>
                        <div className="flex flex-wrap gap-2">
                          {disc.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className={cn(
                                "text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border",
                                isLight
                                  ? "border-black/20 text-black bg-black/8"
                                  : "border-white/30 text-white bg-white/10"
                              )}
                              variants={{
                                hidden: { opacity: 0, scale: 0.88, y: 6 },
                                visible: { opacity: 1, scale: 1, y: 0, transition: SPRING },
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Mobile: Vertical Cards (below md) ──────────────────── */}
        <div className="flex flex-col gap-4 md:hidden">
          {disciplines.map((disc, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActive(isActive ? -1 : index)}
                className="relative cursor-pointer overflow-hidden rounded-2xl group"
                style={{
                  backgroundColor: disc.bg,
                  outline: disc.bg === "#ffffff" ? "1px solid #e5e7eb" : "none",
                }}
                animate={{ height: isActive ? 340 : 100 }}
                transition={SPRING}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={disc.image}
                    alt={disc.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-white/60">
                      {disc.number}
                    </span>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-white/70" />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="font-black text-xl sm:text-2xl text-white tracking-tight leading-tight italic">
                      {disc.title}
                    </h3>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={SPRING}
                        >
                          <p className="text-sm text-white/80 leading-relaxed mt-3 mb-4">
                            {disc.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {disc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/30 text-white bg-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
