import type { Metadata } from "next";
import type { Post } from "@/lib/posts";
import type { Category } from "@/lib/types";

export function generateBlogMetadata({ slug, category, data }: Post): Metadata {
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/blog/${category}/${slug}`,
    },
    openGraph: {
      type: "article",
      publishedTime: data.date.toISOString(),
      modifiedTime: data.lastModified?.toISOString(),
      authors: ["Thunderbolt"],
    },
  };
}

export const categoryMetadata: Record<
  Category,
  { title: string; description: string }
> = {
  guides: {
    title: "Guides & Tutorials",
    description:
      "Step-by-step guides and tutorials to help you master web development, SaaS tools, and best practices for building modern applications.",
  },
  news: {
    title: "News & Updates",
    description:
      "Latest news, product updates, and announcements from Thunderbolt. Stay informed about new features, releases, and industry developments.",
  },
  seo: {
    title: "SEO Tips & Strategies",
    description:
      "Expert SEO tips, strategies, and best practices to improve your website's search rankings and drive organic traffic to your business.",
  },
  tools: {
    title: "Tools & Resources",
    description:
      "Discover the best tools and resources for web developers and SaaS businesses. Reviews, recommendations, and how-to guides.",
  },
  comparison: {
    title: "Product Comparisons",
    description:
      "In-depth comparisons of popular tools, frameworks, and services. Make informed decisions with detailed analysis and expert insights.",
  },
};

export function generateCategoryMetadata(category: Category): Metadata {
  const { title, description } = categoryMetadata[category];

  return {
    title: title,
    description,
    alternates: {
      canonical: `/blog/${category}`,
    },
    openGraph: {
      type: "website",
      url: `/blog/${category}`,
    },
  };
}
