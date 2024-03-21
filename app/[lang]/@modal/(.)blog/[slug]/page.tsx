import { posts } from "#site/content";
import { Metadata } from "next";
import { Modal } from "./modal";
import {
  getPostFromParams,
  IBlogDetailPageProps,
} from "@/app/[lang]/blog/[...slug]/page";
import { siteMetadata } from "@/data/site";

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

export default function ArticleModal({
  params: { id: articleId },
}: {
  params: { id: string };
}) {
  return <Modal>{articleId}</Modal>;
}
