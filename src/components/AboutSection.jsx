import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import bandPic from "../../public/images/band2.webp";

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // tighter offset window
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  // Handle mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create oscillation value for backgroundPositionX
  const bgX = useMotionValue("20%");

  useAnimationFrame((t) => {
    if (isMobile) {
      const oscillation = Math.sin(t / 5000) * 20 + 40; // oscillates between 5% and 25%
      bgX.set(`${oscillation}%`);
    }
  });

  return (
    <section ref={ref} className="relative w-full h-[600px] overflow-hidden">
      {isMobile ? (
        // ✅ Mobile: background image with oscillation
        <motion.div
          style={{
            backgroundImage: `url(${bandPic})`,
            backgroundPositionX: bgX,
            backgroundPositionY: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute inset-0 w-full h-full filter grayscale z-0"
        />
      ) : (
        // ✅ Desktop: parallax image
        <motion.img
          src={bandPic}
          alt="Band"
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover filter grayscale object-top z-0"
        />
      )}

      <div className="relative z-10 h-full flex items-start justify-center">
        <div className="mt-10 bg-black/60 text-white p-6 rounded-md w-[90%] max-w-md text-center mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Emotional Noise</h2>
          <p className="text-sm leading-relaxed">
            We’re Altalune from Nashville, TN. We make loud, emotional music that lives
            somewhere between emo, post-hardcore and whatever else we feel like.
            We’ve been DIY from the start, writing our songs, creating our art and shaping our vision, and we bring that same hands-on energy into everything we do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;