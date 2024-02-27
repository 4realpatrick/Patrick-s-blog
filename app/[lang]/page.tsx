"use client";
// Cmp
import Home from "@/components/home";
// Hooks
import { useContext, useRef } from "react";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
// Utils
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function HomePage() {
  const {
    pages: { home: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const avatarRef = useRef();
  return (
    <LazyMotion features={domAnimation}>
      <Home />
    </LazyMotion>
  );
}
