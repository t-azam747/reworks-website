"use client";

import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// ─── Step data ────────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "Audit.",
    description:
      "Tear down what's not working. We find the gap between how you're showing up and how you should be — fast, sharp, and without the corporate hand-holding.",
    cta: "Start your audit",
    color: "#0a0a0a",
    accent: "#e1e61b",
    textColor: "#ffffff",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop&q=80",
  },
  {
    step: "02",
    title: "Rework.",
    description:
      "Reshape the strategy, the story, the system. Clarity over clutter, every time. We don't just tweak — we rebuild the narrative from the ground up.",
    cta: "See case studies",
    color: "#6c24d6",
    accent: "#e1e61b",
    textColor: "#ffffff",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
  },
  {
    step: "03",
    title: "Build.",
    description:
      "Design, write, shoot, ship. Fast cycles, AI-powered where it helps, never where it shouldn't. Real deliverables. Real velocity.",
    cta: "View our work",
    color: "#faf9f6",
    accent: "#6c24d6",
    textColor: "#0a0a0a",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
  },
  {
    step: "04",
    title: "Launch.",
    description:
      "Go live, measure, iterate. The scoreboard is the brief from here on out. We don't disappear after launch — we scale what's working.",
    cta: "Get started",
    color: "#e1e61b",
    accent: "#0a0a0a",
    textColor: "#0a0a0a",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
];

// ─── Card Component ───────────────────────────────────────────────────────────

interface CardProps {
  i: number;
  step: string;
  title: string;
  description: string;
  cta: string;
  color: string;
  accent: string;
  textColor: string;
  image: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({
  i,
  step,
  title,
  description,
  cta,
  color,
  accent,
  textColor,
  image,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 28}px)`,
        }}
        className="relative flex flex-col md:flex-row -top-[10%] w-[88%] max-w-5xl h-[520px] md:h-[440px] rounded-3xl overflow-hidden origin-top shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35),0_8px_20px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)]"
      >
        {/* ── Background texture & gradient overlays ───────────────── */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-[1] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(ellipse at 10% 90%, ${accent}40 0%, transparent 60%), radial-gradient(ellipse at 90% 10%, ${textColor}20 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[80px] pointer-events-none z-[1]"
          style={{ backgroundColor: accent, opacity: 0.25 }}
        />

        {/* ── Left: Text content ─────────────────────────────────────── */}
        <div
          className="relative z-[2] flex flex-col justify-between p-8 md:p-12 w-full md:w-[52%] h-full"
          style={{ color: textColor }}
        >
          {/* Step + Title */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8 text-[9px] font-black uppercase tracking-widest"
              style={{ backgroundColor: accent, color: color === "#faf9f6" ? "#fff" : textColor === "#ffffff" ? "#0a0a0a" : "#fff" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color === "#faf9f6" ? "#6c24d6" : textColor }}
              />
              Step {step}
            </div>

            <h3
              className="text-6xl md:text-7xl font-black tracking-tight leading-none mb-6"
              style={{ color: textColor }}
            >
              {title}
            </h3>

            <p
              className="text-sm leading-relaxed max-w-xs font-light"
              style={{ color: textColor + "cc" }}
            >
              {description}
            </p>
          </div>

          {/* CTA */}
          <button
            className="group flex items-center gap-3 w-fit text-sm font-bold uppercase tracking-widest transition-all duration-300"
            style={{ color: accent }}
          >
            {cta}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
        </div>

        {/* ── Right: Image ────────────────────────────────────────────── */}
        <div className="relative w-full md:w-[48%] h-52 md:h-full overflow-hidden">
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          {/* Subtle dark gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function HowWeWork() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative bg-[#f5f5f0]">
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="relative z-20 pt-24 pb-4 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 border border-black/15 rounded-full px-4 py-1.5 mb-6 bg-black text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e1e61b]" />
            <span className="text-[9px] font-bold uppercase tracking-widest">How We Work</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[1.05]">
            Four steps.
            <br />
            <span className="text-[#6c24d6] italic">Zero fluff.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-black/70 px-4 py-2 rounded-full leading-relaxed font-medium lg:pb-3">
          # No hand-holding. No ten-week discovery phases. We move at the speed your brand actually needs.
        </p>
      </div>

      {/* ── Stacking cards ─────────────────────────────────────────────── */}
      <div className="-mt-8">
        {steps.map((s, i) => {
          const targetScale = 1 - (steps.length - i) * 0.04;
          return (
            <Card
              key={`step_${i}`}
              i={i}
              step={s.step}
              title={s.title}
              description={s.description}
              cta={s.cta}
              color={s.color}
              accent={s.accent}
              textColor={s.textColor}
              image={s.image}
              progress={scrollYProgress}
              range={[i * (1 / steps.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
