export const inputClass = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-foreground outline-none transition focus:border-primary";
export const labelClass = "mb-2 block text-xs font-bold uppercase tracking-widest text-muted";

export function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label><span className={labelClass}>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} /></label>;
}

export function PageHeading({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-bold font-syncopate">{title}</h2><p className="mt-2 text-muted">{description}</p></div>{action}</div>;
}

export function EditorCard({ title, published, onPublished, onRemove, children }: { title: string; published: boolean; onPublished: (value: boolean) => void; onRemove: () => void; children: React.ReactNode }) {
  return <article className="rounded-2xl border border-line bg-surface p-5"><div className="mb-5 flex items-center justify-between gap-3"><h3 className="font-bold">{title}</h3><div className="flex items-center gap-3"><label className="flex items-center gap-2 text-xs text-muted"><input type="checkbox" checked={published} onChange={(event) => onPublished(event.target.checked)} className="accent-red-600" /> Published</label><button onClick={onRemove} className="text-sm text-muted hover:text-primary">Remove</button></div></div>{children}</article>;
}
