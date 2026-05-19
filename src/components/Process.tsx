"use client";

import { useEffect, useRef, useState } from "react";
import { Radio, Sun, Leaf, BookOpen } from "lucide-react";

type Step = {
  title: string;
  body: string;
  icon: React.ElementType;
};

const STEPS: Step[] = [
  {
    title: "Listen",
    body:
      "We absorb every detail so your story is understood in its entirety.",
    icon: Radio,
  },
  {
    title: "Plan",
    body:
      "We craft a strategy that aligns with your brand and desired outcomes.",
    icon: Sun,
  },
  {
    title: "Craft",
    body:
      "Editors shape compelling narratives that resonate and cut through noise.",
    icon: Leaf,
  },
  {
    title: "Deliver",
    body:
      "We publish and amplify—so you’re not just seen, you’re recognized.",
    icon: BookOpen,
  },
];

export default function Process() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState<boolean[]>(
    Array(STEPS.length).fill(false)
  );

  // Reveal steps as they enter viewport
  useEffect(() => {
    const nodes = wrapRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!nodes || nodes.length === 0) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setSeen(prev => {
              if (prev[idx]) return prev;
              const next = prev.slice();
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.3 }
    );

    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  const revealedCount = seen.filter(Boolean).length;
  const progressPct =
    STEPS.length <= 1
      ? 100
      : Math.min(100, ((revealedCount - 1) / (STEPS.length - 1)) * 100);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      {/* header */}
      <div className="mb-14">
        <h2 className="text-4xl md:text-5xl font-black leading-tight">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">
            Process
          </span>
        </h2>
      </div>

      {/* timeline */}
      <div className="relative hidden md:block">
        {/* base rail */}
        <div className="h-[3px] w-full bg-white/10 rounded-full" />
        {/* progress rail */}
        <div
          className="absolute left-0 top-0 h-[3px] rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-400 transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: `${Math.max(0, progressPct)}%` }}
        />
      </div>

      {/* steps row (desktop) / stack (mobile) */}
      <div
        ref={wrapRef}
        className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-4"
      >
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isSeen = seen[i];

          return (
            <div
              key={s.title}
              data-step
              data-idx={i}
              className={[
                "relative flex flex-col items-center text-center",
                "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                isSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              {/* connector dot for mobile only */}
              <div className="md:hidden mb-2 h-1.5 w-24 rounded-full bg-white/10" />

              {/* icon medallion */}
              <div
                className={[
                  "grid place-items-center rounded-full",
                  "h-[92px] w-[92px] md:h-[104px] md:w-[104px]",
                  "bg-[#0c1a10] border border-white/10",
                  "shadow-[0_20px_60px_-30px_rgba(180,140,50,.35)]",
                  "relative",
                ].join(" ")}
              >
                {/* gradient ring */}
                <span
                  className={[
                    "absolute inset-[-2px] rounded-full p-[2px]",
                    "bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-400",
                    isSeen ? "opacity-100" : "opacity-50",
                    "transition-opacity duration-700",
                  ].join(" ")}
                  aria-hidden
                />
                <span className="absolute inset-[4px] rounded-full bg-[#0c1a10] border border-white/10" />
                <Icon className="relative z-10 h-6 w-6 text-white/90" />
              </div>

              {/* title */}
              <h3 className="mt-5 text-2xl md:text-[28px] font-extrabold">
                {s.title}
                <span
                  className={[
                    "ml-2 inline-block h-2 w-2 rounded-full align-middle",
                    "bg-gradient-to-br from-yellow-500 to-amber-400",
                    isSeen ? "scale-100 opacity-100" : "scale-0 opacity-0",
                    "transition-all duration-700",
                  ].join(" ")}
                />
              </h3>

              {/* copy */}
              <p className="mt-3 max-w-sm text-white/70">
                {s.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
