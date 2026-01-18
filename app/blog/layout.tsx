import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/blog/navbar";
import { SearchProvider } from "@/components/blog/search";
import { getAllPosts } from "@/lib/posts";

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
