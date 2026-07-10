"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";
import { UploadField } from "@/components/admin/UploadField";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
type Staff = { _id: string; name: string; email: string; team: string };
type Project = {
  _id: string; name: string; clientCompany: string; description: string; scope: string; services: string[];
  status: string; priority: string; budget: number; currency: string; startDate?: string; targetEndDate?: string;
  assignedStaff: Staff[]; contacts: { _id?: string; name: string; email: string; phone: string; role: string }[];
  tasks: { _id: string; title: string; description: string; status: string; priority: string; dueDate?: string; assignee?: Staff }[];
  milestones: { _id: string; title: string; description: string; status: string; dueDate?: string; amount: number }[];
  notes: { _id: string; body: string; author?: Staff; createdAt: string }[];
  links: { _id: string; label: string; url: string; category: string }[];
  updatedAt: string;
};
const blankProject = { name: "", clientCompany: "", description: "", scope: "", services: "", status: "lead", priority: "medium", budget: 0, currency: "USD", startDate: "", targetEndDate: "" };

export default function ClientProjectsPage() {
  const { token } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [createForm, setCreateForm] = useState(blankProject);
  const [message, setMessage] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo", priority: "medium", dueDate: "", assignee: "" });
  const [newMilestone, setNewMilestone] = useState({ title: "", description: "", status: "planned", dueDate: "", amount: 0 });
  const [newNote, setNewNote] = useState("");
  const [newLink, setNewLink] = useState({ label: "", url: "", category: "other" });
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const load = useCallback(async () => {
    const [projectResponse, staffResponse] = await Promise.all([
      fetch(`${API_URL}/api/admin/projects`, { headers }),
      fetch(`${API_URL}/api/admin/projects/staff-options`, { headers }),
    ]);
    if (!projectResponse.ok) throw new Error("Unable to load client projects");
    setProjects(await projectResponse.json());
    if (staffResponse.ok) setStaff(await staffResponse.json());
  }, [token]);
  useEffect(() => { void load().catch((error) => setMessage(error.message)); }, [load]);
  const reloadSelected = async (id: string) => {
    const response = await fetch(`${API_URL}/api/admin/projects/${id}`, { headers });
    const project = await response.json();
    if (!response.ok) throw new Error(project.message || "Unable to load project");
    setSelected(project);
    await load();
  };
  const create = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/admin/projects`, { method: "POST", headers, body: JSON.stringify({ ...createForm, services: createForm.services.split(",").map((value) => value.trim()).filter(Boolean), startDate: createForm.startDate || null, targetEndDate: createForm.targetEndDate || null }) });
    const project = await response.json();
    if (!response.ok) return setMessage(project.message || "Unable to create project");
    setCreateForm(blankProject);
    setSelected(project);
    setMessage("Client project created.");
    await load();
  };
  const save = async () => {
    if (!selected) return;
    const payload = { ...selected, assignedStaff: selected.assignedStaff.map((item) => item._id), tasks: undefined, milestones: undefined, notes: undefined, links: undefined };
    const response = await fetch(`${API_URL}/api/admin/projects/${selected._id}`, { method: "PATCH", headers, body: JSON.stringify(payload) });
    if (!response.ok) return setMessage("Unable to save project");
    setMessage("Project details saved.");
    await reloadSelected(selected._id);
  };
  const add = async (section: "tasks" | "milestones" | "notes" | "links", body: object) => {
    if (!selected) return;
    const response = await fetch(`${API_URL}/api/admin/projects/${selected._id}/${section}`, { method: "POST", headers, body: JSON.stringify(body) });
    if (!response.ok) return setMessage(`Unable to add ${section.slice(0, -1)}`);
    setSelected(await response.json());
    await load();
  };
  const removeProject = async () => {
    if (!selected || !window.confirm(`Delete ${selected.name}?`)) return;
    await fetch(`${API_URL}/api/admin/projects/${selected._id}`, { method: "DELETE", headers });
    setSelected(null);
    await load();
  };

  if (selected) return <section>
    <button onClick={() => setSelected(null)} className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-primary"><ArrowLeft className="h-4 w-4" /> All client projects</button>
    <PageHeading title={selected.name} description={`${selected.clientCompany} · Updated ${new Date(selected.updatedAt).toLocaleString()}`} action={<div className="flex gap-2"><button onClick={removeProject} className="rounded-xl border border-line p-3 text-muted hover:text-primary"><Trash2 className="h-4 w-4" /></button><button onClick={() => void save()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white"><Save className="h-4 w-4" /> Save project</button></div>} />
    {message && <p className="mb-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">{message}</p>}
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="glass rounded-3xl p-6 xl:col-span-2"><h3 className="mb-5 font-bold font-syncopate">Project details</h3><div className="grid gap-4 md:grid-cols-2"><Field label="Project name" value={selected.name} onChange={(name) => setSelected({ ...selected, name })} /><Field label="Client company" value={selected.clientCompany} onChange={(clientCompany) => setSelected({ ...selected, clientCompany })} /><label><span className={labelClass}>Status</span><select value={selected.status} onChange={(e) => setSelected({ ...selected, status: e.target.value })} className={inputClass}>{["lead","discovery","proposal","active","on_hold","completed","cancelled"].map((value) => <option key={value}>{value}</option>)}</select></label><label><span className={labelClass}>Priority</span><select value={selected.priority} onChange={(e) => setSelected({ ...selected, priority: e.target.value })} className={inputClass}>{["low","medium","high","urgent"].map((value) => <option key={value}>{value}</option>)}</select></label><Field label="Currency" value={selected.currency} onChange={(currency) => setSelected({ ...selected, currency })} /><label><span className={labelClass}>Budget</span><input type="number" value={selected.budget} onChange={(e) => setSelected({ ...selected, budget: Number(e.target.value) })} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Description</span><textarea rows={3} value={selected.description} onChange={(e) => setSelected({ ...selected, description: e.target.value })} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Scope</span><textarea rows={5} value={selected.scope} onChange={(e) => setSelected({ ...selected, scope: e.target.value })} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Services (comma separated)</span><input value={selected.services.join(", ")} onChange={(e) => setSelected({ ...selected, services: e.target.value.split(",").map((value) => value.trim()).filter(Boolean) })} className={inputClass} /></label></div></div>
      <div className="glass rounded-3xl p-6"><h3 className="mb-5 font-bold font-syncopate">Assigned staff</h3><div className="space-y-2">{staff.map((person) => <label key={person._id} className="flex items-center gap-3 rounded-xl border border-line p-3 text-sm"><input type="checkbox" checked={selected.assignedStaff.some((item) => item._id === person._id)} onChange={(e) => setSelected({ ...selected, assignedStaff: e.target.checked ? [...selected.assignedStaff, person] : selected.assignedStaff.filter((item) => item._id !== person._id) })} /><span><strong className="block">{person.name}</strong><span className="text-xs capitalize text-muted">{person.team}</span></span></label>)}</div></div>
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <ProjectCollection title="Tasks" items={selected.tasks.map((item) => <div key={item._id} className="rounded-xl border border-line p-4"><strong>{item.title}</strong><p className="text-xs capitalize text-primary">{item.status} · {item.priority}</p><p className="mt-2 text-sm text-muted">{item.description}</p></div>)}><div className="grid gap-3"><Field label="Task title" value={newTask.title} onChange={(title) => setNewTask({ ...newTask, title })} /><textarea placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className={inputClass} /><button onClick={() => void add("tasks", { ...newTask, dueDate: newTask.dueDate || null, assignee: newTask.assignee || null }).then(() => setNewTask({ title: "", description: "", status: "todo", priority: "medium", dueDate: "", assignee: "" }))} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">Add task</button></div></ProjectCollection>
      <ProjectCollection title="Milestones" items={selected.milestones.map((item) => <div key={item._id} className="rounded-xl border border-line p-4"><strong>{item.title}</strong><p className="text-xs capitalize text-primary">{item.status}{item.dueDate ? ` · ${new Date(item.dueDate).toLocaleDateString()}` : ""}</p><p className="mt-2 text-sm text-muted">{item.description}</p></div>)}><div className="grid gap-3"><Field label="Milestone title" value={newMilestone.title} onChange={(title) => setNewMilestone({ ...newMilestone, title })} /><textarea placeholder="Description" value={newMilestone.description} onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })} className={inputClass} /><button onClick={() => void add("milestones", { ...newMilestone, dueDate: newMilestone.dueDate || null }).then(() => setNewMilestone({ title: "", description: "", status: "planned", dueDate: "", amount: 0 }))} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">Add milestone</button></div></ProjectCollection>
      <ProjectCollection title="Internal notes" items={selected.notes.map((item) => <div key={item._id} className="rounded-xl border border-line p-4"><p className="text-sm">{item.body}</p><p className="mt-2 text-xs text-muted">{item.author?.name} · {new Date(item.createdAt).toLocaleString()}</p></div>)}><textarea placeholder="Add an internal note" value={newNote} onChange={(e) => setNewNote(e.target.value)} className={inputClass} /><button onClick={() => void add("notes", { body: newNote }).then(() => setNewNote(""))} className="mt-3 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">Add note</button></ProjectCollection>
      <ProjectCollection title="Project links" items={selected.links.map((item) => <a key={item._id} href={item.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-line p-4 hover:border-primary"><span><strong className="block">{item.label}</strong><span className="text-xs capitalize text-muted">{item.category}</span></span><ExternalLink className="h-4 w-4" /></a>)}><div className="grid gap-3"><Field label="Link label" value={newLink.label} onChange={(label) => setNewLink({ ...newLink, label })} /><UploadField label="URL or uploaded file" value={newLink.url} endpoint="clientProjectFile" accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip" preview="file" onChange={(url) => setNewLink({ ...newLink, url })} helper="Upload files for client projects, or paste an external URL." /><button onClick={() => void add("links", newLink).then(() => setNewLink({ label: "", url: "", category: "other" }))} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">Add link</button></div></ProjectCollection>
    </div>
  </section>;

  return <section><PageHeading title="Client projects" description="Manage delivery, client contacts, budgets, scope, milestones, tasks, notes, and project resources." />
    {message && <p className="mb-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">{message}</p>}
    <form onSubmit={create} className="glass grid gap-4 rounded-3xl p-6 md:grid-cols-2 xl:grid-cols-4"><Field label="Project name" value={createForm.name} onChange={(name) => setCreateForm({ ...createForm, name })} /><Field label="Client company" value={createForm.clientCompany} onChange={(clientCompany) => setCreateForm({ ...createForm, clientCompany })} /><Field label="Services" value={createForm.services} onChange={(services) => setCreateForm({ ...createForm, services })} /><label><span className={labelClass}>Budget</span><input type="number" value={createForm.budget} onChange={(e) => setCreateForm({ ...createForm, budget: Number(e.target.value) })} className={inputClass} /></label><button className="rounded-xl bg-primary px-4 py-3 font-bold text-white md:col-span-2 xl:col-span-4"><Plus className="mr-2 inline h-4 w-4" />Create project</button></form>
    <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <button key={project._id} onClick={() => void reloadSelected(project._id)} className="glass rounded-2xl p-6 text-left transition hover:border-primary"><div className="flex justify-between gap-3"><span className="text-xs font-bold uppercase text-primary">{project.status}</span><span className="text-xs capitalize text-muted">{project.priority}</span></div><h3 className="mt-3 text-lg font-bold font-syncopate">{project.name}</h3><p className="mt-2 text-sm text-muted">{project.clientCompany}</p><div className="mt-5 flex justify-between text-xs text-muted"><span>{project.tasks?.filter((item) => item.status !== "done").length || 0} open tasks</span><span>{project.currency} {project.budget.toLocaleString()}</span></div></button>)}</div>
  </section>;
}

function ProjectCollection({ title, items, children }: { title: string; items: React.ReactNode[]; children: React.ReactNode }) {
  return <section className="glass rounded-3xl p-6"><h3 className="mb-4 font-bold font-syncopate">{title}</h3><div className="mb-5 space-y-3">{items.length ? items : <p className="text-sm text-muted">Nothing added yet.</p>}</div><div className="border-t border-line pt-5">{children}</div></section>;
}
