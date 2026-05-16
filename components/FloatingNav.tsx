"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Logo } from "@/components/Logo";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "HOME",
      link: "#home",
    },
    {
      name: "ABOUT",
      link: "#about",
    },
    {
      name: "SERVICES",
      link: "#services",
    },
    {
      name: "CASE STUDY",
      link: "#case-study",
    },
    {
      name: "TEAM",
      link: "#team",
    },
    {
      name: "TESTIMONIALS",
      link: "#testimonials",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} logo={<Logo />} />
    </div>
  );
}