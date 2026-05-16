"use client";

import { MarqueeRow } from "./MarqueeRow";
import { Pause, Play, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { LogoTicker } from "./LogoTicker";

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

  const DURATION = 5000; // 5 seconds per slide
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

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
    setProgress(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative flex flex-col w-full bg-white overflow-hidden" style={{ height: "calc(100vh - 80px)" }}>
      {/* Background scrolling row */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-center pt-16 md:pt-28 overflow-hidden pointer-events-none opacity-90">
        <MarqueeRow 
          images={rowImages} 
          activeIndex={activeIndex}
        />
      </div>

      {/* Center Floating Modal and Content */}
      <div className="w-full h-full relative z-10 flex flex-col items-center justify-center flex-grow mt-70">
        {/* The Card */}
        <div className="bg-white rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center w-[90%] max-w-3xl gap-8 transition-transform hover:scale-105 duration-500 ease-out">
          <div className="w-full bg-[#faf7f7] rounded-[24px] p-8 md:p-10 relative overflow-hidden flex items-center justify-between">
             {/* Abstract circle lines decoration */}
             <div className="absolute right-0 top-0 w-64 h-64 border border-[#7A3FF3]/20 rounded-full -translate-y-1/2 translate-x-1/4"></div>
             <div className="absolute right-0 top-0 w-96 h-96 border border-[#7A3FF3]/20 rounded-full -translate-y-1/2 translate-x-1/4"></div>
             
             <div>
               <h1 className="text-black text-5xl md:text-7xl font-bold tracking-tight">
                 We<br/>
                 <span className="text-[#6c24d6]">Rebuild.</span>
               </h1>
             </div>
             
             <div className="z-10 mt-auto pt-8 md:pt-0 self-end">
               <button className="bg-[#6c24d6] hover:bg-[#4E39DF] text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-[#5C45F4]/30">
                 Get started
               </button>
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-4 ml-auto mt-50 mr-20">
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
               {isPlaying ? <Pause className="w-4 h-4 text-black fill-black" /> : <Play className="w-4 h-4 text-black fill-black ml-0.5" />}
            </div>
          </button>

          <button 
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors pointer-events-auto"
            onClick={handleNext}
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Text Below Cards */}
      <div className="text-center max-w-xl px-4 mx-auto pb-8 z-10">
        <p className="text-xl md:text-xl text-gray-800 font-medium italic leading-snug">
          <b>Rework to Revolutionize.</b>
          <br />
         We turn scattered brands into sharp, scroll-stopping systems — built to move brands in Dubai and across the UAE.
        </p>
      </div>

      {/* Bottom Logo Ticker */}
      <div className="mt-auto z-10 w-full relative pt-10">
        <LogoTicker />
      </div>
    </div>
  );
}
