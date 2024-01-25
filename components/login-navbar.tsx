"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import LanguageController from "./language-controller";
import Logo from "./logo";
import { ThemeController } from "./theme-controller";
import Hint from "./hint";
const LoginNavbar = () => {
  return (
    <div className="flex justify-between items-center pl-4 h-24">
      <div className="flex items-center">
        <Logo />
        <span className="pl-4 text-xl text-primary tracking-wider">
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
    </div>
  );
};

export default LoginNavbar;
