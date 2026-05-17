"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const crew = [
  {
    name: "Aryan Shah",
    role: "Creative Director",
    tag: "DIRECTOR",
    tagColor: "#6c24d6",
    bio: "Leads the vision. Turns chaos into brand clarity.",
    img: "/team/member-1.png",
  },
  {
    name: "Priya Nair",
    role: "Brand Strategist",
    tag: "STRATEGY",
    tagColor: "#e1e61b",
    tagText: "#000",
    bio: "Builds frameworks that make brands impossible to ignore.",
    img: "/team/member-2.png",
  },
  {
    name: "Zaid Al-Rashid",
    role: "Motion Designer",
    tag: "MOTION",
    tagColor: "#0ea5e9",
    bio: "If it doesn't move people, he makes it move.",
    img: "/team/member-3.png",
  },
  {
    name: "Meera Kapoor",
    role: "Social Media Lead",
    tag: "SOCIAL",
    tagColor: "#ec4899",
    bio: "Grows communities with content that actually lands.",
    img: "/team/member-4.png",
  },
  {
    name: "Rahul Verma",
    role: "Lead Developer",
    tag: "DEV",
    tagColor: "#22c55e",
    bio: "Ships fast. Breaks nothing. Builds everything.",
    img: "/team/member-5.png",
  },
];

const CARD_WIDTH_SM = 220;
const CARD_HEIGHT_SM = 320;
const CARD_WIDTH = 280;
const CARD_HEIGHT = 400;

// ─── Spread positions for the fan stack ───────────────────────────────────────

function getCardStyle(index: number, active: number, total: number, isMobile: boolean): {
  rotate: number;
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  opacity: number;
} {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  if (absOffset > 2) {
    return { rotate: 0, x: 0, y: 0, scale: 0.7, zIndex: 0, opacity: 0 };
  }

  const spreadDesktop = [
    { rotate: -18, x: -220, y: 30, scale: 0.78, zIndex: 1, opacity: 0.7 },
    { rotate: -9, x: -110, y: 12, scale: 0.88, zIndex: 2, opacity: 0.85 },
    { rotate: 0, x: 0, y: 0, scale: 1, zIndex: 5, opacity: 1 },
    { rotate: 9, x: 110, y: 12, scale: 0.88, zIndex: 2, opacity: 0.85 },
    { rotate: 18, x: 220, y: 30, scale: 0.78, zIndex: 1, opacity: 0.7 },
  ];

  const spreadMobile = [
    { rotate: -14, x: -120, y: 20, scale: 0.75, zIndex: 1, opacity: 0.6 },
    { rotate: -7, x: -60, y: 8, scale: 0.85, zIndex: 2, opacity: 0.8 },
    { rotate: 0, x: 0, y: 0, scale: 1, zIndex: 5, opacity: 1 },
    { rotate: 7, x: 60, y: 8, scale: 0.85, zIndex: 2, opacity: 0.8 },
    { rotate: 14, x: 120, y: 20, scale: 0.75, zIndex: 1, opacity: 0.6 },
  ];

  const spread = isMobile ? spreadMobile : spreadDesktop;
  const mapIndex = offset + 2;
  return spread[mapIndex] ?? { rotate: 0, x: 0, y: 0, scale: 0.7, zIndex: 0, opacity: 0 };
}

// ─── Single Card ──────────────────────────────────────────────────────────────

function TeamCard({
  member,
  style,
  isActive,
  onClick,
  isMobile,
}: {
  member: (typeof crew)[0];
  style: ReturnType<typeof getCardStyle>;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const w = isMobile ? CARD_WIDTH_SM : CARD_WIDTH;
  const h = isMobile ? CARD_HEIGHT_SM : CARD_HEIGHT;
  return (
    <motion.div
      animate={{
        rotate: style.rotate,
        x: style.x,
        y: style.y,
        scale: style.scale,
        opacity: style.opacity,
        zIndex: style.zIndex,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.9 }}
      style={{
        width: w,
        height: h,
        position: "absolute",
        cursor: isActive ? "default" : "pointer",
        transformOrigin: "bottom center",
      }}
      onClick={onClick}
      whileHover={isActive ? {} : { y: style.y - 10 }}
    >
      <div
        className={cn(
          "relative w-full h-full rounded-3xl overflow-hidden border-2 border-black",
          "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          isActive && "shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
        )}
      >
        {/* Photo — lazy loaded */}
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="280px"
          className="object-cover object-top"
          loading="lazy"
        />

        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Tag pill */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/20 shadow-sm"
          style={{
            backgroundColor: member.tagColor,
            color: (member as { tagText?: string }).tagText ?? "#fff",
          }}
        >
          {member.tag}
        </div>

        {/* Bottom info — only fully visible on active card */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-black text-lg leading-tight tracking-tight">
            {member.name}
          </h3>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-0.5">
            {member.role}
          </p>
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="text-white/60 text-sm mt-2 leading-snug"
              >
                {member.bio}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MeetTheCrew() {
  const [active, setActive] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const total = crew.length;
  const dragStartX = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive((a) => Math.min(total - 1, a + 1)), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <section
      className="w-full py-24 md:py-32 overflow-hidden border-t border-black/10"
      style={{ backgroundColor: "#111111" }}
      id="team"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#e1e61b] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                The Team
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05]">
              Meet the{" "}
              <span className="text-[#e1e61b] italic">crew.</span>
            </h2>
          </div>
          <p className="text-base text-white/50 max-w-xs font-medium leading-relaxed">
            38 humans. One obsession. Making brands that actually work.
          </p>
        </motion.div>

        {/* Card Fan */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: (isMobile ? CARD_HEIGHT_SM : CARD_HEIGHT) + 60 }}
          // Touch / swipe support
          onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const delta = dragStartX.current - e.changedTouches[0].clientX;
            if (delta > 40) next();
            else if (delta < -40) prev();
          }}
        >
          {crew.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              style={getCardStyle(i, active, total, isMobile)}
              isActive={i === active}
              onClick={() => setActive(i)}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Prev — 48px min tap target */}
          <button
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous team member"
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/20 text-white",
              "transition-all duration-200 hover:bg-white hover:text-black hover:border-white",
              "disabled:opacity-30 disabled:pointer-events-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e61b]"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2.5">
            {crew.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to ${crew[i].name}`}
                className={cn(
                  "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e61b]",
                  i === active
                    ? "w-6 h-2.5 bg-[#e1e61b]"
                    : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>

          {/* Next — 48px min tap target */}
          <button
            onClick={next}
            disabled={active === total - 1}
            aria-label="Next team member"
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/20 text-white",
              "transition-all duration-200 hover:bg-white hover:text-black hover:border-white",
              "disabled:opacity-30 disabled:pointer-events-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e61b]"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active member name below nav */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
            {active + 1} / {total} — {crew[active].name}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
