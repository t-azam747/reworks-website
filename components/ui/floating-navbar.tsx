"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  logo,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
  logo?: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB")); // 24-hour format
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -80, scale: 0.95 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.98,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
          mass: 0.8,
        }}
        className={cn(
          "fixed inset-x-0 top-6 z-[5000] mx-auto flex w-11/12 max-w-7xl items-center gap-6",
          className
        )}
      >
        {/* Logo Section - Outside the Navbar */}
        {logo && (
          <div className="flex-shrink-0 origin-left scale-90 md:scale-100">
            {logo}
          </div>
        )}

        {/* Navbar Pill */}
        <div
          className="
            flex w-full items-center justify-between
            rounded-full
            border border-white/20
            bg-white/60
            px-4 py-2
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            backdrop-blur-xl
            transition-all duration-500 hover:bg-white/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          "
        >
          {/* Navigation Links (shifted left slightly to balance) */}
          <div className="hidden lg:flex items-center gap-1 pl-2">
            {navItems.map((navItem, idx: number) => {
              const isActive = navItem.name === "HOME";
              return (
                <a
                  key={`link-${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-5 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-300",
                    isActive
                      ? "bg-[#e1e61b] text-black shadow-sm"
                      : "text-black/70 hover:bg-black/5 hover:text-black"
                  )}
                >
                  {navItem.name}
                  {navItem.name === "SERVICES" && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 opacity-60">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="flex items-center gap-3 pr-1 ml-auto">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-1.5 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-black/40 animate-pulse" />
              <span className="text-[13px] font-mono font-medium text-black/70 tracking-widest">{time || "00:00:00"}</span>
            </div>
            <button className="rounded-full bg-[#e1e61b] px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-[#d4d919] hover:shadow-lg hover:shadow-[#e1e61b]/20 active:scale-95">
              Free Brand Audit
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
