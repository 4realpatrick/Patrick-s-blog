// Constant
import { posts } from "#site/content";
// Cmp
import { Empty } from "./_components/empty";
import { BlogCard } from "./_components/blog-card";

export default async function BlogPage() {
  if (!posts.length) {
    return <Empty />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(BlogCard)}
    </div>
  );
}
