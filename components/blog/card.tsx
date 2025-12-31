import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 hover:border-accent/50"
    >
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
        <time dateTime={post.data.date}>
          {new Date(post.data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
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
