// app/privacy/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Brand accent (Fluenciaga gold)
const ACCENT = "#c9a84c";

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

export default function PrivacyPolicyPage() {
  const effective = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
    <Header />
    <main className="min-h-screen w-full bg-gradient-to-br from-[#080f08] via-[#0d1a0d] to-[#080f08]" style={{ paddingTop: "72px" }}>
      {/* Soft floating blobs */}
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
            Privacy Policy
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
                  { id: "collect", label: "1. Information We Collect" },
                  { id: "use", label: "2. How We Use Your Info" },
                  { id: "share", label: "3. Sharing Your Information" },
                  { id: "cookies", label: "4. Cookies & Tracking" },
                  { id: "rights", label: "5. Your Rights & Choices" },
                  { id: "retention", label: "6. Data Retention" },
                  { id: "security", label: "7. Data Security" },
                  { id: "transfers", label: "8. International Transfers" },
                  { id: "contact", label: "9. Contact Information" },
                  { id: "updates", label: "10. Updates to This Policy" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded px-2 py-1 hover:text-black hover:bg-[#c9a84c]/90 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main card */}
          <article className="lg:col-span-9">
            <div
              className="rounded-3xl border border-gray-700/40 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-10"
              style={{ boxShadow: "0 10px 25px rgba(201,168,76,0.12)" }}
            >
              {/* Intro */}
              <Section id="intro" title="Introduction">
                <p>
                  <strong>Fluenciaga Publishing</strong> (&quot;we,&quot;
                  &quot;us,&quot; &quot;our&quot;) operates{" "}
                  <Link
                    href="https://fluenciaga.com/"
                    className="underline decoration-dotted underline-offset-4 hover:text-gray-100 ml-1"
                  >
                    https://fluenciaga.com/
                  </Link>{" "}
                  (the &quot;Site&quot;). This Privacy Policy explains how we
                  collect, use, disclose, and protect your information when you
                  visit our website or use our services. By using our Site or
                  services, you agree to the practices described here.
                </p>
              </Section>

              {/* 1. Information We Collect */}
              <Section id="collect" title="1. Information We Collect">
                <p>
                  We collect information to provide and improve our services.
                  This may include:
                </p>
                <h3 className="text-xl font-semibold text-gray-100 mt-6">
                  a) Information You Provide
                </h3>
                <ul>
                  <li>
                    <strong>Contact Information:</strong> Name, email address,
                    phone number, company name, etc.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Billing details
                    (processed securely by third-party payment processors).
                  </li>
                  <li>
                    <strong>Communications:</strong> Messages or files you send
                    via forms, chat, or email.
                  </li>
                  <li>
                    <strong>Project Details:</strong> Materials you provide for
                    PR campaigns or marketing.
                  </li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-100 mt-6">
                  b) Automatically Collected Information
                </h3>
                <ul>
                  <li>
                    <strong>Usage Data:</strong> IP address, browser, OS, pages
                    visited, time on page.
                  </li>
                  <li>
                    <strong>Cookies & Tracking:</strong> Cookies, pixels, and
                    analytics used to improve the Site.
                  </li>
                  <li>
                    <strong>Device Data:</strong> Device type, screen
                    resolution, connection info.
                  </li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-100 mt-6">
                  c) Information From Third Parties
                </h3>
                <p>
                  We may receive data from analytics, advertising, or payment
                  providers and combine it with the information you provide.
                </p>
              </Section>

              {/* 2. How We Use Your Info */}
              <Section id="use" title="2. How We Use Your Information">
                <ul>
                  <li>Deliver, maintain, and improve our services and Site</li>
                  <li>Process payments and provide support</li>
                  <li>
                    Send updates or marketing (only if you’ve opted in)
                  </li>
                  <li>Respond to inquiries and requests</li>
                  <li>Analyze Site performance and usage</li>
                  <li>Detect, prevent, and address fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </Section>

              {/* 3. Sharing */}
              <Section id="share" title="3. Sharing Your Information">
                <p>We do not sell your personal data. We may share with:</p>
                <ul>
                  <li>
                    <strong>Service Providers:</strong> Hosting, analytics,
                    payment processing, and similar vendors.
                  </li>
                  <li>
                    <strong>Legal:</strong> When required by law or to protect
                    rights and safety.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a
                    merger, sale, or acquisition.
                  </li>
                  <li>
                    <strong>Aggregated Data:</strong> Non-identifiable data for
                    analytics or reporting.
                  </li>
                </ul>
              </Section>

              {/* 4. Cookies */}
              <Section id="cookies" title="4. Cookies & Tracking">
                <p>
                  We use cookies and similar technologies to remember
                  preferences, measure performance, and personalize content. You
                  can control cookies in your browser settings; disabling them
                  may limit some features.
                </p>
              </Section>

              {/* 5. Rights */}
              <Section id="rights" title="5. Your Rights & Choices">
                <p>You may have the right to:</p>
                <ul>
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data or object to processing</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>
                  To exercise rights, contact us using the details in Section 9.
                  We may need to verify your identity.
                </p>
              </Section>

              {/* 6. Retention */}
              <Section id="retention" title="6. Data Retention">
                <p>
                  We keep your data only as long as needed for the purposes
                  described, or as required by law. When no longer needed, we
                  securely delete or anonymize it.
                </p>
              </Section>

              {/* 7. Security */}
              <Section id="security" title="7. Data Security">
                <p>
                  We use reasonable administrative, technical, and physical
                  safeguards to protect personal data. However, no internet
                  transmission or storage is 100% secure.
                </p>
              </Section>

              {/* 8. Transfers */}
              <Section id="transfers" title="8. International Transfers">
                <p>
                  If you access the Site from outside the U.S., your data may be
                  transferred to and processed in the U.S., which may have
                  different data protection laws. We take steps to safeguard
                  your information.
                </p>
              </Section>

              {/* 9. Contact */}
              <Section id="contact" title="9. Contact Information">
                <address className="not-italic leading-relaxed">
                  <div className="font-semibold text-gray-100">
                    Fluenciaga Publishing
                  </div>
                  <div>6545 MARKET AVE N STE 100</div>
                  <div>CANTON, OH 44721</div>
                  <div className="mt-3">
                    Email:{" "}
                    <a
                      className="underline decoration-dotted underline-offset-4"
                      href="mailto:accounts@fluenciaga.com"
                    >
                      accounts@fluenciaga.com
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

              {/* 10. Updates */}
              <Section id="updates" title="10. Updates to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. When we
                  do, we’ll revise the Effective Date above. Significant changes
                  may be communicated via a notice on the Site. Please check
                  back periodically.
                </p>
              </Section>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 mt-6">
              © {new Date().getFullYear()} Fluenciaga Publishing. All rights
              reserved.
            </p>
          </article>
        </div>
      </div>

    </main>
    <Footer />
    </>
  );
}
