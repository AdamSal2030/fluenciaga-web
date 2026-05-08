// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-3 md:mx-6 mt-16">
      <div className="rounded-3xl border border-white/10 bg-[#060e06] px-6 py-10 md:px-10 md:py-12 relative overflow-hidden">
        {/* soft background accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 360px at 10% -10%, rgba(180,140,50,.10), transparent 60%), radial-gradient(900px 360px at 90% -10%, rgba(120,90,20,.08), transparent 60%)",
          }}
        />

        {/* Top */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-extrabold tracking-wide">
              Fluenciaga Publishing
            </h3>
            <p className="mt-3 text-white/75 leading-relaxed max-w-2xl">
              Fluenciaga Publishing helps brands of every size get featured in top-tier media with guaranteed results. From Forbes to CNN, we deliver your story with radical speed and trust. Your reputation, elevated, or it's free.
            </p>

            <p className="mt-6 text-sm text-white/60">
              © 2025 Fluenciaga Publishing. All rights reserved.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="break-all">
                Email:{" "}
                <a
                  href="mailto:accounts@fluenciaga.com"
                  className="underline hover:text-yellow-300"
                >
                  accounts@fluenciaga.com
                </a>
              </li>
<li className="text-white/80">
                Address: 6545 MARKET AVE N STE 100, CANTON, OH 44721
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <span className="opacity-30">•</span>
          <Link href="/terms" className="hover:text-white">
            Terms &amp; Conditions
          </Link>
          <span className="opacity-30">•</span>
          <Link href="/refund" className="hover:text-white">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
