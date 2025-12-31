import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/card";
import { CustomMDX } from "@/components/blog/mdx";
import { TableOfContents } from "@/components/blog/toc";
import { url } from "@/config";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const { data } = post;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      publishedTime: data.date,
      modifiedTime: data.lastModified,
      tags: data.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
    keywords: data.keywords,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <article className="wrapper-3xl py-6 lg:py-10">
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
              <time dateTime={post.data.date}>
                {new Date(post.data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            {post.data.lastModified && (
              <div>
                <span>Updated: </span>
                <time dateTime={post.data.lastModified}>
                  {new Date(post.data.lastModified).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
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

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Structured Data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.data.title,
            "description": post.data.description,
            "datePublished": post.data.date,
            "dateModified": post.data.lastModified,
            "author": {
              "@type": "Person",
              "name": "Thunderbolt",
            },
            "publisher": {
              "@type": "Organization",
              "name": "Thunderbolt",
              "logo": {
                "@type": "ImageObject",
                "url": `${url}/thunderbolt.png`,
              },
            },
          }),
        }}
      />
    </article>
  );
}
