"use client";

import { useEffect, useRef, useState } from "react";

type Item = { title: string; body: string };

const ITEMS: Item[] = [
  {
    title: "Build Trust & Credibility",
    body:
      "“As featured on Forbes, Entrepreneur, MSN & Associated Press” is powerful social proof. It signals legitimacy and makes more prospects comfortable converting.",
  },
  {
    title: "Get Ranked on Google",
    body:
      "Top-tier publications pass high-authority backlinks. As your articles index, your brand gains momentum toward page one for key searches.",
  },
  {
    title: "Own Your Digital Footprint",
    body:
      "Control what buyers see when they Google you—credible coverage, not random noise. Editorial write-ups on global outlets help close the deal.",
  },
];

/**
 * Scroll behavior:
 * - We continuously read each card's distance from the viewport center.
 * - The most-centered card becomes "active".
 * - position offset = (index - activeIndex) drives a horizontal stage:
 *     0 → centered, -1 → slide left (off), +1 → just-right (incoming)
 */
export default function BuildBrand() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));

    const tick = () => {
      const vh = window.innerHeight;
      let bestIdx = active;
      let bestScore = -Infinity;

      cards.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        const score = -dist; // closer to center = higher score
        if (score > bestScore) {
          bestScore = score;
          bestIdx = idx;
        }
      });

      if (bestIdx !== active) setActive(bestIdx);
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      {/* Soft premium background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 420px at 12% 0%, rgba(120,90,20,0.10), transparent 60%), radial-gradient(900px 420px at 88% 8%, rgba(100,80,10,0.08), transparent 62%)",
        }}
      />

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
        {/* LEFT — Heading & intro copy */}
        <div className="relative">
          <span className="pointer-events-none absolute -left-1 -top-9 select-none text-7xl md:text-8xl font-extrabold uppercase tracking-widest text-white/[0.035]">
            Brand
          </span>

          <h2 className="relative z-10 text-4xl md:text-5xl font-black leading-tight">
            How We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300">
              Build Your Brand
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-white/80">
            Editorial credibility + distribution that compounds. We plan, write, and place
            coverage that strengthens trust, search visibility, and deal velocity.
          </p>
        </div>

        {/* RIGHT — Scroll stage: cards slide left as new ones enter */}
        <div className="relative">
          <div ref={listRef} className="space-y-12">
            {ITEMS.map((it, idx) => {
              const offset = idx - active; // -1, 0, +1, etc.
              // Compute transforms based on relative position to active card
              // Center (0): visible, slight scale up
              // Left (-1 or less): slide off to the left, fade
              // Right (+1): sit to the right, slightly faded (incoming)
              const translateX =
                offset === 0
                  ? "0%"
                  : offset < 0
                  ? `calc(-60% - ${Math.min(Math.abs(offset) - 1, 1) * 20}%)` // further left if further behind
                  : `calc(${Math.min(offset, 1) * 22}%)`; // small right shift for next
              const scale = offset === 0 ? 1.02 : offset < 0 ? 0.96 : 0.985;
              const opacity =
                offset === 0 ? 1 : offset < 0 ? 0.25 : 0.75;
              const blur = offset === 0 ? "0px" : offset < 0 ? "1.2px" : "0.3px";
              const z = offset === 0 ? 30 : offset < 0 ? 10 : 20;

              return (
                <article
                  key={idx}
                  data-card
                  className={[
                    "relative overflow-hidden rounded-3xl border border-yellow-600/40 bg-[#1a1200] px-6 py-8 md:px-8 md:py-10",
                    "transition-[transform,opacity,filter,box-shadow] duration-600 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform",
                    offset === 0
                      ? "shadow-[0_40px_120px_-30px_rgba(180,140,50,.28)]"
                      : "shadow-[0_20px_60px_-40px_rgba(0,0,0,.45)]",
                  ].join(" ")}
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    opacity,
                    filter: `blur(${blur})`,
                    zIndex: z,
                  }}
                >
                  {/* folded corner detail */}
                  <span className="pointer-events-none absolute right-5 top-5 h-6 w-6 -rotate-45 rounded-sm bg-white/5" />

                  <h3
                    className={`text-xl md:text-2xl font-extrabold mb-2 ${
                      offset === 0 ? "text-white" : "text-white/90"
                    }`}
                  >
                    {it.title}
                  </h3>
                  <p className="text-white/70">{it.body}</p>

                  {/* bottom sheen only for the active card */}
                  {offset === 0 && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-3xl"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, rgba(120,90,20,0.10) 55%, rgba(180,140,50,0.10))",
                      }}
                    />
                  )}
                </article>
              );
            })}
          </div>

          {/* tiny rail hint below cards for polish */}
          <div className="mt-6 h-1 w-24 rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}
