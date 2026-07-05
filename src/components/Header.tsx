// app/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ logoSrc = "/logo.png" }: { logoSrc?: string }) {
  const [open, setOpen] = useState(false);

  // Point "Contact Us" to the contact section on the homepage
  const NAV = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/blog" },
    { label: "Contact Us", href: "/#contact" }, // <-- anchor to your contact form
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 px-4 md:px-6 mt-2.5">
        <div
          className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_6px_26px_rgba(0,0,0,.35)] mx-auto w-full max-w-7xl"
          style={{ backgroundColor: "#091510" }}
        >
          {/* RIGHT OVERLAY — subtle gradient + left fade (no seam) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[60%] md:w-[54%]"
            style={{
              background:
                "linear-gradient(90deg, rgba(120,90,20,0.22) 0%, rgba(150,110,30,0.26) 50%, rgba(180,140,50,0.28) 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 84%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to left, black 84%, rgba(0,0,0,0) 100%)",
              backgroundSize: "160% 160%",
              animation: "pulseSoft 18s ease-in-out infinite",
            }}
          />

          <div className="relative flex h-14 md:h-14 items-center justify-between w-full px-4 md:px-5">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logoSrc}
                alt="Fluenciaga Publishing"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
                priority
              />
              <span className="text-sm md:text-base tracking-[0.20em] uppercase">
                <span className="font-extrabold">FLUENCIAGA</span>{" "}
                <span className="font-medium opacity-90">PUBLISHING</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV.map((n) => (
                <Link
                  key={n.href + n.label}
                  href={n.href}
                  className="text-sm text-white/85 hover:text-[color:var(--fluenciaga-accent)] transition-colors"
                >
                  {n.label}
                </Link>
              ))}

              {/* Sleek gradient ring CTA */}
              <div className="rounded-full p-[2px] bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 transition-shadow hover:drop-shadow-[0_0_14px_rgba(201,168,76,.45)]">
                <Link
                  href="/publications"
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-[#070f07] text-white hover:bg-white/10 focus:outline-none"
                >
                  See Publications
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded p-2 text-white/90"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside
            className="absolute right-3 left-3 top-3 bottom-3 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl"
            role="dialog"
            aria-modal="true"
            style={{ backgroundColor: "#070f07" }}
          >
            <div className="relative h-full">
              <div
                className="absolute inset-y-0 right-0 w-[70%]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(120,90,20,0.22) 0%, rgba(150,110,30,0.26) 50%, rgba(180,140,50,0.28) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to left, black 82%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to left, black 82%, rgba(0,0,0,0) 100%)",
                  backgroundSize: "160% 160%",
                  animation: "pulseSoft 18s ease-in-out infinite",
                }}
              />
              <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Image
                    src={logoSrc}
                    alt="Fluenciaga Publishing"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <span className="tracking-[0.18em] text-sm font-extrabold uppercase">
                    FLUENCIAGA <span className="font-medium opacity-90">PUBLISHING</span>
                  </span>
                </div>
                <button
                  className="rounded p-2 text-white/90"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="relative z-10 flex flex-col gap-2 px-4 py-3">
                {NAV.map((n) => (
                  <Link
                    key={n.href + n.label}
                    href={n.href}
                    className="rounded-lg px-3 py-2 text-base text-white/90 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ))}
                <div className="mt-2 rounded-full p-[2px] bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400">
                  <Link
                    href="/publications"
                    className="inline-flex w-full items-center justify-center rounded-full px-4 py-2 font-semibold bg-[#070f07] text-white hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    See Publications
                  </Link>
                </div>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Content Section */}
      <main className="mt-[60px]">
        {/* Your main content goes here */}
      </main>

      <style>{`
        @keyframes pulseSoft {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
