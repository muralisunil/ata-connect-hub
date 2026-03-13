import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "./en";
import te from "./te";
import type { Translations } from "./en";

export type Language = "en" | "te";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: en,
});

const translations: Record<Language, Translations> = { en, te };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("app-language") as Language | null;
    return stored && ["en", "te"].includes(stored) ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem("app-language", lang);
    document.documentElement.lang = lang === "te" ? "te" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
