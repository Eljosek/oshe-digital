"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface OwlMascotProps {
  className?: string;
}

export default function OwlMascot({ className = "" }: OwlMascotProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08);
    setEyeOffset({ x: currentRef.current.x, y: currentRef.current.y });
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
      const maxOffset = 6;
      targetRef.current = {
        x: Math.max(-maxOffset, Math.min(maxOffset, dx * maxOffset)),
        y: Math.max(-maxOffset, Math.min(maxOffset, dy * maxOffset)),
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
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
        viewBox="0 0 400 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          {/* Body gradient — warm dark brown */}
          <radialGradient id="owlBodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#5a3e28" />
            <stop offset="70%" stopColor="#3d2816" />
            <stop offset="100%" stopColor="#2a1a0d" />
          </radialGradient>

          {/* Belly lighter patch */}
          <radialGradient id="owlBellyGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#c9a66b" />
            <stop offset="60%" stopColor="#a07840" />
            <stop offset="100%" stopColor="#7d5a2f" />
          </radialGradient>

          {/* Facial disc — warm cream */}
          <radialGradient id="owlFaceGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5e6c8" />
            <stop offset="70%" stopColor="#e0c99a" />
            <stop offset="100%" stopColor="#c9a66b" />
          </radialGradient>

          {/* Eye white glow */}
          <radialGradient id="eyeWhiteGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8e0d4" />
          </radialGradient>

          {/* Iris — golden amber */}
          <radialGradient id="irisGrad" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#f5b731" />
            <stop offset="50%" stopColor="#d4920a" />
            <stop offset="100%" stopColor="#b07508" />
          </radialGradient>

          {/* Wing gradient */}
          <linearGradient id="wingGradL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3220" />
            <stop offset="100%" stopColor="#3a2515" />
          </linearGradient>
          <linearGradient id="wingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a3220" />
            <stop offset="100%" stopColor="#3a2515" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="owlGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Eye shine */}
          <filter id="eyeShine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Soft shadow */}
          <filter id="softShadow" x="-10%" y="-5%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feOffset dy="3" result="offset" />
            <feComposite in="SourceGraphic" in2="offset" operator="over" />
          </filter>
        </defs>

        <g className="owl-body">
          {/* === FEET === */}
          {/* Left foot */}
          <g transform="translate(155, 400)">
            <ellipse cx="-12" cy="8" rx="14" ry="6" fill="#d4920a" opacity="0.9" />
            <ellipse cx="8" cy="5" rx="12" ry="5" fill="#d4920a" opacity="0.9" />
            <ellipse cx="-2" cy="10" rx="13" ry="5.5" fill="#d4920a" opacity="0.9" />
            {/* Claws */}
            <path d="M-24 6 Q-28 2 -26 0" stroke="#8b6914" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M18 3 Q22 -1 20 -2" stroke="#8b6914" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M-14 14 Q-18 18 -15 19" stroke="#8b6914" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          {/* Right foot */}
          <g transform="translate(245, 400)">
            <ellipse cx="12" cy="8" rx="14" ry="6" fill="#d4920a" opacity="0.9" />
            <ellipse cx="-8" cy="5" rx="12" ry="5" fill="#d4920a" opacity="0.9" />
            <ellipse cx="2" cy="10" rx="13" ry="5.5" fill="#d4920a" opacity="0.9" />
            <path d="M24 6 Q28 2 26 0" stroke="#8b6914" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M-18 3 Q-22 -1 -20 -2" stroke="#8b6914" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M14 14 Q18 18 15 19" stroke="#8b6914" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* === BODY — chubby round shape === */}
          <ellipse cx="200" cy="290" rx="110" ry="130" fill="url(#owlBodyGrad)" />

          {/* Belly patch — lighter oval */}
          <ellipse cx="200" cy="320" rx="65" ry="85" fill="url(#owlBellyGrad)" opacity="0.7" />

          {/* Belly feather pattern — cartoon chevrons */}
          <g opacity="0.3" stroke="#5a3e28" strokeWidth="1.5" fill="none">
            <path d="M175 275 L200 285 L225 275" />
            <path d="M170 295 L200 307 L230 295" />
            <path d="M172 315 L200 328 L228 315" />
            <path d="M175 335 L200 347 L225 335" />
            <path d="M180 355 L200 365 L220 355" />
          </g>

          {/* === LEFT WING === */}
          <g className="owl-wing-left" style={{ transformOrigin: "130px 250px" }}>
            <path
              d="M130 210 Q80 260 90 340 Q100 370 130 380 Q135 340 140 300 Q142 270 140 240 Z"
              fill="url(#wingGradL)"
              stroke="#2a1a0d"
              strokeWidth="1"
            />
            {/* Wing feather lines */}
            <path d="M120 260 Q105 280 100 310" stroke="#5a3e28" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M125 240 Q108 265 102 300" stroke="#5a3e28" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M118 280 Q106 305 100 330" stroke="#5a3e28" strokeWidth="1" fill="none" opacity="0.3" />
          </g>

          {/* === RIGHT WING === */}
          <g className="owl-wing-right" style={{ transformOrigin: "270px 250px" }}>
            <path
              d="M270 210 Q320 260 310 340 Q300 370 270 380 Q265 340 260 300 Q258 270 260 240 Z"
              fill="url(#wingGradR)"
              stroke="#2a1a0d"
              strokeWidth="1"
            />
            <path d="M280 260 Q295 280 300 310" stroke="#5a3e28" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M275 240 Q292 265 298 300" stroke="#5a3e28" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M282 280 Q294 305 300 330" stroke="#5a3e28" strokeWidth="1" fill="none" opacity="0.3" />
          </g>

          {/* === HEAD — big round cartoon head === */}
          <circle cx="200" cy="175" r="95" fill="url(#owlBodyGrad)" />

          {/* === EAR TUFTS — pointy cartoon ears === */}
          <path
            d="M130 110 Q120 60 140 40 Q150 65 155 100"
            fill="#4a3220"
            stroke="#3a2515"
            strokeWidth="1"
          />
          <path
            d="M127 108 Q118 62 138 44"
            fill="none"
            stroke="#6b4f35"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M270 110 Q280 60 260 40 Q250 65 245 100"
            fill="#4a3220"
            stroke="#3a2515"
            strokeWidth="1"
          />
          <path
            d="M273 108 Q282 62 262 44"
            fill="none"
            stroke="#6b4f35"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* === FACIAL DISC — big heart-shaped face === */}
          <ellipse cx="200" cy="190" rx="75" ry="70" fill="url(#owlFaceGrad)" />

          {/* Brow ridges — gives character */}
          <path
            d="M140 162 Q165 148 185 158"
            fill="none"
            stroke="#8b6914"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M260 162 Q235 148 215 158"
            fill="none"
            stroke="#8b6914"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* === LEFT EYE — big cartoon eye === */}
          <g filter="url(#eyeShine)">
            {/* Eye socket shadow */}
            <ellipse cx="165" cy="185" rx="34" ry="33" fill="#3d2816" opacity="0.3" />
            {/* White of eye */}
            <ellipse cx="165" cy="183" rx="32" ry="31" fill="url(#eyeWhiteGrad)" />
            {/* Iris */}
            <circle
              cx={165 + eyeOffset.x}
              cy={183 + eyeOffset.y}
              r="18"
              fill="url(#irisGrad)"
            />
            {/* Pupil */}
            <circle
              cx={165 + eyeOffset.x * 1.2}
              cy={183 + eyeOffset.y * 1.2}
              r="9"
              fill="#1a1a2e"
            />
            {/* Accent pupil glow */}
            <circle
              cx={165 + eyeOffset.x * 1.2}
              cy={183 + eyeOffset.y * 1.2}
              r="4"
              fill="#4F6DF5"
              opacity="0.5"
            />
            {/* Big shine */}
            <circle
              cx={159 + eyeOffset.x * 0.5}
              cy={176 + eyeOffset.y * 0.5}
              r="6"
              fill="white"
              opacity="0.9"
            />
            {/* Small shine */}
            <circle
              cx={172 + eyeOffset.x * 0.5}
              cy={189 + eyeOffset.y * 0.5}
              r="3"
              fill="white"
              opacity="0.5"
            />
          </g>

          {/* === RIGHT EYE === */}
          <g filter="url(#eyeShine)">
            <ellipse cx="235" cy="185" rx="34" ry="33" fill="#3d2816" opacity="0.3" />
            <ellipse cx="235" cy="183" rx="32" ry="31" fill="url(#eyeWhiteGrad)" />
            <circle
              cx={235 + eyeOffset.x}
              cy={183 + eyeOffset.y}
              r="18"
              fill="url(#irisGrad)"
            />
            <circle
              cx={235 + eyeOffset.x * 1.2}
              cy={183 + eyeOffset.y * 1.2}
              r="9"
              fill="#1a1a2e"
            />
            <circle
              cx={235 + eyeOffset.x * 1.2}
              cy={183 + eyeOffset.y * 1.2}
              r="4"
              fill="#4F6DF5"
              opacity="0.5"
            />
            <circle
              cx={229 + eyeOffset.x * 0.5}
              cy={176 + eyeOffset.y * 0.5}
              r="6"
              fill="white"
              opacity="0.9"
            />
            <circle
              cx={242 + eyeOffset.x * 0.5}
              cy={189 + eyeOffset.y * 0.5}
              r="3"
              fill="white"
              opacity="0.5"
            />
          </g>

          {/* === BEAK — cute small triangular beak === */}
          <path
            d="M193 218 L200 235 L207 218 Z"
            fill="#e8a020"
            stroke="#c48a10"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Beak highlight */}
          <path
            d="M196 220 L200 230 L200 220 Z"
            fill="#f5c040"
            opacity="0.5"
          />

          {/* === SMALL SMILE === */}
          <path
            d="M192 240 Q200 247 208 240"
            fill="none"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* === TAIL FEATHERS === */}
          <g opacity="0.8">
            <path d="M185 400 Q180 430 170 445" stroke="#3d2816" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M200 402 Q200 435 200 450" stroke="#3d2816" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M215 400 Q220 430 230 445" stroke="#3d2816" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* === SPARKLE PARTICLES === */}
        <circle className="particle-1" cx="80" cy="100" r="2" fill="#4F6DF5" opacity="0.6" />
        <circle className="particle-2" cx="320" cy="80" r="1.5" fill="#6B85FF" opacity="0.5" />
        <circle className="particle-3" cx="60" cy="300" r="2" fill="#a78bfa" opacity="0.5" />
        <circle className="particle-4" cx="340" cy="280" r="1.5" fill="#4F6DF5" opacity="0.4" />
        <circle className="particle-5" cx="100" cy="200" r="2" fill="#6B85FF" opacity="0.5" />
        <circle className="particle-6" cx="300" cy="380" r="1.5" fill="#a78bfa" opacity="0.4" />

        {/* Little stars around the owl */}
        <g opacity="0.3" fill="#f5b731">
          <path d="M75 150 l3 6 6 1 -4 5 1 6 -6-3 -6 3 1-6 -4-5 6-1z" />
          <path d="M330 140 l2 5 5 1 -3 4 1 5 -5-3 -5 3 1-5 -3-4 5-1z" />
          <path d="M350 350 l2 4 4 1 -3 3 1 4 -4-2 -4 2 1-4 -3-3 4-1z" />
        </g>
      </svg>
    </div>
  );
}
