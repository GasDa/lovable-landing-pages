import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { PainPointsSection } from '@/components/landing/PainPointsSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { ProductSection } from '@/components/landing/ProductSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import { FloatingCta } from '@/components/landing/FloatingCta';
import { PricingSection } from '@/components/landing/PricingSection';
import { CookieBanner } from '@/components/landing/CookieBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
        <main>
          <HeroSection />
          <PainPointsSection />
          <BenefitsSection />
          <ProductSection />
          <PricingSection />
          <CTASection />
        </main>
      <Footer />
      <FloatingCta />
      <CookieBanner />
    </div>
  );
};

export default Index;
