'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const { t } = useTranslationContext();
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []); // Empty dependency array, so it only runs once after mount

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      window.dispatchEvent(new Event('themechange'));
      return newTheme;
    });
  }, []); // Only recreate toggleTheme when necessary

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={t('common.darkMode')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
