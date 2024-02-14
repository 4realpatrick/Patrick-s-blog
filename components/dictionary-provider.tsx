"use client";
import { Locale } from "@/i18n.config";
import { TDictionary } from "@/lib/dictionary";
import { createContext } from "react";
import defaultDictionary from "@/dictionaries/zh.json";
interface IDictionaryProviderProps {
  children: React.ReactNode;
  dictionary: TDictionary;
  lang: Locale;
}
export const LocaleContext = createContext<Locale>("zh");
export const DictionaryContext = createContext<TDictionary>(defaultDictionary);
const TranslationProvider: React.FC<IDictionaryProviderProps> = ({
  children,
  dictionary,
  lang,
}) => {
  return (
    <LocaleContext.Provider value={lang}>
      <DictionaryContext.Provider value={dictionary}>
        {children}
      </DictionaryContext.Provider>
    </LocaleContext.Provider>
  );
};

export default TranslationProvider;
