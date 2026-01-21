import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

interface BlogCardProps {
  post: Post;
  compact?: boolean;
}

export function BlogCard({ post, compact = false }: BlogCardProps) {
  if (compact) {
    return (
      <Link
        href={`/blog/${post.category}/${post.slug}`}
        className="group block px-3 py-2 -mx-3 rounded-lg transition-colors bg-secondary/50 hover:bg-secondary"
      >
        <h3 className="text-left text-sm font-medium leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {post.data.title}
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
          {post.data.description}
        </p>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground/70">
          <time dateTime={post.data.date.toISOString()}>
            {formatDate(post.data.date)}
          </time>
          <span>•</span>
          <span>{post.data.readingTime} min</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.category}/${post.slug}`}
      className="card group relative flex flex-col justify-between space-y-3 transition-all hover:-translate-y-1"
    >
      <div className="absolute mb-0 -bottom-px left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
      <div className="absolute mb-0 -bottom-px left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 blur-xs" />

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

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
