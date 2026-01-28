import { useLanguage } from '@/hooks/useLanguage';

export function Footer() {
  const { t } = useLanguage();
  const links = t('footer.links') as string[];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">{t('brand.short')}</span>
            </div>
            <span className="font-bold text-lg">{t('brand.name')}</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
