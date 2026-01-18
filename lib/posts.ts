import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import readingTime from "reading-time";
import { z } from "zod";
import { categories } from "@/lib/constants";

const BLOG_PATH = path.join(process.cwd(), "blog");

export const PostFrontmatterSchema = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(250),
  tags: z.array(z.string()).min(2).max(10).default([]),
  keywords: z.array(z.string()).min(1).max(10).default([]),
  date: z.date().optional(),
  lastModified: z.date().optional(),
  category: z.enum(categories),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export interface Post {
  slug: string;
  category: string;
  data: PostFrontmatter & {
    date: Date;
    readingTime: number;
    lastModified: Date | undefined;
  };
  content: string;
}

const getAllFilePaths = cache(async function getAllFilePaths(
  dir: string
): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const filePaths: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        const subPaths = await getAllFilePaths(fullPath);
        filePaths.push(...subPaths);
      } else if (file.name.endsWith(".mdx")) {
        filePaths.push(fullPath);
      }
    })
  );

  return filePaths;
});

async function getPostFromPath(filePath: string, slug?: string): Promise<Post> {
  const content = await fs.readFile(filePath, "utf-8");
  const stats = await fs.stat(filePath);

  const { data: rawData, content: mdxContent } = matter(content);

  const relativePath = path.relative(BLOG_PATH, filePath);
  const pathParts = relativePath.split(path.sep);
  const folderCategory = pathParts.length > 1 ? pathParts[0] : undefined;

  const validatedData = PostFrontmatterSchema.parse({
    ...rawData,
    category: rawData.category || folderCategory,
  });

  const date = validatedData.date || stats.birthtime;
  const lastModified = validatedData.lastModified || stats.mtime;

  const differenceInDays =
    (lastModified.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  const time = readingTime(content);

  const category = validatedData.category || "news";

  return {
    slug:
      slug ||
      path
        .relative(path.join(BLOG_PATH, category), filePath)
        .replace(/\.mdx$/, "")
        .replace(/\\/g, "/"),
    category,
    data: {
      ...validatedData,
      date,
      lastModified: differenceInDays > 3 ? lastModified : undefined,
      readingTime: Math.ceil(time.minutes),
    },
    content: mdxContent,
  };
}

export const getAllPosts = cache(async function getAllPosts(): Promise<Post[]> {
  const filePaths = await getAllFilePaths(BLOG_PATH);

  const postsPromise = filePaths.map(async (filePath) => {
    return await getPostFromPath(filePath);
  });

  return await Promise.all(postsPromise);
});

export const getPost = cache(async function getPost(
  category: string,
  slug: string
): Promise<Post | null> {
  const filePath = path.join(BLOG_PATH, category, `${slug}.mdx`);

  try {
    return await getPostFromPath(filePath, slug);
  } catch {
    return null;
  }
});

export async function getRelatedPosts(
  currentPost: Post,
  limit = 5
): Promise<Post[]> {
  const allPosts = await getAllPosts();

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) =>
        currentPost.data.tags.includes(tag)
      );
      return { post, score: sharedTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export async function getRecentPosts(
  category?: string,
  limit = 10
): Promise<Post[]> {
  const allPosts = await getAllPosts();

  return allPosts
    .filter((post) => {
      if (category) {
        return post.data.category === category;
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
}
