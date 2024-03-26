"use client";
// Hooks
import { useContext } from "react";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
// Utils
import { showup } from "@/constant/animations";
import { domAnimation, LazyMotion, m } from "framer-motion";

export const BlogIntro = () => {
  const {
    pages: { blog: dictionary },
  } = useContext(DictionaryContext);
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8"
        {...showup()}
      >
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            {dictionary.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {dictionary.description}
          </p>
        </div>
      </m.div>
      <m.hr className="my-8" {...showup()} />
    </LazyMotion>
  );
};
