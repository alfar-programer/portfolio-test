import Hero from "./sections/Hero";
import AnimatedCanvas from "./components/AnimationCanvas";
import ParticleBackground from "./components/ParticleBackground";
import Projects from "./sections/Projects";
import Navbar from "./sections/Navbar";
import About from "./sections/About";

function App() {
  return (
    <>
      <ParticleBackground />
      <AnimatedCanvas />
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </>
  );
}

export default App;
