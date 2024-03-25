// Cmp
import { MDXContent } from "@/components/mdx-content";
import { BlogFooter } from "./_components/footer";
import { Badge } from "@/components/ui/badge";
import { FaHashtag } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
// Constant
import { posts } from "#site/content";
import "@/constant/mdx.css";
import { siteMetadata } from "@/data/site";
import "dayjs/locale/zh";
// Utils
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { getLocaleFromUrl } from "@/lib/get-locale";
import { getFormatterByLocale } from "@/lib/time";
// Types
import { Metadata } from "next";

export interface IBlogDetailPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: IBlogDetailPageProps["params"]) {
  const slug = Array.isArray(params.slug)
    ? params?.slug?.join("/")
    : params.slug;
  const blog = posts.find((post) => post.slugAsParams === slug);
  return blog;
}

export async function generateMetadata({
  params,
}: IBlogDetailPageProps): Promise<Metadata> {
  const blog = await getPostFromParams(params);

  if (!blog) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", blog.title);

  return {
    title: blog.title,
    description: blog.description,
    authors: { name: siteMetadata.author },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: blog.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  IBlogDetailPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function BlogDetailPage({ params }: IBlogDetailPageProps) {
  const locale = getLocaleFromUrl();

  const blog = await getPostFromParams(params);

  if (!blog) {
    return notFound();
  }
  return (
    <div className="container mx-auto py-10 space-y-4">
      <article className="!container prose dark:prose-invert mx-auto py-10 bg-background px-8 border rounded-md space-y-4">
        <h1>{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {blog.tags?.map((tag) => (
            <Badge className="py-2 px-4" variant="secondary" key={tag}>
              <FaHashtag className="mr-2 size-4 hidden lg:inline" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendar />
          {dayjs(blog.date).locale(locale).format(getFormatterByLocale(locale))}
        </div>
        <hr className="my-4" />
        {blog.description ? (
          <blockquote className="py-6 border-l-2 pl-6 italic">
            {blog.description}
          </blockquote>
        ) : null}
        <MDXContent code={blog.body} />
        <div className="pl-4">
          <hr />
          <BlogFooter slug={params.slug} />
        </div>
      </article>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold mb-4">Comment</h2>
        <div className="border-2 text-xl rounded-md p-4">coming soon...</div>
      </div>
    </div>
  );
}
