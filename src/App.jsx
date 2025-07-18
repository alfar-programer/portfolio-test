import Hero from "./sections/Hero";
import AnimatedCanvas from "./components/AnimationCanvas";
import ParticleBackground from "./components/ParticleBackground";
import Projects from "./sections/Projects";
import Navbar from "./sections/Navbar";
import About from "./sections/About";
import ExperienceSection from "./sections/ExperienceSection";
import Reviews from "./sections/Reviews";

function App() {
  return (
    <>
      <ParticleBackground />
      <AnimatedCanvas />
      <Navbar />
      <Hero />
      <About />
      <ExperienceSection />
      <Projects />
      <Reviews />
    </>
  );
}

export default App;
