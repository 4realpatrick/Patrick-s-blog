"use client";
// Cmp
import Home from "@/components/home";
// Utils
import { LazyMotion, domAnimation } from "framer-motion";

export default function HomePage() {
  return (
    <LazyMotion features={domAnimation}>
      <Home />
    </LazyMotion>
  );
}
