"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Close mobile menu on scroll hide
  React.useEffect(() => {
    if (!visible) setMobileOpen(false);
  }, [visible]);

  return (
    <>
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
            "fixed inset-x-0 top-4 sm:top-6 z-[5000] mx-auto flex w-[95%] sm:w-11/12 max-w-7xl items-center gap-4 sm:gap-6",
            className
          )}
        >
          {/* Logo Section */}
          {logo && (
            <div className="flex-shrink-0 origin-left scale-[0.75] sm:scale-90 md:scale-100">
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
              px-3 sm:px-4 py-2
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              backdrop-blur-xl
              transition-all duration-500 hover:bg-white/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
            "
          >
            {/* Navigation Links — hidden below lg */}
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

            {/* CTA + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 pr-1 ml-auto">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-3 sm:px-4 py-1.5 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-black/40 animate-pulse" />
                <span className="text-[11px] sm:text-[13px] font-mono font-medium text-black/70 tracking-widest">{time || "00:00:00"}</span>
              </div>
              <button className="hidden sm:block rounded-full bg-[#e1e61b] px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-[13px] font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-[#d4d919] hover:shadow-lg hover:shadow-[#e1e61b]/20 active:scale-95">
                Free Brand Audit
              </button>

              {/* Hamburger — visible below lg */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Mobile Menu Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[4999] bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="absolute top-20 sm:top-24 left-[2.5%] sm:left-[4%] right-[2.5%] sm:right-[4%] bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 sm:p-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#6c24d6]/15 blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#e1e61b]/20 blur-[50px] pointer-events-none" />

              <nav className="relative z-10 flex flex-col gap-1">
                {navItems.map((navItem, idx) => {
                  const isActive = navItem.name === "HOME";
                  return (
                    <motion.a
                      key={`mobile-${idx}`}
                      href={navItem.link}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest transition-colors duration-200",
                        isActive
                          ? "bg-[#e1e61b] text-black"
                          : "text-black/70 hover:bg-black/5 hover:text-black"
                      )}
                    >
                      <span>{navItem.name}</span>
                      <span className="text-[10px] font-mono text-black/30">{String(idx + 1).padStart(2, "0")}</span>
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="relative z-10 mt-6 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full bg-[#e1e61b] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black text-center transition-all active:scale-95"
                >
                  Free Brand Audit
                </button>
                <div className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-2.5 backdrop-blur-md sm:hidden">
                  <div className="h-2 w-2 rounded-full bg-black/40 animate-pulse" />
                  <span className="text-xs font-mono font-medium text-black/70 tracking-widest">{time || "00:00:00"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
