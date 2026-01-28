import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

export type Language = 'en' | 'ru';

export const translations = {
  en,
  ru,
} as const;

export function t(lang: Language, path: string): string | any {
  const keys = path.split('.');
  let value: any = translations[lang];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path;
    }
  }
  
  return value;
}
