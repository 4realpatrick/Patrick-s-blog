// Constant
import { posts } from "#site/content";
// Cmp
import { Empty } from "./_components/empty";
import { BlogFilter } from "./_components/filter";
import { BlogArea } from "./_components/blog-area";
// Types
import { Locale } from "@/i18n.config";
// Utils
import { getDictionary } from "@/lib/dictionary";
import { genPageMetadata } from "@/app/seo";

export const metadata = genPageMetadata({ title: "Blog" });

export default async function BlogPage({
  params,
}: {
  params: {
    lang: Locale;
  };
}) {
  const {
    pages: { blog: dictionary },
    components: { blog_filter: blogFilter },
  } = await getDictionary(params.lang);
  if (!posts.length) {
    return <Empty />;
  }
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            {dictionary.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {dictionary.description}
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <BlogFilter dictionary={blogFilter} />
      <BlogArea />
    </div>
  );
}
