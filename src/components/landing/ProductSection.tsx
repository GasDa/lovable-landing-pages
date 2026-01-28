import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
export function ProductSection() {
  const {
    t
  } = useLanguage();
  const features = t('product.features') as Array<{
    title: string;
    description: string;
    highlights: string[];
  }>;
  return <section className="py-24 relative sm:py-[80px]" id="product">
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
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {feature.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {feature.highlights.map((highlight, i) => <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{highlight}</span>
                    </li>)}
                </ul>
                <Button className="group">
                  {t('product.cta')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-xl overflow-hidden glass-card p-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl" />
                  <div className="w-full h-full rounded-lg bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}