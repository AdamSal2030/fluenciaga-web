"use client";
import { useState, useEffect } from "react";
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


export default function GuaranteePolicyPage() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Cool Loading Animation
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          {/* Animated Logo */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-purple-900/30 rounded-full animate-spin"></div>
              {/* Inner rotating ring */}
              <div className="absolute inset-4 border-4 border-purple-600/50 rounded-full animate-spin animate-reverse" style={{ animationDuration: '2s' }}></div>
              {/* Logo container */}
              <div className="absolute inset-8 bg-purple-700 rounded-full flex items-center justify-center animate-pulse">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          {/* Loading text with typewriter effect */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4 animate-pulse">Publisive</h2>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              <span className="text-xl text-gray-300">Loading Guarantee Policy...</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto mt-6 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full animate-pulse" 
                   style={{ width: '100%', animation: 'loading 3s ease-in-out forwards' }}>
              </div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-reverse {
            animation-direction: reverse;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black animate-fade-in">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out;
        }
      `}</style>

      {/* Header */}
      <header className="bg-black border-b border-purple-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-700 rounded flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Publisive</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-200 hover:text-purple-400 transition-colors">Home</a>
            <a href="/#services" className="text-gray-200 hover:text-purple-400 transition-colors">Services</a>
            <a href="/#contact" className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors">Contact</a>
          </nav>
          
          <button className="md:hidden p-2 rounded text-purple-400 hover:text-white" onClick={() => setMenuOpen(true)}>
            <Menu className="h-7 w-7" />
          </button>
          
          {menuOpen && (
            <div className="md:hidden fixed inset-0 bg-black/95 z-[99] flex flex-col items-center pt-20">
              <button className="absolute right-6 top-6 p-2 text-purple-400 hover:text-white" onClick={() => setMenuOpen(false)}>
                <X className="h-8 w-8" />
              </button>
              <nav className="flex flex-col space-y-6 w-full items-center">
                <a href="/" className="text-xl text-white hover:text-purple-400" onClick={() => setMenuOpen(false)}>Home</a>
                <a href="/#services" className="text-xl text-white hover:text-purple-400" onClick={() => setMenuOpen(false)}>Services</a>
                <a href="/#contact" className="text-xl text-white bg-purple-700 hover:bg-purple-800 py-3 px-6 rounded-lg" onClick={() => setMenuOpen(false)}>Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-700/20 rounded-full mb-8 border border-purple-600/30">
            <Shield className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Money Back <span className="text-purple-400">Guarantee</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our commitment to delivering results or your money back. Read our comprehensive guarantee policy below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Overview */}
          <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Award className="w-8 h-8 text-purple-400 mr-3" />
              Our Guarantee Promise
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              At Publisive, we stand behind our work with a comprehensive money-back guarantee. If we fail to deliver 
              the media coverage and publications as outlined in your service agreement, we will provide a full refund 
              of your investment.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">100% Coverage</h3>
                <p className="text-gray-400 text-sm">Full delivery or full refund</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">No Time Limits</h3>
                <p className="text-gray-400 text-sm">We work until results are achieved</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Risk-Free</h3>
                <p className="text-gray-400 text-sm">Your investment is protected</p>
              </div>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-black border border-purple-900/20 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Guarantee Terms & Conditions</h2>
              
              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">1. Coverage Guarantee</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We guarantee that your news story or press release will be published on the tier-1 publications 
                specified in your service agreement. These include but are not limited to Forbes, Business Insider, 
                Entrepreneur, Associated Press, and other high-authority media outlets as agreed upon.
              </p>

              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">2. Delivery Timeframe</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Most placements are secured within 48-72 hours of campaign initiation. For complex stories or 
                specialized industries, delivery may take up to 7 business days. We will keep you informed 
                throughout the entire process with regular updates.
              </p>

              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">3. Refund Process</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                If we fail to secure the agreed-upon media coverage within the specified timeframe, you are 
                eligible for a 100% refund of your investment. Simply contact our support team, and we will 
                process your refund within 5-7 business days.
              </p>

              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">4. Quality Standards</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                All published content must meet the editorial standards of the respective publications and 
                include your brand mention, key messaging, and any agreed-upon backlinks. We ensure that 
                all coverage aligns with your brand guidelines and campaign objectives.
              </p>

              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">5. Exclusions</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                This guarantee applies to legitimate businesses and newsworthy content. We reserve the right 
                to decline service for content that violates publication guidelines, contains false information, 
                or promotes illegal activities. Adult content, gambling, and cryptocurrency promotions may be 
                subject to additional restrictions.
              </p>

              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">6. Client Responsibilities</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Clients must provide accurate information, respond to requests for additional details within 
                24 hours, and approve final content before publication. Delays caused by client 
                non-responsiveness may extend the delivery timeframe but do not void the guarantee.
              </p>

              <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">7. Contact Information</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                For any questions about our guarantee policy or to initiate a refund request, please contact 
                our support team at hello@publisive.com or call +1 (888) 999-1234. We are available 
                Monday through Friday, 9 AM to 6 PM EST.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started Risk-Free?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Join over 1,200 brands who trust our guaranteed media placement service.
            </p>
            <a
              href="/#contact"
              className="bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-800 transition-colors inline-flex items-center"
            >
              Start Your Campaign Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 to-black">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-400">
              Have questions about our guarantee? We're here to help.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-900/30">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-900/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-900/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-900/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-900/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-900/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-900/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your PR needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center"
              >
                Send Message
                <Mail className="ml-2 w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-purple-900/30 text-center">
              <p className="text-gray-400 mb-4">Or reach us directly:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="mailto:hello@publisive.com"
                  className="flex items-center justify-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  hello@publisive.com
                </a>
                <a
                  href="tel:+18889991234"
                  className="flex items-center justify-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +1 (888) 999-1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}