import React, { useEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import logo from "../assets/logos/Alta_Logo.webp";
import { client, urlFor } from "../sanityClient";

const MEDIA_QUERY = `
*[_type == "mediaPageSettings"][0]{
  headerVideo{
    asset->{
      url
    }
  },
  headerVideoCaption,
  images[]{
    caption,
    image{
      ...,
      asset->{
        _id,
        metadata{
          dimensions{
            aspectRatio
          }
        }
      }
    }
  }
}
`;


const Media = () => {
  const [images, setImages] = useState([]);
  const waveRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("/videos/liveclip.mp4"); // fallback to your current static file
  const [videoCaption, setVideoCaption] = useState("");


  // Fetch media images from Sanity
useEffect(() => {
  client
    .fetch(MEDIA_QUERY)
    .then((data) => {
      if (data?.images) {
        setImages(data.images);
      } else {
        setImages([]);
      }

      if (data?.headerVideo?.asset?.url) {
        setVideoUrl(data.headerVideo.asset.url);
      }

      if (data?.headerVideoCaption) {
        setVideoCaption(data.headerVideoCaption);
      }
    })
    .catch((err) => {
      console.error("Error fetching mediaPageSettings:", err);
    });
}, []);


  // Animated background
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

  // Build rows: wide photos get their own row, others go in rows of up to 3
  const rows = React.useMemo(() => {
    const result = [];
    let currentRow = [];

    images.forEach((item) => {
      const aspect =
        item?.image?.asset?.metadata?.dimensions?.aspectRatio ?? 1;
      const isWide = aspect >= 1.3; // tweak threshold as needed

      if (isWide) {
        // Flush any currently building grid row
        if (currentRow.length > 0) {
          result.push({ type: "grid", items: [...currentRow] });
          currentRow = [];
        }
        // Add this as a full-width row
        result.push({ type: "wide", item });
      } else {
        currentRow.push(item);
        if (currentRow.length === 3) {
          result.push({ type: "grid", items: [...currentRow] });
          currentRow = [];
        }
      }
    });

    if (currentRow.length > 0) {
      result.push({ type: "grid", items: [...currentRow] });
    }

    return result;
  }, [images]);

  return (
    <div className="min-h-screen bg-black text-white px-0 py-0">
      {/* Header Section (unchanged) */}
      <div className="relative w-full h-fit md:h-[60vh] mb-24 flex flex-col md:flex-row justify-between items-center px-6 gap-6 overflow-hidden">
        <div
          ref={waveRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-radial-gradient(circle, #FF4A1C 0px, #FF4A1C 1px, transparent 1px, transparent 20px)`,
            opacity: 0.28,
            transform: "scale(2.5)",
            width: "100%",
            height: "100%",
            transition: "transform 0.2s ease-out",
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
            Captured June 2025 at Vinyl Lounge{" "}
            <span className="text-altalune-orange inline-block transform -skew-x-6">
              //
            </span>{" "}
            A short glimpse into the heart of our set — grain, haze, and motion.
          </p>
        </div>

        <div className="w-full md:w-2/3 h-[30vh] sm:h-[40vh] md:h-full relative z-10">
          <div
            className="relative w-full h-full overflow-hidden z-10 border border-white rounded-sm after:content-[''] after:absolute after:inset-0 after:z-20 after:pointer-events-none after:animate-glitch"
            style={{
              boxShadow: "12px 12px 0 #FF4A1C, -6px -6px 0 #1a1a1a",
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

      {/* Media Grid from Sanity */}
      <div className="bg-black">
        {rows.map((row, rowIndex) => {
          if (row.type === "grid") {
            return (
              <div
                key={`grid-${rowIndex}`}
                className="flex flex-wrap justify-center"
              >
                {row.items.map((item, i) => (
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
                          src={urlFor(item.image)
                            .width(1400)
                            .auto("format")
                            .quality(80)
                            .url()}
                          alt={item.caption || "Altalune live"}
                          className="block w-full h-full object-cover"
                        />
                      </Parallax>
                    </div>
                    {item.caption && (
                      <div className="absolute top-2 left-2 bg-black/80 px-2 py-[2px] font-typewriter text-white text-[10px] sm:text-xs uppercase tracking-wider border border-white">
                        {item.caption}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            );
          }

          // wide row
          if (row.type === "wide") {
            const item = row.item;
            return (
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
                      src={urlFor(item.image)
                        .width(1920)
                        .auto("format")
                        .quality(80)
                        .url()}
                      alt={item.caption || "Altalune live wide"}
                      className="block w-full h-full object-cover"
                    />
                  </Parallax>
                </div>
                {item.caption && (
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-[2px] font-typewriter text-white text-[10px] sm:text-xs uppercase tracking-wider border border-white">
                    {item.caption}
                  </div>
                )}
              </motion.div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Media;
