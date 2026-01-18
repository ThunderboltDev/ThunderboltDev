"use client";

import { useKBar } from "kbar";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function Navbar() {
  const { query } = useKBar();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-secondary/25 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          href="/blog"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.webp"
            alt="Thunderbolt Logo"
            width={512}
            height={512}
            className="rounded-lg size-8"
          />
          <span className="text-xl font-bold tracking-tight">Thunderbolt</span>
        </Link>

        <Button
          variant="outline"
          onClick={() => query.toggle()}
          className="aspect-square sm:aspect-auto bg-background rounded-full shadow-xs hover:shadow-sm"
        >
          <Search />
          <span className="hidden sm:inline text-muted-foreground font-light">
            Search posts...
          </span>

          <KbdGroup className="hidden sm:inline-flex">
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
      </div>
    </header>
  );
}
