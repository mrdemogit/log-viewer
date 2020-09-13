import { useState, useEffect, useCallback } from 'react';

const getValue = (width) => {
  if (width < 480) return 0;
  if (width < 768) return 1;
  if (width < 992) return 2;
  return 3;
};

const useWindowSize = () => {
  const isClient = typeof window === 'object';
  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      responsive: isClient ? getValue(window.innerWidth) : undefined,
      isMobile: isClient ? getValue(window.innerWidth) < 2 : undefined,
      isTablet: isClient ? getValue(window.innerWidth) === 2 : undefined,
      isTabletOrMobile: isClient ? getValue(window.innerWidth) <= 2 : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  return windowSize;
};

export default useWindowSize;
