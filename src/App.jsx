import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Shows from './pages/Shows';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <nav className="sticky top-0 z-50 bg-black text-white hover:drop-shadow-[0_0_6px_#ff7b00] transition duration-200 p-4 flex justify-between items-center text-lg">
        {/* Left: Nav links */}
        <div className="flex gap-6 flex-1">
          <Link className='hover:text-altalune-orange' to="/">Home</Link>
          <Link className='hover:text-altalune-orange' to="/shows">Shows</Link>
          <Link className='hover:text-altalune-orange' to="/media">Media</Link>
          <Link className='hover:text-altalune-orange' to="/contact">Contact</Link>
        </div>

        {/* Center: Social icons */}
        <div className="hidden md:flex gap-4 justify-center flex-1 overflow-x-hidden">
          <a href="https://instagram.com/altalune_band" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="https://open.spotify.com/artist/3Q0wrbP8LEfuOPMB7ymeNm?si=qiiW-YEORJmyQ1fYBPCBsQ" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-spotify text-xl"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCKOcz7x7TaRqCCKovbWMA_Q" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-youtube text-xl"></i>
          </a>
          <a href="https://music.apple.com/us/artist/altalune/1648604636" target="_blank" rel="noopener noreferrer" className="hover:text-altalune-orange">
            <i className="fab fa-apple text-xl"></i>
          </a>
        </div>

        {/* Right: Empty placeholder to balance flex */}
        <div className="flex-1" />
      </nav>

        {/*<div className="bg-blue-500 text-white p-4 md:bg-green-500">
          <p className="block md:hidden">Mobile View</p>
          <p className="hidden md:block">Desktop View</p>
        </div>*/}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>

    
  );
}

export default App;
