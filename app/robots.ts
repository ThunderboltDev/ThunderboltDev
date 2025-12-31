import type { MetadataRoute } from "next";
import { url } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [`${url}/sitemap.xml`, `${url}/blog/sitemap.xml`],
  };
}
