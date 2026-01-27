import { LanguageProvider } from '@/hooks/useLanguage';
import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { PainPointsSection } from '@/components/landing/PainPointsSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { ProductSection } from '@/components/landing/ProductSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <div className="mt-32 sm:mt-48">
            <PainPointsSection />
          </div>
          <BenefitsSection />
          <ProductSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
