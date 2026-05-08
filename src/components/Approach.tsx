"use client";

import { useEffect, useRef, useState } from "react";

type Card = { title: string; body: string; speed?: number };
const CARDS: Card[] = [
  { title: "Authenticity Over Hype", body: "We build credible narratives people believe. No manufactured buzz.", speed: 0.16 },
  { title: "Modern Storytelling", body: "Format, timing, and angles that resonate with today’s media and audiences.", speed: 0.12 },
  { title: "Hands-On Support", body: "We work with your team—strategy, drafts, approvals—end-to-end.", speed: 0.18 },
  { title: "Your Voice, Amplified", body: "We don’t change your story. We elevate it and place it where it counts.", speed: 0.14 },
];

export default function Approach() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));

    // smooth, continuous update — no IO thresholds
    const tick = () => {
      const vh = window.innerHeight;
      let bestScore = -Infinity;
      let best = 0;

      cards.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = center - vh / 2;                 // px from viewport center
        const norm = Math.max(-1, Math.min(1, dist / (vh / 2))); // -1..1
        const speed = Number(el.dataset.speed || "0.15");

        // gentle parallax
        const y = norm * 20 * speed; // px
        // focus weight: closer to 0 => higher focus
        const focus = 1 - Math.min(1, Math.abs(norm));
        const score = focus - Math.abs(norm) * 0.1;

        el.style.setProperty("--y", `${y.toFixed(2)}px`);
        el.style.setProperty("--focus", `${focus}`);

        if (score > bestScore) {
          bestScore = score;
          best = idx;
        }
      });

      if (best !== activeIdx) setActiveIdx(best);
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [activeIdx]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      {/* subtle funky background (aurora ribbons) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(800px 420px at 8% 0%, rgba(120,90,20,0.10), transparent 60%), radial-gradient(900px 460px at 95% 10%, rgba(34,211,238,0.08), transparent 62%)",
          maskImage:
            "radial-gradient(1000px 600px at 30% 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(1000px 600px at 30% 0%, black 60%, transparent 100%)",
        }}
      />

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-14">
        {/* LEFT: title + richer copy */}
        <div className="relative">
          {/* watermark */}
          <span className="pointer-events-none absolute -left-1 -top-9 select-none text-7xl md:text-8xl font-extrabold uppercase tracking-widest text-white/[0.035]">
            Approach
          </span>

          <h2 className="relative z-10 text-4xl md:text-5xl font-black leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300">
              Approach
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-white/80">
            We combine editorial judgment with distribution that moves the needle—building
            credibility, rankings, and inbound in weeks, not quarters.
          </p>

          {/* a little more context */}
          <ul className="mt-6 space-y-3 text-white/75">
            {[
              "Story-first strategy aligned to outcomes (fundraising, pipeline, partnerships).",
              "Hands-on editors: interviews, drafts, approvals, and placement.",
              "Repeatable playbooks across markets and verticals.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: smooth drifting cards */}
        <div ref={gridRef} className="relative">
          <div className="space-y-8">
            {CARDS.map((c, i) => (
              <article
                key={i}
                data-card
                data-speed={c.speed ?? 0.15}
                className={[
                  "relative rounded-3xl border border-yellow-600/40 bg-[#1a1200] px-6 py-7 md:px-8 md:py-9 will-change-transform",
                  "transition-[transform,filter,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                  i === activeIdx
                    ? "shadow-[0_40px_120px_-30px_rgba(180,140,50,.28)]"
                    : "shadow-[0_20px_60px_-40px_rgba(0,0,0,.45)]",
                ].join(" ")}
                style={{
                  transform:
                    i === activeIdx
                      ? "translateY(var(--y,0px)) scale(1.015)"
                      : "translateY(var(--y,0px)) scale(0.992)",
                  filter: i === activeIdx ? "blur(0px)" : "blur(0.15px)",
                }}
              >
                {/* folded-corner detail */}
                <span className="pointer-events-none absolute right-5 top-5 h-6 w-6 -rotate-45 rounded-sm bg-white/5" />

                <h3
                  className={`mb-2 text-xl md:text-2xl font-extrabold ${
                    i === activeIdx ? "text-white" : "text-white/90"
                  }`}
                >
                  {c.title}
                </h3>
                <p className="text-white/70">{c.body}</p>

                {/* active sheen */}
                {i === activeIdx && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-3xl"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(120,90,20,0.10) 55%, rgba(99,102,241,0.12))",
                    }}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
