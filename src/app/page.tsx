import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustTicker from "@/components/TrustTicker";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Packages from "@/components/Packages";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <TrustTicker />
      <About />
      <MenuSection />
      <Packages />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
