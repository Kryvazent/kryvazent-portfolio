"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
type Staff = { _id?: string; id?: string; name: string; email: string; role: "admin" | "editor"; team: "marketing" | "maintenance" | "project_management" | "administrative"; active: boolean; lastLoginAt?: string };

export default function StaffPage() {
  const { token, user } = useAdmin();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor", team: "maintenance" });
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const load = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/admin/users`, { headers });
    if (!response.ok) throw new Error("Unable to load staff");
    setStaff(await response.json());
  }, [token]);
  useEffect(() => { if (user?.role === "admin") void load().catch((error) => setMessage(error.message)); }, [load, user]);
  if (user?.role !== "admin") return <p className="text-muted">Only administrators can manage staff accounts.</p>;
  const create = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/admin/users`, { method: "POST", headers, body: JSON.stringify(form) });
    const result = await response.json();
    if (!response.ok) return setMessage(result.message || "Unable to create staff account");
    setForm({ name: "", email: "", password: "", role: "editor", team: "maintenance" });
    setMessage("Staff account created.");
    await load();
  };
  const update = async (item: Staff, changes: Partial<Staff>) => {
    const response = await fetch(`${API_URL}/api/admin/users/${item._id || item.id}`, { method: "PATCH", headers, body: JSON.stringify(changes) });
    if (!response.ok) return setMessage("Unable to update staff account");
    await load();
  };
  const remove = async (item: Staff) => {
    if (!window.confirm(`Delete ${item.name}'s account?`)) return;
    const response = await fetch(`${API_URL}/api/admin/users/${item._id || item.id}`, { method: "DELETE", headers });
    if (!response.ok) return setMessage("Unable to delete staff account");
    await load();
  };
  return <section>
    <PageHeading title="Staff & teams" description="Create staff logins and assign access by team." />
    {message && <p className="mb-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">{message}</p>}
    <form onSubmit={create} className="glass grid gap-4 rounded-3xl p-6 md:grid-cols-2 xl:grid-cols-3">
      <Field label="Full name" value={form.name} onChange={(name) => setForm({ ...form, name })} />
      <Field label="Email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
      <label><span className={labelClass}>Temporary password</span><input type="password" minLength={10} required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className={inputClass} /></label>
      <label><span className={labelClass}>Team</span><select value={form.team} onChange={(event) => setForm({ ...form, team: event.target.value })} className={inputClass}><option value="marketing">Marketing</option><option value="maintenance">Maintenance</option><option value="project_management">Project management</option><option value="administrative">Administrative</option></select></label>
      <label><span className={labelClass}>Account role</span><select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className={inputClass}><option value="editor">Staff</option><option value="admin">System administrator</option></select></label>
      <button className="self-end rounded-xl bg-primary px-4 py-3 font-bold text-white"><Plus className="mr-2 inline h-4 w-4" />Add staff</button>
    </form>
    <div className="mt-7 space-y-3">{staff.map((item) => <article key={item._id || item.id} className="glass flex flex-col gap-4 rounded-2xl p-5 lg:flex-row lg:items-center"><div className="min-w-0 flex-1"><strong>{item.name}</strong><p className="text-sm text-muted">{item.email}{item.lastLoginAt ? ` · Last login ${new Date(item.lastLoginAt).toLocaleString()}` : " · Never logged in"}</p></div><select value={item.team} onChange={(event) => void update(item, { team: event.target.value as Staff["team"] })} className="rounded-xl border border-line bg-surface px-3 py-2 text-sm"><option value="marketing">Marketing</option><option value="maintenance">Maintenance</option><option value="project_management">Project management</option><option value="administrative">Administrative</option></select><select value={item.role} onChange={(event) => void update(item, { role: event.target.value as Staff["role"] })} className="rounded-xl border border-line bg-surface px-3 py-2 text-sm"><option value="editor">Staff</option><option value="admin">Admin</option></select><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={item.active} onChange={(event) => void update(item, { active: event.target.checked })} /> Active</label><button onClick={() => void remove(item)} className="rounded-lg p-2 text-muted hover:text-primary"><Trash2 className="h-4 w-4" /></button></article>)}</div>
  </section>;
}
