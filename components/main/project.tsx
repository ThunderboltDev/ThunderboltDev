"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
}

export function Project({
  title,
  description,
  tags,
  imageUrl,
  projectUrl,
}: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="group card overflow-hidden p-0 md:min-w-xs"
    >
      <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative p-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={crypto.randomUUID()}
                style={{
                  top: `${index * 16.7}%`,
                  transitionDelay: `${index * 50}ms`,
                }}
                className={cn(
                  "bar -z-1 h-[16.7%] left-0 w-full opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                  index % 2 === 0 ? "bg-linear-to-r" : "bg-linear-to-l"
                )}
              />
            ))}
          <h4 className="mb-3 text-left">{title}</h4>
          <p className="mb-4 mx-0 text-muted-foreground">{description}</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-accent transition-colors group-hover:text-accent/80">
            View Project
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-150 ease-in" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
