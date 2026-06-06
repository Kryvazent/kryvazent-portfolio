# Kryverzent - Engineering the Impossible

A futuristic, high-tech minimalist portfolio website for Kryverzent, a high-performance technology foundry.

## Features

- **Futuristic HUD Aesthetic**: Custom UI inspired by head-up displays with red accents and scanline effects.
- **Dynamic Backgrounds**: Neural network particle system and floating 3D CSS shapes.
- **Non-Linear Bento Grid**: Interactive hero section with perspective transforms.
- **Infinite Marquee**: High-performance partner/customer scrolling.
- **Fully Responsive**: Optimized for desktop and mobile with adaptive layouts.
- **Modern Tech Stack**: Built with Next.js 15, React, Tailwind CSS 4, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run start
```

## Netlify Deployment

This is a Next.js app. On Netlify, use:

```bash
Build command: npm run build
Publish directory: out
```

This project is configured as a static Next.js export for Netlify. Do not set the publish directory to `public`, `dist`, or `.next`; use `out` so Netlify receives the generated `index.html`.

For metadata, sitemap, Open Graph, and AI/business enrichment tools, set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Use the real production domain once one is connected. Tools such as Apollo often enrich company data by domain, so a temporary `netlify.app` URL may not have a company record even when the page itself is working.
