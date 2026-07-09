# Kryvazent CMS API

Express and MongoDB backend for the Kryvazent website content manager.

## Setup

Copy `.env.example` to `.env`, replace every credential, then run:

```bash
npm install
npm run dev
```

Set `FRONTEND_URL` to the frontend origin. Multiple origins can be
comma-separated. The configured admin account is created or updated when the
API starts.

## API

- `GET /api/health` — service health
- `GET /api/content` — public, published website content
- `POST /api/auth/login` — administrator login
- `GET /api/admin/content` — complete content, including drafts
- `PUT /api/admin/content` — publish content changes
- `GET /api/auth/me` — current authenticated user
- `GET /api/admin/users` — list CMS users (admin only)
- `POST /api/admin/users` — create a CMS user (admin only)
- `PATCH /api/admin/users/:id` — update profile, role, status, or password
- `DELETE /api/admin/users/:id` — remove a CMS user
- `GET /api/admin/marketing` — accounts, campaigns, and generated posts
- `POST /api/admin/marketing/accounts` — connect a publishing destination
- `POST /api/admin/marketing/campaigns` — create a campaign
- `POST /api/admin/marketing/campaigns/:id/generate` — generate strategy and posts
- `PATCH /api/admin/marketing/posts/:id` — approve, edit, or schedule a post
- `POST /api/admin/marketing/publish-due` — process the publishing queue now

## Marketing publishing connectors

Each social account can point to an n8n, Make, Zapier, or custom publishing
webhook. At the scheduled time the API sends:

```json
{
  "postId": "...",
  "platform": "linkedin",
  "format": "video",
  "caption": "...",
  "hashtags": ["#Kryvazent"],
  "mediaUrl": "https://..."
}
```

The connector token is AES-256-GCM encrypted in MongoDB. The receiving workflow
should publish through the platform's official API and return an `id` or
`postId`. Gemini generates campaign strategies, captions, creative briefs, and
video scripts through `GEMINI_API_KEY`. Video posts can be rendered directly
through Json2Video using `JSON2VIDEO_API_KEY`; the worker polls active render
jobs and stores the finished MP4 URL before publishing.

Deploy this directory as a persistent Node service and use MongoDB Atlas or
another reachable MongoDB instance in production. Keep `JWT_SECRET`,
`ADMIN_PASSWORD`, and `MONGODB_URI` server-side.
