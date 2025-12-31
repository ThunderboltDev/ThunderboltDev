import { Feed } from "feed";
import { url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getAllPosts();

  const feed = new Feed({
    title: "Thunderbolt Blog",
    description:
      "Technical articles, product updates, and insights on web development and SaaS.",
    id: url,
    link: url,
    language: "en",
    image: `${url}/thunderbolt.png`,
    favicon: `${url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Thunderbolt`,
    updated: new Date(posts[0].data.date),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${url}/blog/rss.xml`,
    },
    author: {
      name: "Thunderbolt",
      email: "thunderbolt3141592@gmail.com",
      link: url,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.data.title,
      id: `${url}/blog/${post.slug}`,
      link: `${url}/blog/${post.slug}`,
      description: post.data.description,
      content: post.content,
      author: [
        {
          name: "Thunderbolt",
          email: "thunderbolt3141592@gmail.com",
          link: url,
        },
      ],
      date: new Date(post.data.date),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
