import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToId } from '@/lib/scrollToId';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const getStartedLabel = useMemo(() => {
    if (typeof navigator === 'undefined') return t('nav.getStarted');

    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const dataPlatform =
      (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ||
      '';
    const haystack = `${ua} ${platform} ${dataPlatform}`.toLowerCase();

    if (haystack.includes('mac')) {
      return language === 'ru' ? 'Скачать MacOS приложение' : 'Download MacOS App';
    }
    if (haystack.includes('win')) {
      return language === 'ru' ? 'Скачать Windows приложение' : 'Download Windows App';
    }
    return t('nav.getStarted');
  }, [language, t]);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ru' : 'en';
    const pathWithoutLang = location.pathname.replace(/^\/(en|ru)/, '');
    navigate(`/${nextLang}${pathWithoutLang}${location.hash}`);
  };
  const scrollToPricing = () => {
    scrollToId('pricing');
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center">
              <img
                src="/brand-mark.svg"
                alt="Brand mark"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg">{t('brand.name')}</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.features')}
            </a>
            <a href="#product" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.product')}
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.pricing')}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase text-sm font-medium">{language}</span>
            </button>
            <Button variant="ghost">{t('nav.login')}</Button>
            <Button onClick={scrollToPricing}>{getStartedLabel}</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a
                href="#product"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.product')}
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.pricing')}
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button variant="ghost" className="justify-start">{t('nav.login')}</Button>
                <Button className="justify-start" onClick={scrollToPricing}>{getStartedLabel}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
