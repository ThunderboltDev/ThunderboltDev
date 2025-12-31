import { BlogCard } from "@/components/blog/card";
import { getAllPosts } from "@/lib/posts";

export default async function Blog() {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts;
  const regularPosts = allPosts;

  return (
    <section>
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1>The Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, thoughts, and tutorials on web development, design, and
          building products.
        </p>
      </div>

      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-8">Featured Posts</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {regularPosts.length > 0 ? (
        <div>
          {featuredPosts.length > 0 && <h2 className="mb-8">Latest Posts</h2>}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : (
        !featuredPosts.length && (
          <p className="text-center text-muted-foreground">
            No posts published yet.
          </p>
        )
      )}
    </section>
  );
}
