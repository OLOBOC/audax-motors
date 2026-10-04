import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import AboutSection from "./pages/AboutSection";
import ServicesSection from "./pages/ServicesSection";
import SellCarSection from "./pages/SellCarSection";
import GallerySection from "./pages/GallerySection";
import ContactSection from "./pages/ContactSection";
import { COMPANY } from "./data/config";
import { MessageCircle } from "lucide-react";

const SECTIONS = ["inicio", "nosotros", "servicios", "vende", "galeria", "contacto"];

export default function App() {
  const [currentSection, setCurrentSection] = useState("inicio");

  // Observe which section is in viewport
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080A] text-[#E4E6EB] selection:bg-[#C5A880] selection:text-black">
      <Navbar currentSection={currentSection} onNavigate={scrollToSection} />

      <main className="flex-1">
        <HeroSection onNavigate={scrollToSection} />
        <AboutSection />
        <ServicesSection onNavigate={scrollToSection} />
        <SellCarSection />
        <GallerySection />
        <ContactSection />
      </main>

      {/* WhatsApp flotante */}
      <a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/80 hover:scale-110 transition-all flex items-center justify-center border border-emerald-400/40 group"
        aria-label="Abrir chat de WhatsApp de Audax Motors"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-bold uppercase tracking-wider">
          En que te ayudamos?
        </span>
      </a>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
