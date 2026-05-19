// app/terms/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ACCENT = "#c9a84c"; // Fluenciaga gold

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

export default function TermsPage() {
  const effective = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
    <Header />
    <main className="min-h-screen w-full bg-gradient-to-br from-[#080f08] via-[#0d1a0d] to-[#080f08]" style={{ paddingTop: "72px" }}>
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
            Terms of Service
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
                  { id: "use", label: "1. Use of Our Services" },
                  { id: "eligibility", label: "2. Eligibility" },
                  { id: "scope", label: "3. Services & Site Content" },
                  { id: "pricing", label: "4. Pricing & Payments" },
                  { id: "client", label: "5. Client Responsibilities" },
                  { id: "ip", label: "6. Intellectual Property" },
                  { id: "confidentiality", label: "7. Confidentiality" },
                  { id: "liability", label: "8. Limitation of Liability" },
                  { id: "warranties", label: "9. Disclaimer of Warranties" },
                  { id: "thirdparty", label: "10. Third-Party Links" },
                  { id: "indemnification", label: "11. Indemnification" },
                  { id: "termination", label: "12. Termination" },
                  { id: "law", label: "13. Governing Law" },
                  { id: "changes", label: "14. Changes to These Terms" },
                  { id: "contact", label: "15. Contact Information" },
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

          {/* Main content */}
          <article className="lg:col-span-9">
            <div
              className="rounded-3xl border border-gray-700/40 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-10"
              style={{ boxShadow: "0 10px 25px rgba(201,168,76,0.12)" }}
            >
              <Section id="intro" title="Introduction">
                <p>
                  Welcome to <strong>Fluenciaga Publishing</strong> (&quot;we,&quot;
                  &quot;us,&quot; &quot;our&quot;). These Terms of Service
                  (&quot;Terms&quot;) govern your use of{" "}
                  <Link
                    href="https://fluenciaga.com/"
                    className="underline decoration-dotted underline-offset-4 hover:text-gray-100 ml-1"
                  >
                    https://fluenciaga.com/
                  </Link>{" "}
                  (the &quot;Site&quot;) and any products, services, or features
                  we offer (collectively, the &quot;Services&quot;). By
                  accessing or using our Services, you agree to these Terms. If
                  you do not agree, please do not use the Site or Services.
                </p>
              </Section>

              <Section id="use" title="1. Use of Our Services">
                <p>You agree that you will:</p>
                <ul>
                  <li>Use the Services only for lawful purposes;</li>
                  <li>
                    Not attempt to gain unauthorized access to any portion of
                    the Site, systems, or networks;
                  </li>
                  <li>
                    Not interfere with or disrupt the operation or security of
                    the Site;
                  </li>
                  <li>
                    Not resell, redistribute, or commercially exploit content
                    without our written permission.
                  </li>
                </ul>
              </Section>

              <Section id="eligibility" title="2. Eligibility">
                <p>
                  You must be at least 18 years old (or the age of majority in
                  your jurisdiction) to use our Services. By using the Site, you
                  represent that you have the legal capacity to enter into these
                  Terms.
                </p>
              </Section>

              <Section id="scope" title="3. Services & Site Content">
                <p>
                  We provide PR, media placement, and related marketing
                  services. All content on the Site—text, graphics, logos,
                  images, videos, and design—is owned or licensed by Fluenciaga
                  Publishing and protected by intellectual-property laws. You may not
                  reproduce, modify, distribute, display, or use our content
                  without prior written permission.
                </p>
              </Section>

              <Section id="pricing" title="4. Pricing & Payments">
                <p>
                  Prices are listed in U.S. Dollars (USD) unless stated
                  otherwise. Payment terms will be specified in your proposal,
                  checkout, or invoice.
                </p>
                <p>By purchasing, you agree to:</p>
                <ul>
                  <li>Provide accurate billing and payment details;</li>
                  <li>Authorize charges to your selected payment method;</li>
                  <li>Pay all fees according to the agreed schedule.</li>
                </ul>
                <p>
                  Once work begins, all sales are generally final. Refunds may
                  be provided at our discretion or where required by the specific
                  guarantee in your agreement.
                </p>
              </Section>

              <Section id="client" title="5. Client Responsibilities">
                <p>
                  You are responsible for timely, complete, and accurate inputs
                  (e.g., approvals, brand assets, facts). Delays in providing
                  required information may delay delivery timelines.
                </p>
                <ul>
                  <li>
                    You warrant that you have rights to all materials you supply
                    to us;
                  </li>
                  <li>
                    You agree to review and approve drafts prior to publication;
                  </li>
                  <li>
                    You will not request content that is misleading, unlawful,
                    or infringes third-party rights.
                  </li>
                </ul>
              </Section>

              <Section id="ip" title="6. Intellectual Property">
                <p>
                  Materials created by Fluenciaga Publishing remain our property until
                  full payment is received. Upon full payment, you receive a
                  non-exclusive, royalty-free license to use deliverables for
                  your marketing. We may showcase non-confidential work results
                  in our portfolio or marketing unless otherwise agreed.
                </p>
              </Section>

              <Section id="confidentiality" title="7. Confidentiality">
                <p>
                  We treat your non-public information as confidential and will
                  not disclose it to third parties except to deliver the
                  Services, with your consent, or as required by law.
                </p>
              </Section>

              <Section id="liability" title="8. Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, Fluenciaga Publishing and
                  its affiliates shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or
                  for lost profits, revenue, data, or goodwill. Our aggregate
                  liability for claims relating to the Services will not exceed
                  the amount you paid for the specific Service giving rise to
                  the claim.
                </p>
              </Section>

              <Section id="warranties" title="9. Disclaimer of Warranties">
                <ul>
                  <li>Services are provided “as is” and “as available.”</li>
                  <li>
                    We disclaim all warranties, express or implied, including
                    merchantability, fitness for a particular purpose, accuracy,
                    and non-infringement.
                  </li>
                  <li>
                    We do not guarantee uninterrupted or error-free operation of
                    the Site.
                  </li>
                </ul>
              </Section>

              <Section id="thirdparty" title="10. Third-Party Links">
                <p>
                  The Site may link to third-party websites or services we do
                  not control. We are not responsible for their content or
                  practices. Your interactions with third parties are solely
                  between you and those parties.
                </p>
              </Section>

              <Section id="indemnification" title="11. Indemnification">
                <p>
                  You agree to indemnify and hold harmless Fluenciaga Publishing, its
                  directors, employees, and partners from claims, damages,
                  losses, liabilities, and expenses (including reasonable
                  attorneys’ fees) arising from your use of the Services,
                  violation of these Terms, or infringement of third-party
                  rights.
                </p>
              </Section>

              <Section id="termination" title="12. Termination">
                <p>
                  We may suspend or terminate access to the Site or Services at
                  any time, with or without notice, for conduct that violates
                  these Terms or harms our interests or other users.
                </p>
              </Section>

              <Section id="law" title="13. Governing Law">
                <p>
                  These Terms are governed by the laws of the State of Ohio,
                  U.S.A., without regard to conflict-of-laws principles. You
                  agree to the exclusive jurisdiction of the courts located in
                  Canton, Ohio.
                </p>
              </Section>

              <Section id="changes" title="14. Changes to These Terms">
                <p>
                  We may update these Terms from time to time. The latest
                  version will be posted here with an updated Effective Date. By
                  continuing to use the Services after changes take effect, you
                  accept the revised Terms.
                </p>
              </Section>

              <Section id="contact" title="15. Contact Information">
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
            </div>

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
