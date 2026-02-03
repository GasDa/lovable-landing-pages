import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
export function HeroSection() {
  const {
    t
  } = useLanguage();
  return <section className="relative min-h-screen flex items-center justify-center pt-[96px] sm:pt-[104px] pb-[80px] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">{t('hero.badge')}</span>
          </motion.div>
          <div id="floating-cta-start" className="h-1" aria-hidden="true" />

          {/* Main Title */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-10">
            <span className="block">{t('hero.title')}</span>
            <span className="block gradient-text">{t('hero.titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 max-w-2xl mx-auto mb-8 text-balance">
            {t('hero.subtitle')}
          </motion.p>
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.25
        }} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('hero.audience')}
          </motion.p>
          <div className="mx-auto w-full max-w-[980px]">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-transparent">
              <img
                src="/screenshots/hero-1.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Video Section removed */}
        </div>
      </div>
    </section>;
}
