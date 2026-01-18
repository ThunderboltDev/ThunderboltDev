import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/card";
import { getBlogPageJsonLd, JsonLd } from "@/components/blog/jsonld";
import { getRecentPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, thoughts, and tutorials on web development, design, and building products.",
  keywords: [
    "developer blog",
    "web development blog",
    "next.js developer blog",
    "technical blogs",
    "modern web developement blogs",
    "ai agents blog",
  ],
};

export default async function Blog() {
  const recentPosts = await getRecentPosts();

  return (
    <section>
      <JsonLd data={getBlogPageJsonLd(recentPosts)} />
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1>The Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, thoughts, and tutorials on web development, design, and
          building products.
        </p>
      </div>

      {recentPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-8">Featured Posts</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
