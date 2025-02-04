'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import { useTheme } from '@/hooks/settings/useTheme';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const { t } = useTranslationContext();
  const { theme, toggleTheme } = useTheme();

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
