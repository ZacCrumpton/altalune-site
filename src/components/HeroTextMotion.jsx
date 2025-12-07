import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroTextMotion = ({heroTitle, heroSubtitle}) => {
  const { scrollYProgress } = useScroll();

  // Horizontal scroll motion
  const h1X = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const pX = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  const titleLines = (heroTitle || '').split('\n')
  const subtitleLines = (heroSubtitle || '').split('\n')

  return (
    <div className="text-center mt-4 md:mt-6 px-2">
      <motion.h1
        style={{ x: h1X, fontFamily: "'Courier Prime', monospace" }}
        className="text-lg sm:text-xl md:text-4xl font-bold text-gray-300 leading-snug sm:leading-normal"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        {titleLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </motion.h1>

      <motion.p
        style={{ x: pX, fontFamily: "'Courier Prime', monospace" }}
        className="mt-3 text-xs sm:text-sm md:text-base text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        >
        {subtitleLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < subtitleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
        </motion.p>
    </div>
  );
};

export default HeroTextMotion;