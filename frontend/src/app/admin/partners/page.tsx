"use client";

import { Plus } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { EditorCard, Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";

export default function PartnersAdminPage() {
  const { draft, setDraft } = useAdmin();
  const update = (index: number, changes: Partial<(typeof draft.partners)[number]>) => setDraft((current) => ({ ...current, partners: current.partners.map((item, i) => i === index ? { ...item, ...changes } : item) }));
  return <section><PageHeading title="Partners" description="Manage organizations in the partner strip." action={<button onClick={() => setDraft((current) => ({ ...current, partners: [...current.partners, { name: "New partner", tagline: "", logoUrl: "", initials: "NP", tone: "light", published: false }] }))} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm"><Plus className="h-4 w-4" /> Add</button>} />
    <div className="space-y-5">{draft.partners.map((partner, index) => <EditorCard key={index} title={partner.name} published={partner.published} onPublished={(published) => update(index, { published })} onRemove={() => setDraft((current) => ({ ...current, partners: current.partners.filter((_, i) => i !== index) }))}><div className="grid gap-4 md:grid-cols-2">{(["name", "tagline", "logoUrl", "initials"] as const).map((field) => <Field key={field} label={field === "logoUrl" ? "Logo URL" : field} value={partner[field]} onChange={(value) => update(index, { [field]: value })} />)}<label><span className={labelClass}>Tile style</span><select value={partner.tone} onChange={(event) => update(index, { tone: event.target.value as "dark" | "gray" | "light" })} className={inputClass}><option value="light">Light</option><option value="gray">Gray</option><option value="dark">Dark</option></select></label></div></EditorCard>)}</div>
  </section>;
}
