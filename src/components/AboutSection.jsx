import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import bandPic from "../../public/images/band2.webp";
import { client, urlFor } from "../sanityClient";

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Background motion
  const bgX = useMotionValue("20%");
  useAnimationFrame((t) => {
    if (isMobile) {
      const oscillation = Math.sin(t / 5000) * 20 + 40;
      bgX.set(`${oscillation}%`);
    }
  });

  // --- NEW: Sanity-driven state ---
  const [aboutImageUrl, setAboutImageUrl] = useState(bandPic);
  const [aboutTitle, setAboutTitle] = useState("Emotional Noise");
  const [aboutDescription, setAboutDescription] = useState(
    "We’re Altalune from Nashville, TN. We make loud, emotional music that lives somewhere between emo, post-hardcore and whatever else we feel like."
  );

  const ABOUT_QUERY = `
    *[_type == "heroHomePageSettings"][0]{
      aboutImage,
      aboutTitle,
      aboutDescription
    }
  `;

  useEffect(() => {
    client
      .fetch(ABOUT_QUERY)
      .then((data) => {
        console.log("Sanity About Section:", data);
        if (!data) return;

        if (data.aboutTitle) setAboutTitle(data.aboutTitle);
        if (data.aboutDescription) setAboutDescription(data.aboutDescription);

        if (data.aboutImage) {
          const url = urlFor(data.aboutImage)
            .width(1800)
            .quality(80)
            .url();
          setAboutImageUrl(url);
        }
      })
      .catch((err) => console.error("Error fetching about section:", err));
  }, []);

  // Process line breaks for description
  const descriptionLines = (aboutDescription || "").split("\n");

  return (
    <section ref={ref} className="relative w-full h-[600px] overflow-hidden">

      {isMobile ? (
        <motion.div
          style={{
            backgroundImage: `url(${aboutImageUrl})`,
            backgroundPositionX: bgX,
            backgroundPositionY: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute inset-0 w-full h-full filter grayscale z-0"
        />
      ) : (
        <motion.img
          src={aboutImageUrl}
          alt="About Section"
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover filter grayscale object-top z-0"
        />
      )}

      <div className="relative z-10 h-full flex items-start justify-center">
        <div className="mt-10 bg-black/60 text-white p-6 rounded-md w-[90%] max-w-md text-center mx-auto">
          <h2 className="text-3xl font-semibold mb-4">{aboutTitle}</h2>

          <p className="text-sm leading-relaxed">
            {descriptionLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < descriptionLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
