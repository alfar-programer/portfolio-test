import React, { useState, useRef, useEffect } from 'react'
import './Services.css'
import { perks } from '../constants'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Serveces = () => {
  // For the light effect
  const [mousePos, setMousePos] = useState({});
  // For GSAP animation
  const cardsRef = useRef([]);

  // GSAP reveal animation
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { 
            opacity: 0,
             y: 300,
             x:200,
             zIndex:10,
             duration:10,
             ease:'power2.out',
            
        },

        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 60%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    });
  }, []);

  // Light effect handlers
  const handleMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos(pos => ({
      ...pos,
      [idx]: { x, y }
    }));
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseLeave = (e, idx) => {
    setMousePos(pos => ({
      ...pos,
      [idx]: { x: 50, y: 50 }
    }));
    e.currentTarget.style.setProperty('--mouse-x', `50%`);
    e.currentTarget.style.setProperty('--mouse-y', `50%`);
  };

  return (
    <section id="Services" className="services-section ">
      <div className="container xl:w-[80%] w-[90%] mx-auto align-middle justify-center flex">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center text-6xl font-bold uppercase tracking-tight text-[var(--main-color)] font-[Space Grotesk]">Services</h1>
          </div>
          <div className="relative z-10 mt-10 align-middle justify-center flex flex-col gap-4">
            <div className="cards-serveces relative align-middle justify-center flex flex-col gap-4 xl:space-y-32 space-y-10">
              {perks.map((perk, idx) => (
                <div
                  className="card-serveces-all sticky top-[50vh] xl:space-y-7 space-y-4 align-middle justify-center flex flex-col gap-4"
                  key={perk.num}
                  ref={el => (cardsRef.current[idx] = el)}
                  onMouseMove={e => handleMouseMove(e, idx)}
                  onMouseLeave={e => handleMouseLeave(e, idx)}
                  style={{
                    '--mouse-x': mousePos[idx]?.x ? `${mousePos[idx].x}%` : '50%',
                    '--mouse-y': mousePos[idx]?.y ? `${mousePos[idx].y}%` : '50%',
                  }}
                >
                  <div className="card-serveces-num xl:text-1xl text-1xl text-center text-white-50">
                    <p>{perk.num}</p>
                  </div>
                  <div className="card-serveces-title text-center text-white-50 text-5xl font-serif leading-tight uppercase tracking-tight font-[Space Grotesk]">
                    <p>{perk.title}</p>
                  </div>
                  <div className="card-serveces-img text-center text-white-50 align-middle justify-center flex">
                    <img src={perk.img} alt={perk.title} className="object-cover" />
                  </div>
                  <div className="card-serveces-desc text-center text-white-50 text-2xl font-serif leading-tight uppercase tracking-tight font-[Space Grotesk]">
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Serveces