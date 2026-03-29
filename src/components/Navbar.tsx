"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled_pos = window.scrollY;
      setScrolled(scrolled_pos > 20);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (scrolled_pos / maxScroll) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 text-xl font-bold tracking-tight">
          <span className="text-foreground">Os</span>
          <span className="text-accent">|</span>
          <span className="text-foreground">He</span>
          <span className="text-muted text-sm font-normal ml-1.5">Digital</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/573122843719?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-light text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Escríbenos
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 pb-6 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/573122843719?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center bg-accent hover:bg-accent-light text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Escríbenos
          </a>
        </div>
      )}
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent-light to-purple-400"
        style={{ width: `${scrollProgress}%`, transition: "width 0.1s linear" }}
      />
    </nav>
  );
}
