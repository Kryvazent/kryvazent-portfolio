import type { MetadataRoute } from "next";
import { seoServices, servicePath } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const lastModified = new Date("2026-06-06");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy/`,
      lastModified: new Date("2026-07-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms/`,
      lastModified: new Date("2026-07-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...seoServices.map((service) => ({
      url: `${siteUrl}${servicePath(service.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
