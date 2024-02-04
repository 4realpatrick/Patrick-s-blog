"use client";
// Cmp
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./svg-components/logo";
import SettingDropdown from "./setting-dropdown";
import Hint from "./hint";
// Hooks
import { useContext } from "react";
// Utils
import { m, LazyMotion, domAnimation } from "framer-motion";
// Constant
import { getNavRoutes } from "@/constant/nav-routes";
// Context
import { DictionaryContext, LocaleContext } from "./dictionary-provider";

const Navbar = () => {
  const {
    components: { navbar: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className="flex justify-between items-center pl-4 py-4 sticky top-0 w-full z-50 bg-background"
        initial={{ y: -76, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hint descrption={commonDictionary.home} asChild>
          <Link className="flex items-center" href={`/${locale}/`}>
            <Logo className="transition-[fill]" />
            <span className="pl-4 text-xl text-primary tracking-wider hidden md:inline-block transition-[background]">
              {dictionary.title}
            </span>
          </Link>
        </Hint>
        <div className="flex justify-end gap-x-8 pr-8">
          {getNavRoutes(dictionary.routes).map((nav) => (
            <Button
              variant="ghost"
              size="lg"
              className="text-lg"
              asChild
              key={nav.title}
            >
              <Link
                href={`/${locale}${nav.href}`}
                className="hover:text-primary"
              >
                <nav.icon className="mr-2" />
                {nav.title}
              </Link>
            </Button>
          ))}
          <SettingDropdown dictionary={commonDictionary} />
        </div>
      </m.nav>
    </LazyMotion>
  );
};

export default Navbar;
