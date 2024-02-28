"use client";
// Cmp
import Link from "next/link";
import { Button } from "./ui/button";
import SettingDropdown from "./setting-dropdown";
import Hint from "./hint";
import Image from "next/image";
// Hooks
import { useContext } from "react";
import { usePathname } from "next/navigation";
// Utils
import {
  m,
  LazyMotion,
  domAnimation,
  useScroll,
  useSpring,
} from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const pathname = usePathname();
  const isHome = pathname.split("/")[2] === undefined;

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className="flex justify-between items-center pl-4 py-4 fixed top-0 w-full z-50 bg-background shadow-md"
        initial={{ y: -76, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hint descrption={commonDictionary.home} asChild>
          <Link
            className="flex items-center hover:scale-105 transition-transform"
            href={`/${locale}/`}
          >
            <Image
              src="/owner.jpg"
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full"
            />
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
        {isHome && (
          <m.div
            className="absolute bottom-0 left-0 right-0 h-2 origin-[0%] bg-primary"
            style={{ scaleX }}
          ></m.div>
        )}
      </m.nav>
    </LazyMotion>
  );
};

export default Navbar;
