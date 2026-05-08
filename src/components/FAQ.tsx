"use client";

import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";

type QA = { question: string; answer: string };

const DEFAULT_FAQS: QA[] = [
  {
    question: "Who's this perfect for?",
    answer:
      "If you're a business, entrepreneur, consultant, coach, author, expert, agency, e-commerce store, product, service, or brand, this is for you.",
  },
  {
    question: "What exactly do I get when I buy this?",
    answer:
      "A fully custom 800–1,000 word article about your brand, unlimited revisions, and guaranteed publication in the outlet of your choice.",
  },
  {
    question: "Can I make revisions to the article?",
    answer:
      "Yes—unlimited revisions. You have final approval, and nothing is published until it’s exactly how you want it.",
  },
  {
    question: "Can I choose the news outlet?",
    answer:
      "Yes. In the intake form you’ll pick from 60+ outlets (e.g., USA News, Women’s Insider, CEO Times, Biz Weekly, Men’s Insider, New York Review). We’re always adding more.",
  },
  {
    question: "Will this help my SEO?",
    answer:
      "Yes. You’ll receive a high domain-authority backlink, and your article will be indexed on Google.",
  },
  {
    question: 'Can I say "As Seen On"?',
    answer:
      'Yes—you can use “As Seen On” credentials across your website, ads, and social channels.',
  },
  {
    question: "Is there a guarantee?",
    answer:
      "100% money-back guarantee. If we can’t get you featured in your chosen outlet within 10 days, you get a full refund.",
  },
];

export default function FAQ({
  faqs = DEFAULT_FAQS,
  title = "Frequently Asked Questions",
}: {
  faqs?: QA[];
  title?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // first open
  const rootId = useId();

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
      {/* Subtle background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "none" }}
      />

      <h2 className="text-3xl md:text-4xl font-black tracking-tight">
        {title.split(" ").slice(0, -1).join(" ")}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300">
          {title.split(" ").slice(-1)}
        </span>
      </h2>

      <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0c0f16]">
        {faqs.map((qa, i) => {
          const isOpen = openIdx === i;
          const headerId = `${rootId}-h-${i}`;
          const panelId = `${rootId}-p-${i}`;

          return (
            <div key={i} className="group">
              <button
                id={headerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-6 md:py-6 focus:outline-none"
              >
                <span className="text-base md:text-lg font-semibold">
                  {qa.question}
                </span>
                <span
                  className={[
                    "grid h-8 w-8 place-items-center rounded-full border border-white/15",
                    isOpen ? "bg-white/10" : "bg-white/5",
                  ].join(" ")}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-white/90" />
                  ) : (
                    <Plus className="h-4 w-4 text-white/90" />
                  )}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={[
                  "px-5 pb-5 md:px-6 md:pb-6 text-white/75 leading-relaxed",
                  "transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(.22,1,.36,1)]",
                  "grid",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p>{qa.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEO: FAQPage structured data */}
      <script
        type="application/ld+json"
        // @ts-ignore – we know this is valid JSON
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((q) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: { "@type": "Answer", text: q.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
