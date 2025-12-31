"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-8 border-border px-6 py-8 bg-secondary/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:gap-12 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground">Thunderbolt</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Building the web, one line of code at a time.
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { name: "GitHub", href: "https://github.com/ThunderboltDev" },
              { name: "Twitter", href: "https://x.com/Thunderbolt3141" },
              { name: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Thunderbolt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
