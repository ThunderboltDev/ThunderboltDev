"use client";

import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import { Book, Home, Newspaper, Search as Searchicon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useMemo } from "react";
import { Kbd } from "@/components/ui/kbd";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface SearchProviderProps {
  children: ReactNode;
  posts: Post[];
}

export function SearchProvider({ children, posts }: SearchProviderProps) {
  const router = useRouter();

  const actions = useMemo(
    () => [
      {
        id: "home",
        name: "Home",
        subtitle: "Personal portfolio and projects",
        shortcut: ["h"],
        keywords: "home portfolio index",
        perform: () => router.push("/"),
        icon: <Home />,
      },
      {
        id: "blog",
        name: "Blog",
        subtitle: "Browse all blogs",
        shortcut: ["b"],
        keywords: "blog posts articles",
        perform: () => router.push("/blog"),
        icon: <Book />,
      },
      ...posts.map((post) => ({
        id: post.slug,
        name: post.data.title,
        subtitle: post.data.description,
        keywords: `${post.data.description} ${post.data.tags?.join(" ") ?? ""}`,
        perform: () => router.push(`/blog/${post.slug}`),
        parent: "blog",
        icon: <Newspaper />,
      })),
    ],
    [posts, router]
  );

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-50 bg-background/50 backdrop-blur-xs">
          <KBarAnimator className="w-full max-w-[600px] overflow-hidden rounded-lg border border-border bg-background shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center border-b border-border px-4">
              <Searchicon className="size-5 text-muted-foreground" />
              <KBarSearch
                defaultPlaceholder="Search posts..."
                className="w-full bg-transparent px-3 py-4 text-base outline-none placeholder:text-muted-foreground"
              />
              <Kbd className="hidden sm:inline-flex">ESC</Kbd>
            </div>
            <div className="[&>div]:overflow-y-auto [&>div]:scrollbar-4 [&>div]:py-2 [&>div]:translate-y-2">
              <SearchResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}

function SearchResults() {
  const { results } = useMatches();

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center py-4">
        <span className="text-[15px] text-muted-foreground">
          No results found
        </span>
      </div>
    );
  }

  return (
    <KBarResults
      items={results}
      maxHeight={500}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="mx-2 p-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {item}
          </div>
        ) : (
          <div
            className={cn(
              "mx-2",
              "flex items-center justify-between",
              "hover:bg-secondary/50 cursor-pointer rounded-md px-3 py-2.5",
              "transition-colors ease-in-out duration-150",
              {
                "bg-secondary/50": active,
              }
            )}
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center [&_svg]:size-5">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.name}</span>
                {item.subtitle && (
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>
            {item.shortcut?.length ? (
              <div>
                {item.shortcut.map((shortcut) => (
                  <Kbd key={shortcut}>{shortcut.toUpperCase()}</Kbd>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  );
}
