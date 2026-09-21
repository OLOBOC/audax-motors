import React, { useState, useEffect } from 'react';
import AudaxLogo from './AudaxLogo';
import { COMPANY_INFO } from '../data/vehicles';
import { Menu, X, Phone, MessageCircle, ChevronRight } from 'lucide-react';

export default function Navbar({ currentPath, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Vehículos', path: '/vehiculos' },
    { label: 'Vende tu Coche', path: '/vende-tu-coche' },
    { label: 'Quiénes Somos', path: '/quienes-somos' },
    { label: 'Contacto', path: '/contacto' },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08080A]/90 backdrop-blur-md border-b border-[#22242D] py-3.5 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-[#08080A]/80 via-[#08080A]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center text-left focus:outline-none transition-transform hover:scale-[1.02]"
            aria-label="Ir a inicio de Audax Motors"
          >
            <AudaxLogo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-2 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-[#E2CDAD] bg-[#C5A880]/15 border border-[#C5A880]/30 shadow-sm'
                      : 'text-[#A0A4B4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-[#C5A880] px-3 py-2 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 px-3.5 py-2 rounded-full transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => handleNav('/vehiculos')}
              className="relative group overflow-hidden bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-black font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full shadow-lg shadow-[#C5A880]/20 hover:shadow-[#C5A880]/40 transition-all hover:scale-105"
            >
              <span className="relative z-10">Ver Stock</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 rounded-lg text-[#C5A880] hover:bg-white/5 transition-colors"
              aria-label="Llamar"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/5 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-[#0E0F14] border-l border-[#22242D] p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#1F212A] mb-6">
              <AudaxLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#8E92A4] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#C5A880]/15 text-[#E2CDAD] border border-[#C5A880]/30 font-semibold'
                        : 'text-[#A0A4B4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-[#444857]'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-[#1F212A]">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#171821] text-white border border-[#272936] text-xs font-semibold tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Llamar: {COMPANY_INFO.phone}</span>
            </a>
            <button
              onClick={() => handleNav('/vehiculos')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20"
            >
              Explorar Catálogo Completo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
