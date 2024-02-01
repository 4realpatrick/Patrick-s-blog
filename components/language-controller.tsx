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
import { LocaleContext } from "./dictionary-provider";
// Constant
import { i18n } from "@/i18n.config";

const LanguageController = ({
  dictionary,
}: {
  dictionary: TDictionary["pages"]["setting"]["general"];
}) => {
  const locale = useContext(LocaleContext);
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
        <SelectValue placeholder={dictionary.language_placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-primary">
            {dictionary.language}
          </SelectLabel>
          {i18n.locales.map((lang) => (
            <SelectItem value={lang} key={lang}>
              {dictionary.languages[lang]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageController;
