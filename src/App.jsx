import Hero from "./sections/Hero";
import AnimatedCanvas from "./components/AnimationCanvas";
import ParticleBackground from "./components/ParticleBackground";


function App() {
  return (
    <>
      <ParticleBackground />
      <AnimatedCanvas />
      <Hero />
    </>
  );
}

export default App;
