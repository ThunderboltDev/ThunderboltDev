import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.category}/${post.slug}`}
      className="card group relative flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1"
    >
      <div className="absolute mb-0 -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
      <div className="absolute mb-0 -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 blur-xs" />

      <div className="absolute inset-0 size-full overflow-hidden rounded-[inherit]">
        <div className="absolute top-full left-1/2 size-32 -translate-x-1/2 rounded-full bg-accent/10 group-hover:bg-accent/25 blur-3xl transition-all duration-500 ease-out" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-left group-hover:text-accent transition-colors">
          {post.data.title}
        </h2>
        <p className="text-muted-foreground line-clamp-3 text-left">
          {post.data.description}
        </p>
      </div>
      <div className="flex flex-row items-center gap-2">
        {post.data.tags && post.data.tags.length > 0 && (
          <>
            {post.data.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full text-sm bg-secondary text-muted-foreground px-2 py-0.5 font-medium"
              >
                {tag}
              </span>
            ))}
            {post.data.tags.length > 2 && (
              <span className="rounded-full text-sm bg-secondary text-muted-foreground px-2 py-0.5 font-medium">
                +{post.data.tags.length - 2}
              </span>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <time dateTime={post.data.date.toISOString()}>
          {formatDate(post.data.date)}
        </time>
        <span>•</span>
        <span>{post.data.readingTime} min read</span>
      </div>
      <div className="flex items-center text-sm font-medium text-accent">
        Read more
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
