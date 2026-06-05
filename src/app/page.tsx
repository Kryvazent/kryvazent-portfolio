import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Customers from "@/components/Customers";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="scanline" />
      <Particles />
      <Navbar />
      <Hero />
      <Customers />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
