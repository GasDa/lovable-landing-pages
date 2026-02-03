import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function PricingSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(1);
  const plans = t("pricing.plans") as Array<{
    title: string;
    price: string;
    period: string;
    description: string;
    cta: string;
    featured?: boolean;
    badge?: string;
    features?: string[];
    oldPrice?: string;
    discount?: string;
  }>;
  const defaultFeatures = t("pricing.features") as string[];

  return (
    <section className="pt-24 sm:pt-32 pb-8 sm:pb-10 relative" id="pricing">
      <div className="absolute inset-0 hero-glow opacity-40" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setActiveIndex(index)}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className={`relative rounded-3xl border cursor-pointer outline-none transition-all ${
                activeIndex === index || plan.featured
                  ? "border-cyan-300/60 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
                  : "border-white/10"
              } bg-black/30 backdrop-blur-md p-6 sm:p-8 focus-visible:ring-2 focus-visible:ring-cyan-300/60`}
            >
              {plan.badge && (
                <div className="absolute right-6 top-6 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3">{plan.title}</h3>
              {(plan.oldPrice || plan.discount) && (
                <div className="flex items-center justify-between gap-4 mb-2">
                  {plan.oldPrice ? (
                    <span className="text-lg text-white/60 line-through">{plan.oldPrice}</span>
                  ) : (
                    <span />
                  )}
                  {plan.discount && (
                    <span className="rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                      {plan.discount}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <Button
                className={`w-full rounded-full ${
                  activeIndex === index || plan.featured
                    ? "bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 text-slate-900"
                    : "bg-primary/20 text-foreground hover:bg-primary/30"
                }`}
                variant={plan.featured ? "default" : "ghost"}
              >
                {plan.cta}
              </Button>

              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {(plan.features ?? defaultFeatures).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
