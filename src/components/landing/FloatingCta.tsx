import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { scrollToId } from "@/lib/scrollToId";

const START_MARKER_ID = "floating-cta-start";
const END_MARKER_ID = "floating-cta-dock";

export function FloatingCta() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const startEl = document.getElementById(START_MARKER_ID);
      const endEl = document.getElementById(END_MARKER_ID);
      if (!startEl || !endEl) {
        setIsVisible(false);
        return;
      }

      const viewportHeight = window.innerHeight;
      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      const passedStart = startRect.top <= viewportHeight - 80;
      const reachedEnd = endRect.top <= viewportHeight - 120;

      setIsVisible(passedStart && !reachedEnd);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <Button
        size="lg"
        className="group w-full max-w-[300px] sm:max-w-[340px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.9),0_0_40px_rgba(56,189,248,0.6),0_12px_26px_-12px_rgba(99,102,241,0.7)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(34,211,238,1),0_0_60px_rgba(56,189,248,0.8),0_16px_34px_-12px_rgba(99,102,241,0.9)] focus-visible:ring-2 focus-visible:ring-white/80 text-base sm:text-lg font-semibold tracking-[0.08em] uppercase"
        onClick={() => scrollToId('pricing')}
      >
        {t("cta.button")}
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
