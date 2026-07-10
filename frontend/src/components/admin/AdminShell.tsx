"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, CreditCard, Download, ExternalLink, FolderKanban, Handshake, LogOut, Megaphone, MessageSquareQuote, RotateCcw, Save, Upload, Users } from "lucide-react";
import { useAdmin } from "./AdminProvider";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isMarketing = pathname.startsWith("/admin/marketing");
  const isAdministrative = admin.user?.role === "admin" || admin.user?.team === "administrative";
  const canMaintain = isAdministrative || admin.user?.team === "maintenance";
  const canMarket = isAdministrative || admin.user?.team === "marketing";
  const canManageProjects = isAdministrative || admin.user?.team === "project_management";
  const saveLabel = admin.saveStatus === "saving" ? "Saving…" : admin.saveStatus === "dirty" ? "Unsaved changes — save before leaving" : admin.saveStatus === "error" ? "Save failed" : admin.saveStatus === "saved" ? "Saved" : "Ready";
  const confirmLeaveIfUnsaved = () => !admin.hasUnsavedChanges || window.confirm("You have unsaved website changes. Leave without saving?");
  const navGroups = [
    { label: "Marketing team", visible: canMarket, items: [{ href: "/admin/marketing/", label: "Marketing workflow", icon: Megaphone }] },
    { label: "Maintenance team", visible: canMaintain, items: [
      { href: "/admin/pricing/", label: "Pricing", icon: CreditCard },
      { href: "/admin/projects/", label: "Public projects", icon: FolderKanban },
      { href: "/admin/testimonials/", label: "Testimonials", icon: MessageSquareQuote },
      { href: "/admin/partners/", label: "Partners", icon: Handshake },
    ] },
    { label: "Project management", visible: canManageProjects, items: [
      { href: "/admin/client-projects/", label: "Client projects", icon: BriefcaseBusiness },
    ] },
    { label: "Administration", visible: isAdministrative, items: [
      ...(isAdministrative ? [{ href: "/admin/staff/", label: "Staff & teams", icon: Users }] : []),
    ] },
  ];

  useEffect(() => {
    if (admin.ready && admin.token && admin.user && (pathname === "/admin" || pathname === "/admin/")) {
      router.replace(admin.user.team === "marketing" && admin.user.role !== "admin" ? "/admin/marketing/" : admin.user.team === "maintenance" && admin.user.role !== "admin" ? "/admin/pricing/" : "/admin/client-projects/");
    }
  }, [admin.ready, admin.token, admin.user, pathname, router]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await admin.login(email, password);
      router.replace("/admin/");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    }
  };

  if (!admin.ready) return <main className="min-h-screen bg-background p-8 text-muted">Loading admin…</main>;
  if (!admin.token) return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={login} className="glass w-full max-w-md rounded-3xl p-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">Secure CMS</p>
        <h1 className="mb-3 text-3xl font-bold font-syncopate">Admin login</h1>
        <p className="mb-7 text-sm text-muted">Use your MongoDB-backed administrator account.</p>
        {error && <p className="mb-4 rounded-xl bg-primary/10 p-3 text-sm text-primary">{error}</p>}
        <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-primary" /></label>
        <label className="mt-4 block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-primary" /></label>
        <button className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-white">Sign in</button>
      </form>
    </main>
  );

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="border-b border-line bg-surface-strong p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-5 hidden lg:block"><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Kryvazent</p><h1 className="mt-2 text-xl font-bold font-syncopate">Website admin</h1></div>
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin pages">
          {navGroups.filter((group) => group.visible).map((group) => <div key={group.label} className="contents lg:block"><p className="mb-1 mt-4 hidden px-4 text-[10px] font-bold uppercase tracking-widest text-subtle lg:block">{group.label}</p>{group.items.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href.replace(/\/$/, ""));
            return <Link key={href} href={href} onClick={(event) => { if (!confirmLeaveIfUnsaved()) event.preventDefault(); }} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${active ? "bg-primary text-white" : "text-muted hover:bg-primary/10 hover:text-primary"}`}><Icon className="h-4 w-4" />{label}</Link>;
          })}</div>)}
        </nav>
        <div className="mt-4 flex gap-2 border-t border-line pt-4 lg:flex-col">
          <Link href="/" target="_blank" onClick={(event) => { if (!confirmLeaveIfUnsaved()) event.preventDefault(); }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted hover:text-primary"><ExternalLink className="h-4 w-4" /> View site</Link>
          <button onClick={() => { if (confirmLeaveIfUnsaved()) admin.logout(); }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-muted hover:text-primary"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-8 lg:p-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-line pb-6 xl:flex-row xl:items-end xl:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{isMarketing ? "Marketing automation" : "Content manager"}</p><p className="mt-2 text-sm text-muted">{isMarketing ? "Plan, generate, approve, schedule, and publish campaigns." : "Changes are manual-save. You’ll be reminded before leaving with unsaved edits."}</p>{!isMarketing && canMaintain && <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${admin.saveStatus === "error" ? "bg-red-500/10 text-red-500" : admin.saveStatus === "saving" || admin.saveStatus === "dirty" ? "bg-primary/10 text-primary" : "bg-line text-muted"}`}>{saveLabel}</p>}</div>
          {!isMarketing && canMaintain && <div className="flex flex-wrap gap-2">
            <button onClick={() => fileInput.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm"><Upload className="h-4 w-4" /> Import</button>
            <input ref={fileInput} type="file" accept="application/json" className="hidden" onChange={async (event) => { const file = event.target.files?.[0]; if (file) try { await admin.importContent(file); } catch (e) { admin.setNotice(e instanceof Error ? e.message : "Import failed"); } event.target.value = ""; }} />
            <button onClick={admin.exportContent} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm"><Download className="h-4 w-4" /> Export</button>
            <button onClick={admin.restoreDefaults} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm"><RotateCcw className="h-4 w-4" /> Defaults</button>
            <button onClick={() => admin.publish().catch((e) => admin.setNotice(e instanceof Error ? e.message : "Save failed"))} disabled={admin.saveStatus === "saving"} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60"><Save className="h-4 w-4" /> Save now</button>
          </div>}
        </header>
        {admin.notice && <p role="status" className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">{admin.notice}</p>}
        {children}
      </main>
    </div>
  );
}
