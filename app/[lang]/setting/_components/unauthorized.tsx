// Cmp
import Link from "next/link";
import Locked from "@/components/svg-components/locked";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Utils
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Hooks
import { useContext } from "react";

export const Unauthorized = () => {
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);

  return (
    <div className="size-full flex justify-center items-center flex-col gap-8">
      <Locked className="size-[40%]" />
      <h1 className="text-2xl">{dictionary.unauthorized}</h1>
      <Link
        href={`/${locale}/login`}
        className={cn(buttonVariants({ variant: "default" }), "w-1/5")}
      >
        {commonDictionary.login}
      </Link>
    </div>
  );
};
