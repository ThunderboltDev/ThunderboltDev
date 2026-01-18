import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/card";
import {
  getBlogPostBreadcrumbJsonLd,
  getBlogPostJsonLd,
  JsonLd,
} from "@/components/blog/jsonld";
import { CustomMDX } from "@/components/blog/mdx";
import { generateBlogMetadata } from "@/components/blog/metadata";
import { TableOfContents } from "@/components/blog/toc";
import { formatDate } from "@/lib/date";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;

  const post = await getPost(category, slug);

  if (!post) {
    return {};
  }

  return generateBlogMetadata(post);
}

export default async function BlogPost({ params }: Props) {
  const { category, slug } = await params;

  const post = await getPost(category, slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <article className="wrapper-3xl py-6 lg:py-10">
      <JsonLd data={getBlogPostJsonLd(post)} />
      <JsonLd data={getBlogPostBreadcrumbJsonLd(post)} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[250px_1fr_300px]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents collapsible={false} />
          </div>
        </aside>
        <div className="min-w-0">
          <h1 className="mb-2 font-heading text-left text-4xl font-bold tracking-tight lg:text-5xl leading-tight">
            {post.data.title}
          </h1>
          <div className="space-y-1 mt-4 mb-6 text-sm text-muted-foreground">
            <div>
              <span>Published: </span>
              <time dateTime={post.data.date.toISOString()}>
                {formatDate(post.data.date)}
              </time>
            </div>
            {post.data.lastModified && (
              <div>
                <span>Updated: </span>
                <time dateTime={post.data.lastModified.toISOString()}>
                  {formatDate(post.data.lastModified)}
                </time>
              </div>
            )}
          </div>

          <TableOfContents className="sticky top-14 lg:hidden" />

          <CustomMDX source={post.content} />
        </div>
        {relatedPosts.length > 0 && (
          <aside>
            <div className="sticky top-20">
              <h2 className="mb-8">Related Posts</h2>
              <div className="grid gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
