"use client";
import { DictionaryContext } from "@/components/dictionary-provider";
import BlogEmptyIcon from "@/components/svg-components/blog-empty";
import { useContext } from "react";

export const Empty: React.FC = () => {
  const {
    pages: { blog: dictionary },
  } = useContext(DictionaryContext);
  return (
    <div className="flex flex-col items-center gap-8">
      <BlogEmptyIcon className="w-1/2" />
      <h1 className="text-center text-2xl font-bold">{dictionary.empty}</h1>
    </div>
  );
};
