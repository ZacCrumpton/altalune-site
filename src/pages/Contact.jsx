// src/pages/Contact.jsx
import React, { useState } from 'react';
import { FaInstagram, FaSpotify, FaEnvelope } from 'react-icons/fa';
import heroImage from "../../public/images/contact_bg.webp";

// TODO: Replace with YOUR deployed Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1kgrPKfpukDAOSBQmFD1fg0LcFIEYrmXogFMOxnCrcIM6-pFcdAltTPL5tGYr1U8sdQ/exec";

export default function Contact() {
  // Mailing list UI state
  const [mlStatus, setMlStatus] = useState("");
  const [mlLoading, setMlLoading] = useState(false);

  // Mailing List -> Google Apps Script (duplicate-aware)
  const handleMailingListSubmit = async (e) => {
    e.preventDefault();
    setMlStatus("");
    setMlLoading(true);

    // Use currentTarget so we keep a stable form ref
    const formEl = e.currentTarget;
    const email = new FormData(formEl).get("email");

    // Add a safety timeout so the UI never hangs
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000); // 10s

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // avoid CORS errors from Apps Script
        body: new URLSearchParams({ email }),
        signal: controller.signal,
      });

      // In no-cors mode we can't read the response; optimistically show success
      setMlStatus("Thanks for joining!");
      formEl.reset();
    } catch (err) {
      console.error(err);
      setMlStatus("Network error. Please try again.");
    } finally {
      clearTimeout(timer);
      setMlLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] flex flex-col justify-center items-center px-4 sm:px-6 gap-6 overflow-hidden mb-16 text-center">
        <img
          src={heroImage}
          alt="Altalune Band"
          className="absolute inset-0 w-full h-full object-cover opacity-30 object-[center_27%]"
        />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/noise.png')] bg-repeat opacity-[0.04]" />

        <div className="relative z-10 flex flex-col items-center gap-4 pt-24">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-altalune-orange tracking-tight pb-3">
            Get in Touch
          </h1>
          <p className="font-typewriter text-xs sm:text-sm uppercase tracking-wider text-white/80 max-w-xs">
            Reach out about shows, press, or just say hey — we read everything.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form (Formspree) */}
          <section aria-labelledby="contact-form" className="space-y-6 text-sm">
            <h2 id="contact-form" className="text-xl font-semibold font-typewriter text-white mb-4 -rotate-2 tracking-widest">
              Contact Us
            </h2>
            <form
              action="https://formspree.io/f/xanbpvjl"
              method="POST"
              className="space-y-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-4 bg-neutral-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-altalune-orange"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-4 bg-neutral-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-altalune-orange"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full p-4 h-40 bg-neutral-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-altalune-orange"
              />
              <button
                type="submit"
                className="bg-altalune-orange px-6 py-3 font-semibold text-black hover:bg-orange-600 transition"
              >
                Send Message
              </button>
            </form>
          </section>

          {/* Mailing List Signup (Apps Script) */}
          <section aria-labelledby="mailing-list" className="space-y-6 text-sm">
            <h2 id="mailing-list" className="text-xl font-semibold font-typewriter text-white mb-4 -rotate-2 tracking-widest">
              Join the Mailing List
            </h2>
            <p className="text-gray-400">
              Get updates on new music, shows, and exclusive drops. No spam — we promise.
            </p>

            <form onSubmit={handleMailingListSubmit} className="space-y-4 max-w-sm">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 bg-neutral-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-altalune-orange"
              />
              <button
                type="submit"
                disabled={mlLoading}
                className="bg-altalune-orange px-4 py-2 font-semibold text-black hover:bg-orange-600 transition disabled:opacity-60"
              >
                {mlLoading ? 'Submitting…' : 'Sign Up'}
              </button>
              {mlStatus && (
                <p className="text-xs text-white/80" aria-live="polite">{mlStatus}</p>
              )}
            </form>
          </section>
        </div>

        {/* Social Links */}
        <div className="mt-20 flex justify-center space-x-6 text-2xl">
          <a
            href="https://instagram.com/altalune_band"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-altalune-orange transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-altalune-orange transition"
          >
            <FaSpotify />
          </a>
          <a
            href="mailto:altalunemusic22@gmail.com"
            className="hover:text-altalune-orange transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}
