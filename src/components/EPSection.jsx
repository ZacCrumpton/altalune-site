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
          <h2 className="text-4xl font-bold mb-4">Debut EP Realeasing August 29th</h2>
          <p className="text-lg text-gray-300 mb-6">
            'When the Days Feel Long and Endless'<br/>
            is a collection of home recorded songs 
            mixed and masterd by Hilson Studio.<br/>These songs retell moments of unfinished conversations with emotional weight.<br/>
            These are the songs that Altalune lives and breathes.
          </p>
          <a
            href="http://url2734.distrokid.com/ls/click?upn=u001.a0grtTtFNGObbwv02PitCPUodymsTWKXNsD1pT7nhD1voSYVUOQoV0d16O8EPS8o5UAdB4JupzssDkuPR5CAEeaCrTismy07locxqCo7fPfBiqRCAIPFRIROs7BWFo1ZI7IjvScIeoEiids76UXMDWwnrThp9u6jbJbyT0cIIeRTJerbpybbjDYGjjwxTpLu9-2BGIxd4p932deIGPYr4d-2FA-3D-3DA_HA_S9x-2F4WrkvVmOfBvwqdpjL4pxA3lq58-2Feyios8DtZqZ7juhaKHAoceONif-2Fxh6hQq-2Bv0AYduDeRH8Tfn7xQLOTXYa-2Fl3xlpS0Uocts5oROj2xz9I5LYkkX5yU6XqeF1rQaMgSa3wlWOTO8nv2e9DQKIuywS6e12YdroWCo92kmhaZfouVpMK7z1pCmUoKQUBInHZtVSDnBpue2OrivuwbUQ-3D-3D"
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
