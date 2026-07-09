"use client";

import { Plus } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { EditorCard, Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";

export default function ProjectsAdminPage() {
  const { draft, setDraft } = useAdmin();
  const update = (index: number, changes: Partial<(typeof draft.projects)[number]>) => setDraft((current) => ({ ...current, projects: current.projects.map((item, i) => i === index ? { ...item, ...changes } : item) }));
  return <section><PageHeading title="Projects" description="Manage portfolio and capability cards." action={<button onClick={() => setDraft((current) => ({ ...current, projects: [...current.projects, { title: "New project", category: "", description: "", image: "", tech: [], outcome: "", useCase: "", published: false }] }))} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm"><Plus className="h-4 w-4" /> Add</button>} />
    <div className="space-y-5">{draft.projects.map((project, index) => <EditorCard key={index} title={project.title} published={project.published} onPublished={(published) => update(index, { published })} onRemove={() => setDraft((current) => ({ ...current, projects: current.projects.filter((_, i) => i !== index) }))}>
      <div className="grid gap-4 md:grid-cols-2">{(["title", "category", "image", "outcome", "useCase"] as const).map((field) => <Field key={field} label={field === "useCase" ? "Use case" : field} value={project[field]} onChange={(value) => update(index, { [field]: value })} />)}<label className="md:col-span-2"><span className={labelClass}>Description</span><textarea rows={3} value={project.description} onChange={(event) => update(index, { description: event.target.value })} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Technology (one per line)</span><textarea rows={3} value={project.tech.join("\n")} onChange={(event) => update(index, { tech: event.target.value.split("\n").filter(Boolean) })} className={inputClass} /></label></div>
    </EditorCard>)}</div>
  </section>;
}
