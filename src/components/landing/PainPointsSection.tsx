import { motion } from 'framer-motion';
import { AlertCircle, XCircle, Clock, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const icons = [AlertCircle, XCircle, Clock, HelpCircle];

export function PainPointsSection() {
  const { t } = useLanguage();
  const items = t('painPoints.items') as Array<{ title: string; description: string }>;

  return (
    <section className="py-24 sm:py-32 relative" id="pain-points">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('painPoints.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('painPoints.subtitle')}
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-destructive/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
