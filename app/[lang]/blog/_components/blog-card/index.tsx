// Cmp
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import { BlogDate } from "./date";
// Utils
import { isNewBlog } from "@/lib/time";
// Types
import { Post } from "#site/content";

export const BlogCard = (post: Post) => {
  const { slug, cover, title, description, tags, date } = post;
  return (
    <Link
      href={slug}
      className="hover:scale-[102%] transition-all border hover:shadow-lg hover:shadow-primary rounded-2xl"
    >
      <div className="relative flex flex-col bg-background rounded-2xl">
        <figure className="flex items-center justify-center rounded-2xl">
          <Image src={cover} alt="Cover" className="rounded-t-2xl" />
        </figure>
        <div className="flex flex-[1_1_auto] flex-col p-8 gap-2">
          <span className="flex items-center gap-2 text-xl font-semibold">
            {title}
          </span>
          <p>{description}</p>
          {isNewBlog(date) && (
            <Badge variant="primary" className="w-fit">
              NEW
            </Badge>
          )}
          <div className="justify-end flex flex-wrap items-start gap-2 flex-col lg:flex-row">
            {tags.map((tag) => (
              <Badge className="gap-2" key={tag}>
                <FaHashtag />
                <p>{tag}</p>
              </Badge>
            ))}
          </div>
          <BlogDate date={date} />
        </div>
      </div>
    </Link>
  );
};
