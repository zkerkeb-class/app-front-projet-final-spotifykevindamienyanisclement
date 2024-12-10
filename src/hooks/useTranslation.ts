'use client';

import { useEffect, useState, useCallback } from 'react';

const translationsLoaders = {
  en: () => import('@/lib/i18n/en.json').then(mod => mod.default),
  fr: () => import('@/lib/i18n/fr.json').then(mod => mod.default),
  ar: () => import('@/lib/i18n/ar.json').then(mod => mod.default),
  pt: () => import('@/lib/i18n/pt.json').then(mod => mod.default),
};

type Translations = Record<string, any>;

export default function useTranslation(defaultLocale = 'fr') {
  const [locale, setLocale] = useState(defaultLocale);
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      if (!translationsLoaders[locale as keyof typeof translationsLoaders]) {
        console.error(`No translations found for locale: ${locale}`);
        return;
      }

      const translationData =
        await translationsLoaders[locale as keyof typeof translationsLoaders]();
      setTranslations(translationData);
    };

    loadTranslations();
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      const value = keys.reduce((acc, k) => {
        if (acc && typeof acc === 'object') {
          return acc[k];
        }
        return null; // If key doesn't exist, return null
      }, translations); // `translations` is the initial accumulator value

      return typeof value === 'string' ? value : '';
    },
    [translations]
  );

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return; // Prevent redundant updates
    setLocale(newLocale);

    const newPath = window.location.pathname.replace(
      `/${locale}`,
      `/${newLocale}`
    );
    window.history.pushState(null, '', newPath);
  };

  return {
    t,
    locale,
    changeLanguage,
  };
}
