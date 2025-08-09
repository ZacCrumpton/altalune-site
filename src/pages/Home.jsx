import React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import release from '../components/LatestReleases';
import Hero from '../components/Hero';
import LatestRelease from '../components/LatestReleases';
import EPSection from '../components/EPSection';
import AboutSection from '../components/AboutSection';


const Home = () => {
  return (
    <div className="bg-altalune-black text-white flex flex-col items-center justify-center px-4 text-center overflow-x-hidden">
      
      <Hero />
      <EPSection />
       
      <AboutSection />
    


      
    </div>
  )
}

export default Home