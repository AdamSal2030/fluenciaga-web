"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Transition } from "framer-motion";

type Logo = { name: string; src: string; from: string; to: string };

const LOGOS: Logo[] = [
  { name: "Forbes",           src: "https://ext.same-assets.com/3266188084/1900734569.webp", from: "#6B46C1", to: "#D946EF" },
  { name: "Business Insider", src: "https://ext.same-assets.com/3266188084/1581247750.webp", from: "#0EA5E9", to: "#22D3EE" },
  { name: "Entrepreneur",     src: "https://ext.same-assets.com/3266188084/239392922.webp",  from: "#F59E0B", to: "#F43F5E" },
  { name: "Associated Press", src: "https://ext.same-assets.com/3266188084/3785817444.webp", from: "#EF4444", to: "#F97316" },
  { name: "USA Today",        src: "https://ext.same-assets.com/3266188084/3339134189.webp", from: "#2563EB", to: "#60A5FA" },
  { name: "VentureBeat",      src: "https://ext.same-assets.com/3266188084/3229324110.webp", from: "#9333EA", to: "#22D3EE" },
];

// 🔧 Visibility knobs
const BASE_OPACITY = 0.18;          // was 0.08
const RIBBON_BLUR = 0.4;            // was ~0.8–1.2
const IMG_BRIGHTNESS = 1.25;        // 1 = original
const IMG_CONTRAST = 1.25;          // 1 = original
const TINT_ALPHA_1 = 0.38;          // radial 1
const TINT_ALPHA_2 = 0.30;          // radial 2

const TILE = [...LOGOS, ...LOGOS, ...LOGOS];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [i, setI] = useState(0);
  const current = LOGOS[i];

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % LOGOS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const tintStyle = useMemo<React.CSSProperties>(
    () => ({
      backgroundImage: `
        radial-gradient(800px 380px at 30% 20%, ${hexA(current.from, TINT_ALPHA_1)}, transparent 60%),
        radial-gradient(800px 380px at 70% 80%, ${hexA(current.to,   TINT_ALPHA_2)}, transparent 60%)
      `,
      mixBlendMode: "lighten",
    }),
    [current]
  );

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ backgroundColor: "#2d5a27" }}>
      {/* brighter tint */}
      <motion.div
        key={current.name + "-tint"}
        className="absolute inset-0 -z-30"
        style={tintStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }} // Corrected transition with string ease
        aria-hidden
      />

      {/* brighter diagonal marquee */}
      {/* logos removed */}

      <FX />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Elevate Your Brand Authority Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">
              Strategic Publishing
            </span>
          </h1>

          <p className="mt-4 text-white/85">
            We get your story live in Forbes, Business Insider, AP and more—often within 72 hours.
            If we don’t deliver, you don’t pay.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/publications"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold border-2 border-yellow-900 hover:bg-yellow-900/10 transition-colors"
            >
              See Publications
            </Link>

            
          </div>

          <div className="mt-6 text-sm text-white/70">
            Trusted by founders and brands in 37+ countries.
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMarqueeBG({ prefersReduced }: { prefersReduced: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced) return;
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: cx * 8, y: cy * 8 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      aria-hidden
      style={{
        transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
        transition: "transform 200ms ease-out",
        maskImage:
          "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.85) 78%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.85) 78%, transparent 100%)",
      }}
    >
      <Ribbon y="20%" rotate={-18} speed={28} opacity={BASE_OPACITY * 1.1} scale={1.05} blur={RIBBON_BLUR} prefersReduced={prefersReduced} />
      <Ribbon y="55%" rotate={-18} speed={40} opacity={BASE_OPACITY * 0.95} scale={0.95} blur={RIBBON_BLUR + 0.2} prefersReduced={prefersReduced} />
      <Ribbon y="85%" rotate={-18} speed={22} opacity={BASE_OPACITY * 1.25} scale={1.15} blur={RIBBON_BLUR * 0.8} prefersReduced={prefersReduced} />
    </div>
  );
}

function Ribbon({
  y, rotate, speed = 30, opacity = 0.18, scale = 1, blur = 0.4, prefersReduced,
}: {
  y: string;
  rotate: number;
  speed?: number;
  opacity?: number;
  scale?: number;
  blur?: number;
  prefersReduced: boolean;
}) {
  const anim = {};
  return (
    <div
      className="absolute left-[-25%] right-[-25%]"
      style={{
        top: y,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        filter: `blur(${blur}px)`,
        opacity,
        mixBlendMode: "lighten", // brighter than "screen" on dark BG
      }}
    >
      <motion.div className="flex" {...anim}>
        <Tile />
        <Tile />
      </motion.div>
    </div>
  );
}

function Tile() {
  return (
    <div className="flex gap-32 px-16">
      {TILE.map((l, idx) => (
        <img
          key={l.name + idx}
          src={l.src}
          alt={l.name}
          className="h-12 w-auto object-contain opacity-95"
          style={{
            filter: `grayscale(1) brightness(${IMG_BRIGHTNESS}) contrast(${IMG_CONTRAST}) drop-shadow(0 0 6px rgba(255,255,255,0.15))`,
            mixBlendMode: "color-dodge", // adds vivid sheen where light exists
          }}
          loading="lazy"
          draggable={false}
        />
      ))}
    </div>
  );
}

function FX() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          mixBlendMode: "overlay",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.52'/></svg>\")",
          backgroundSize: "140px 140px",
        }}
      />
    </>
  );
}

// tiny util to add alpha to hex (#RRGGBB, 0..1)
function hexA(hex: string, a: number) {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  const alpha = Math.round(Math.min(Math.max(a, 0), 1) * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${v}${alpha}`;
}
