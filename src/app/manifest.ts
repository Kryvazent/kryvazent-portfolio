import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kryverzent - Software Development and Technology Engineering",
    short_name: "Kryverzent",
    description:
      "Kryverzent builds custom web applications, mobile apps, AI-enabled systems, cloud infrastructure, backend platforms, APIs, and digital product experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#D62133",
    icons: [
      {
        src: "/logo_new.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
