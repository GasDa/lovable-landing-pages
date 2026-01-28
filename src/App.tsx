import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Language } from "@/lib/i18n";

const queryClient = new QueryClient();
const DEFAULT_LANGUAGE: Language = "ru";

const normalizeLanguage = (lang?: string): Language =>
  lang === "en" || lang === "ru" ? lang : DEFAULT_LANGUAGE;

const LanguageLayout = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const normalizedLanguage = normalizeLanguage(lang);
  const pathWithoutLanguage = location.pathname.replace(/^\/(en|ru)/, "");

  useEffect(() => {
    if (!lang || lang !== normalizedLanguage) {
      navigate(`/${normalizedLanguage}`, { replace: true });
    }
  }, [lang, normalizedLanguage, navigate]);

  return (
    <LanguageProvider
      initialLanguage={normalizedLanguage}
      onLanguageChange={(nextLanguage) =>
        navigate(`/${nextLanguage}${pathWithoutLanguage}${location.hash}`, { replace: true })
      }
    >
      <Outlet />
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/ru" replace />} />
          <Route path="/:lang" element={<LanguageLayout />}>
            <Route index element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
