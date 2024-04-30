import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

interface ResponsiveProp<T> {
  sm: T;
  md: T;
  lg: T;
}

export function useResponsive<T = Size>({ lg, md, sm }: ResponsiveProp<T>): T {
  const [size, setSize] = useState(lg);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSize(sm);
      } else if (width >= 640 && width < 768) {
        setSize(md);
      } else {
        setSize(lg);
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}
