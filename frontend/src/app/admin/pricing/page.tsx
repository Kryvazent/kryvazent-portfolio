"use client";

import { Plus } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Field, inputClass, labelClass, PageHeading } from "@/components/admin/EditorUI";
import type { PricingPlan } from "@/lib/content";

const blankPlan: PricingPlan = { name: "New tier", audience: "", price: "Custom quote", priceNote: "Scoped per project", features: ["Add a feature"], highlighted: false };

export default function PricingAdminPage() {
  const { draft, setDraft } = useAdmin();
  const updatePlan = (index: number, plan: PricingPlan) => setDraft((current) => ({ ...current, pricing: { ...current.pricing, plans: current.pricing.plans.map((item, i) => i === index ? plan : item) } }));
  const updateHeader = (field: "eyebrow" | "title" | "description", value: string) => setDraft((current) => ({ ...current, pricing: { ...current.pricing, [field]: value } }));
  return (
    <section>
      <PageHeading title="Pricing" description="Manage the public pricing introduction and service tiers." />
      <div className="glass rounded-3xl p-5 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Eyebrow" value={draft.pricing.eyebrow} onChange={(value) => updateHeader("eyebrow", value)} />
          <Field label="Heading" value={draft.pricing.title} onChange={(value) => updateHeader("title", value)} />
          <label className="md:col-span-2"><span className={labelClass}>Introduction</span><textarea rows={3} value={draft.pricing.description} onChange={(event) => updateHeader("description", event.target.value)} className={inputClass} /></label>
        </div>
        <div className="mt-8 space-y-5">
          {draft.pricing.plans.map((plan, index) => (
            <article key={index} className="rounded-2xl border border-line bg-surface p-5">
              <div className="mb-5 flex justify-between"><h3 className="font-bold">Tier {index + 1}</h3><button disabled={draft.pricing.plans.length === 1} onClick={() => setDraft((current) => ({ ...current, pricing: { ...current.pricing, plans: current.pricing.plans.filter((_, i) => i !== index) } }))} className="text-sm text-muted hover:text-primary disabled:opacity-30">Remove</button></div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" value={plan.name} onChange={(value) => updatePlan(index, { ...plan, name: value })} />
                <Field label="Audience" value={plan.audience} onChange={(value) => updatePlan(index, { ...plan, audience: value })} />
                <Field label="Price" value={plan.price} onChange={(value) => updatePlan(index, { ...plan, price: value })} />
                <Field label="Price note" value={plan.priceNote} onChange={(value) => updatePlan(index, { ...plan, priceNote: value })} />
                <label className="md:col-span-2"><span className={labelClass}>Features (one per line)</span><textarea rows={5} value={plan.features.join("\n")} onChange={(event) => updatePlan(index, { ...plan, features: event.target.value.split("\n") })} className={inputClass} /></label>
                <label className="flex items-center gap-3 text-sm"><input type="radio" name="highlighted" checked={plan.highlighted} onChange={() => setDraft((current) => ({ ...current, pricing: { ...current.pricing, plans: current.pricing.plans.map((item, i) => ({ ...item, highlighted: i === index })) } }))} /> Recommended tier</label>
              </div>
            </article>
          ))}
        </div>
        <button onClick={() => setDraft((current) => ({ ...current, pricing: { ...current.pricing, plans: [...current.pricing.plans, { ...blankPlan, features: [...blankPlan.features] }] } }))} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-dashed border-line px-4 py-3 text-sm"><Plus className="h-4 w-4" /> Add tier</button>
      </div>
    </section>
  );
}
