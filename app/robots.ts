import type { MetadataRoute } from "next";
import { url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [
      `${url}/sitemap.xml`,
      ...categories.map((category) => `${url}/blog/${category}/sitemap.xml`),
    ],
  };
}
