"use client";
import { posts as blogs } from "#site/content";
import { useBlogState } from "@/hooks/use-blog-state";
import { RiFilterLine, RiFilter2Fill } from "react-icons/ri";
import { TagFilter } from "./tag-filter";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { KeywordFilter } from "./keyword-filter";
import { TimeFilter } from "./time-filter";
import { TDictionary } from "@/lib/dictionary";

export const BlogFilter = ({
  dictionary,
}: {
  dictionary: TDictionary["components"]["blog_filter"];
}) => {
  const {
    tags: currentTags,
    keyword,
    timeOrder,
  } = useBlogState((state) => state.filters);
  const addTag = useBlogState((state) => state.addTag);
  const removeTag = useBlogState((state) => state.removeTag);
  const reset = useBlogState((state) => state.reset);
  const setFilter = useBlogState((state) => state.setFilter);

  const isFiltered = !!currentTags.length || !!keyword;
  return (
    <div className="p-6 border rounded-md space-y-4">
      <h2 className="text-lg font-semibold font-mono flex items-center">
        {isFiltered ? (
          <RiFilter2Fill className="size-5 mr-2 text-primary" />
        ) : (
          <RiFilterLine className="size-5 mr-2" />
        )}
        {dictionary.title}
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <KeywordFilter
            value={keyword}
            onChange={(e) => setFilter("keyword", e.target.value)}
            placeholder={dictionary.keyword_filter.placeholder}
          />
          <TagFilter
            blogs={blogs}
            tags={currentTags}
            dictionary={dictionary.tag_filter}
            addTag={addTag}
            removeTag={removeTag}
            setFilter={setFilter}
          />
          {isFiltered && (
            <Button
              variant="ghost"
              className="h-8 px-2 lg:px-3"
              onClick={reset}
            >
              {dictionary.reset}
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <TimeFilter
          timeOrder={timeOrder}
          setFilter={setFilter}
          dictionary={dictionary.time_filter}
        />
      </div>
    </div>
  );
};
