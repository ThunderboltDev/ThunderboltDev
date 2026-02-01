import { url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  return categories.map((category) => ({ category }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;
  const posts = await getAllPosts();
  const categoryPosts = posts.filter((post) => post.category === category);

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${categoryPosts
        .map(
          (post) => `
        <url>
          <loc>${url}/blog/${post.category}/${post.slug}</loc>
          <lastmod>${(post.data.lastModified ?? post.data.date).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>`,
        )
        .join("")}
    </urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
