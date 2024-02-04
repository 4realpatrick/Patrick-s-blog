"use client";
// Cmp
import LanguageController from "@/components/language-controller";
import { MdLanguage } from "react-icons/md";
// Utils
import { showup } from "@/constant/animations";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Accessbility = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div className="flex items-center self-start" {...showup()}>
        <MdLanguage className="mr-4 size-6" />
        <LanguageController />
      </m.div>
    </LazyMotion>
  );
};

export default Accessbility;
