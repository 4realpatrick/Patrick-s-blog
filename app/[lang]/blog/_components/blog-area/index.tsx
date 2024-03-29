"use client";
// Cmp
import { BlogCard } from "./blog-card";
import { AnimatePresence } from "framer-motion";
// Hooks
import { useBlogState } from "@/hooks/use-blog-state";
import { useMemo } from "react";
// Utils
import {
  filterBlogsByKeyword,
  filterBlogsByTags,
  filterBlogsByTimeOrder,
} from "@/lib/utils";

export const BlogArea = () => {
  const blogs = useBlogState((state) => state.blogs);
  const { tags, timeOrder, keyword } = useBlogState((state) => state.filters);

  const filteredBlog = useMemo(() => {
    let result = [...blogs];
    if (!!tags.length) {
      result = filterBlogsByTags(result, tags);
    }
    if (!!keyword) {
      result = filterBlogsByKeyword(result, keyword);
    }
    result = filterBlogsByTimeOrder(result, timeOrder);
    return result;
  }, [blogs, tags, timeOrder, keyword]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      <AnimatePresence mode="sync">
        {filteredBlog.map((blog, index) => (
          <BlogCard {...blog} key={blog.slugAsParams} order={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};
