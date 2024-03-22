import { Post, posts } from "#site/content";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
export interface IBlogState {
  blogs: Post[];
  filters: {
    keyword: string;
    tags: string[];
    timeOrder: "descend" | "ascend";
  };
}

export interface IBlogAction {
  setBlogs: (blogs: Post[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  reset: () => void;
  setFilter: <T extends keyof IBlogState["filters"]>(
    key: T,
    value: IBlogState["filters"][T]
  ) => void;
}

const defaultState: IBlogState = {
  blogs: posts,
  filters: {
    keyword: "",
    tags: [],
    timeOrder: "descend",
  },
};

export const useBlogState = create<IBlogState & IBlogAction>()(
  persist(
    immer((set) => ({
      blogs: posts,
      filters: {
        keyword: "",
        tags: [],
        timeOrder: "descend",
      },
      setBlogs: (blogs) =>
        set((state) => {
          state.blogs = blogs;
        }),
      addTag(tag) {
        set((state) => {
          state.filters.tags.push(tag);
        });
      },
      removeTag(tag) {
        set((state) => {
          state.filters.tags = state.filters.tags.filter((t) => t !== tag);
        });
      },
      reset() {
        set(defaultState);
      },
      setFilter(key, value) {
        set((state) => {
          state.filters[key] = value;
        });
      },
    })),
    {
      name: "blog-state", // unique name
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["blogs"].includes(key))
        ),
    }
  )
);
