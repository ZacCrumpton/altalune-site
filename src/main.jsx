import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </React.StrictMode>
);
