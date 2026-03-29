"use client";

import { useRef, useEffect, useState } from "react";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Páginas Web",
    description:
      "Sitios profesionales, rápidos y optimizados para SEO que representan tu marca con confianza.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    title: "E-commerce",
    description:
      "Tiendas online con catálogos dinámicos, pasarelas de pago y experiencia de compra optimizada.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Automatizaciones",
    description:
      "Flujos de trabajo automatizados, integraciones con APIs y herramientas que ahorran tiempo y dinero.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Catálogos Digitales",
    description:
      "Catálogos interactivos conectados a WhatsApp para que tus clientes compren directo desde el celular.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl floating-orb" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl floating-orb-slow" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Todo lo que necesitas para{" "}
            <span className="gradient-text-animated">crecer online</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Soluciones integrales adaptadas al tamaño y necesidades de tu negocio.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`relative glass-card hover-glow rounded-2xl p-7 group overflow-hidden ${
                visible ? `animate-fade-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
                if (e.currentTarget.getAttribute("data-tilt") !== "active") {
                  e.currentTarget.setAttribute("data-tilt", "active");
                }
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px) translateZ(4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.setAttribute("data-tilt", "reset");
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Background number */}
              <div className="absolute top-4 right-5 text-6xl font-black text-accent/5 group-hover:text-accent/10 transition-colors duration-500 select-none leading-none">
                0{i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300 relative z-10">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors relative z-10">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed relative z-10">
                {service.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-xs text-accent/40 group-hover:text-accent/80 transition-all duration-300 relative z-10">
                <span>Saber más</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
