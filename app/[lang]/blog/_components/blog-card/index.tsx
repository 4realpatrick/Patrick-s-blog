// Cmp
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import { BlogDate } from "./date";
import Hint from "@/components/hint";
// Utils
import { isNewBlog } from "@/lib/time";
// Types
import { Post } from "#site/content";

export const BlogCard = (post: Post) => {
  const { slug, cover, title, description, tags = [], date } = post;
  return (
    <Link
      href={slug}
      className="transition-all border hover:shadow-lg hover:shadow-primary rounded-2xl bg-background flex flex-col justify-between"
    >
      <div className="h-fit">
        <figure className="flex items-center justify-center rounded-t-2xl overflow-hidden shrink-0 w-full">
          {cover ? (
            <Image
              src={cover}
              alt="Cover"
              className="rounded-t-2xl object-cover size-full aspect-video"
            />
          ) : (
            <div className="rounded-t-2xl bg-primary size-full"></div>
          )}
        </figure>
        <div className="p-8 space-y-2">
          <h2 className="text-xl font-semibold">
            {title}
            {isNewBlog(date) && (
              <Badge variant="primary" className="w-fit inline ml-2">
                NEW
              </Badge>
            )}
          </h2>
          <p>{description}</p>

          <div className="justify-end flex flex-wrap items-start gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge className="gap-2" key={tag}>
                <FaHashtag />
                <p>{tag}</p>
              </Badge>
            ))}
            {tags.length > 3 && (
              <Hint descrption={tags.slice(3, tags.length).join("、")} asChild>
                <Badge className="gap-2 hover:bg-primary/10">...</Badge>
              </Hint>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <BlogDate date={date} />
      </div>
    </Link>
  );
};
