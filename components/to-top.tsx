"use client";
// Cmp
import { BiArrowToTop } from "react-icons/bi";
// Hooks
import { useCallback, useContext, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
// Utils
import { cn } from "@/lib/utils";
// Context
import { DictionaryContext } from "./dictionary-provider";

const ToTop = () => {
  const [show, setShow] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const handleToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShow(latest > 200);
  });
  const { common } = useContext(DictionaryContext);
  return (
    <button
      className={cn(
        "fixed group items-center justify-start size-11 bg-primary rounded-full cursor-pointer overflow-hidden transition-all duration-200 shadow-lg hover:w-40 hover:rounded-lg active:translate-x-1 active:translate-y-1 bottom-10 right-10 z-10",
        show ? "flex" : "hidden"
      )}
      onClick={handleToTop}
    >
      <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
        <BiArrowToTop className="size-4 text-background group-hover:scale-105" />
      </div>
      <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        {common.to_top}
      </div>
    </button>
  );
};

export default ToTop;
