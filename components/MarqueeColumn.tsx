"use client";

import { motion } from 'framer-motion';

interface MarqueeColumnProps {
  images: string[];
  reverse?: boolean;
  speed?: number;
}

export function MarqueeColumn({ images, reverse = false, speed = 40 }: MarqueeColumnProps) {
  // We duplicate the images to make it loop seamlessly
  const dupImages = [...images, ...images, ...images];

  return (
    <div className="relative h-[1000px] w-full max-w-[280px] overflow-hidden flex flex-col gap-4">
      <motion.div
        className="flex flex-col gap-4 absolute w-full"
        animate={{
          y: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {dupImages.map((src, i) => (
          <div key={i} className="relative w-full h-[400px] bg-gray-100 shrink-0">
             <img src={src} alt="Gallery image" className="object-cover w-full h-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
