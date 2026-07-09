"use client";

import { Plus } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { EditorCard, Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";

export default function TestimonialsAdminPage() {
  const { draft, setDraft } = useAdmin();
  const update = (index: number, changes: Partial<(typeof draft.testimonials)[number]>) => setDraft((current) => ({ ...current, testimonials: current.testimonials.map((item, i) => i === index ? { ...item, ...changes } : item) }));
  return <section><PageHeading title="Testimonials" description="Manage approved client quotes and drafts." action={<button onClick={() => setDraft((current) => ({ ...current, testimonials: [...current.testimonials, { quote: "", name: "Client name", role: "", company: "", published: false }] }))} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm"><Plus className="h-4 w-4" /> Add</button>} />
    <div className="space-y-5">{draft.testimonials.map((item, index) => <EditorCard key={index} title={item.name} published={item.published} onPublished={(published) => update(index, { published })} onRemove={() => setDraft((current) => ({ ...current, testimonials: current.testimonials.filter((_, i) => i !== index) }))}><div className="grid gap-4 md:grid-cols-3">{(["name", "role", "company"] as const).map((field) => <Field key={field} label={field} value={item[field]} onChange={(value) => update(index, { [field]: value })} />)}<label className="md:col-span-3"><span className={labelClass}>Quote</span><textarea rows={4} value={item.quote} onChange={(event) => update(index, { quote: event.target.value })} className={inputClass} /></label></div></EditorCard>)}</div>
  </section>;
}
