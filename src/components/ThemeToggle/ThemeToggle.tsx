'use client';

import { useLayoutEffect, useState, useCallback } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const { t } = useTranslationContext();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark');

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      window.dispatchEvent(new Event('themechange'));
      return newTheme;
    });
  }, []);

  if (!mounted) {
    return null;
  }

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
