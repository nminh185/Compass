import { useLanguage } from '../contexts/LanguageContext';

export function useFont() {
  const { language } = useLanguage();
  
  return {
    fontFamily: language === 'vn' ? 'be-vietnam-pro' : '72',
  };
}