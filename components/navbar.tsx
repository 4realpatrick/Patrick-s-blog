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
// Types
import { TDictionary } from "@/lib/dictionary";
// Context
import { LocaleContext } from "./dictionary-provider";

const Navbar = ({
  dictionary,
}: {
  dictionary: TDictionary["components"]["navbar"];
}) => {
  const locale = useContext(LocaleContext);
  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className="flex justify-between items-center pl-4 py-4 shadow-sm sticky top-0 w-full z-50 bg-background"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hint descrption={dictionary.home} asChild>
          <Link className="flex items-center" href={`/${locale}/`}>
            <Logo />
            <span className="pl-4 text-xl text-primary tracking-wider hidden md:inline-block">
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
          <SettingDropdown dictionary={dictionary} />
        </div>
      </m.nav>
    </LazyMotion>
  );
};

export default Navbar;
