"use client";

import { motion } from 'framer-motion';

interface MarqueeRowProps {
  images: string[];
  activeIndex: number;
}

export function MarqueeRow({ images, activeIndex }: MarqueeRowProps) {
  const numImages = images.length;

  const getOffset = (i: number, active: number, num: number) => {
    const normalizedActive = ((active % num) + num) % num;
    let offset = (i - normalizedActive + num) % num;
    if (offset > num / 2) offset -= num;
    return offset;
  };

  const getXCalc = (offset: number) => {
    const abs = Math.abs(offset);
    if (abs === 0) return "0px";
    
    // Multipliers for scale [1, 0.8, 0.6, 0.6, ...]
    const multipliers = [0, 0.9, 1.6, 2.2, 2.8, 3.4, 4.0, 4.6];
    const mult = multipliers[abs] || (4.6 + (abs - 7) * 0.6);
    const sign = offset > 0 ? 1 : -1;
    // 24px is the fixed gap
    return `calc(${sign} * (${mult} * var(--card-width) + ${abs * 24}px))`;
  };

  return (
    <>
      <style>{`
          .marquee-container {
            --card-width: 253px;
          }
          @media (min-width: 768px) {
            .marquee-container {
              --card-width: 414px;
            }
          }
        `}</style>
        <div className="marquee-container relative w-full h-[437px] md:h-[621px] flex items-center justify-center overflow-hidden">
          {/* Central glow behind active card */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-[#6c24d6]/8 blur-[80px] pointer-events-none" />
        {images.map((src, i) => {
          const offset = getOffset(i, activeIndex, numImages);

          const isCenter = offset === 0;
          const scale = isCenter ? 1 : Math.max(0.6, 1 - Math.abs(offset) * 0.2);
          const x = getXCalc(offset);
          const opacity = Math.abs(offset) > 2 ? 0 : 1;
          const zIndex = 10 - Math.abs(offset);

          return (
            <motion.div
              key={i}
              className="absolute w-[var(--card-width)] h-[345px] md:h-[530px] rounded-[32px] overflow-hidden shadow-2xl"
              initial={false}
              animate={{
                x,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                mass: 1.6,
              }}
            >
              <img src={src} alt={`Gallery ${i}`} className="object-cover w-full h-full" />
              {/* Dark overlay for non-center items to create focus */}
              {!isCenter && (
                <motion.div 
                  className="absolute inset-0 bg-black/40"
                  animate={{ opacity: Math.abs(offset) * 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
