"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    title: "Audit.",
    description: "Tear down what's not working. Find the gap between how you're showing up and how you should be.",
    bg: "white",
  },
  {
    step: "02",
    title: "Rework.",
    description: "Reshape the strategy, the story, the system. Clarity over clutter, every time.",
    bg: "yellow",
  },
  {
    step: "03",
    title: "Build.",
    description: "Design, write, shoot, ship. Fast cycles, AI-powered where it helps, never where it shouldn't.",
    bg: "white",
  },
  {
    step: "04",
    title: "Launch.",
    description: "Go live, measure, iterate. The scoreboard is the brief from here on out.",
    bg: "yellow",
  },
];

export function HowWeWork() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="w-full bg-[#f8f8f8] py-24 md:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-black/20 rounded-full px-4 py-1.5 mb-8 bg-black text-white">
              <span className="w-2 h-2 rounded-full bg-[#e1e61b]" />
              <span className="text-xs font-bold uppercase tracking-widest">
                How We Work
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[1.1]">
              <div className="flex items-center flex-wrap gap-x-4">
                Audit <ArrowRight className="w-10 h-10 md:w-14 md:h-14 stroke-[3]" /> Rework <ArrowRight className="w-10 h-10 md:w-14 md:h-14 stroke-[3]" />
              </div>
              <div className="flex items-center flex-wrap gap-x-4">
                Build <ArrowRight className="w-10 h-10 md:w-14 md:h-14 stroke-[3]" /> <span className="text-[#6c24d6] italic">Launch.</span>
              </div>
            </h2>
          </div>
          
          <div className="max-w-xs pb-4">
            <p className="text-sm font-mono text-gray-500 leading-relaxed uppercase tracking-wider">
              No hand-holding. No ten-week discovery phases. We move at the speed your brand actually needs.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <motion.div 
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -translate-y-1/2 z-0 pointer-events-none" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative z-10"
            >
              <div 
                className={cn(
                  "h-full rounded-2xl p-8 border-2 border-black flex flex-col transition-all duration-300",
                  "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
                  step.bg === "yellow" ? "bg-[#e1e61b]" : "bg-white"
                )}
              >
                <div className="mb-12">
                  <div className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                    Step · {step.step}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-3xl font-black tracking-tight mb-4 text-black">
                    {step.title}
                  </h3>
                  <p className="text-sm text-black/70 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
