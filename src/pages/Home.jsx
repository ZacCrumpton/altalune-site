import React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import release from '../components/LatestReleases';
import Hero from '../components/Hero';
import LatestRelease from '../components/LatestReleases';
import EPSection from '../components/EPSection';
import AboutSection from '../components/AboutSection';
import EmailSignupModal from '../components/EmailSignupModal.jsx';

const Home = () => {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbz1kgrPKfpukDAOSBQmFD1fg0LcFIEYrmXogFMOxnCrcIM6-pFcdAltTPL5tGYr1U8sdQ/exec"
  return (
    <div className="bg-altalune-black text-white flex flex-col items-center justify-center px-4 text-center overflow-x-hidden">
      
      <Hero />
      <EPSection />  
      <AboutSection />
    
    {/* Mailing list modal (pops in after 1.5s; remembers dismiss for 7 days */}
    <EmailSignupModal gasUrl={GAS_URL} />
      
    </div>
  )
}

export default Home