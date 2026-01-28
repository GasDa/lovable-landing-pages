import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Language, t } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LANGUAGE: Language = 'ru';

export function LanguageProvider({
  children,
  initialLanguage,
  onLanguageChange,
}: {
  children: ReactNode;
  initialLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage ?? DEFAULT_LANGUAGE);

  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage, language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    onLanguageChange?.(nextLanguage);
  };

  const translate = useMemo(() => (path: string) => t(language, path), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
