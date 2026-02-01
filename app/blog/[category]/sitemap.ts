import type { MetadataRoute } from "next";
import { url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  return categories.map((category) => ({ category }));
}

export default async function sitemap(props: {
  params?: Promise<{ category: string }>;
}): Promise<MetadataRoute.Sitemap> {
  if (!props?.params) {
    return [];
  }

  const { category } = await props.params;
  const posts = await getAllPosts();
  const categoryPosts = posts.filter((post) => post.category === category);

  return categoryPosts.map((post) => ({
    url: `${url}/blog/${post.category}/${post.slug}`,
    priority: 0.6,
    changeFrequency: "weekly",
    lastModified: post.data.lastModified,
  }));
}
