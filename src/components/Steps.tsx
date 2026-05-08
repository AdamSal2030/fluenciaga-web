export default function HowItWorks() {
  const STEPS = [
    {
      k: "STEP 1",
      title: "Click the button and complete checkout",
      body: "Fill out the short form so we understand your goals and target publications.",
    },
    {
      k: "STEP 2",
      title: "We write your article and send for approval",
      body: "Our editorial team crafts the story. You review and request edits—fast turnaround.",
    },
    {
      k: "STEP 3",
      title: "We publish it in top-tier media",
      body: "Once approved, we handle placement and share the live links and assets.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
      {/* soft background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 420px at 10% -10%, rgba(120,90,20,0.10), transparent 60%), radial-gradient(900px 420px at 90% 0%, rgba(99,102,241,0.09), transparent 62%)",
        }}
      />

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {/* LEFT: Heading + copy + CTA */}
        <div>
          <h2 className="text-sm uppercase tracking-[0.25em] text-white/60">
            How to Get Featured in 2025
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-black leading-tight">
            Top-tier media coverage in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300">
              3 simple steps
            </span>
            .
          </h3>
          <p className="mt-4 max-w-xl text-white/80">
            We handle the entire process from brief to byline to publication so you can stay
            focused on building the business.
          </p>

          {/* CTA */}
          <div className="mt-8">
            
            <div className="mt-3 text-xs text-white/70">
              *100% Money-Back Guarantee
            </div>
          </div>
        </div>

        {/* RIGHT: Steps */}
        <ol className="relative space-y-6">
          {STEPS.map((s, i) => (
            <li key={s.k} className="group relative">
              <div className="grid grid-cols-[auto_1fr] gap-4">
                {/* Number badge */}
                <div className="mt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <span className="text-base font-extrabold">{i + 1}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="relative rounded-2xl border border-yellow-600/40 bg-[#1a1200] p-5 md:p-6 transition-[box-shadow,transform] duration-300 group-hover:shadow-[0_24px_80px_-24px_rgba(180,140,50,.45)]">
                  <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/60">
                    {s.k}
                  </div>
                  <h4 className="mt-1 text-lg md:text-xl font-extrabold text-white">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-white/70">{s.body}</p>

                  {/* folded corner detail */}
                  <span className="pointer-events-none absolute right-5 top-5 h-5 w-5 -rotate-45 rounded-sm bg-white/5" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
