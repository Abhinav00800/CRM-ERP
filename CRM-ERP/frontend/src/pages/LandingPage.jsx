import React, { useState } from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import Benefits from '../components/Benifit';


const LandingPage = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
  return (
    <div className='min-h-screen bg-white'>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />    
        <Hero/>          
        <Benefits/>
        <Contact/>
    </div>
  )
}

export default LandingPage
