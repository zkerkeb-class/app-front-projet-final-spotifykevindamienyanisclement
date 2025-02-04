'use client';

import { useRef, useEffect, ReactNode } from 'react';
import styles from './HorizontalScroll.module.scss';

interface Props {
  children: ReactNode;
}

export default function HorizontalScroll({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // Support du scroll horizontal avec la molette
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className={styles.scrollContainer} ref={scrollRef}>
      <div className={styles.scrollContent}>{children}</div>
    </div>
  );
}
