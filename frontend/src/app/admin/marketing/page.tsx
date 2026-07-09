"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Bot, CalendarClock, Link2, LoaderCircle, Plus, Send, Sparkles, Trash2 } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
type Account = { _id: string; platform: string; accountName: string; handle: string; publishingWebhook: string; active: boolean };
type Campaign = { _id: string; name: string; goal: string; audience: string; offer: string; platforms: string[]; postsPerWeek: number; status: string; strategy?: { summary?: string; pillars?: string[] } };
type Post = { _id: string; campaign?: { name?: string }; title: string; platform: string; format: string; caption: string; status: string; scheduledAt?: string; videoStatus: string; mediaUrl?: string; failureReason?: string };
type Quota = { _id: string; provider: string; used: number; limit: number; unit: string; blockedUntil?: string | null; hardBlocked: boolean; reason?: string };
type Dashboard = { accounts: Account[]; campaigns: Campaign[]; posts: Post[]; quotas: Quota[] };

export default function MarketingPage() {
  const { token } = useAdmin();
  const [data, setData] = useState<Dashboard>({ accounts: [], campaigns: [], posts: [], quotas: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({ platform: "linkedin", accountName: "", handle: "", publishingWebhook: "", accessToken: "" });
  const [campaign, setCampaign] = useState({ name: "", goal: "", audience: "", offer: "", tone: "credible, clear, and helpful", platforms: ["linkedin"], postsPerWeek: 3 });
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const load = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/admin/marketing`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error("Unable to load marketing workflow");
    setData(await response.json());
    setLoading(false);
  }, [token]);
  useEffect(() => { void load().catch((error) => { setMessage(error.message); setLoading(false); }); }, [load]);

  const addAccount = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/admin/marketing/accounts`, { method: "POST", headers, body: JSON.stringify(account) });
    if (!response.ok) return setMessage("Could not connect account");
    setAccount({ platform: "linkedin", accountName: "", handle: "", publishingWebhook: "", accessToken: "" });
    setMessage("Publishing connector added.");
    await load();
  };
  const addCampaign = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/admin/marketing/campaigns`, { method: "POST", headers, body: JSON.stringify(campaign) });
    if (!response.ok) return setMessage("Could not create campaign");
    setCampaign({ name: "", goal: "", audience: "", offer: "", tone: "credible, clear, and helpful", platforms: ["linkedin"], postsPerWeek: 3 });
    setMessage("Campaign created. Generate its strategy when ready.");
    await load();
  };
  const action = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${url}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
    if (!response.ok) { const result = await response.json().catch(() => ({})); throw new Error(result.message || "Action failed"); }
    await load();
  };

  if (loading) return <p className="flex items-center gap-2 text-muted"><LoaderCircle className="h-4 w-4 animate-spin" /> Loading marketing workflow…</p>;
  return <div className="space-y-10">
    <section>
      <PageHeading title="Marketing workflow" description="Connect publishing destinations, create campaigns, generate content, then approve and schedule it." action={<button onClick={() => action("/api/admin/marketing/publish-due", { method: "POST" }).then(() => setMessage("Publishing queue processed.")).catch((e) => setMessage(e.message))} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white"><Send className="h-4 w-4" /> Run publisher</button>} />
      {message && <p className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">{message}</p>}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {data.quotas.map((quota) => {
          const paused = quota.hardBlocked || Boolean(quota.blockedUntil && new Date(quota.blockedUntil) > new Date());
          return <div key={quota._id} className="rounded-2xl border border-line bg-surface p-5"><div className="flex items-center justify-between"><strong className="capitalize">{quota.provider} free-tier guard</strong><span className={`text-xs font-bold uppercase ${paused ? "text-red-500" : "text-primary"}`}>{paused ? "Paused" : "Available"}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-primary" style={{ width: `${Math.min(100, (quota.used / quota.limit) * 100)}%` }} /></div><p className="mt-2 text-xs text-muted">{quota.used} / {quota.limit} {quota.unit} used{quota.blockedUntil ? ` · resets ${new Date(quota.blockedUntil).toLocaleString()}` : ""}</p>{quota.reason && <p className="mt-2 text-xs text-red-500">{quota.reason}</p>}</div>;
        })}
      </div>
    </section>

    <section className="glass rounded-3xl p-5 sm:p-8">
      <h2 className="mb-2 flex items-center gap-2 text-xl font-bold font-syncopate"><Link2 className="text-primary" /> Social accounts</h2>
      <p className="mb-6 text-sm text-muted">Connect a platform through its publishing webhook or an automation service such as n8n, Make, or Zapier.</p>
      <form onSubmit={addAccount} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <label><span className={labelClass}>Platform</span><select value={account.platform} onChange={(e) => setAccount({ ...account, platform: e.target.value })} className={inputClass}>{["linkedin","instagram","facebook","tiktok","youtube","x","other"].map((value) => <option key={value}>{value}</option>)}</select></label>
        <Field label="Account name" value={account.accountName} onChange={(value) => setAccount({ ...account, accountName: value })} />
        <Field label="Handle" value={account.handle} onChange={(value) => setAccount({ ...account, handle: value })} />
        <Field label="Publishing webhook" value={account.publishingWebhook} onChange={(value) => setAccount({ ...account, publishingWebhook: value })} />
        <label><span className={labelClass}>Connector token</span><input type="password" value={account.accessToken} onChange={(e) => setAccount({ ...account, accessToken: e.target.value })} className={inputClass} /></label>
        <button className="self-end rounded-xl bg-primary px-4 py-3 font-bold text-white"><Plus className="mr-2 inline h-4 w-4" />Connect</button>
      </form>
      <div className="mt-6 grid gap-3 md:grid-cols-2">{data.accounts.map((item) => <div key={item._id} className="flex items-center justify-between rounded-xl border border-line p-4"><div><strong className="capitalize">{item.platform}: {item.accountName}</strong><p className="text-xs text-muted">{item.handle || "No handle"} · {item.publishingWebhook ? "Connector ready" : "Missing webhook"}</p></div><button onClick={() => action(`/api/admin/marketing/accounts/${item._id}`, { method: "DELETE" }).catch((e) => setMessage(e.message))}><Trash2 className="h-4 w-4 text-muted" /></button></div>)}</div>
    </section>

    <section className="glass rounded-3xl p-5 sm:p-8">
      <h2 className="mb-2 flex items-center gap-2 text-xl font-bold font-syncopate"><Sparkles className="text-primary" /> Campaign strategy</h2>
      <p className="mb-6 text-sm text-muted">Describe the outcome and audience; the generator creates pillars, captions, creative briefs, and video scripts.</p>
      <form onSubmit={addCampaign} className="grid gap-4 md:grid-cols-2">
        <Field label="Campaign name" value={campaign.name} onChange={(value) => setCampaign({ ...campaign, name: value })} />
        <Field label="Goal" value={campaign.goal} onChange={(value) => setCampaign({ ...campaign, goal: value })} />
        <Field label="Audience" value={campaign.audience} onChange={(value) => setCampaign({ ...campaign, audience: value })} />
        <Field label="Offer" value={campaign.offer} onChange={(value) => setCampaign({ ...campaign, offer: value })} />
        <label><span className={labelClass}>Platforms (comma separated)</span><input value={campaign.platforms.join(", ")} onChange={(e) => setCampaign({ ...campaign, platforms: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} className={inputClass} /></label>
        <label><span className={labelClass}>Posts per platform</span><input type="number" min={1} max={21} value={campaign.postsPerWeek} onChange={(e) => setCampaign({ ...campaign, postsPerWeek: Number(e.target.value) })} className={inputClass} /></label>
        <button className="rounded-xl bg-primary px-4 py-3 font-bold text-white md:col-span-2">Create campaign</button>
      </form>
      <div className="mt-7 space-y-4">{data.campaigns.map((item) => <article key={item._id} className="rounded-2xl border border-line p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="font-bold">{item.name}</h3><p className="mt-1 text-sm text-muted">{item.goal} · {item.audience}</p>{item.strategy?.summary && <p className="mt-3 max-w-3xl text-sm">{item.strategy.summary}</p>}</div><div className="flex gap-2"><button onClick={() => action(`/api/admin/marketing/campaigns/${item._id}/generate`, { method: "POST" }).then(() => setMessage("Strategy, captions, and creative briefs generated.")).catch((e) => setMessage(e.message))} className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white"><Bot className="mr-1 inline h-4 w-4" /> Generate</button><button onClick={() => action(`/api/admin/marketing/campaigns/${item._id}`, { method: "DELETE" }).catch((e) => setMessage(e.message))} className="rounded-xl border border-line p-2"><Trash2 className="h-4 w-4" /></button></div></div></article>)}</div>
    </section>

    <section>
      <h2 className="mb-2 flex items-center gap-2 text-xl font-bold font-syncopate"><CalendarClock className="text-primary" /> Content queue</h2>
      <p className="mb-6 text-sm text-muted">Review captions and video scripts, then approve or schedule each post.</p>
      <div className="space-y-4">{data.posts.map((post) => <article key={post._id} className="glass rounded-2xl p-5"><div className="flex flex-col gap-4 lg:flex-row lg:justify-between"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">{post.platform} · {post.format} · {post.status}</p><h3 className="mt-2 font-bold">{post.title}</h3><p className="mt-3 whitespace-pre-line text-sm text-muted">{post.caption}</p>{post.videoStatus === "brief_ready" && <p className="mt-3 text-xs text-primary">Video script ready to render with Json2Video.</p>}{post.videoStatus === "processing" && <p className="mt-3 text-xs text-primary">Video rendering is in progress.</p>}{post.mediaUrl && <a href={post.mediaUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-bold text-primary hover:underline">Open rendered video</a>}{post.failureReason && <p className="mt-3 text-xs text-red-500">{post.failureReason}</p>}</div><div className="flex shrink-0 flex-wrap gap-2">{post.format === "video" && post.videoStatus === "brief_ready" && <button onClick={() => action(`/api/admin/marketing/posts/${post._id}/render-video`, { method: "POST" }).then(() => setMessage("Video render submitted to Json2Video.")).catch((e) => setMessage(e.message))} className="rounded-xl border border-primary px-3 py-2 text-xs text-primary">Render video</button>}{post.videoStatus === "processing" && <button onClick={() => action(`/api/admin/marketing/posts/${post._id}/video-status`).catch((e) => setMessage(e.message))} className="rounded-xl border border-primary px-3 py-2 text-xs text-primary">Refresh video</button>}<button onClick={() => action(`/api/admin/marketing/posts/${post._id}`, { method: "PATCH", body: JSON.stringify({ status: "approved" }) }).catch((e) => setMessage(e.message))} className="rounded-xl border border-line px-3 py-2 text-xs">Approve</button><button onClick={() => { const scheduledAt = window.prompt("Schedule date/time (example: 2026-07-10T09:00:00+05:30)"); if (scheduledAt) void action(`/api/admin/marketing/posts/${post._id}`, { method: "PATCH", body: JSON.stringify({ status: "scheduled", scheduledAt }) }).catch((e) => setMessage(e.message)); }} className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white">Schedule</button><button onClick={() => action(`/api/admin/marketing/posts/${post._id}`, { method: "DELETE" }).catch((e) => setMessage(e.message))} className="rounded-xl border border-line p-2"><Trash2 className="h-4 w-4" /></button></div></div></article>)}</div>
    </section>
  </div>;
}
