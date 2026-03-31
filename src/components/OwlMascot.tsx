"use client";

import { useEffect, useRef, useCallback } from "react";

interface OwlMascotProps {
  className?: string;
}

export default function OwlMascot({ className = "" }: OwlMascotProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // Refs for direct DOM manipulation — no React re-renders
  const eyeGroup1xLRef = useRef<SVGGElement>(null);
  const eyeGroup12xLRef = useRef<SVGGElement>(null);
  const eyeGroup04xLRef = useRef<SVGGElement>(null);
  const eyeGroup1xRRef = useRef<SVGGElement>(null);
  const eyeGroup12xRRef = useRef<SVGGElement>(null);
  const eyeGroup04xRRef = useRef<SVGGElement>(null);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const prev = currentRef.current;
    prev.x = lerp(prev.x, targetRef.current.x, 0.07);
    prev.y = lerp(prev.y, targetRef.current.y, 0.07);

    // Direct DOM — bypass React render entirely
    const t1 = `translate(${prev.x},${prev.y})`;
    const t12 = `translate(${prev.x * 1.2},${prev.y * 1.2})`;
    const t04 = `translate(${prev.x * 0.4},${prev.y * 0.4})`;

    eyeGroup1xLRef.current?.setAttribute("transform", t1);
    eyeGroup12xLRef.current?.setAttribute("transform", t12);
    eyeGroup04xLRef.current?.setAttribute("transform", t04);
    eyeGroup1xRRef.current?.setAttribute("transform", t1);
    eyeGroup12xRRef.current?.setAttribute("transform", t12);
    eyeGroup04xRRef.current?.setAttribute("transform", t04);

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const maxOffset = 7;
      targetRef.current = {
        x: Math.max(-maxOffset, Math.min(maxOffset, dx * maxOffset)),
        y: Math.max(-maxOffset, Math.min(maxOffset, dy * maxOffset)),
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <div className={`owl-container ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          {/* Deep midnight body */}
          <radialGradient id="owlBodyNight" cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#0f0f1a" />
            <stop offset="100%" stopColor="#080812" />
          </radialGradient>

          {/* Subtle chest plumage */}
          <radialGradient id="owlChest" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#1e1e3a" />
            <stop offset="60%" stopColor="#14142a" />
            <stop offset="100%" stopColor="#0c0c1a" />
          </radialGradient>

          {/* Face disc — dark silver/slate */}
          <radialGradient id="owlFaceNight" cx="50%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#2a2a40" />
            <stop offset="50%" stopColor="#1e1e30" />
            <stop offset="100%" stopColor="#141425" />
          </radialGradient>

          {/* Neon eye glow — accent blue */}
          <radialGradient id="eyeGlowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F6DF5" />
            <stop offset="60%" stopColor="#3a52c4" />
            <stop offset="100%" stopColor="#2a3a8a" />
          </radialGradient>

          {/* Iris — electric cyan-blue */}
          <radialGradient id="irisNeon" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#6B85FF" />
            <stop offset="40%" stopColor="#4F6DF5" />
            <stop offset="100%" stopColor="#3045b0" />
          </radialGradient>

          {/* Wing gradient — dark with blue edge */}
          <linearGradient id="wingNightL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e0e1c" />
            <stop offset="80%" stopColor="#12122a" />
            <stop offset="100%" stopColor="#1a1a3a" />
          </linearGradient>
          <linearGradient id="wingNightR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0e0e1c" />
            <stop offset="80%" stopColor="#12122a" />
            <stop offset="100%" stopColor="#1a1a3a" />
          </linearGradient>

          {/* Circuit line gradient */}
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F6DF5" stopOpacity="0" />
            <stop offset="50%" stopColor="#4F6DF5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4F6DF5" stopOpacity="0" />
          </linearGradient>

          {/* Neon glow filter — lightweight single blur */}
          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Static eye glow — radial gradient, no filter */}
          <radialGradient id="eyeGlowSoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F6DF5" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#4F6DF5" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#4F6DF5" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="owl-body">
          {/* === AMBIENT GLOW behind owl === */}
          <ellipse cx="200" cy="260" rx="130" ry="150" fill="#4F6DF5" opacity="0.03" />
          <ellipse cx="200" cy="250" rx="90" ry="110" fill="#6B85FF" opacity="0.02" />

          {/* === TALONS — dark metallic === */}
          <g opacity="0.85">
            {/* Left foot */}
            <g transform="translate(158, 405)">
              <ellipse cx="-8" cy="6" rx="11" ry="5" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="0.5" />
              <ellipse cx="8" cy="4" rx="10" ry="4.5" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="0.5" />
              <ellipse cx="0" cy="8" rx="10" ry="5" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="0.5" />
              <path d="M-18 4 Q-22 0 -20-2" stroke="#4F6DF5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M16 2 Q20-1 18-3" stroke="#4F6DF5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M-10 12 Q-14 16-11 17" stroke="#4F6DF5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
            </g>
            {/* Right foot */}
            <g transform="translate(242, 405)">
              <ellipse cx="8" cy="6" rx="11" ry="5" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="0.5" />
              <ellipse cx="-8" cy="4" rx="10" ry="4.5" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="0.5" />
              <ellipse cx="0" cy="8" rx="10" ry="5" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="0.5" />
              <path d="M18 4 Q22 0 20-2" stroke="#4F6DF5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M-16 2 Q-20-1-18-3" stroke="#4F6DF5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M10 12 Q14 16 11 17" stroke="#4F6DF5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
            </g>
          </g>

          {/* === BODY — sleek dark form === */}
          <ellipse cx="200" cy="300" rx="105" ry="125" fill="url(#owlBodyNight)" />

          {/* Body edge highlight */}
          <ellipse cx="200" cy="300" rx="105" ry="125" fill="none" stroke="#4F6DF5" strokeWidth="0.5" opacity="0.15" />

          {/* Chest plumage */}
          <ellipse cx="200" cy="325" rx="60" ry="80" fill="url(#owlChest)" opacity="0.8" />

          {/* Circuit-like feather patterns on chest */}
          <g opacity="0.2" stroke="#4F6DF5" strokeWidth="0.7" fill="none">
            <path d="M180 270 L200 280 L220 270" />
            <path d="M176 290 L200 303 L224 290" />
            <path d="M178 310 L200 324 L222 310" />
            <path d="M180 330 L200 342 L220 330" />
            <path d="M184 350 L200 360 L216 350" />
            {/* Small horizontal accents */}
            <line x1="188" y1="285" x2="195" y2="285" opacity="0.5" />
            <line x1="205" y1="285" x2="212" y2="285" opacity="0.5" />
            <line x1="185" y1="317" x2="192" y2="317" opacity="0.5" />
            <line x1="208" y1="317" x2="215" y2="317" opacity="0.5" />
          </g>

          {/* === LEFT WING === */}
          <g className="owl-wing-left" style={{ transformOrigin: "130px 260px" }}>
            <path
              d="M130 215 Q75 270 88 350 Q98 380 130 388 Q134 345 138 305 Q140 275 138 245 Z"
              fill="url(#wingNightL)"
              stroke="#1e1e3a"
              strokeWidth="0.8"
            />
            {/* Feather edge lines */}
            <path d="M118 265 Q100 290 95 325" stroke="#4F6DF5" strokeWidth="0.5" fill="none" opacity="0.25" />
            <path d="M122 245 Q102 275 96 310" stroke="#4F6DF5" strokeWidth="0.5" fill="none" opacity="0.2" />
            <path d="M115 285 Q100 310 95 340" stroke="#4F6DF5" strokeWidth="0.5" fill="none" opacity="0.15" />
            {/* Neon edge accent */}
            <path d="M88 350 Q78 320 82 290" stroke="#4F6DF5" strokeWidth="1" fill="none" opacity="0.2" />
          </g>

          {/* === RIGHT WING === */}
          <g className="owl-wing-right" style={{ transformOrigin: "270px 260px" }}>
            <path
              d="M270 215 Q325 270 312 350 Q302 380 270 388 Q266 345 262 305 Q260 275 262 245 Z"
              fill="url(#wingNightR)"
              stroke="#1e1e3a"
              strokeWidth="0.8"
            />
            <path d="M282 265 Q300 290 305 325" stroke="#4F6DF5" strokeWidth="0.5" fill="none" opacity="0.25" />
            <path d="M278 245 Q298 275 304 310" stroke="#4F6DF5" strokeWidth="0.5" fill="none" opacity="0.2" />
            <path d="M285 285 Q300 310 305 340" stroke="#4F6DF5" strokeWidth="0.5" fill="none" opacity="0.15" />
            <path d="M312 350 Q322 320 318 290" stroke="#4F6DF5" strokeWidth="1" fill="none" opacity="0.2" />
          </g>

          {/* === HEAD === */}
          <circle cx="200" cy="180" r="92" fill="url(#owlBodyNight)" />
          <circle cx="200" cy="180" r="92" fill="none" stroke="#4F6DF5" strokeWidth="0.5" opacity="0.1" />

          {/* === EAR TUFTS — sharp angular === */}
          <path
            d="M128 115 Q115 55 140 30 Q148 70 155 105"
            fill="#0e0e1c"
            stroke="#1a1a30"
            strokeWidth="0.8"
          />
          {/* Neon edge on ear */}
          <path d="M128 115 Q115 55 140 30" stroke="#4F6DF5" strokeWidth="0.8" fill="none" opacity="0.3" />
          
          <path
            d="M272 115 Q285 55 260 30 Q252 70 245 105"
            fill="#0e0e1c"
            stroke="#1a1a30"
            strokeWidth="0.8"
          />
          <path d="M272 115 Q285 55 260 30" stroke="#4F6DF5" strokeWidth="0.8" fill="none" opacity="0.3" />

          {/* === FACIAL DISC — dark slate === */}
          <ellipse cx="200" cy="195" rx="72" ry="68" fill="url(#owlFaceNight)" />
          
          {/* Facial disc subtle ring */}
          <ellipse cx="200" cy="195" rx="72" ry="68" fill="none" stroke="#4F6DF5" strokeWidth="0.5" opacity="0.12" />

          {/* Facial feather radiating lines */}
          <g opacity="0.1" stroke="#6B85FF" strokeWidth="0.5" fill="none">
            <path d="M155 165 Q145 155 135 150" />
            <path d="M150 180 Q138 178 128 175" />
            <path d="M245 165 Q255 155 265 150" />
            <path d="M250 180 Q262 178 272 175" />
            <path d="M165 220 Q155 230 148 238" />
            <path d="M235 220 Q245 230 252 238" />
          </g>

          {/* === BROW RIDGES — angular, stern === */}
          <path
            d="M135 165 Q158 148 182 160"
            fill="none"
            stroke="#2a2a50"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M265 165 Q242 148 218 160"
            fill="none"
            stroke="#2a2a50"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Brow neon accents */}
          <path d="M140 164 Q158 150 178 160" fill="none" stroke="#4F6DF5" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
          <path d="M260 164 Q242 150 222 160" fill="none" stroke="#4F6DF5" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />

          {/* === LEFT EYE — neon glow === */}
          <g>
            {/* Static glow behind eye — cheap radial gradient, no filter */}
            <circle cx="168" cy="188" r="36" fill="url(#eyeGlowSoft)" />
            {/* Outer glow ring */}
            <circle cx="168" cy="188" r="30" fill="none" stroke="#4F6DF5" strokeWidth="1.5" opacity="0.15" />
            {/* Eye socket */}
            <ellipse cx="168" cy="188" rx="28" ry="27" fill="#050510" />
            {/* 1.0x offset group — iris */}
            <g ref={eyeGroup1xLRef}>
              <circle cx="168" cy="188" r="19" fill="url(#irisNeon)" opacity="0.9" />
              <circle cx="168" cy="188" r="19" fill="none" stroke="#6B85FF" strokeWidth="0.5" opacity="0.4" />
              <circle cx="168" cy="188" r="14" fill="none" stroke="#4F6DF5" strokeWidth="0.3" opacity="0.3" />
            </g>
            {/* 1.2x offset group — pupil */}
            <g ref={eyeGroup12xLRef}>
              <circle cx="168" cy="188" r="9" fill="#020208" />
              <circle cx="168" cy="188" r="4" fill="#4F6DF5" opacity="0.25" />
            </g>
            {/* 0.4x offset group — highlights */}
            <g ref={eyeGroup04xLRef}>
              <circle cx="162" cy="181" r="5" fill="white" opacity="0.85" />
              <circle cx="175" cy="194" r="2.5" fill="white" opacity="0.4" />
            </g>
          </g>

          {/* === RIGHT EYE === */}
          <g>
            <circle cx="232" cy="188" r="36" fill="url(#eyeGlowSoft)" />
            <circle cx="232" cy="188" r="30" fill="none" stroke="#4F6DF5" strokeWidth="1.5" opacity="0.15" />
            <ellipse cx="232" cy="188" rx="28" ry="27" fill="#050510" />
            <g ref={eyeGroup1xRRef}>
              <circle cx="232" cy="188" r="19" fill="url(#irisNeon)" opacity="0.9" />
              <circle cx="232" cy="188" r="19" fill="none" stroke="#6B85FF" strokeWidth="0.5" opacity="0.4" />
              <circle cx="232" cy="188" r="14" fill="none" stroke="#4F6DF5" strokeWidth="0.3" opacity="0.3" />
            </g>
            <g ref={eyeGroup12xRRef}>
              <circle cx="232" cy="188" r="9" fill="#020208" />
              <circle cx="232" cy="188" r="4" fill="#4F6DF5" opacity="0.25" />
            </g>
            <g ref={eyeGroup04xRRef}>
              <circle cx="226" cy="181" r="5" fill="white" opacity="0.85" />
              <circle cx="239" cy="194" r="2.5" fill="white" opacity="0.4" />
            </g>
          </g>

          {/* === BEAK — small, dark, angular === */}
          <path
            d="M194 222 L200 240 L206 222 Z"
            fill="#1a1a3a"
            stroke="#2a2a50"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <path d="M197 224 L200 234 L200 224 Z" fill="#4F6DF5" opacity="0.1" />

          {/* === TAIL FEATHERS === */}
          <g opacity="0.6">
            <path d="M185 405 Q178 435 168 450" stroke="#0e0e1c" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M200 408 Q200 440 200 455" stroke="#0e0e1c" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M215 405 Q222 435 232 450" stroke="#0e0e1c" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Neon tips */}
            <circle cx="168" cy="450" r="1.5" fill="#4F6DF5" opacity="0.4" />
            <circle cx="200" cy="455" r="1.5" fill="#4F6DF5" opacity="0.4" />
            <circle cx="232" cy="450" r="1.5" fill="#4F6DF5" opacity="0.4" />
          </g>

          {/* === CIRCUIT LINES on body — tech/futuristic detail === */}
          <g opacity="0.12" stroke="#4F6DF5" strokeWidth="0.8" fill="none">
            {/* Left side circuits */}
            <path d="M130 250 L140 250 L140 270 L150 270" />
            <circle cx="150" cy="270" r="2" fill="#4F6DF5" />
            <path d="M125 290 L138 290 L138 310" />
            <circle cx="138" cy="310" r="1.5" fill="#4F6DF5" />
            {/* Right side circuits */}
            <path d="M270 250 L260 250 L260 270 L250 270" />
            <circle cx="250" cy="270" r="2" fill="#4F6DF5" />
            <path d="M275 290 L262 290 L262 310" />
            <circle cx="262" cy="310" r="1.5" fill="#4F6DF5" />
          </g>
        </g>

        {/* === FLOATING PARTICLES — like data/code fragments === */}
        <circle className="particle-1" cx="70" cy="90" r="1.5" fill="#4F6DF5" opacity="0.5" />
        <circle className="particle-2" cx="330" cy="70" r="1" fill="#6B85FF" opacity="0.4" />
        <circle className="particle-3" cx="55" cy="310" r="1.5" fill="#a78bfa" opacity="0.4" />
        <circle className="particle-4" cx="345" cy="290" r="1" fill="#4F6DF5" opacity="0.3" />
        <circle className="particle-5" cx="90" cy="200" r="1.5" fill="#6B85FF" opacity="0.4" />
        <circle className="particle-6" cx="310" cy="390" r="1" fill="#a78bfa" opacity="0.3" />

        {/* === FLOATING CODE BRACKETS — night coder vibes === */}
        <g opacity="0.12" fill="#4F6DF5" fontFamily="monospace" fontSize="14">
          <text x="60" y="145">{"</"}</text>
          <text x="320" y="130">{"{}"}</text>
          <text x="45" y="370">{"=>"}</text>
          <text x="340" y="360">{"</>"}</text>
        </g>

        {/* === SMALL STARS — night sky === */}
        <g opacity="0.2" fill="#6B85FF">
          <circle cx="80" cy="50" r="1" />
          <circle cx="320" cy="40" r="0.8" />
          <circle cx="50" cy="150" r="0.8" />
          <circle cx="355" cy="170" r="1" />
          <circle cx="375" cy="100" r="0.6" />
          <circle cx="30" cy="240" r="0.7" />
          <circle cx="370" cy="240" r="0.8" />
          <circle cx="25" cy="60" r="0.6" />
        </g>
      </svg>
    </div>
  );
}
