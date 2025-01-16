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
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      // Empêcher le scroll vertical de la page si on est en train de scroller horizontalement
      if (
        (el.scrollLeft === 0 && e.deltaY < 0) ||
        (el.scrollLeft === el.scrollWidth - el.clientWidth && e.deltaY > 0)
      ) {
        return;
      }

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // Support du scroll horizontal avec la molette
    el.addEventListener('wheel', handleWheel, { passive: false });

    el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className={styles.scrollContainer} ref={scrollRef}>
      {children}
    </div>
  );
}
