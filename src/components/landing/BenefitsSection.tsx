import { motion } from 'framer-motion';
import { Zap, Target, RefreshCw, Layers } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
const iconMap = {
  zap: Zap,
  target: Target,
  refresh: RefreshCw,
  layers: Layers
};
export function BenefitsSection() {
  const {
    t
  } = useLanguage();
  const items = t('benefits.items') as Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  return <section className="py-24 sm:py-32 relative" id="features">
      {/* Background Glow */}
      <div className="absolute inset-0 hero-glow opacity-50 py-[80px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Zap;
          return <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="group relative p-6 rounded-xl gradient-border hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>;
        })}
        </div>
      </div>
    </section>;
}