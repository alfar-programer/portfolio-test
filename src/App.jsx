import Hero from "./sections/Hero";
import AnimatedCanvas from "./components/AnimationCanvas";
import ParticleBackground from "./components/ParticleBackground";
import Projects from "./sections/Projects";
import Navbar from "./sections/Navbar";
import About from "./sections/About";
import ExperienceSection from "./sections/ExperienceSection";
import Reviews from "./sections/Reviews";
import Contact from "./sections/Contact";
import Serveces from "./sections/Serveces";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <ParticleBackground />
      <AnimatedCanvas />
      <Navbar />
      <Hero />
      <About />
      <Serveces />
      <ExperienceSection />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
