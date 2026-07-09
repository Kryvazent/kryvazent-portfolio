# Kryvazent - Engineering the Impossible

A futuristic, high-tech business website for Kryvazent, a software development and technology engineering company in Colombo, Sri Lanka.

## Features

- **Futuristic HUD Aesthetic**: Custom UI inspired by head-up displays with red accents and scanline effects.
- **Dynamic Backgrounds**: Neural network particle system and floating 3D CSS shapes.
- **Non-Linear Bento Grid**: Interactive hero section with perspective transforms.
- **Infinite Marquee**: High-performance partner/customer scrolling.
- **Fully Responsive**: Optimized for desktop and mobile with adaptive layouts.
- **Modern Tech Stack**: Built with Next.js 15, React, Tailwind CSS 4, and Framer Motion.
- **SEO Foundation**: Metadata, sitemap, robots rules, JSON-LD schema, visible FAQs, Open Graph image, and crawlable service pages.

## Development

```bash
npm install
npm run dev
```

The authenticated content editor is available at `/admin/`. It manages pricing,
projects, testimonials, and partners through the Express/MongoDB API in
`../backend`. Configure the API URL before building:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Set `NEXT_PUBLIC_API_URL` in the hosting provider before every production
build. It must point to the public Railway backend domain. MongoDB/API content
is authoritative; the browser refreshes it on page load, tab focus, and once
per minute. Built-in content is shown only when the API has not yet responded
or is temporarily unavailable.

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
NEXT_PUBLIC_SITE_URL=https://www.kryvazent.com/
```

Use the real production domain once one is connected. Tools such as Apollo often enrich company data by domain, so a temporary `netlify.app` URL may not have a company record even when the page itself is working.

The app currently generates these static service URLs for search discovery:

- `/services/custom-web-application-development/`
- `/services/mobile-application-development/`
- `/services/ai-machine-learning-product-integration/`
- `/services/cloud-infrastructure-devops/`
- `/services/backend-api-development/`
- `/services/ui-ux-engineering/`
