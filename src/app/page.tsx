import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Approach from "@/components/Approach";
import HowItWorks from "@/components/Steps";
import BuildBrand from "@/components/BuildBrand";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Approach />
      <HowItWorks />
      <BuildBrand />
      <Process />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}