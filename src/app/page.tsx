import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Customers from "@/components/Customers";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import HomeStructuredData from "@/components/HomeStructuredData";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <HomeStructuredData />
      <div className="scanline" />
      <Particles />
      <Navbar />
      <Hero />
      <Customers />
      <Services />
      <Projects />
      <Pricing />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
