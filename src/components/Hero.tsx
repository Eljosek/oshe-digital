"use client";

import { useEffect, useRef, useState } from "react";
import CondorMascot from "./CondorMascot";

function CountUp({
  end,
  suffix = "",
  duration = 1300,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * end));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const tickerItems = [
  "Desarrollo Web",
  "E-commerce",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Automatizaciones",
  "UI / UX",
  "SEO",
  "WhatsApp API",
  "Vercel",
  "Node.js",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl floating-orb-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="animate-fade-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/50 text-sm text-muted mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Disponibles para nuevos proyectos
              </div>

              {/* Heading */}
              <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
                Creamos experiencias
                <br />
                <span className="gradient-text-animated">digitales que venden</span>
              </h1>

              {/* Subheading */}
              <p className="animate-fade-up delay-200 text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Somos una agencia de desarrollo web y e-commerce en Colombia.
                Diseñamos y construimos soluciones digitales que generan confianza
                y resultados reales para tu negocio.
              </p>

              {/* CTAs */}
              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <a
                  href="https://wa.me/573122843719?text=Hola%2C%20quiero%20cotizar%20un%20proyecto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-8 py-3.5 rounded-xl text-base"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Cotizar proyecto
                </a>
                <a
                  href="#portafolio"
                  className="btn-magnetic text-muted hover:text-foreground font-medium px-8 py-3.5 rounded-xl border border-border hover:border-accent/30 text-base"
                >
                  Ver nuestro trabajo →
                </a>
              </div>

              {/* Stats bar */}
              <div className="animate-fade-up delay-500 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto lg:mx-0">
                {[
                  { end: 5, suffix: "+", label: "Proyectos entregados" },
                  { end: 100, suffix: "%", label: "Clientes satisfechos" },
                  { end: null, static: "24/7", label: "Soporte activo" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">
                      {stat.end !== null ? (
                        <CountUp end={stat.end!} suffix={stat.suffix ?? ""} />
                      ) : (
                        stat.static
                      )}
                    </div>
                    <div className="text-xs text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Condor Mascot */}
            <div className="animate-scale-in delay-300 flex items-center justify-center lg:justify-end">
              <div className="w-72 sm:w-80 md:w-96 lg:w-[420px]">
                <CondorMascot />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker / Marquee band */}
      <div className="relative z-10 border-y border-border bg-surface/30 py-4 overflow-hidden">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
