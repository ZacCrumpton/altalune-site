import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import bandPhotoDesktop from "../../public/images/band1.webp";
import bandPhotoMobile from "../../public/images/band1-mobile.webp"; // swap to .avif if you like
import logo from "../assets/logos/Alta_Logo.png";
import noise from "../../public/images/noise.webp";
import HeroTextMotion from "./HeroTextMotion";

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textScroll = useScroll({
    target: textRef,
    offset: ["start center", "end start"],
  });

  // Slightly gentler parallax on mobile
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "6%"] : ["0%", "20%"]
  );

  const rawLogoScale = useTransform(scrollYProgress, [0.15, 0.5], [1, 0.85]);
  const logoScale = useSpring(rawLogoScale, { stiffness: 100, damping: 20 });
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.5]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden text-white bg-altalune-black
                 h-[calc(100svh-64px)] md:h-screen"
    >
      {/* MOBILE: show full portrait, no crop, no parallax */}
      <img
        src={bandPhotoMobile}
        alt="Altalune (mobile)"
        className="h-full w-auto max-w-full object-contain object-top"
      />

      {/* DESKTOP: parallax hero, unchanged behavior */}
      <motion.img
        src={bandPhotoDesktop}
        alt="Altalune (desktop)"
        className="hidden md:block absolute inset-0 h-full w-full object-cover object-center"
        style={{ y: bgY }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${noise})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none
                       bg-gradient-to-b from-black/30 md: from-black/60 to-black/90" />

      {/* Foreground Content */}
      <div
        ref={textRef}
        className="absolute z-10 top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-4 text-center"
      >
        <motion.img
          src={logo}
          alt="Altalune Logo"
          className="w-32 sm:w-40 md:w-80 mb-2 md:mb-0 will-change-transform"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          style={{ scale: logoScale, opacity: logoOpacity }}
        />
        <HeroTextMotion scrollProgress={textScroll.scrollYProgress} />
      </div>
    </section>
  );
}
