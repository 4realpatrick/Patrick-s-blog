"use client";
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
import Cookie from "@/components/svg-components/cookie";
import { Button } from "@/components/ui/button";
import { showup } from "@/constant/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";

const ErrorPage = () => {
  const {
    pages: { error },
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  return (
    <motion.div
      className="flex flex-col items-center bg-background px-20 mt-8 justify-center flex-1 space-y-10"
      {...showup({ duration: 1 })}
    >
      <Cookie className="size-[40%] lg:size-[50%]" />
      <h1 className="text-3xl">{error.title}</h1>
      <Button size="lg">
        <Link href={`/${locale}/login`}>{error.to_login}</Link>
      </Button>
    </motion.div>
  );
};

export default ErrorPage;
