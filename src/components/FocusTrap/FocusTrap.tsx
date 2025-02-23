'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function FocusTrap({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusableElements = ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements?.[0] as HTMLElement;
    const lastFocusable = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    function handleTabKey(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }

    ref.current?.addEventListener('keydown', handleTabKey);
    firstFocusable?.focus();

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('keydown', handleTabKey);
      }
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
