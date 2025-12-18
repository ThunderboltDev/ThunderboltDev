import type { MetadataRoute } from "next";
import { url } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    {
      path: "",
      priority: 1.0,
      changefreq: "monthly",
    },
  ];

  return pages.map((page) => ({
    url: `${url}${page.path}`,
    priority: page.priority,
    changefreq: page.changefreq,
    lastModified: new Date().toISOString(),
  }));
}
