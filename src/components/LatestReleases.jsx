import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LatestReleases() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const embedY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="relative w-full bg-zinc-900 py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center text-white">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ y: titleY }}
        >
          Newest Release
        </motion.h2>

        <motion.p
          className="text-lg text-gray-400 mb-8"
          style={{ y: titleY }}
        >
          “Dead Weight” — available now on all platforms.
        </motion.p>

        <motion.div
          style={{ y: embedY }}
          className="flex justify-center"
        >
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/2PTflhdBPUigvt1OSbHLtx?utm_source=generator&theme=0"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="max-w-xl w-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}



