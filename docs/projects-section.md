# Projects Section — How It Works

This document covers the full data flow of the **Project Capabilities** section on the Kryvazent portfolio homepage, from the database through the API to the frontend render.

---

## Overview

The Projects section is a CMS-driven showcase of portfolio/capability cards. Content is managed through the admin panel, stored in MongoDB, served via a REST API, and rendered by a React component on the frontend.

```
Admin Panel (browser)
      ↓  save draft + publish
Backend API  /api/content  (Node.js + Express)
      ↓  read / write
MongoDB  Content collection  { key: "main" }
      ↑  fetch on load / every 60s
ContentProvider (React context, client-side)
      ↓  provides content.projects[]
ProjectsNew.tsx  (homepage section)
```

---

## 1. Data Shape

Each project item is defined in `frontend/src/lib/content.ts`:

```ts
{
  title:       string;   // Card heading
  category:    string;   // Red chip top-left (e.g. "AI Engineering")
  description: string;   // Body text on the card
  image:       string;   // Absolute URL or /public path to cover photo
  tech:        string[]; // Monospace tags (e.g. ["Next.js", "Python"])
  outcome:     string;   // White chip top-left (e.g. "Faster reporting")
  useCase:     string;   // Footer line (e.g. "Data-led operations")
  published:   boolean;  // Controls visibility on public site
}
```

The `published` flag is the only visibility gate — unpublished items are stripped by the backend before being sent to the public API.

---

## 2. Default Content

When no database record exists, `defaultSiteContent` in `frontend/src/lib/content.ts` is used as the fallback. It ships with three pre-built project cards:

| Title | Category | Tech |
|---|---|---|
| AI Analytics Dashboard | AI Product Engineering | Next.js, Python, ML Workflows |
| Customer Operations Portal | Web Application Development | React, Node.js, Cloud APIs |
| Cloud Automation Layer | Cloud and DevOps | Docker, CI/CD, Monitoring |

The same defaults are mirrored in `backend/src/data/defaultContent.js` so the API returns them when MongoDB has no saved record.

---

## 3. Backend

### Storage — `Content` model

All site content (pricing, projects, testimonials, partners) is stored as a **single document** in MongoDB with `key: "main"`:

```
Content collection
└── { key: "main", pricing: {...}, projects: [...], testimonials: [...], partners: [...] }
```

There is only ever one document. `upsert: true` ensures it is created on first save.

### API endpoints — `backend/src/controllers/contentController.js`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/content` | Public | Returns published content only. Filters out `published: false` items from projects, testimonials, and partners. Sets `Cache-Control: no-store`. |
| `GET` | `/api/content/admin` | Authenticated | Returns full content including unpublished items. Used by the admin panel. |
| `PUT` | `/api/content` | Authenticated | Replaces the entire content document. Requires `pricing`, `projects`, `testimonials`, and `partners` in the body. |

**Public endpoint filter (key behaviour):**
```js
projects: source.projects.filter((item) => item.published !== false)
```
Any project with `published: false` is silently removed before the response is sent.

---

## 4. Frontend — Content Loading

### `ContentProvider` (`frontend/src/components/ContentProvider.tsx`)

A React context provider that wraps the entire app (mounted in `app/layout.tsx`). It:

1. **On mount** — fetches `GET /api/content` immediately
2. **Every 60 seconds** — re-fetches to pick up admin changes
3. **On tab focus / visibility change** — re-fetches to stay fresh
4. **BroadcastChannel** — listens for a `"published"` message from the admin panel on the same origin so other open tabs update instantly after an admin save
5. **Falls back** to `defaultSiteContent` if the API is unreachable or returns an error

State exposed via `useSiteContent()` hook:

```ts
{
  content:        SiteContent;   // Current content (default or live)
  isLoaded:       boolean;       // True after first API response (success or fail)
  isRefreshing:   boolean;       // True while a fetch is in flight
  error:          string;        // Last error message, or ""
  lastUpdated:    Date | null;   // Timestamp of last successful fetch
  refreshContent: () => Promise<void>;
  updateContent:  (content: SiteContent) => void;  // Used by admin after save
}
```

---

## 5. Frontend — Render

### `ProjectsNew` (`frontend/src/components/ui-new/ProjectsNew.tsx`)

> **Note:** `ProjectsNew` currently uses a hardcoded `PROJECTS` constant instead of `useSiteContent()`. The live CMS data path is not wired up yet in this component (unlike `Customers`/`Partners` which use the hook). See [section 7](#7-connecting-live-cms-data) for how to connect it.

#### Layout

```
Section
├── Header row
│   ├── Left: eyebrow label + h2 + description
│   └── Right: "See More" button + "Discuss your project" link
└── Grid  (1 col → 2 col md → 3 col lg)
    └── Article card × N
        ├── <Image>  (cover photo, grayscale → colour on hover)
        ├── Dark gradient scrim  (always dark, readable on both themes)
        └── Content overlay (bottom-aligned)
            ├── Category chip  (red)
            ├── Outcome chip   (translucent white)
            ├── Title
            ├── Tech tags      (monospace, frosted)
            ├── Description
            └── Use case line  (border-top separator)
```

#### Card behaviour

- Starts grayscale at 85% brightness
- On hover: lifts `translateY(-7px)`, border turns red, image scales to 108% and desaturates to full colour
- Dark scrim is hardcoded (`rgba(4,5,8,...)`) so text stays readable regardless of light/dark theme
- Card background uses `var(--surface-strong)` so it adapts to theme correctly before the image loads

#### Responsive breakpoints

| Breakpoint | Columns |
|---|---|
| Default (mobile) | 1 |
| `md` (≥ 768px) | 2 |
| `lg` (≥ 1024px) | 3 |

---

## 6. Admin Panel

### Route: `/admin/projects`

File: `frontend/src/app/admin/projects/page.tsx`

The admin page uses the `useAdmin()` hook which provides a local `draft` copy of the full site content. Changes are made to the draft in memory before being saved.

**Per-project fields editable in the admin:**

| Field | Input type | Notes |
|---|---|---|
| Title | Text | Card heading |
| Category | Text | Red chip |
| Outcome | Text | White chip |
| Use case | Text | Footer line |
| Description | Textarea | Body text |
| Image | UploadThing upload | Stored via UploadThing, URL saved to content |
| Technology | Textarea (one per line) | Split on `\n`, stored as `string[]` |
| Published | Toggle | Controls public visibility |

**Add a project** — click the `+ Add` button. A new draft item is created with `published: false`.

**Remove a project** — click the remove button on any `EditorCard`. The item is filtered out of the draft array.

**Save/publish** — the admin save action sends the full draft to `PUT /api/content`, which replaces the MongoDB document. After saving, `updateContent()` updates the React context and broadcasts a message to all open tabs.

---

## 7. Connecting Live CMS Data

`ProjectsNew` currently renders from a hardcoded array. To wire it to the live CMS:

```tsx
// Replace the PROJECTS constant and function signature with:
import { useSiteContent } from "@/components/ContentProvider";

export default function ProjectsNew() {
  const { content, isLoaded } = useSiteContent();
  const projects = isLoaded
    ? content.projects.filter((p) => p.published)
    : FALLBACK_PROJECTS; // keep a static fallback for SSR / first paint

  // rest of component unchanged, replace PROJECTS.map with projects.map
}
```

The `published` filter is already applied by the backend, but filtering client-side too is safe and prevents flash of unpublished content if the admin tab updates the context via BroadcastChannel.

---

## 8. Image Hosting

Project cover images can be:

- **External URLs** — e.g. Unsplash (`https://images.unsplash.com/...`). Used in defaults. Requires the host to be allowed in `next.config.ts` under `images.remotePatterns`.
- **UploadThing URLs** — uploaded via the admin panel image field. UploadThing returns a CDN URL that is stored directly in the content document.

Current `next.config.ts` allows `images.unsplash.com`. Add additional hosts as needed:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "utfs.io" }, // UploadThing CDN
  ],
}
```

---

## 9. File Reference

| Path | Role |
|---|---|
| `frontend/src/components/ui-new/ProjectsNew.tsx` | Homepage section component |
| `frontend/src/components/ContentProvider.tsx` | React context — fetches and distributes live content |
| `frontend/src/lib/content.ts` | TypeScript types + default fallback content |
| `frontend/src/app/admin/projects/page.tsx` | Admin CRUD UI for projects |
| `backend/src/controllers/contentController.js` | GET/PUT endpoints for site content |
| `backend/src/models/Content.js` | Mongoose schema for the content document |
| `backend/src/data/defaultContent.js` | Server-side fallback when no DB record exists |
