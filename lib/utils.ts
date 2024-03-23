import { Post } from "#site/content";
import { IBlogState } from "@/hooks/use-blog-state";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAllTags(posts: Post[]) {
  let tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });
  return tags;
}

export function filterBlogsByTimeOrder(
  blogs: Post[],
  timeOrder: IBlogState["filters"]["timeOrder"]
) {
  return blogs.sort(({ date: currentDate }, { date: nextDate }) => {
    const curComparer =
      timeOrder === "ascend" ? dayjs(currentDate) : dayjs(nextDate);
    const nextComparer =
      timeOrder === "ascend" ? dayjs(nextDate) : dayjs(currentDate);
    return curComparer.isBefore(nextComparer) ? -1 : 1;
  });
}

export function filterBlogsByTags(
  blogs: Post[],
  tags: IBlogState["filters"]["tags"]
) {
  return blogs.filter((blog) => {
    return blog.tags?.some((tag) => tags.includes(tag));
  });
}

export function filterBlogsByKeyword(
  blogs: Post[],
  keyword: IBlogState["filters"]["keyword"]
) {
  return blogs.filter(({ title, description }) => {
    const lowKeyword = keyword.toLowerCase();
    return (
      title.toLowerCase().includes(lowKeyword) ||
      description?.toLowerCase().includes(lowKeyword)
    );
  });
}
