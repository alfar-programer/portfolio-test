import React, { useEffect, useState } from 'react'
import { navLinks } from '../constants'

const Navbar = () => {
  const [scrolled, setScrolled]= useState(false);

  useEffect(()=> {
    const handelScroll = ()=>{
      const isScrolled =window.scrolledY >10 ;
      setScrolled(true)
    }
    window.addEventListener('scroll', handelScroll);
    return () => window.removeEventListener('scroll', handelScroll) 
  })
  return (
     // bg 1d1c22 56% drop shadow #0c253E 8% $264462 6%
    <header className={`navbar ${scrolled ? 'scrolled':
      'not-scrolled'
    }`}>
      <div className='inner'> 
      <a href="#hero" className='logo'>
        Mazen | EF
      </a>
      <nav className='desktop'>
        <ul>
          {navLinks.map(({ link , name})=>(
            <li key={name} className='group cursor-pointer'>
              <a href={link}></a>
              <span>{name}</span>
              <span className='underline'/>
            </li>
          ))}
        </ul>
      </nav>
      <a href="#contact" className='contact-btn group '>
        <div className='inner'>
          <span>Contact me</span>
        </div>
      </a>

      </div>
    </header>

  )
}

export default Navbar;