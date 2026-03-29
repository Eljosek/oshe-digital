"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CondorMascotProps {
  className?: string;
}

export default function CondorMascot({ className = "" }: CondorMascotProps) {
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
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 5;
      const factor = Math.min(dist / 300, 1);
      targetRef.current = {
        x: (dx / (dist || 1)) * maxOffset * factor,
        y: (dy / (dist || 1)) * maxOffset * factor,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const ex = eyeOffset.x;
  const ey = eyeOffset.y;

  return (
    <div className={`condor-container ${className}`}>
      {/*
        Andean Condor — front view in soaring position
        Distinctive features:
          - Massive black wingspan (fills the viewbox)
          - Bald pinkish-red head (no feathers)
          - Red fleshy caruncle/crest (male)
          - Large white secondary covert patches on each wing
          - Fluffy white collar/ruff at neck base
          - Hooked greyish beak
          - Amber iris with accent-colored pupils (brand identity)
      */}
      <svg
        ref={svgRef}
        viewBox="0 0 520 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full condor-body"
      >
        <defs>
          <radialGradient id="headSkin" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#d07060" />
            <stop offset="65%" stopColor="#a84848" />
            <stop offset="100%" stopColor="#783030" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="260" y1="180" x2="260" y2="345" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1c1c28" />
            <stop offset="100%" stopColor="#070710" />
          </linearGradient>
          <linearGradient id="leftWingGrad" x1="240" y1="220" x2="15" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#202030" />
            <stop offset="55%" stopColor="#0e0e1c" />
            <stop offset="100%" stopColor="#04040c" />
          </linearGradient>
          <linearGradient id="rightWingGrad" x1="280" y1="220" x2="505" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#202030" />
            <stop offset="55%" stopColor="#0e0e1c" />
            <stop offset="100%" stopColor="#04040c" />
          </linearGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="eyeHalo" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient underlight */}
        <ellipse cx="260" cy="235" rx="210" ry="115" fill="#4F6DF5" opacity="0.025" />

        {/* ===== LEFT WING ===== */}
        <g className="wing-left" style={{ transformOrigin: "236px 228px" }}>
          {/* Main upper wing surface */}
          <path
            d="M236 228 C214 218 178 207 142 201 C112 196 76 194 48 199 C31 202 17 209 10 218 C7 223 8 229 13 231 C27 237 52 239 78 239 C110 239 144 235 178 239 C205 242 226 248 236 252 Z"
            fill="url(#leftWingGrad)"
          />
          {/* Primary "finger" feathers at wingtip — very distinctive condor feature */}
          <path d="M10 218 C7 207 5 200 4 195 C2 200 3 210 5 220 Z" fill="#03030b" />
          <path d="M21 213 C19 202 17 195 16 190 C14 195 14 205 16 215 Z" fill="#03030b" />
          <path d="M34 208 C33 197 31 191 30 186 C28 191 28 201 30 210 Z" fill="#03030b" />
          <path d="M48 204 C47 193 46 187 45 182 C43 187 43 197 45 205 Z" fill="#03030b" />
          <path d="M62 201 C62 190 61 184 60 179 C58 184 58 194 60 202 Z" fill="#03030b" />
          <path d="M77 199 C78 188 78 182 77 178 C75 182 75 192 77 200 Z" fill="#03030b" />
          {/* White secondary covert patch — THE most iconic condor marking */}
          <path
            d="M102 196 C120 192 148 192 170 201 C157 209 130 211 106 207 C91 203 91 198 102 196 Z"
            fill="#dcdce8"
            opacity="0.92"
          />
          <path d="M106 196 C118 192 140 193 160 199" stroke="#ffffff" strokeWidth="0.9" fill="none" opacity="0.55" />
          <path d="M108 200 C120 196 142 196 162 202" stroke="#ffffff" strokeWidth="0.7" fill="none" opacity="0.35" />
          {/* Secondary feather fold crease */}
          <path d="M178 239 C160 233 138 229 116 227 C98 225 82 226 67 232" stroke="#1c1c2e" strokeWidth="2" fill="none" opacity="0.65" />
          {/* Inner coverts */}
          <path d="M212 244 C197 239 178 235 162 235" stroke="#262638" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M224 250 C208 245 186 241 170 242" stroke="#262638" strokeWidth="1" fill="none" opacity="0.4" />
        </g>

        {/* ===== RIGHT WING ===== */}
        <g className="wing-right" style={{ transformOrigin: "284px 228px" }}>
          {/* Main upper wing surface (mirror) */}
          <path
            d="M284 228 C306 218 342 207 378 201 C408 196 444 194 472 199 C489 202 503 209 510 218 C513 223 512 229 507 231 C493 237 468 239 442 239 C410 239 376 235 342 239 C315 242 294 248 284 252 Z"
            fill="url(#rightWingGrad)"
          />
          {/* Primary fingers (right) */}
          <path d="M510 218 C513 207 515 200 516 195 C518 200 517 210 515 220 Z" fill="#03030b" />
          <path d="M499 213 C501 202 503 195 504 190 C506 195 506 205 504 215 Z" fill="#03030b" />
          <path d="M486 208 C487 197 489 191 490 186 C492 191 492 201 490 210 Z" fill="#03030b" />
          <path d="M472 204 C473 193 474 187 475 182 C477 187 477 197 475 205 Z" fill="#03030b" />
          <path d="M458 201 C458 190 459 184 460 179 C462 184 462 194 460 202 Z" fill="#03030b" />
          <path d="M443 199 C442 188 442 182 443 178 C445 182 445 192 443 200 Z" fill="#03030b" />
          {/* White secondary covert patch (right) */}
          <path
            d="M418 196 C400 192 372 192 350 201 C363 209 390 211 414 207 C429 203 429 198 418 196 Z"
            fill="#dcdce8"
            opacity="0.92"
          />
          <path d="M414 196 C402 192 380 193 360 199" stroke="#ffffff" strokeWidth="0.9" fill="none" opacity="0.55" />
          <path d="M412 200 C400 196 378 196 358 202" stroke="#ffffff" strokeWidth="0.7" fill="none" opacity="0.35" />
          {/* Secondary fold crease */}
          <path d="M342 239 C360 233 382 229 404 227 C422 225 438 226 453 232" stroke="#1c1c2e" strokeWidth="2" fill="none" opacity="0.65" />
          <path d="M308 244 C323 239 342 235 358 235" stroke="#262638" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M296 250 C312 245 334 241 350 242" stroke="#262638" strokeWidth="1" fill="none" opacity="0.4" />
        </g>

        {/* ===== BODY ===== */}
        <path
          d="M233 193 C221 199 215 215 214 235 C213 268 221 298 231 319 C239 334 248 342 260 342 C272 342 281 334 289 319 C299 298 307 268 306 235 C305 215 299 199 287 193 C278 188 242 188 233 193 Z"
          fill="url(#bodyGrad)"
        />
        {/* Chest feather rows */}
        <path d="M244 219 C251 214 269 214 276 219" stroke="#2c2c3e" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M241 233 C250 228 270 228 279 233" stroke="#2c2c3e" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M239 248 C249 242 271 242 281 248" stroke="#2c2c3e" strokeWidth="1" fill="none" opacity="0.25" />
        <path d="M238 263 C249 258 271 258 282 263" stroke="#2c2c3e" strokeWidth="0.8" fill="none" opacity="0.2" />
        {/* Body keel line */}
        <path d="M260 202 L260 338" stroke="#2c2c3e" strokeWidth="0.7" fill="none" opacity="0.3" />

        {/* ===== WHITE FLUFFY COLLAR / RUFF ===== */}
        {/* Outer collar shape */}
        <path
          d="M218 188 C220 173 233 162 260 160 C287 162 300 173 302 188 C298 199 280 209 260 211 C240 209 222 199 218 188 Z"
          fill="#f2f2f6"
        />
        {/* Fluffy texture strands */}
        <path d="M226 181 C230 171 239 165 252 164" stroke="#e0e0ea" strokeWidth="1.5" fill="none" opacity="0.65" />
        <path d="M222 189 C228 179 238 173 250 172" stroke="#e0e0ea" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M294 181 C290 171 281 165 268 164" stroke="#e0e0ea" strokeWidth="1.5" fill="none" opacity="0.65" />
        <path d="M298 189 C292 179 282 173 270 172" stroke="#e0e0ea" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M239 165 C249 161 271 161 281 165" stroke="#efeffa" strokeWidth="1" fill="none" opacity="0.45" />
        <path d="M233 172 C245 168 275 168 287 172" stroke="#e8e8f4" strokeWidth="1" fill="none" opacity="0.35" />
        {/* Collar underside shadow */}
        <path d="M223 196 C237 204 260 207 283 196" stroke="#c8c8d8" strokeWidth="2.5" fill="none" opacity="0.6" />
        <ellipse cx="260" cy="196" rx="36" ry="13" fill="#e8e8f0" opacity="0.45" />

        {/* ===== NECK ===== */}
        <path
          d="M244 162 C242 151 244 143 247 139 L273 139 C276 143 278 151 276 162 Z"
          fill="#b05050"
        />
        {/* Neck folds */}
        <path d="M249 154 C253 149 267 149 271 154" stroke="#884040" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M248 159 C253 155 267 155 272 159" stroke="#884040" strokeWidth="0.6" fill="none" opacity="0.35" />

        {/* ===== HEAD — bald, reddish-pink skin (no feathers) ===== */}
        <ellipse cx="260" cy="106" rx="33" ry="38" fill="url(#headSkin)" />
        {/* Wrinkled skin texture lines */}
        <path d="M233 109 C238 101 249 97 260 96" stroke="#904040" strokeWidth="0.9" fill="none" opacity="0.35" />
        <path d="M287 109 C282 101 271 97 260 96" stroke="#904040" strokeWidth="0.9" fill="none" opacity="0.35" />
        <path d="M231 120 C238 113 250 110 260 109" stroke="#904040" strokeWidth="0.7" fill="none" opacity="0.28" />
        <path d="M289 120 C282 113 270 110 260 109" stroke="#904040" strokeWidth="0.7" fill="none" opacity="0.28" />
        <path d="M233 131 C241 125 251 122 260 121" stroke="#904040" strokeWidth="0.6" fill="none" opacity="0.22" />
        <path d="M287 131 C279 125 269 122 260 121" stroke="#904040" strokeWidth="0.6" fill="none" opacity="0.22" />
        {/* Dark feather border framing the bare face */}
        <path d="M228 95 C232 83 242 75 260 74 C278 75 288 83 292 95" stroke="#3a1e1e" strokeWidth="5" fill="none" opacity="0.22" />

        {/* ===== CARUNCLE / CROWN (fleshy red crest — male Andean Condor) ===== */}
        <path
          d="M248 72 C250 59 255 51 260 51 C265 51 270 59 272 72 C268 78 264 80 260 78 C256 80 252 78 248 72 Z"
          fill="#8c1a1a"
        />
        {/* Caruncle highlight */}
        <path d="M252 68 C254 60 258 55 262 58" stroke="#b82020" strokeWidth="1.3" fill="none" opacity="0.75" />
        {/* Side lobes */}
        <ellipse cx="248" cy="75" rx="5.5" ry="4.5" fill="#8c1a1a" opacity="0.9" />
        <ellipse cx="272" cy="75" rx="5.5" ry="4.5" fill="#8c1a1a" opacity="0.9" />
        <circle cx="243" cy="80" r="3.5" fill="#7a1515" opacity="0.7" />
        <circle cx="277" cy="80" r="3.5" fill="#7a1515" opacity="0.7" />

        {/* ===== EYES ===== */}
        {/* Orbital ring — bare pinkish skin around eyes */}
        <circle cx="238" cy="114" r="14" fill="#c05050" opacity="0.38" />
        <circle cx="282" cy="114" r="14" fill="#c05050" opacity="0.38" />
        {/* Eye socket (dark) */}
        <circle cx="238" cy="114" r="11" fill="#08080e" />
        <circle cx="282" cy="114" r="11" fill="#08080e" />
        {/* Iris — warm amber like a real Andean Condor */}
        <circle cx="238" cy="114" r="7.5" fill="#7a3e10" />
        <circle cx="282" cy="114" r="7.5" fill="#7a3e10" />
        {/* Iris ring detail */}
        <circle cx="238" cy="114" r="7.5" fill="none" stroke="#9a5018" strokeWidth="1.2" opacity="0.5" />
        <circle cx="282" cy="114" r="7.5" fill="none" stroke="#9a5018" strokeWidth="1.2" opacity="0.5" />
        {/* Accent halo glow (brand) */}
        <circle cx="238" cy="114" r="9" fill="#4F6DF5" opacity="0.1" filter="url(#eyeHalo)" />
        <circle cx="282" cy="114" r="9" fill="#4F6DF5" opacity="0.1" filter="url(#eyeHalo)" />
        {/* Pupils — mouse tracking */}
        <circle cx={238 + ex} cy={114 + ey} r="4.5" fill="#4F6DF5" filter="url(#softGlow)" />
        <circle cx={282 + ex} cy={114 + ey} r="4.5" fill="#4F6DF5" filter="url(#softGlow)" />
        {/* Main highlight */}
        <circle cx={235 + ex * 0.4} cy={111 + ey * 0.4} r="1.9" fill="white" opacity="0.92" />
        <circle cx={279 + ex * 0.4} cy={111 + ey * 0.4} r="1.9" fill="white" opacity="0.92" />
        {/* Secondary small highlight */}
        <circle cx={241 + ex * 0.3} cy={117 + ey * 0.3} r="1" fill="white" opacity="0.5" />
        <circle cx={285 + ex * 0.3} cy={117 + ey * 0.3} r="1" fill="white" opacity="0.5" />

        {/* ===== BEAK — pale grey with strong downward hook ===== */}
        {/* Cere (soft fleshy skin at beak base — orange/red like condor) */}
        <path
          d="M249 133 C252 129 268 129 271 133 C272 137 272 141 271 143 C268 139 252 139 249 143 C248 141 248 137 249 133 Z"
          fill="#c07050"
        />
        {/* Nostril slot in cere */}
        <ellipse cx="260" cy="137" rx="3.5" ry="2" fill="#8a3e28" opacity="0.55" />
        {/* Main beak body */}
        <path
          d="M249 142 C252 140 268 140 271 142 L269 158 C266 165 263 170 260 170 C257 170 254 165 251 158 Z"
          fill="#969080"
        />
        {/* Central ridge */}
        <path d="M260 144 L260 164" stroke="#787060" strokeWidth="0.7" fill="none" opacity="0.6" />
        {/* Downcurved hook — very characteristic */}
        <path
          d="M251 158 C248 164 249 170 253 170 C257 171 260 167 259 163 L251 158 Z"
          fill="#686050"
        />
        {/* Hook shading */}
        <path d="M251 158 C249 162 250 167 254 168" stroke="#888070" strokeWidth="0.6" fill="none" opacity="0.6" />

        {/* ===== TAIL FEATHERS ===== */}
        <g opacity="0.88">
          <path d="M239 339 C236 357 232 374 227 388" stroke="#181824" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          <path d="M249 342 C247 360 244 378 240 392" stroke="#141420" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M257 343 C256 362 255 380 254 394" stroke="#12121e" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          <path d="M263 343 C264 362 265 380 266 394" stroke="#12121e" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          <path d="M271 342 C273 360 276 378 280 392" stroke="#141420" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M281 339 C284 357 288 374 293 388" stroke="#181824" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        </g>

        {/* ===== LEGS / FEET ===== */}
        <g opacity="0.72">
          <path d="M243 334 L235 357 L227 370" stroke="#9a8060" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M227 370 L219 376" stroke="#8a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M227 370 L225 380" stroke="#8a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M277 334 L285 357 L293 370" stroke="#9a8060" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M293 370 L301 376" stroke="#8a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M293 370 L295 380" stroke="#8a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* ===== Orbiting particle sparkles ===== */}
        <circle cx="55" cy="195" r="2" fill="#4F6DF5" opacity="0.5" className="particle-1" />
        <circle cx="465" cy="195" r="2" fill="#4F6DF5" opacity="0.5" className="particle-2" />
        <circle cx="96" cy="138" r="1.5" fill="#6B85FF" opacity="0.4" className="particle-3" />
        <circle cx="424" cy="138" r="1.5" fill="#6B85FF" opacity="0.4" className="particle-4" />
        <circle cx="74" cy="255" r="1.5" fill="#a78bfa" opacity="0.4" className="particle-5" />
        <circle cx="446" cy="255" r="1.5" fill="#a78bfa" opacity="0.4" className="particle-6" />
      </svg>
    </div>
  );
}
