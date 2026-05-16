import { Hero } from "../components/Hero";
import { ContactSection } from "@/components/ContactSection";
import { ContactMarquee } from "@/components/ContactMarquee";
import { FloatingNavDemo } from "@/components/FloatingNav";
import { LogoTicker } from "@/components/LogoTicker";
import { Disciplines } from "@/components/Disciplines";
import { HowWeWork } from "@/components/HowWeWork";
import { VelocityScrollSection } from "@/components/VelocityScroll";
import { AboutStudio } from "@/components/AboutStudio";
import ShowreelSection from "@/components/ShowreelSection";
import { MeetTheCrew } from "@/components/MeetTheCrew";
import { TestimonialsSection } from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      
      {/* Floating Navbar */}
      <FloatingNavDemo />

      <main className="flex flex-1 flex-col">
        
        {/* Hero */}
        <section
          id="home"
          className="min-h-screen"
        >
          <Hero />
        </section>

        {/* Logo Ticker Integration */}
        <div className="relative z-20">
          <LogoTicker />
        </div>

        {/* What We Do — Disciplines */}
        <section
          id="about"
          className="min-h-screen"
        >
          <Disciplines />
        </section>

        {/* Scroll Velocity Separator */}
        <VelocityScrollSection />

        {/* How We Work */}
        <HowWeWork />

        {/* Showreel Section */}
        <section className="bg-[#0c0c0b]">
          <ShowreelSection />
        </section>

        {/* About Studio (Bento Grid) */}
        <AboutStudio />

        {/* Meet the Crew */}
        <MeetTheCrew />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Marquee Separator */}
        <ContactMarquee />

        {/* Contact */}
        <ContactSection />

      </main>
    </div>
  );
}
