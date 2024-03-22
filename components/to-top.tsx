"use client";
// Cmp
import { BiArrowToTop } from "react-icons/bi";
// Hooks
import { useCallback, useContext, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
// Utils
import { cn } from "@/lib/utils";
// Context
import { DictionaryContext } from "./dictionary-provider";
import { m, LazyMotion, domAnimation } from "framer-motion";
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
    <LazyMotion features={domAnimation}>
      <m.button
        initial={{ y: 20, opacity: 0, display: "none" }}
        animate={
          show
            ? { y: 0, opacity: 1, display: "flex" }
            : { y: 20, opacity: 0, transitionEnd: { display: "none" } }
        }
        transition={{
          duration: 0.5,
          ease: "linear",
        }}
        className={cn(
          "fixed group items-center justify-start size-11 bg-primary rounded-full cursor-pointer overflow-hidden transition-all duration-200 shadow-lg hover:rounded-lg bottom-10 right-10 z-10 hover:w-fit hover:pr-4 active:scale-90"
        )}
        onClick={handleToTop}
      >
        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
          <BiArrowToTop className="size-4 text-muted" />
        </div>
        <div className="absolute opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:relative whitespace-nowrap">
          {common.to_top}
        </div>
      </m.button>
    </LazyMotion>
  );
};

export default ToTop;
