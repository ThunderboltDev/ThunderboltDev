"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      className="relative group p-px"
    >
      <div className="card-glow group-hover:card-glow-hover" />
      <div className="card-glow group-hover:card-glow-hover group-hover:blur-sm blur-[0px]" />
      <div className="relative card border-0 bg-secondary overflow-hidden p-0 md:min-w-xs">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
        </div>

        <div className="absolute bottom-0 right-0 size-32 translate-x-16 -translate-y-16 rounded-full bg-accent/25 blur-3xl transition-transform duration-500 group-hover:translate-x-8 group-hover:-translate-y-8" />

        <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              className="image object-cover transition-transform duration-500 group-hover:scale-105"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          <div className="relative p-6">
            <h4 className="mb-3 text-left">{title}</h4>
            <p className="mb-4 mx-0 text-muted-foreground">{description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-accent transition-colors group-hover:text-accent/80">
              View Project
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-150 ease-in" />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
