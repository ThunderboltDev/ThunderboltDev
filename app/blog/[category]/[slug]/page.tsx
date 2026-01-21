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

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_280px] gap-8 xl:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents collapsible={false} />
          </div>
        </aside>

        <div className="min-w-0 max-w-3xl mx-auto lg:mx-0">
          <header className="mb-8">
            <h1 className="mb-4 font-heading text-left text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {post.data.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="sr-only">Published</span>
                <time dateTime={post.data.date.toISOString()}>
                  {formatDate(post.data.date)}
                </time>
              </div>
              {post.data.lastModified && (
                <>
                  <span className="text-border">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">Updated</span>
                    <time dateTime={post.data.lastModified.toISOString()}>
                      {formatDate(post.data.lastModified)}
                    </time>
                  </div>
                </>
              )}
            </div>
          </header>

          <TableOfContents className="mb-8 lg:hidden" />

          <div className="prose-container">
            <CustomMDX source={post.content} />
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 mx-0 w-full">
              <h2>Related Posts</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>

        {relatedPosts.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <h2 className="text-2xl">Related Posts</h2>
              <div className="mt-4 grid gap-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} compact />
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
