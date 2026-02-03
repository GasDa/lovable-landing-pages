import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
export function ProductSection() {
  const {
    t
  } = useLanguage();
  const features = t('product.features') as Array<{
    title: string;
    description: string;
    highlights: Array<{
      title: string;
      description: string;
    }>;
  }>;
  const visuals = [
    "/screenshots/product-1.png",
    "/screenshots/product-2.png",
    "/screenshots/product-3.png"
  ];
  return <section className="py-24 relative sm:py-[40px] pb-[80px] pt-[30px]" id="product">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('product.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('product.subtitle')}
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-16 sm:space-y-24">
          {features.map((feature, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: '-100px'
        }} transition={{
          duration: 0.6
        }} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
              {/* Content */}
              <div className="flex-1 w-full">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-6 mb-8">
                  {feature.highlights.map((highlight, i) => <li key={i} className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      <div>
                        <span className="text-primary font-semibold text-lg block mb-1">
                          {highlight.title}
                        </span>
                        <span className="text-muted-foreground text-lg">
                          {highlight.description}
                        </span>
                      </div>
                    </li>)}
                </ul>
                <Button variant="outline" className="group border-primary/50 bg-primary/10 hover:bg-primary/20 text-foreground">
                  {t('product.cta')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-card p-2 border border-white/10 bg-black/20">
                  <img
                    src={visuals[index % visuals.length]}
                    alt=""
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}
