import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";

interface IBlogDetailPageProps {
  params: {
    slug: string[];
  };
}
async function getPostFromParams(params: IBlogDetailPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const blog = posts.find((post) => post.slugAsParams === slug);
  return blog;
}

export async function generateStaticParams(): Promise<
  IBlogDetailPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function BlogDetailPage({ params }: IBlogDetailPageProps) {
  const blog = await getPostFromParams(params);

  if (!blog) {
    return notFound();
  }
  return (
    <article className="container prose dark:prose-invert max-w-3xl mx-auto pt-10">
      <h1>{blog.title}</h1>
      {blog.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{blog.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={blog.body} />
    </article>
  );
}
