import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import readingTime from "reading-time";

const BLOG_PATH = path.join(process.cwd(), "blog");

export interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    keywords: string[];
    readingTime: number;
    date: string;
    lastModified?: string;
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

  const { data, content: mdxContent } = matter(content);

  const date = data.date || stats.birthtime.toISOString();
  const lastModified = data.lastModified || stats.mtime.toISOString();

  const differenceInDays =
    (new Date(lastModified).getTime() - new Date(date).getTime()) /
    (1000 * 60 * 60 * 24);

  const time = readingTime(content);

  return {
    slug:
      slug ||
      path
        .relative(BLOG_PATH, filePath)
        .replace(/\.mdx$/, "")
        .replace(/\\/g, "/"),
    data: {
      title: data.title,
      description: data.description,
      date,
      lastModified: differenceInDays > 3 ? lastModified : undefined,
      tags: data.tags || [],
      keywords: data.keywords || [],
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
  slug: string
): Promise<Post | null> {
  const normalizedSlug = slug.replace(/\//g, path.sep);
  const filePath = path.join(BLOG_PATH, `${normalizedSlug}.mdx`);

  try {
    return await getPostFromPath(filePath, slug);
  } catch {
    return null;
  }
});

export async function getRelatedPosts(
  currentPost: Post,
  limit = 3
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
