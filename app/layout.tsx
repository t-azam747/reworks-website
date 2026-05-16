import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const metropolis = localFont({
  src: [
    { path: "../public/font/Metropolis/Metropolis-Thin.otf", weight: "100", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-Light.otf", weight: "300", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-Black.otf", weight: "900", style: "normal" },
    { path: "../public/font/Metropolis/Metropolis-ThinItalic.otf", weight: "100", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-ExtraLightItalic.otf", weight: "200", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-ExtraBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../public/font/Metropolis/Metropolis-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reworks - A Gen-Z Digital Marketing Studio",
  description: "We help brands look right and convert right with a Gen-Z pulse and AI-first methods.",
};

import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${metropolis.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
