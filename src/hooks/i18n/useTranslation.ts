'use client';

import { Translations } from '@/types/translations';
import { useEffect, useState, useCallback } from 'react';
import logger from '@/utils/logger';

export const useTranslation = (defaultLocale = 'fr') => {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || defaultLocale;
    }
    return defaultLocale;
  });
  const [translations, setTranslations] = useState<Translations>(
    {} as Translations
  );

  const loadTranslations = useCallback(async () => {
    try {
      const translationModule = await import(`@/lib/i18n/${locale}.json`);
      setTranslations(translationModule.default);
      localStorage.setItem('locale', locale);
    } catch (error) {
      logger.error('Failed to load translations for', error);
      setTranslations(translations);
    }
  }, [locale, translations]);

  useEffect(() => {
    loadTranslations();
  }, [loadTranslations]);

  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (newLocale === locale) return;
      setLocale(newLocale);
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', newLocale);
      }
    },
    [locale]
  );

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      const value = keys.reduce((acc: unknown, k: string) => {
        if (acc && typeof acc === 'object') {
          return (acc as Record<string, unknown>)[k];
        }
        return key;
      }, translations);

      return typeof value === 'string' ? value : key;
    },
    [translations]
  );

  return { t, locale, changeLanguage };
};
