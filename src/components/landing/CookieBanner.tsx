import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { getCookieConsent, setCookieConsent } from "@/lib/cookieConsent";

export function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(getCookieConsent() === null);
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    setCookieConsent("all");
    setIsVisible(false);
  };

  const handleReject = () => {
    setCookieConsent("essential");
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-4 text-slate-100 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.9)] backdrop-blur sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80">
            <Cookie className="h-5 w-5 text-slate-200" />
          </div>
          <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
            {t("cookieConsent.text")}{" "}
            <a
              href="#cookie-preferences"
              className="font-medium text-slate-100 underline underline-offset-4 hover:text-white"
            >
              {t("cookieConsent.preferences")}
            </a>
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="ghost"
            className="h-11 w-full rounded-lg border border-white/10 bg-slate-800/80 text-slate-100 hover:bg-slate-700 sm:w-auto sm:px-6"
            onClick={handleReject}
          >
            {t("cookieConsent.reject")}
          </Button>
          <Button
            className="h-11 w-full rounded-lg bg-slate-100 text-slate-900 hover:bg-white sm:w-auto sm:px-6"
            onClick={handleAccept}
          >
            {t("cookieConsent.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
