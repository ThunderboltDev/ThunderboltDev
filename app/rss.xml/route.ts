import { Feed } from "feed";
import { socials, url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getAllPosts();

  const feed = new Feed({
    title: "Thunderbolt Blog",
    description:
      "Insights, thoughts, and tutorials on web development, design, and building products.",
    id: url,
    link: url,
    language: "en",
    image: `${url}/logo.webp`,
    favicon: `${url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Thunderbolt`,
    updated: new Date(posts[0].data.date),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${url}/rss.xml`,
    },
    author: {
      name: "Thunderbolt",
      email: socials.email,
      link: url,
    },
  });

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  for (const post of sortedPosts) {
    feed.addItem({
      title: post.data.title,
      id: `${url}/blog/${post.category}/${post.slug}`,
      link: `${url}/blog/${post.category}/${post.slug}`,
      description: post.data.description,
      content: post.content,
      author: [
        {
          name: "Thunderbolt",
          email: socials.email,
          link: url,
        },
      ],
      date: new Date(post.data.date),
      category: [
        {
          name: post.data.category,
        },
      ],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
