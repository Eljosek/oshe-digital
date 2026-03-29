"use client";

import { useRef, useEffect, useState } from "react";

const WA_ICON = (
  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Ubicacion",
    value: "Pereira, Colombia",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Correo",
    value: "contacto@oshedigital.com",
    href: "mailto:contacto@oshedigital.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Horario",
    value: "Lun - Sab, 8 am - 7 pm",
  },
];

export default function CTA() {
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
      id="contacto"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-orb" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl floating-orb-slow" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {"Tienes un proyecto "}
            <span className="gradient-text-animated">en mente?</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Cuentanos tu idea y te ayudamos a hacerla realidad. Sin compromiso, sin costos ocultos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Info cards */}
          <div className={`space-y-5 ${visible ? "animate-fade-left delay-200" : "opacity-0"}`}>
            {/* Response time badge */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Disponibles ahora</p>
                <p className="text-sm text-muted">Respondemos en menos de 24 horas</p>
              </div>
            </div>

            {/* Contact info items */}
            {contactInfo.map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover-glow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-foreground hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* What to expect */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-sm font-medium text-foreground mb-3">Que incluye tu consulta gratuita?</p>
              <ul className="space-y-2">
                {[
                  "Analisis de tu proyecto sin costo",
                  "Propuesta personalizada de solucion",
                  "Presupuesto claro y sin sorpresas",
                  "Asesoria sobre tecnologia ideal",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - CTA card */}
          {/* border-glow-pulse is on WRAPPER div, animate class on INNER - no CSS conflict */}
          <div className={`${visible ? "animate-fade-right delay-300" : "opacity-0"}`}>
            <div className="border-glow-pulse glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Escribenos directamente</h3>
                <p className="text-muted text-sm mb-8">
                  Selecciona con quien quieres hablar. Ambos somos fundadores de OsHe Digital.
                </p>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/573122843719?text=Hola%20Jose%2C%20quiero%20cotizar%20un%20proyecto%20con%20OsHe%20Digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic group flex items-center gap-4 bg-surface-light hover:bg-green-600/10 border border-border hover:border-green-500/40 rounded-2xl p-5 w-full transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center text-green-400 transition-colors duration-300 shrink-0">
                      {WA_ICON}
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-foreground group-hover:text-green-400 transition-colors">Jose Herrera</p>
                      <p className="text-xs text-muted">Co-fundador Â· +57 312 284 3719</p>
                    </div>
                    <svg className="w-4 h-4 text-muted group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/573173067206?text=Hola%20Juan%20Jose%2C%20quiero%20cotizar%20un%20proyecto%20con%20OsHe%20Digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic group flex items-center gap-4 bg-surface-light hover:bg-green-600/10 border border-border hover:border-green-500/40 rounded-2xl p-5 w-full transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center text-green-400 transition-colors duration-300 shrink-0">
                      {WA_ICON}
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-foreground group-hover:text-green-400 transition-colors">Juan Jose</p>
                      <p className="text-xs text-muted">Co-fundador Â· +57 317 306 7206</p>
                    </div>
                    <svg className="w-4 h-4 text-muted group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <p className="text-xs text-muted">O escribenos al correo</p>
                  <a
                    href="mailto:contacto@oshedigital.com"
                    className="text-xs text-accent hover:text-accent-light transition-colors font-medium"
                  >
                    contacto@oshedigital.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
