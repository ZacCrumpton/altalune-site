import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import epCover from "../../public/images/FrontArt.png";

export default function EPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* EP Cover */}
        <motion.img
          src={epCover}
          alt="EP Cover"
          className="w-full max-w-sm rounded-lg shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* EP Text Content */}
        <motion.div
          className="text-white text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold mb-4">WDFLE EP Realeasing August 30th</h2>
          <p className="text-lg text-gray-300 mb-6">
            5 track Debut EP
            Home recorded, professionally mixed and mastered by Hilson Studios in Nashville, TN. Showcasing the best songs in our catalog.
          </p>
          <a
            href="https://open.spotify.com/album/yourlink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-altalune-orange text-black px-6 py-3 rounded-full font-semibold hover:bg-white transition"
          >
            Pre-Save Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
