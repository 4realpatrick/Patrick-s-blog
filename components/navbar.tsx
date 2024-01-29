"use client";
// Cmp
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./svg-components/logo";
import SettingDropdown from "./setting-dropdown";
import Hint from "./hint";
// Utils
import { m, LazyMotion, domAnimation } from "framer-motion";
// Constant
import { navRoutes } from "@/constant/nav-routes";

const Navbar = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="flex justify-between items-center pl-4 py-4 shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hint descrption="首页" asChild>
          <Link className="flex items-center" href="/">
            <Logo />
            <span className="pl-4 text-xl text-primary tracking-wider hidden md:inline-block">
              Patrick's blog
            </span>
          </Link>
        </Hint>

        <div className="flex justify-end gap-x-8 pr-8">
          {navRoutes.map((nav) => (
            <Button
              variant="ghost"
              size="lg"
              className="text-lg"
              asChild
              key={nav.title}
            >
              <Link href={nav.href} className="hover:text-primary">
                <nav.icon className="mr-2" />
                {nav.title}
              </Link>
            </Button>
          ))}
          <SettingDropdown />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Navbar;
