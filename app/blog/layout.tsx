import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/blog/navbar";
import { SearchProvider } from "@/components/blog/search";
import { url } from "@/config";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description:
    "Technical articles, product updates, and insights on web development and SaaS.",
  alternates: {
    canonical: `${url}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${url}/blog`,
  },
};

export default async function BlogLayout({ children }: PropsWithChildren) {
  const posts = await getAllPosts();

  return (
    <main>
      <SearchProvider posts={posts}>
        <Navbar />
        {children}
      </SearchProvider>
    </main>
  );
}
