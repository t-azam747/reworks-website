"use client";

import { MarqueeRow } from "./MarqueeRow";
import { Pause, Play, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { LogoTicker } from "./LogoTicker";

// ── Cinematic entrance timing ────────────────────────────────────────────────
// Layer 0 → background cards  (0.0s)
// Layer 1 → center card        (0.4s)
// Layer 2 → headline           (0.75s)
// Layer 3 → CTA button         (1.0s)
// Layer 4 → controls + tagline (1.25s)
// Layer 5 → logo ticker        (1.5s)

const FADE_UP = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  },
});

const FADE_IN = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
  },
});

const rowImages = [
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
];

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000;
  const UPDATE_INTERVAL = 50;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (UPDATE_INTERVAL / DURATION) * 100;
          if (next >= 100) {
            setActiveIndex((idx) => idx + 1);
            return 0;
          }
          return next;
        });
      }, UPDATE_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => { setActiveIndex((p) => p + 1); setProgress(0); };
  const handlePrev = () => { setActiveIndex((p) => p - 1); setProgress(0); };
  const togglePlay = () => setIsPlaying(!isPlaying);

  // ── Typing effect ──────────────────────────────────────────────────────────
  const words = ["works.", "brand.", "design.", "build.", "develop."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const typingSpeed = isDeleting ? 75 : 150;

    if (!isDeleting && currentText === word) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((p) => (p + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(t);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <div
      className="relative flex flex-col w-full bg-white overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}
    >
      {/* ── Layer 0: Background cards (first to appear) ─────────────────── */}
      <motion.div
        variants={FADE_IN(0)}
        initial="hidden"
        animate="show"
        className="absolute inset-x-0 top-0 flex items-start justify-center pt-16 md:pt-28 overflow-hidden pointer-events-none opacity-90"
      >
        <MarqueeRow images={rowImages} activeIndex={activeIndex} />
      </motion.div>

      {/* ── Center content column ──────────────────────────────────────── */}
      <div className="w-full h-full relative z-10 flex flex-col items-center justify-center flex-grow mt-70">
        {/* Purple ambient glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#6c24d6]/10 blur-[100px] pointer-events-none" />

        {/* ── Layer 1: The card shell ──────────────────────────────────── */}
        <motion.div
          variants={FADE_UP(0.4)}
          initial="hidden"
          animate="show"
          className="bg-white rounded-[32px] shadow-[0_20px_60px_-8px_rgba(0,0,0,0.15),0_8px_30px_-6px_rgba(180,140,60,0.12)] flex flex-col md:flex-row items-center w-[90%] max-w-3xl gap-8 transition-transform hover:scale-[1.02] duration-500 ease-out"
        >
          <div className="w-full bg-[#faf7f7] rounded-[24px] p-8 md:p-10 relative overflow-hidden flex items-center justify-between">
            {/* Decorative circles */}
            <div className="absolute right-0 top-0 w-64 h-64 border border-[#7A3FF3]/20 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute right-0 top-0 w-96 h-96 border border-[#7A3FF3]/20 rounded-full -translate-y-1/2 translate-x-1/4" />

            {/* ── Layer 2: Headline ──────────────────────────────────── */}
            <motion.div
              variants={FADE_UP(0.75)}
              initial="hidden"
              animate="show"
            >
              <h1 className="text-black text-5xl md:text-7xl tracking-tight leading-[1.1]">
                <span className="font-light text-black/60">We</span>
                <br />
                <span className="font-black text-[#6c24d6] tracking-wide">
                  Re{currentText}
                </span>
                <span className="font-black text-[#6c24d6] animate-pulse tracking-wide">
                  |
                </span>
              </h1>
            </motion.div>

            {/* ── Layer 3: CTA button ────────────────────────────────── */}
            <motion.div
              variants={FADE_UP(1.0)}
              initial="hidden"
              animate="show"
              className="z-10 mt-auto pt-8 md:pt-0 self-end"
            >
              <button className="bg-[#6c24d6] hover:bg-[#4E39DF] text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-[#5C45F4]/30 hover:shadow-[#5C45F4]/50 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 ease-out active:translate-y-0 active:scale-100">
                Get started
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Layer 4: Controls ──────────────────────────────────────────── */}
        <motion.div
          variants={FADE_UP(1.25)}
          initial="hidden"
          animate="show"
          className="mt-8 flex items-center gap-4 ml-auto mt-50 mr-20"
        >
          <button
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors pointer-events-auto"
            onClick={handlePrev}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            className="relative w-14 h-14 flex items-center justify-center rounded-full group pointer-events-auto"
            onClick={togglePlay}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="46" fill="none" stroke="#000" strokeWidth="6"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
                className="transition-all duration-75 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            <div className="z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-100">
              {isPlaying
                ? <Pause className="w-4 h-4 text-black fill-black" />
                : <Play className="w-4 h-4 text-black fill-black ml-0.5" />}
            </div>
          </button>

          <button
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors pointer-events-auto"
            onClick={handleNext}
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </motion.div>
      </div>

      {/* ── Layer 4b: Tagline ──────────────────────────────────────────────── */}
      <motion.div
        variants={FADE_UP(1.25)}
        initial="hidden"
        animate="show"
        className="text-center max-w-xl px-4 mx-auto pb-8 z-10"
      >
        <p className="text-xl md:text-xl text-gray-800 font-medium italic leading-snug">
          <b>Rework to Revolutionize.</b>
          <br />
          We turn scattered brands into sharp, scroll-stopping systems — built to move brands in Dubai and across the UAE.
        </p>
      </motion.div>

      {/* ── Layer 5: Logo ticker (last) ────────────────────────────────────── */}
      <motion.div
        variants={FADE_IN(1.5)}
        initial="hidden"
        animate="show"
        className="mt-auto z-10 w-full relative pt-10"
      >
        <LogoTicker />
      </motion.div>
    </div>
  );
}
