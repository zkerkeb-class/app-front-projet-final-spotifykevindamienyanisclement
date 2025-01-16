'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import useTranslation from '@/hooks/useTranslation';

const TranslationContext = createContext<ReturnType<
  typeof useTranslation
> | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const translation = useTranslation();

  // Effet pour synchroniser avec localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && savedLocale !== translation.locale) {
      translation.changeLanguage(savedLocale);
    }
  }, [translation]);

  return (
    <TranslationContext.Provider value={translation}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      'useTranslationContext must be used within a TranslationProvider'
    );
  }
  return context;
}
