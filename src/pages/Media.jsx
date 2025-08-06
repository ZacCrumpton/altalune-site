import React, { useEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import logo from "../assets/logos/Alta_Logo.png";

const Media = () => {
  const widePhotos = [
    { src: "/images/live3.jpg", caption: "Zach // The End // 07.2024" },
    { src: "/images/live6.jpg", caption: "Atalune in Motion // 07.2024" },
    { src: "/images/live7.jpg", caption: "crowd blur" },
    { src: "/images/live9.jpg", caption: "burned into film" },
    { src: "/images/live10.jpg", caption: "light fractures" },
  ];

  const tallPhotos = [
    { src: "/images/live1.jpg", caption: "Zac // The Basement // 07.2024" },
    { src: "/images/live2.jpg", caption: "Connor // The Basement // 07.2024" },
    { src: "/images/live4.jpg", caption: "Aaron // The End // 07.2024" },
    { src: "/images/live5.jpg", caption: "// end of set chaos" },
    { src: "/images/live8.jpg", caption: "hands raised / sound breaks" },
    { src: "/images/live11.jpg", caption: "feedback + fury" },
    { src: "/images/live12.jpg", caption: "swept away in noise" },
    { src: "/images/live13.jpg", caption: "swept away in noise" },
    { src: "/images/live14.jpg", caption: "swept away in noise" },
  ];

  const waveRef = useRef(null);

  useEffect(() => {
    let scale = 2.5;
    const animate = () => {
      if (waveRef.current) {
        scale += 0.01;
        waveRef.current.style.transform = `scale(${scale})`;
        if (scale > 6) scale = 2.5;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-0 py-0">
      {/* Header Section */}
      <div className="relative w-full h-fit md:h-[60vh] mb-24 flex flex-col md:flex-row justify-between items-center px-6 gap-6 overflow-hidden">
        <div
          ref={waveRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-radial-gradient(circle, #FF4A1C 0px, #FF4A1C 1px, transparent 1px, transparent 20px)`,
            opacity: 0.28,
            transform: 'scale(2.5)',
            width: '100%',
            height: '100%',
            transition: 'transform 0.2s ease-out'
          }}
        ></div>

        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.03] bg-[url('/images/noise.png')] bg-repeat"></div>

        <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4 z-10 py-8">
          <img
            src={logo}
            alt="Altalune Logo"
            className="w-[250px] sm:w-[200px] md:w-[500px] h-auto"
          />
          <p className="font-typewriter text-xs sm:text-sm uppercase tracking-wider text-white/80 max-w-xs">
            Captured June 2025 at Vinyl Lounge <span className="text-altalune-orange inline-block transform -skew-x-6">//</span> A short glimpse into the heart of our set — grain, haze, and motion.
          </p>
        </div>

        <div className="w-full md:w-2/3 h-[30vh] sm:h-[40vh] md:h-full relative z-10">
          <div
            className="relative w-full h-full overflow-hidden z-10 border border-white rounded-sm after:content-[''] after:absolute after:inset-0 after:z-20 after:pointer-events-none after:animate-glitch"
            style={{
              boxShadow: '12px 12px 0 #FF4A1C, -6px -6px 0 #1a1a1a',
            }}
          >
            <video
              src="/videos/liveclip.mp4"
              className="w-full h-full object-cover object-[75%_45%]"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="w-full flex justify-center pb-12">
        <div className="text-altalune-orange text-2xl animate-pulse">↓</div>
      </div>

      {/* Media Grid */}
      <div className="bg-black">
        {tallPhotos.reduce((acc, photo, i) => {
          if (i % 3 === 0) acc.push([]);
          acc[acc.length - 1].push(photo);
          return acc;
        }, []).map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="flex flex-wrap justify-center">
              {row.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full sm:w-1/2 md:w-1/3 h-[60vh] sm:h-[70vh] md:h-[80vh] relative overflow-hidden"
                >
                  <div className="w-full h-full">
                    <Parallax speed={(rowIndex + i) % 2 === 0 ? -3 : 3}>
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="block w-full h-full object-cover"
                      />
                    </Parallax>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-[2px] font-typewriter text-white text-[10px] sm:text-xs uppercase tracking-wider border border-white">
                    {item.caption}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Wide photo after each row */}
            {widePhotos[rowIndex] && (
              <motion.div
                key={`wide-${rowIndex}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="w-full relative aspect-video overflow-hidden md:h-[80vh] md:aspect-auto"
              >
                <div className="w-full h-full">
                  <Parallax speed={rowIndex % 2 === 0 ? -5 : 5}>
                    <img
                      src={widePhotos[rowIndex].src}
                      alt={widePhotos[rowIndex].caption}
                      className="block w-full h-full object-cover"
                    />
                  </Parallax>
                </div>
                <div className="absolute top-2 left-2 bg-black/80 px-2 py-[2px] font-typewriter text-white text-[10px] sm:text-xs uppercase tracking-wider border border-white">
                  {widePhotos[rowIndex].caption}
                </div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Media;
