// Constant
import { posts } from "#site/content";
// Cmp
import { Empty } from "./_components/empty";
import { BlogFilter } from "./_components/filter";
import { BlogArea } from "./_components/blog-area";
import { BlogIntro } from "./_components/blog-area/page-intro";
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
    components: { blog_filter: blogFilter },
  } = await getDictionary(params.lang);
  if (!posts.length) {
    return <Empty />;
  }
  return (
    <div className="container py-6 lg:py-10">
      <BlogIntro />
      <BlogFilter dictionary={blogFilter} />
      <BlogArea />
    </div>
  );
}
