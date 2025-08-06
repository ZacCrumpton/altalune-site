import { transform } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        altalune: {
          orange: '#FF4A1C',
          black: '#0b0b0b',
          green: '#1F4023',
        }
      },
      fontFamily: {
        plex: ['"Courier Prime"', 'monospace']
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      pan: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-20%)' },
      },
    },
    animation: {
      'pan-left': 'pan 10s linear infinite',
    },
  },
  plugins: [],
}
