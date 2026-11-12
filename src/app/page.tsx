import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SmallFeatures from "../components/SmallFeatures";
import About from "../components/About";
import Team from "../components/Team";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Projects from "../components/Project";
import Testimonials from "../components/Testimonial";
import Counter from "../components/Counter";
import Clients from "../components/Clients";
import BlogSection from "../components/BlogSection";
import Contact from "../components/Contact";
import Cta from "../components/CTA";
import ScrollToTop from "../components/ScrollToTop";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SmallFeatures />
        <About />
        <Services />
        <Projects />
        <Pricing />
        {/* <Team /> */}
        <Counter />
        <Testimonials />
        <Clients />
        {/* <BlogSection /> */}
        <Contact />
        <Cta />
      </main>
      <Footer />
      <FloatingWhatsApp/>
      <ScrollToTop /> 
    </>
  );
}
