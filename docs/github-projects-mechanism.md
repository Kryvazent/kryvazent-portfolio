# GitHub Projects Fetch Mechanism

Design document for automatically pulling public GitHub repositories into the **Project Capabilities** section of the Kryvazent portfolio, with cover images sourced from a specific path inside each repo.

---

## Goal

Replace (or augment) the manually managed CMS project cards with data pulled directly from the Kryvazent GitHub organisation. Each public repository becomes a project card. The cover image is read from a known file path inside that repo (e.g. `docs/cover.jpg`).

---

## Conventions

### Repository metadata

Each public repo that should appear on the site must have a **`kryvazent-portfolio` topic** set on GitHub. This is the filter — only repos with that topic are fetched.

### Cover image path

Place the cover image at a fixed path inside the repo:

```
docs/cover.jpg        ← preferred (JPEG)
docs/cover.png        ← fallback if JPEG is absent
```

GitHub exposes raw file content at:

```
https://raw.githubusercontent.com/{owner}/{repo}/HEAD/docs/cover.jpg
```

No API token is required to read a raw file from a public repo.

### Extended metadata — `portfolio.json`

Optional. Add a `portfolio.json` file at the repo root to override or enrich the card data:

```json
{
  "title":    "AI Analytics Dashboard",
  "category": "AI Engineering",
  "outcome":  "Faster reporting",
  "useCase":  "Data-led operations",
  "tech":     ["Next.js", "Python", "ML Workflows"],
  "description": "A reporting platform for teams that need predictive insights."
}
```

If `portfolio.json` is absent, the backend falls back to GitHub API fields (repo name, description, topics).

---

## Architecture

```
GitHub REST API v3
  GET /orgs/Kryvazent/repos?type=public
      ↓  filter by topic "kryvazent-portfolio"
Backend service  (new file: src/services/githubProjects.js)
      ↓  for each repo, fetch portfolio.json + check cover image URL
      ↓  merge into Project shape
Backend controller  GET /api/github-projects
      ↓  cached in memory, TTL 10 min
ContentProvider (frontend) or ProjectsNew directly
      ↓  renders cards
```

---

## Step-by-step Implementation

### Step 1 — Add a GitHub token to the backend `.env`

GitHub's public API allows 60 unauthenticated requests per hour. A token raises the limit to 5,000/hr and is required if the org repos are not fully public.

```env
# backend/.env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_ORG=Kryvazent
GITHUB_PORTFOLIO_TOPIC=kryvazent-portfolio
```

Add the same keys to `backend/.env.example`:

```env
GITHUB_TOKEN=replace-with-your-github-personal-access-token
GITHUB_ORG=Kryvazent
GITHUB_PORTFOLIO_TOPIC=kryvazent-portfolio
```

The token only needs the `public_repo` scope (read-only).

---

### Step 2 — Create the GitHub service

**`backend/src/services/githubProjects.js`**

```js
import { env } from "../config/env.js";

const BASE = "https://api.github.com";
const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
};

/** Fetch all public repos in the org that have the portfolio topic */
async function fetchPortfolioRepos() {
  const org   = env.GITHUB_ORG   || "Kryvazent";
  const topic = env.GITHUB_PORTFOLIO_TOPIC || "kryvazent-portfolio";

  const res = await fetch(
    `${BASE}/search/repositories?q=org:${org}+topic:${topic}&per_page=100`,
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return data.items; // array of repo objects
}

/** Try to fetch portfolio.json from the default branch of a repo */
async function fetchPortfolioJson(owner, repo, defaultBranch = "main") {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/portfolio.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Return a raw image URL if the file exists, else null */
async function resolveCoverImage(owner, repo, defaultBranch = "main") {
  for (const ext of ["jpg", "png", "jpeg", "webp"]) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/docs/cover.${ext}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) return url;
    } catch { /* skip */ }
  }
  return null;
}

/** Derive a readable title from a kebab-case repo name */
function repoNameToTitle(name) {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Map a GitHub repo + optional portfolio.json into a project card object */
function mapToProject(repo, meta) {
  const owner  = repo.owner.login;
  const branch = repo.default_branch || "main";

  // Cover image: use raw GitHub URL — resolved separately
  // meta overrides GitHub fields where present
  return {
    title:       meta?.title       || repoNameToTitle(repo.name),
    category:    meta?.category    || (repo.topics?.[0] ?? "Open Source"),
    description: meta?.description || repo.description || "",
    image:       null,   // filled in after resolveCoverImage
    tech:        meta?.tech        || repo.topics?.filter((t) => t !== (env.GITHUB_PORTFOLIO_TOPIC || "kryvazent-portfolio")) || [],
    outcome:     meta?.outcome     || "",
    useCase:     meta?.useCase     || "",
    published:   true,
    // extra GitHub fields — useful for linking back to the repo
    repoUrl:     repo.html_url,
    stars:       repo.stargazers_count,
    owner,
    repo:        repo.name,
    branch,
  };
}

// In-memory cache
let cache = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function getGitHubProjects() {
  if (cache && Date.now() < cacheExpiry) return cache;

  const repos    = await fetchPortfolioRepos();
  const projects = await Promise.all(
    repos.map(async (repo) => {
      const meta    = await fetchPortfolioJson(repo.owner.login, repo.name, repo.default_branch);
      const project = mapToProject(repo, meta);
      project.image = await resolveCoverImage(repo.owner.login, repo.name, repo.default_branch)
        ?? `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`; // fallback OG image
      return project;
    })
  );

  cache       = projects;
  cacheExpiry = Date.now() + CACHE_TTL_MS;
  return projects;
}
```

---

### Step 3 — Add the API route

**`backend/src/controllers/githubController.js`**

```js
import { getGitHubProjects } from "../services/githubProjects.js";

export const listGitHubProjects = async (_req, res) => {
  try {
    const projects = await getGitHubProjects();
    res.set("Cache-Control", "public, max-age=600"); // 10 min browser cache
    res.json(projects);
  } catch (err) {
    console.error("GitHub projects fetch failed:", err.message);
    res.status(502).json({ message: "Unable to fetch GitHub projects" });
  }
};
```

**`backend/src/routes/githubRoutes.js`**

```js
import { Router } from "express";
import { listGitHubProjects } from "../controllers/githubController.js";

export const githubRouter = Router();
githubRouter.get("/", listGitHubProjects); // GET /api/github-projects — public, no auth
```

**Register in `backend/src/app.js`:**

```js
import { githubRouter } from "./routes/githubRoutes.js";
// ...
app.use("/api/github-projects", githubRouter);
```

---

### Step 4 — Allow raw.githubusercontent.com in Next.js

**`frontend/next.config.ts`** — add the GitHub raw content CDN to `remotePatterns`:

```ts
images: {
  unoptimized: true,
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "raw.githubusercontent.com" },
    { protocol: "https", hostname: "opengraph.githubassets.com" }, // fallback OG images
    { protocol: "https", hostname: "utfs.io" },                    // UploadThing
  ],
},
```

---

### Step 5 — Update `ProjectsNew` to fetch from the new endpoint

**`frontend/src/components/ui-new/ProjectsNew.tsx`**

Replace the hardcoded `PROJECTS` constant with a `useEffect` fetch:

```tsx
"use client";

import { useEffect, useState } from "react";
// ... other imports

type GitHubProject = {
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  outcome: string;
  useCase: string;
  repoUrl: string;
};

const FALLBACK: GitHubProject[] = [
  {
    title: "AI Analytics Dashboard",
    category: "AI Engineering",
    outcome: "Faster reporting",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tech: ["Next.js", "Python", "ML Workflows"],
    description: "A reporting platform concept for teams that need predictive insights.",
    useCase: "Data-led operations",
    repoUrl: "#contact",
  },
  // ... keep existing fallbacks
];

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default function ProjectsNew() {
  const [projects, setProjects] = useState<GitHubProject[]>(FALLBACK);

  useEffect(() => {
    fetch(`${API}/api/github-projects`)
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: GitHubProject[]) => { if (data.length) setProjects(data); })
      .catch(() => { /* stay on fallback */ });
  }, []);

  return (
    // ... rest of component
    // replace PROJECTS.map with projects.map
    // use p.repoUrl on the card if you want a "View on GitHub" link
  );
}
```

---

### Step 6 — Add `portfolio.json` and `docs/cover.jpg` to each repo

In each public GitHub repository you want to showcase:

```
my-project-repo/
├── docs/
│   └── cover.jpg          ← 800×600 or 16:9, JPEG recommended
├── portfolio.json          ← optional metadata override
└── ... (rest of repo)
```

Recommended cover image spec:
- Size: **800 × 600 px** minimum (the card uses `aspect-ratio: 4/4.6`)
- Format: JPEG (`cover.jpg`) — smaller file, faster load
- Content: a screenshot, mockup, or branded graphic for the project
- Add the GitHub topic `kryvazent-portfolio` to the repo settings

---

## Data Flow Summary

```
1.  Admin sets topic "kryvazent-portfolio" on a GitHub repo
2.  Admin adds docs/cover.jpg + optional portfolio.json to the repo
3.  Frontend loads → ContentProvider fetches /api/github-projects
4.  Backend service calls GitHub Search API (cached 10 min)
5.  For each repo: fetch portfolio.json, HEAD-check cover image URL
6.  Returns array of project card objects with raw GitHub image URLs
7.  ProjectsNew renders cards — cover image via next/image (or plain <img>)
8.  Visitor sees live portfolio cards sourced from GitHub
```

---

## Cache and Rate Limits

| Concern | Solution |
|---|---|
| GitHub API rate limit (60/hr unauth) | Use a token (5,000/hr) |
| Slow cold start | In-memory cache, 10 min TTL |
| Stale data after repo push | Call `GET /api/github-projects?bust=1` to force cache clear, or reduce TTL |
| Image not found | Falls back to GitHub OpenGraph image (`opengraph.githubassets.com`) |
| API down | Frontend stays on `FALLBACK` static array |

---

## Environment Variables Reference

```env
# backend/.env additions
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_ORG=Kryvazent
GITHUB_PORTFOLIO_TOPIC=kryvazent-portfolio
```

No frontend environment variables are needed beyond the existing `NEXT_PUBLIC_API_URL`.

---

## File Reference

| Path | Action required |
|---|---|
| `backend/src/services/githubProjects.js` | **Create** — GitHub fetch + cache logic |
| `backend/src/controllers/githubController.js` | **Create** — route handler |
| `backend/src/routes/githubRoutes.js` | **Create** — Express router |
| `backend/src/app.js` | **Edit** — register `/api/github-projects` |
| `backend/.env` + `.env.example` | **Edit** — add `GITHUB_TOKEN`, `GITHUB_ORG`, `GITHUB_PORTFOLIO_TOPIC` |
| `frontend/next.config.ts` | **Edit** — add `raw.githubusercontent.com` to `remotePatterns` |
| `frontend/src/components/ui-new/ProjectsNew.tsx` | **Edit** — replace static array with API fetch |
| Each portfolio repo | **Action** — add `docs/cover.jpg`, `portfolio.json`, topic `kryvazent-portfolio` |
