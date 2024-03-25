"use client";
// Hooks
import { useBlogState } from "@/hooks/use-blog-state";
import { useRouter } from "next/navigation";

export const BlogFooter = ({ slug }: { slug: string[] }) => {
  const blogs = useBlogState((state) => state.blogs);
  const realSlug = Array.isArray(slug) ? slug?.join("/") : slug;
  const curBlogIndex = blogs.findIndex((blog) => blog.slug === realSlug);
  const router = useRouter();
  return (
    <div className="mx-auto flex items-center justify-between">
      <span
        className=" text-2xl font-mono font-semibold underlineAnimation cursor-pointer"
        onClick={() => router.back()}
      >
        cd ..
      </span>
    </div>
  );
};
