'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { getDirection } from '@/config/i18n.config';
import { useTranslation } from '@/hooks/i18n/useTranslation';

interface TranslationContextType {
  locale: string;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  changeLanguage: (newLocale: string) => void;
}

const TranslationContext = createContext<TranslationContextType>({
  locale: 'fr',
  dir: 'ltr',
  t: () => '',
  changeLanguage: () => {},
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('fr');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const translation = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  const changeLanguage = useCallback((newLocale: string) => {
    setLocale(newLocale);
    const newDir = getDirection(newLocale);
    setDir(newDir);
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('locale', newLocale);
  }, []);

  useEffect(() => {
    const savedLocale =
      localStorage.getItem('locale') ||
      navigator.language.split('-')[0] ||
      'fr';
    changeLanguage(savedLocale);
  }, [changeLanguage]);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && savedLocale !== translation.locale) {
      translation.changeLanguage(savedLocale);
    }
    setIsInitialized(true);
  }, [translation]);

  const contextValue = useMemo(
    () => ({
      locale,
      dir,
      t: translation.t,
      changeLanguage,
    }),
    [locale, dir, translation.t, changeLanguage]
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => useContext(TranslationContext);
