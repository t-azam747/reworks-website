"use client";

import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95">
      <Image 
        src="/logo.png" 
        alt="ReWorks Logo" 
        width={300} 
        height={300} 
        className="object-contain w-auto h-16 md:h-20"
        priority
      />
    </Link>
  );
}

