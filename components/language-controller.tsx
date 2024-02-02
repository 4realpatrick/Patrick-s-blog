"use client";
// Cmp
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Types
import { TDictionary } from "@/lib/dictionary";
// Hooks
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
// Context
import { DictionaryContext, LocaleContext } from "./dictionary-provider";
// Constant
import { i18n } from "@/i18n.config";

const LanguageController = () => {
  const locale = useContext(LocaleContext);
  const {
    pages: {
      setting: { general: dictionary },
    },
    components: { language_controller },
  } = useContext(DictionaryContext);
  const pathname = usePathname();
  const router = useRouter();
  const handleLanguageChange = (value: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = value;
    router.replace(segments.join("/"));
  };
  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={language_controller.language_placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-primary">
            {dictionary.language}
          </SelectLabel>
          {i18n.locales.map((lang) => (
            <SelectItem value={lang} key={lang}>
              {language_controller.languages[lang]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageController;
