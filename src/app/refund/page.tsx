// app/refunds/page.tsx
"use client";

import React from "react";
import Link from "next/link";

const ACCENT = "rgb(168,85,247)"; // Publisive purple

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
        <span className="pr-2" style={{ color: ACCENT }}>
          ▸
        </span>
        {title}
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300">
        {children}
      </div>
      <div className="my-8 h-px w-full bg-gray-700/40" />
    </section>
  );
}

export default function RefundPolicyPage() {
  const effective = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0b0f18] via-black to-[#0b0f18]">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-screen blur-2xl opacity-10 animate-pulse"
          style={{ backgroundColor: ACCENT }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-screen blur-2xl opacity-10 animate-pulse"
          style={{ backgroundColor: ACCENT, animationDelay: "2s" }}
        />
        <div
          className="absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-screen blur-2xl opacity-10 animate-pulse"
          style={{ backgroundColor: ACCENT, animationDelay: "4s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center uppercase mb-8">
          <p className="text-xs tracking-[0.25em] text-gray-400">LEGAL</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-100 mt-2">
            Refund Policy
          </h1>
          <p className="mt-3 text-gray-400">
            Effective Date:{" "}
            <span className="font-semibold text-gray-200">{effective}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 rounded-2xl border border-gray-700/40 bg-white/5 backdrop-blur p-4">
              <h3 className="text-sm font-semibold text-gray-200 mb-3">
                On this page
              </h3>
              <nav className="text-sm space-y-2 text-gray-300">
                {[
                  { id: "intro", label: "Introduction" },
                  { id: "general", label: "1. General Policy" },
                  { id: "guarantee", label: "2. Our Placement Guarantee" },
                  { id: "eligibility", label: "3. Eligibility for Refunds" },
                  { id: "nonrefundable", label: "4. Non-Refundable Items" },
                  { id: "cancellations", label: "5. Cancellations" },
                  { id: "timelines", label: "6. Timelines & Delivery" },
                  { id: "chargebacks", label: "7. Chargebacks" },
                  { id: "contact", label: "8. Contact Us" },
                  { id: "updates", label: "9. Policy Updates" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded px-2 py-1 hover:text-black hover:bg-[rgb(168,85,247)]/90 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-9">
            <div
              className="rounded-3xl border border-gray-700/40 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-10"
              style={{ boxShadow: "0 10px 25px rgba(168,85,247,0.10)" }}
            >
              <Section id="intro" title="Introduction">
                <p>
                  Thank you for choosing <strong>Publisive Media</strong>{" "}
                  (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). We aim to
                  provide transparent, high-quality PR and media placement
                  services. This Refund Policy explains when refunds may be
                  issued for purchases made via{" "}
                  <Link
                    href="https://www.publisivemedia.com/"
                    className="underline decoration-dotted underline-offset-4 hover:text-gray-100 ml-1"
                  >
                    https://www.publisivemedia.com/
                  </Link>{" "}
                  (the &quot;Site&quot;) or directly with our team.
                </p>
              </Section>

              <Section id="general" title="1. General Policy">
                <p>
                  Due to the strategic and labor-intensive nature of PR,
                  content, and publication work, <strong>all sales are final</strong> once
                  a campaign has begun (e.g., strategy kickoff, writing
                  commenced, outreach initiated, or submissions made).
                </p>
                <p className="mt-3">
                  We commit meaningful time, editorial resources, and
                  partner fees early in an engagement; those costs cannot be
                  reversed or recovered after work starts.
                </p>
              </Section>

              <Section id="guarantee" title="2. Our Placement Guarantee">
                <p>
                  If your written agreement or checkout explicitly includes a{" "}
                  <strong>placement guarantee</strong> (e.g., publication in a
                  specified outlet or an agreed equivalent) and{" "}
                  <em>we are unable to deliver that placement within the stated
                  timeframe</em>, you will be eligible for a{" "}
                  <strong>100% refund</strong> of fees paid for that guaranteed
                  item—provided you have met all client responsibilities (timely
                  approvals, accurate information, etc.).
                </p>
                <p className="mt-3">
                  If a listed outlet becomes unavailable for reasons outside our
                  control (editorial embargoes, policy changes, outages), we
                  will first offer a like-for-like alternative with comparable
                  authority and audience. If you decline a reasonable
                  alternative, the guarantee may be considered fulfilled.
                </p>
              </Section>

              <Section id="eligibility" title="3. Eligibility for Refunds">
                <p>Refunds may be considered in these limited cases:</p>
                <ul>
                  <li>
                    <strong>Duplicate/Accidental Payment:</strong> Verified
                    duplicate charges will be refunded promptly.
                  </li>
                  <li>
                    <strong>Service Not Delivered (Guaranteed Item):</strong>{" "}
                    Per the guarantee above.
                  </li>
                  <li>
                    <strong>Technical Error Before Work Starts:</strong> If a
                    processing error prevents your order and{" "}
                    <em>no work has begun</em>, a full refund may be issued.
                  </li>
                </ul>
                <p className="mt-3">
                  To request a refund, email us within{" "}
                  <strong>7 days</strong> of the original payment date and
                  include your order details and rationale.
                </p>
              </Section>

              <Section id="nonrefundable" title="4. Non-Refundable Items">
                <ul>
                  <li>Work already performed (strategy, writing, outreach).</li>
                  <li>
                    Articles or placements that are published or already
                    submitted to editors.
                  </li>
                  <li>
                    Delays caused by missing assets, late approvals, factual
                    changes, or other client-side issues.
                  </li>
                  <li>
                    Outcomes affected by editorial discretion of third-party
                    publishers.
                  </li>
                </ul>
              </Section>

              <Section id="cancellations" title="5. Cancellations">
                <p>
                  If you wish to cancel <em>before</em> work begins, contact us
                  immediately at{" "}
                  <a
                    href="mailto:accounts@publisivemedia.com"
                    className="underline"
                  >
                    accounts@publisivemedia.com
                  </a>{" "}
                  or{" "}
                  <a href="tel:+15715716020" className="underline">
                    +1 (571) 571-6020
                  </a>
                  . Cancellations prior to kickoff may be eligible for a{" "}
                  partial refund less a 20–30% administrative fee to cover
                  onboarding and reserved capacity. Once work starts, refunds
                  are not available except under Section 2.
                </p>
              </Section>

              <Section id="timelines" title="6. Timelines & Delivery">
                <p>
                  We aim to deliver within agreed timelines; however, PR
                  timelines can be influenced by editorial calendars, news
                  cycles, and publisher availability. Reasonable delays related
                  to third-party publishers do not constitute grounds for
                  refunds.
                </p>
              </Section>

              <Section id="chargebacks" title="7. Chargebacks">
                <p>
                  Filing a chargeback without first contacting us may result in
                  immediate suspension of services. We’re happy to resolve any
                  issue quickly—please email{" "}
                  <a
                    href="mailto:accounts@publisivemedia.com"
                    className="underline"
                  >
                    accounts@publisivemedia.com
                  </a>{" "}
                  and we’ll help.
                </p>
              </Section>

              <Section id="contact" title="8. Contact Us">
                <address className="not-italic leading-relaxed">
                  <div className="font-semibold text-gray-100">
                    Publisive Media
                  </div>
                  <div>6545 MARKET AVE N STE 100</div>
                  <div>CANTON, OH 44721</div>
                  <div className="mt-3">
                    Email:{" "}
                    <a
                      className="underline decoration-dotted underline-offset-4"
                      href="mailto:accounts@publisivemedia.com"
                    >
                      accounts@publisivemedia.com
                    </a>
                  </div>
                  <div>
                    Phone:{" "}
                    <a
                      className="underline decoration-dotted underline-offset-4"
                      href="tel:+15715716020"
                    >
                      +1 (571) 571-6020
                    </a>
                  </div>
                </address>
              </Section>

              <Section id="updates" title="9. Policy Updates">
                <p>
                  We may update this Refund Policy from time to time. The latest
                  version will be posted here with an updated Effective Date.
                  Please review periodically for changes.
                </p>
              </Section>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              © {new Date().getFullYear()} Publisive Media. All rights
              reserved.
            </p>
          </article>
        </div>
      </div>

      {/* Optional scroll indicator */}
      <div
        className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden
      >
        <svg
          className="w-6 h-6"
          style={{ color: ACCENT }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </main>
  );
}
