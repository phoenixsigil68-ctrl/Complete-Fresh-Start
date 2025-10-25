'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import guTranslations from '@/lib/i18n/gu.json';
import enTranslations from '@/lib/i18n/en.json';

type Language = 'gu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  gu: guTranslations,
  en: enTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('gu');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['gu', 'en'].includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    if (document.documentElement) {
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if key not found, and then to key itself
        let fallbackResult: any = translations.en;
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult !== undefined ? fallbackResult : key;
      }
    }
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Alias for convenience
export const useTranslation = useLanguage;
