"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TocProps {
  className?: string;
  collapsible?: boolean;
}

export function TableOfContents({
  className = "",
  collapsible = true,
}: TocProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3"))
      .map((heading) => ({
        id: heading.id,
        title: heading.textContent || "",
        level: Number(heading.tagName[1]),
      }))
      .filter((item) => item.id);

    setToc(headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className={cn("space-y-2 max-w-md mx-auto", className)}>
      <Accordion type="single" collapsible={collapsible}>
        <AccordionItem value="toc">
          <AccordionTrigger className="tracking-wider border border-border/25">
            TABLE OF CONTENTS
          </AccordionTrigger>
          <AccordionContent className="border border-t-0 border-border/50">
            <ul className="space-y-2">
              {toc.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
                >
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block transition-colors hover:text-accent",
                      activeId === item.id
                        ? "font-medium text-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
