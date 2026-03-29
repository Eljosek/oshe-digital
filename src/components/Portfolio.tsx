"use client";

import { useRef, useEffect, useState } from "react";

const projects = [
  {
    title: "Electro Audio Web",
    category: "E-commerce",
    description:
      "Tienda online de sonido profesional, iluminación y audio para Pereira, Colombia. Catálogo dinámico con filtros, carrito de compras y diseño optimizado para conversión.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    url: "https://electro-audio-web.vercel.app",
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Bodega Electrónica",
    category: "E-commerce",
    description:
      "E-commerce especializado en electrónica, iluminación y componentes. Experiencia de compra fluida con catálogo organizado por categorías y conexión directa a WhatsApp.",
    tech: ["Next.js", "React", "Vercel"],
    url: "https://bodega-electronica.vercel.app",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "ElectroEventos Store",
    category: "E-commerce",
    description:
      "Tienda online de equipos Pioneer DJ y sonido profesional para eventos. Diseño moderno con catálogo interactivo y proceso de compra simplificado.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    url: "https://electroeventos-store.vercel.app",
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "FUNCO",
    category: "Sitio Web Institucional",
    description:
      "Plataforma digital para fundación enfocada en desarrollo territorial (PDET) en Colombia. Diseño institucional que transmite credibilidad y facilita la navegación de programas.",
    tech: ["Next.js", "React", "Vercel"],
    url: "https://prototipofunco.vercel.app",
    color: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "SegurosPro",
    category: "SaaS / Landing",
    description:
      "Plataforma de seguros de vida (IUL) para el mercado hispano en Estados Unidos. Generación de leads con cotizador integrado y diseño enfocado en conversión.",
    tech: ["Next.js", "TypeScript", "Vercel"],
    url: "https://segurosprototipo.vercel.app",
    color: "from-indigo-500/10 to-violet-500/10",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portafolio"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl floating-orb" />
      <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl floating-orb-slow" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Portafolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Proyectos que hablan{" "}
            <span className="gradient-text-animated">por nosotros</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Cada proyecto es una historia de transformación digital. Conoce lo que hemos construido.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group glass-card hover-glow rounded-2xl overflow-hidden flex flex-col ${
                visible ? `animate-fade-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
                if (e.currentTarget.getAttribute("data-tilt") !== "active") {
                  e.currentTarget.setAttribute("data-tilt", "active");
                }
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px) translateZ(4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.setAttribute("data-tilt", "reset");
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Gradient banner */}
              <div className={`h-40 bg-gradient-to-br ${project.color} relative flex items-center justify-center`}>
                <div className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                  {project.title.charAt(0)}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <span className="absolute bottom-4 left-4 text-xs font-medium bg-white/10 backdrop-blur-md text-white/80 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-muted bg-surface-light px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
