"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  Clock,
  Award,
  Mail,
  Phone,
  ArrowRight,
  Menu,
  X,
  Loader2,
} from "lucide-react";

const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e8c97a";

export default function GuaranteePolicyPage() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080f08] flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border-4 border-yellow-800/40 rounded-full animate-spin" />
              <div
                className="absolute inset-4 border-4 border-yellow-600/60 rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "2s" }}
              />
              <div className="absolute inset-8 bg-yellow-800/30 rounded-full flex items-center justify-center animate-pulse border border-yellow-600/50">
                <Shield className="w-10 h-10 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4" style={{ color: GOLD }}>
              Fluenciaga Publishing
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: GOLD }} />
              <span className="text-xl text-gray-300">Loading Guarantee Policy…</span>
            </div>
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto mt-6 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                  animation: "loadBar 2.5s ease-in-out forwards",
                }}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes loadBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080f08] text-white">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "#0d1a0d", borderColor: "rgba(201,168,76,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Fluenciaga Publishing" width={40} height={40} className="object-contain" />
            <span className="text-xl font-extrabold tracking-wider uppercase" style={{ color: GOLD }}>
              FLUENCIAGA <span className="font-medium opacity-90 text-white">PUBLISHING</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-200 hover:text-yellow-400 transition-colors">Home</Link>
            <Link href="/#contact" className="text-gray-200 hover:text-yellow-400 transition-colors">Services</Link>
            <Link
              href="/#contact"
              className="text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              style={{ background: GOLD }}
            >
              Contact
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded text-yellow-400 hover:text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-7 w-7" />
          </button>

          {menuOpen && (
            <div className="md:hidden fixed inset-0 bg-[#080f08]/95 z-[99] flex flex-col items-center pt-20">
              <button
                className="absolute right-6 top-6 p-2 text-yellow-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-8 w-8" />
              </button>
              <nav className="flex flex-col space-y-6 w-full items-center">
                <Link href="/" className="text-xl text-white hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link href="/#contact" className="text-xl text-white hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Services</Link>
                <Link
                  href="/#contact"
                  className="text-xl text-white py-3 px-6 rounded-lg font-semibold"
                  style={{ background: GOLD }}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #080f08 0%, #1a1200 50%, #080f08 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 border"
            style={{ background: "rgba(201,168,76,0.12)", borderColor: "rgba(201,168,76,0.35)" }}
          >
            <Shield className="w-10 h-10" style={{ color: GOLD }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Money Back{" "}
            <span style={{ color: GOLD }}>Guarantee</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our commitment to delivering results — or your money back. Read our comprehensive guarantee policy below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#080f08]">
        <div className="max-w-4xl mx-auto px-6">
          {/* Overview */}
          <div
            className="rounded-2xl p-8 mb-12 border"
            style={{
              background: "rgba(201,168,76,0.06)",
              borderColor: "rgba(201,168,76,0.25)",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Award className="w-8 h-8 mr-3" style={{ color: GOLD }} />
              Our Guarantee Promise
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              At Fluenciaga Publishing, we stand behind our work with a comprehensive money-back guarantee. If we
              fail to deliver the media coverage and publications as outlined in your service agreement, we will
              provide a full refund of your investment.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: CheckCircle, label: "100% Coverage", sub: "Full delivery or full refund" },
                { icon: Clock, label: "No Time Limits", sub: "We work until results are achieved" },
                { icon: Shield, label: "Risk-Free", sub: "Your investment is protected" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-3" style={{ color: GOLD }} />
                  <h3 className="font-bold text-white mb-2">{label}</h3>
                  <p className="text-gray-400 text-sm">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Terms */}
          <div
            className="rounded-xl p-8 mb-8 border"
            style={{ background: "#0d1a0d", borderColor: "rgba(201,168,76,0.15)" }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Guarantee Terms &amp; Conditions</h2>

            {[
              {
                title: "1. Coverage Guarantee",
                body: "We guarantee that your news story or press release will be published on the tier-1 publications specified in your service agreement. These include but are not limited to Forbes, Business Insider, Entrepreneur, Associated Press, and other high-authority media outlets as agreed upon.",
              },
              {
                title: "2. Delivery Timeframe",
                body: "Most placements are secured within 48–72 hours of campaign initiation. For complex stories or specialised industries, delivery may take up to 7 business days. We will keep you informed throughout the entire process with regular updates.",
              },
              {
                title: "3. Refund Process",
                body: "If we fail to secure the agreed-upon media coverage within the specified timeframe, you are eligible for a 100% refund of your investment. Simply contact our support team and we will process your refund within 5–7 business days.",
              },
              {
                title: "4. Quality Standards",
                body: "All published content must meet the editorial standards of the respective publications and include your brand mention, key messaging, and any agreed-upon backlinks. We ensure that all coverage aligns with your brand guidelines and campaign objectives.",
              },
              {
                title: "5. Exclusions",
                body: "This guarantee applies to legitimate businesses and newsworthy content. We reserve the right to decline service for content that violates publication guidelines, contains false information, or promotes illegal activities. Adult content, gambling, and cryptocurrency promotions may be subject to additional restrictions.",
              },
              {
                title: "6. Client Responsibilities",
                body: "Clients must provide accurate information, respond to requests for additional details within 24 hours, and approve final content before publication. Delays caused by client non-responsiveness may extend the delivery timeframe but do not void the guarantee.",
              },
              {
                title: "7. Contact Information",
                body: "For any questions about our guarantee policy or to initiate a refund request, please contact our support team at accounts@fluenciaga.com or call +1 (571) 571-6020. We are available Monday through Friday, 9 AM to 6 PM EST.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: GOLD }}>
                  {title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started Risk-Free?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Join over 1,200 brands who trust our guaranteed media placement service.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center text-white px-8 py-4 rounded-lg text-lg font-semibold transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, color: "#1a1200" }}
            >
              Start Your Campaign Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0d1a0d 0%, #1a1200 50%, #0d1a0d 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-400">Have questions about our guarantee? We&apos;re here to help.</p>
          </div>

          <div
            className="backdrop-blur-sm rounded-2xl p-8 border"
            style={{ background: "rgba(13,26,13,0.7)", borderColor: "rgba(201,168,76,0.2)" }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["First Name", "Last Name"].map((lbl) => (
                  <div key={lbl}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{lbl}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/40 border border-yellow-900/40 rounded-lg text-white placeholder-gray-500 focus:border-yellow-600 focus:outline-none transition-colors"
                      placeholder={lbl === "First Name" ? "John" : "Doe"}
                    />
                  </div>
                ))}
              </div>
              {[
                { lbl: "Email Address", type: "email", ph: "john@example.com" },
                { lbl: "Phone Number", type: "tel", ph: "+1 (555) 123-4567" },
                { lbl: "Company Name", type: "text", ph: "Your Company" },
              ].map(({ lbl, type, ph }) => (
                <div key={lbl}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{lbl}</label>
                  <input
                    type={type}
                    className="w-full px-4 py-3 bg-black/40 border border-yellow-900/40 rounded-lg text-white placeholder-gray-500 focus:border-yellow-600 focus:outline-none transition-colors"
                    placeholder={ph}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-yellow-900/40 rounded-lg text-white placeholder-gray-500 focus:border-yellow-600 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your PR needs…"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, color: "#1a1200" }}
              >
                Send Message
                <Mail className="ml-2 w-5 h-5" />
              </button>
            </form>

            <div
              className="mt-8 pt-8 text-center border-t"
              style={{ borderColor: "rgba(201,168,76,0.2)" }}
            >
              <p className="text-gray-400 mb-4">Or reach us directly:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="mailto:accounts@fluenciaga.com"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ color: GOLD }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  accounts@fluenciaga.com
                </a>
                <a
                  href="tel:+15715716020"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ color: GOLD }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +1 (571) 571-6020
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="py-6 text-center text-sm text-gray-500" style={{ background: "#0d1a0d" }}>
        © {new Date().getFullYear()} Fluenciaga Publishing. All rights reserved.
      </div>
    </div>
  );
}
