import type { MetadataRoute } from "next";
import { url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    priority: 0.5,
    changeFrequency: "weekly",
    lastModified: new Date(post.data.date ?? Date.now()),
  }));
}
