// Cleaned JSX with Tailwind CSS and GSAP Animations
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { perks, skillsImages } from "../constants";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const perksListRef = useRef(null);
  const skillRef = useRef(null);
  const sectionRef = useRef(null);

  // Mouse glow effect for perks
  useEffect(() => {
    const handler = (e) => {
      const cards = document.getElementsByClassName("perks_item");
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    const current = perksListRef.current;
    if (current) current.addEventListener("mousemove", handler);
    return () => current && current.removeEventListener("mousemove", handler);
  }, []);

  // Mousemove effect for skills section
  useEffect(() => {
    const skillSection = sectionRef.current;
    const skill = skillRef.current;
    let isHovering = false;

    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      if (isHovering && skill) {
        skill.style.transform = `translate3d(${-4 - x / 50}%, ${-y / 20}%, 0)`;
      } else if (skill) {
        skill.style.transform = `translate3d(4%, 0%, 0)`;
      }
    };

    skillSection?.addEventListener("mouseover", () => (isHovering = true));
    skillSection?.addEventListener("mouseleave", () => (isHovering = false));
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GSAP animation for perks
  useEffect(() => {
    gsap.fromTo(
      ".perks_item",
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: .5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: perksListRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  

 
  return (
    <section  className="section-padding w-full" id="aboutme">
      <div className="text-center my-40">
        <h1 className="text-5xl sm:text-6xl font-bold uppercase tracking-tight text-[var(--main-color)] font-[Space Grotesk]">
          About me
        </h1>
      </div>

      <div
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_69%)]"
        ref={sectionRef}
      >
        <div className="z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--main-color)] leading-tight max-w-4xl font-[Space Grotesk]">
            <span className="mr-4">Integrate</span>
            <span className="mr-4">your</span>
            <span className="mr-4">website</span>
            <span className="mr-4">with</span>
            <span className="mr-4">powerful</span>
            <span className="mr-4">tools</span>
          </h2>
        </div>

        <div
          ref={skillRef}
          className="absolute flex flex-wrap justify-center items-center gap-16 will-change-transform"
        >
          {skillsImages.map((src, index) => (
            <div
              key={index}
              className="w-20 h-20 md:w-32 md:h-32 rounded-full outline-dashed outline-2 outline-offset-6 outline-gray-300 bg-white opacity-20 hover:opacity-100 transition-all duration-300 shadow-lg flex justify-center items-center cursor-none"
            >
              <img
                src={`media/${src}`}
                alt={src}
                className="w-[70%] max-h-14 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-32">
        <h1 className="title-services text-5xl sm:text-6xl font-bold uppercase tracking-tight text-[var(--main-color)] font-[Space Grotesk]">
          Services
        </h1>
      </div>

      <div className="card card-bordr timeLine-card rounded-xl p-5 relative w-[80%] mx-auto mt-12">
        <div
          ref={perksListRef}
          className="grid grid-cols-1 sm:grid-cols-2 border-2 border-white/20 rounded-lg overflow-hidden"
        >
          {perks.map((perk, index) => (
            <div
              key={index}
              className="perks_item relative flex flex-col items-center text-center bg-white/10 p-24 transition duration-1000 ease-in-out opacity-0 translate-y-[261px] outline outline-1 outline-white/20 "
            >
              <div className="w-28 h-28 mb-6 rounded-full bg-white/10 border-t border-l border-white/50 flex justify-center items-center">
                <img
                  src={perk.img}
                  alt={perk.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-2xl font-medium text-[var(--main-color)] font-[Space Grotesk]">
                {perk.title}
              </h3>
              <p className="mt-2 text-[var(--main-color)] max-w-md">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
