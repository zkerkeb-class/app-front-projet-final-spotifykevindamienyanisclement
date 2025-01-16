'use client';

import { useState } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './LanguageSelector.module.scss';

function LanguageSelector() {
  const { locale, changeLanguage } = useTranslationContext();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  ];

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.selector}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Sélectionner la langue"
      >
        <span className={styles.flag}>{currentLocale.flag}</span>
        <span className={styles.name}>{currentLocale.name}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {locales.map(({ code, name, flag }) => (
            <button
              type="button"
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`${styles.option} ${
                locale === code ? styles.selected : ''
              }`}
              role="option"
              aria-selected={locale === code}
            >
              <span className={styles.flag}>{flag}</span>
              <span className={styles.name}>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
