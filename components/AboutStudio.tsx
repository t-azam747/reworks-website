"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Users, BarChart3, Code2 } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

// ─── Background slot components ──────────────────────────────────────────────

function CodeWindowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-[#111111]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow accent */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-[#6c24d6]/30 blur-3xl" />
    </div>
  );
}

function StatsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#e1e61b]">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #000 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-black/10" />
      <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-black/10" />
    </div>
  );
}

function LocationBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#6c24d6]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ffffff 25%, transparent 25%), linear-gradient(-45deg, #ffffff 25%, transparent 25%)",
          backgroundSize: "8px 8px",
        }}
      />
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10" />
      <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
    </div>
  );
}

function AiBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white">
      <div className="absolute top-2 right-2 w-40 h-40 rounded-full bg-[#6c24d6]/10 blur-3xl" />
      <div className="absolute bottom-2 left-2 w-28 h-28 rounded-full bg-[#e1e61b]/25 blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

function HeadlineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #6c24d6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -right-12 top-0 bottom-0 w-56 bg-gradient-to-l from-[#e1e61b]/15 to-transparent" />
    </div>
  );
}

// ─── Card definitions ─────────────────────────────────────────────────────────

const features = [
  {
    Icon: Code2,
    name: "we_believe.md",
    description: "Clarity over clutter. Strategy over guesswork. Presence over decoration. Structure before scale.",
    href: "#about",
    cta: "Our philosophy",
    background: <CodeWindowBackground />,
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3 border border-white/10",
    iconClass: "text-[#e1e61b]",
    nameClass: "text-white font-mono",
    descClass: "text-white/70",
    ctaClass: "text-[#e1e61b] hover:text-white",
  },
  {
    Icon: BarChart3,
    name: "247+ Projects Shipped",
    description: "Across 12 countries, for founders and CMOs who are done waiting for results.",
    href: "#case-study",
    cta: "See case studies",
    background: <StatsBackground />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 border-2 border-black",
    iconClass: "text-black",
    nameClass: "text-black",
    descClass: "text-black/70",
    ctaClass: "text-black hover:text-[#6c24d6]",
  },
  {
    Icon: MapPin,
    name: "Dubai ↔ Mumbai",
    description: "Rooted in Mumbai. Scaling across the UAE and beyond.",
    href: "#about",
    cta: "Our story",
    background: <LocationBackground />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 border-2 border-black",
    iconClass: "text-white/80",
    nameClass: "text-white",
    descClass: "text-white/70",
    ctaClass: "text-[#e1e61b] hover:text-white",
  },
  {
    Icon: Sparkles,
    name: "AI-Powered Creative",
    description: "We build with the latest AI tools to produce faster, sharper, and more effective creative at scale.",
    href: "#services",
    cta: "Our services",
    background: <AiBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2 border-2 border-black",
    iconClass: "text-[#6c24d6]",
    nameClass: "text-black",
    descClass: "text-black/70",
    ctaClass: "text-[#6c24d6] hover:text-[#e1e61b]",
  },
  {
    Icon: Users,
    name: "Gen Z-Led Studio",
    description: "Founded in 2019. 38 humans on board. We think fast, move faster, and never stop shipping.",
    href: "#team",
    cta: "Meet the team",
    background: <HeadlineBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 border-2 border-black",
    iconClass: "text-black",
    nameClass: "text-black",
    descClass: "text-black/70",
    ctaClass: "text-black hover:text-[#6c24d6]",
  },
];

// ─── Custom card – scale on hover, no text clipping ──────────────────────────

function BrandBentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  iconClass,
  nameClass,
  descClass,
  ctaClass,
}: (typeof features)[0]) {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group relative col-span-3 flex flex-col overflow-hidden rounded-2xl cursor-pointer",
        "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        "transition-shadow duration-200 ease-out hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
        className
      )}
    >
      {/* Background layer */}
      <div className="absolute inset-0 z-0">{background}</div>

      {/* Content — always visible, no translate-y tricks that cause clipping */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 gap-4">
        {/* Top: icon + name + description */}
        <div className="flex flex-col gap-2">
          <Icon
            className={cn(
              "h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
              iconClass
            )}
          />
          <h3 className={cn("text-base font-black tracking-tight leading-tight", nameClass)}>
            {name}
          </h3>
          <p className={cn("text-sm leading-relaxed", descClass)}>{description}</p>
        </div>

        {/* Bottom: CTA always visible */}
        <a
          href={href}
          className={cn(
            "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 w-fit",
            ctaClass
          )}
        >
          {cta}
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Subtle inner glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-inset ring-white/20 z-20" />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function AboutStudio() {
  return (
    <section
      className="relative w-full py-16 sm:py-24 md:py-32 overflow-hidden border-t border-black/10"
      style={{
        // Subtle noise/linen texture on a warm off-white so it's never pure white
        backgroundColor: "#f7f6f2",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
          radial-gradient(ellipse at 10% 90%, rgba(108,36,214,0.06) 0%, transparent 55%),
          radial-gradient(ellipse at 90% 10%, rgba(225,230,27,0.10) 0%, transparent 55%)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-black/20 rounded-full px-4 py-1.5 mb-6 bg-white/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#6c24d6]" />
              <span className="text-xs font-bold uppercase tracking-widest text-black/60">
                About Studio
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-black leading-[1.05]">
              We don&apos;t do{" "}
              <span className="text-[#6c24d6] italic">ordinary.</span>
              <br />
              We do{" "}
              <span className="relative inline-block">
                <span className="relative z-10">conversion.</span>
                <span className="absolute inset-x-0 bottom-0 h-3 bg-[#e1e61b] -z-0 rounded-sm" />
              </span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-black/55 leading-relaxed max-w-sm md:max-w-xs font-medium">
            A Gen Z-led creative studio partnering with founders and CMOs to rework scattered ideas into bold, conversion-ready brands.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <BentoGrid className="lg:grid-rows-2 lg:auto-rows-[260px] gap-4 sm:gap-6">
            {features.map((feature) => (
              <BrandBentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </motion.div>

        {/* Footer CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          {/* Yellow primary button */}
          <button className="group flex items-center gap-2 rounded-full bg-[#e1e61b] px-7 py-3 text-xs font-bold uppercase tracking-wider text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-[#6c24d6] hover:text-white hover:border-[#6c24d6] hover:shadow-[6px_6px_0px_0px_rgba(108,36,214,0.4)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
            Our Story
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* White secondary button */}
          <button className="group flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-black hover:text-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
            Read Case Studies
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
