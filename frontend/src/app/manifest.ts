import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.name} - Custom Software, AI and Cloud Engineering`,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#050505",
    theme_color: "#D62133",
    lang: "en-LK",
    categories: ["business", "productivity", "technology"],
    icons: [
      {
        src: "/logo_new.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
