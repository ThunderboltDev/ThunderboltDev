"use client";

import { useEffect, useMemo, useState } from "react";
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

  const activeIndex = useMemo(() => {
    return toc.findIndex((item) => item.id === activeId);
  }, [toc, activeId]);

  if (toc.length === 0) return null;

  if (!collapsible) {
    return (
      <nav className={cn("w-full", className)}>
        <h3 className="mb-2 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          On This Page
        </h3>

        <ul className="relative space-y-0.5">
          <div className="absolute left-0.5 top-3 w-0.5 bg-muted rounded-full h-[calc(100%-1.5rem)]" />
          <div
            className="absolute left-0.5 top-3 w-0.5 bg-accent rounded-full transition-all duration-300 ease-out"
            style={{
              height:
                activeIndex >= 0
                  ? `calc(${((activeIndex + 1) / toc.length) * 100}% - 1.5rem)`
                  : "0%",
            }}
          />
          {toc.map((item, index) => {
            const isActive = activeId === item.id;
            const isPast = activeIndex >= 0 && index < activeIndex;

            return (
              <li
                key={item.id}
                className="relative"
                style={{ paddingLeft: `${1 + (item.level - 2) * 0.75}rem` }}
              >
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-accent scale-125 ring-2 ring-accent/25"
                      : isPast
                        ? "bg-accent"
                        : "bg-muted"
                  )}
                />
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "block py-1.5 text-[13px] leading-snug transition-all duration-200 hover:text-accent overflow-hidden truncate",
                    isActive
                      ? "font-medium text-accent"
                      : "text-muted-foreground/75"
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={cn("max-w-md mx-auto", className)}>
      <Accordion>
        <AccordionItem value="toc">
          <AccordionTrigger className="tracking-wider border border-border/25">
            TABLE OF CONTENTS
          </AccordionTrigger>
          <AccordionContent className="border border-t-0 border-border/50">
            <ul className="space-y-2">
              {toc.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                >
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block text-sm transition-colors duration-200 hover:text-accent leading-relaxed",
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
