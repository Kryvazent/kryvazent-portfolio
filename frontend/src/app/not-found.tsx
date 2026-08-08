import Link from "next/link";
import NavNew from "@/components/ui-new/NavNew";
import FooterNew from "@/components/ui-new/FooterNew";

export default function NotFound() {
  return (
    <>
      <NavNew />
      <main className="min-h-screen bg-background px-6 pb-20 pt-36 text-foreground">
        <section className="mx-auto flex max-w-4xl flex-col items-start">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary font-syncopate">404</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold font-syncopate md:text-6xl">
            This page drifted outside the orbit.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            The page you’re looking for does not exist, may have moved, or is still being built.
            Head back to the Kryvazent homepage and keep exploring from there.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:opacity-90">
              Back to homepage
            </Link>
            <Link href="/#contact" className="rounded-xl border border-line px-6 py-3 font-bold text-foreground transition hover:border-primary hover:text-primary">
              Contact us
            </Link>
          </div>
        </section>
      </main>
      <FooterNew />
    </>
  );
}
