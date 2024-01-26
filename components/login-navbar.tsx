"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import LanguageController from "./language-controller";
import Logo from "./svg-components/logo";
import { ThemeController } from "./theme-controller";
import Hint from "./hint";
import { motion } from "framer-motion";
const LoginNavbar = () => {
  return (
    <motion.div
      className="flex justify-between items-center pl-4 py-4 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <Logo />
        <span className="pl-4 text-xl text-primary tracking-wider hidden md:inline-block">
          Patrick's blog
        </span>
      </div>
      <div className="flex justify-end gap-x-8 pr-8">
        <Button variant="ghost" size="lg" className="text-lg">
          联系我
        </Button>
        <LanguageController />
        <ThemeController variant="ghost" />
        <Hint descrption="首页" side="top" sideOffset={5}>
          <Button variant="ghost" size="lg" className="text-lg" asChild>
            <Link href="/">
              <FaHome />
            </Link>
          </Button>
        </Hint>
      </div>
    </motion.div>
  );
};

export default LoginNavbar;
