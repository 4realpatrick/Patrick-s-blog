"use client";
import { Locale } from "@/i18n.config";
import { TDictionary } from "@/lib/dictionary";
import { createContext } from "react";
import defaultDictionary from "@/dictionaries/cn.json";
interface IDictionaryProviderProps {
  children: React.ReactNode;
  dictionary: TDictionary;
  lang: Locale;
}
export const DictionaryContext = createContext<TDictionary>(defaultDictionary);
const TranslationProvider: React.FC<IDictionaryProviderProps> = ({
  children,
  dictionary,
  lang,
}) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
};

export default TranslationProvider;
