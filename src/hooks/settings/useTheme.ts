import { useEffect, useState, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail);
    };

    window.addEventListener('themechange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener(
        'themechange',
        handleThemeChange as EventListener
      );
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new CustomEvent('themechange', { detail: newTheme }));
  }, [theme]);

  return { theme, toggleTheme };
};
