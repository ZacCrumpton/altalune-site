import { useEffect, useState } from 'react';

export default function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth <= 768);
    }

    checkWidth(); // run on mount
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return isMobile;
}
