import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import epCover from "/images/FrontArt.png";
import { client, urlFor } from "../sanityClient";

export default function EPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Default values (fallbacks if Sanity fields are empty)
  const [spotlightTitle, setSpotlightTitle] = useState("This Is Where It Starts");
  const [epDescription, setSpotlightDescription] = useState(
    "When the Days Feel Long and Endless is five songs about the weight we carry when closure never comes.\nHome-recorded. Honest. Unapologetically Altalune."
  );
  const [spotlightButtonLabel, setSpotlightButtonLabel] = useState("Pre-Save Now");
  const [spotlightButtonUrl, setSpotlightButtonUrl] = useState(
    "http://url2734.distrokid.com/ls/click?upn=u001.a0grtTtFNGObbwv02PitCPUodymsTWKXNsD1pT7nhD1voSYVUOQoV0d16O8EPS8o5UAdB4JupzssDkuPR5CAEeaCrTismy07locxqCo7fPfBiqRCAIPFRIROs7BWFo1ZI7IjvScIeoEiids76UXMDWwnrThp9u6jbJbyT0cIIeRTJerbpybbjDYGjjwxTpLu9-2BGIxd4p932deIGPYr4d-2FA-3D-3DA_HA_S9x-2F4WrkvVmOfBvwqdpjL4pxA3lq58-2Feyios8DtZqZ7juhaKHAoceONif-2Fxh6hQq-2Bv0AYduDeRH8Tfn7xQLOTXYa-2Fl3xlpS0Uocts5oROj2xz9I5LYkkX5yU6XqeF1rQaMgSa3wlWOTO8nv2e9DQKIuywS6e12YdroWCo92kmhaZfouVpMK7z1pCmUoKQUBInHZtVSDnBpue2OrivuwbUQ-3D-3D"
  );
  const [spotlightImageUrl, setSpotlightImageUrl] = useState(epCover);

  // GROQ: same document type as the hero section
  const HOME_SETTINGS_QUERY = `
    *[_type == "heroHomePageSettings"][0]{
      spotlightTitle,
      spotlightDescription,
      spotlightButtonLabel,
      spotlightButtonUrl,
      spotlightImage
    }
  `;

  useEffect(() => {
    client
      .fetch(HOME_SETTINGS_QUERY)
      .then((data) => {
        console.log("Sanity heroHomePageSettings for EP:", data);
        if (!data) return;

        if (data.spotlightTitle) setSpotlightTitle(data.spotlightTitle);
        if (data.spotlightDescription) setSpotlightDescription(data.spotlightDescription);
        if (data.spotlightButtonLabel) setSpotlightButtonLabel(data.spotlightButtonLabel);
        if (data.spotlightButtonUrl) setSpotlightButtonUrl(data.spotlightButtonUrl);

        if (data.epImage) {
          const url = urlFor(data.spotlightImage).width(900).quality(80).url();
          setSpotlightImageUrl(url);
        }
      })
      .catch((err) => {
        console.error("Error fetching heroHomePageSettings for EP:", err);
      });
  }, []);

  // Support line breaks from Sanity (Enter → new line)
  const descriptionLines = (epDescription || "").split("\n");

  return (
    <section ref={ref} className="w-full bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* EP Cover */}
        <motion.img
          src={spotlightImageUrl}
          alt="EP Cover"
          className="w-full max-w-sm rounded-lg shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          loading="lazy"
          decoding="async"
        />

        {/* EP Text Content */}
        <motion.div
          className="text-white text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold mb-4">{spotlightTitle}</h2>

          <p className="text-lg text-gray-300 mb-6">
            {descriptionLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < descriptionLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

          {spotlightButtonUrl && (
            <a
              href={spotlightButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-altalune-orange text-black px-6 py-3 rounded-full font-semibold hover:bg-white transition"
            >
              {spotlightButtonLabel}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
