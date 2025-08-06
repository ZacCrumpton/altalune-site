import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Band name or logo */}
        <div className="text-altalune-orange font-bold text-lg tracking-widest">
          Altalune
        </div>

        {/* Navigation links */}
        <nav className="flex space-x-6 text-sm">
          <Link to="/" className="hover:text-altalune-orange transition">Home</Link>
          <Link to="/shows" className="hover:text-altalune-orange transition">Shows</Link>
          <Link to="/media" className="hover:text-altalune-orange transition">Media</Link>
          <Link to="/contact" className="hover:text-altalune-orange transition">Contact</Link>
        </nav>
       
        <div className="flex justify-center gap-6 mt-6 text-xl text-white">
          <a href="https://instagram.com/altalune_band" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://open.spotify.com/artist/3Q0wrbP8LEfuOPMB7ymeNm?si=qiiW-YEORJmyQ1fYBPCBsQ" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-spotify" />
          </a>
          <a href="https://www.youtube.com/channel/UCKOcz7x7TaRqCCKovbWMA_Q" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-youtube" />
          </a>
          <a href="https://music.apple.com/us/artist/altalune/1648604636" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-apple" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Altalune. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
