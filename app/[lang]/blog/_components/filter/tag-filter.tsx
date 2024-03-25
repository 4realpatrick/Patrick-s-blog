"use client";
// Cmp
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
// Hooks
import { IBlogAction, IBlogState } from "@/hooks/use-blog-state";
// Utils
import { cn, getAllTags } from "@/lib/utils";
// Constant
import { Post } from "#site/content";
import { TDictionary } from "@/lib/dictionary";
// Types
interface ITagFilter {
  blogs: Post[];
  dictionary: TDictionary["components"]["blog_filter"]["tag_filter"];
  tags: IBlogState["filters"]["tags"];
  setFilter: IBlogAction["setFilter"];
  addTag: IBlogAction["addTag"];
  removeTag: IBlogAction["removeTag"];
}
export const TagFilter: React.FC<ITagFilter> = ({
  blogs,
  tags,
  dictionary,
  addTag,
  removeTag,
  setFilter,
}) => {
  const allTags = getAllTags(blogs);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {dictionary.title}
          {tags.length > 0 && (
            <>
              <div
                className="shrink-0 bg-border w-[1px] mx-2 h-4"
                data-orientation="vertical"
              />
              <Badge
                variant="secondary"
                className="rounded-sm font-normal lg:hidden"
              >
                {tags.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {tags.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {tags.length} {dictionary.selected}
                  </Badge>
                ) : (
                  tags.map((tag) => (
                    <Badge
                      variant="secondary"
                      key={tag}
                      className="rounded-sm px-1 font-normal"
                    >
                      {tag}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={dictionary.placeholder} />
          <CommandList className="relative">
            <CommandEmpty>{dictionary.empty}</CommandEmpty>
            <CommandGroup>
              {Object.entries(allTags).map(([tag, count]) => {
                const isSelected = tags.includes(tag);
                return (
                  <CommandItem
                    key={tag}
                    onSelect={() => {
                      isSelected ? removeTag(tag) : addTag(tag);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{tag}</span>
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {count}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {tags.length > 0 && (
              <div className="p-1 sticky bottom-0 w-full bg-background">
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setFilter("tags", [])}
                    className="justify-center text-center rounded-sm"
                  >
                    {dictionary.clear}
                  </CommandItem>
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
