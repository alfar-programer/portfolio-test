import React from 'react'
import { words } from '../constants'
import Button from '../components/Button'
import HeroExperienxe from '../components/HeroModels/HeroExperienxe'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedCounter from '../components/AnimatedCounter'
import { WavyLine } from '../components/WavyLine'


const Hero = () => {
  useGSAP(() =>{
    gsap.fromTo('.hero-text h1',
      {
        y:50,
        opacity:0
      }
      ,{
        y:0,
        opacity:1,
        stagger:.4,
        duration:1,
        ease:'power2.inOut'
      }
    )
  } )
  return (
    <section id='hero' className='relative overflow-hidden'  >
      <div className='absolute top-0 left-0 z-10 w-150 h-50 bg-transparent' >
        <img src='/images/bg.png' alt="background" />
      </div> 
      <div className=' hero-layout'>
        {/* left: Hero content */}

        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I’m Mazen, a developer from Egypt with a passion for
              code.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="project"
            />
          </div>
        </header>

        {/* Right: 3D Hero content */}

              <figure>
                <div className='hero-3d-layout'>
                  <HeroExperienxe/>
                 </div>
                </figure>    

      </div>


      <WavyLine className="mt-1 mb-10" />
               
      <AnimatedCounter />
    </section>
  )}
export default Hero
