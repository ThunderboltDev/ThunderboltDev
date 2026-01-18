import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/card";
import { getCategoryPageJsonLd, JsonLd } from "@/components/blog/jsonld";
import {
  categoryMetadata,
  generateCategoryMetadata,
} from "@/components/blog/metadata";
import { categories } from "@/lib/constants";
import { getRecentPosts } from "@/lib/posts";
import type { Category } from "@/lib/types";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const isValidCategory = (category: string): category is Category => {
  return categories.includes(category as Category);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;

  if (!isValidCategory(category)) {
    return {};
  }

  return generateCategoryMetadata(category);
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const posts = await getRecentPosts(category);

  const { title, description } = categoryMetadata[category];

  return (
    <section>
      <JsonLd data={getCategoryPageJsonLd(category, posts)} />

      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="capitalize">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {posts.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
