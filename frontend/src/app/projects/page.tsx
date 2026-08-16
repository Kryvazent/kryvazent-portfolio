import type { Metadata } from "next";
import Link from "next/link";
import NavNew from "@/components/ui-new/NavNew";
import FooterNew from "@/components/ui-new/FooterNew";
import ContactNew from "@/components/ui-new/ContactNew";
import ProjectsPageClient from "./ProjectsPageClient";
import { absoluteUrl } from "@/lib/site";
import { site } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects & Capabilities | Kryvazent",
  description:
    "Explore the software products and technical systems Kryvazent has built — from AI dashboards and web applications to cloud automation and mobile platforms.",
  keywords: [
    "kryvazent projects",
    "software portfolio",
    "web application development",
    "AI engineering",
    "cloud automation",
    "Sri Lanka software company",
  ],
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: absoluteUrl("/projects"),
    siteName: site.name,
    title: "Projects & Capabilities | Kryvazent",
    description:
      "Explore the software products and technical systems Kryvazent has built — from AI dashboards and web applications to cloud automation and mobile platforms.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kryvazent Project Capabilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Capabilities | Kryvazent",
    description:
      "Explore the software products and technical systems Kryvazent has built — from AI dashboards and web applications to cloud automation and mobile platforms.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="scanline" />
      <NavNew />

      {/* Hero */}
      <section className="relative pt-32 pb-14 lg:pt-40 lg:pb-20 px-[clamp(16px,4vw,24px)] overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
        <div className="absolute right-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
        <div className="absolute left-[-160px] bottom-0 h-[380px] w-[380px] rounded-full bg-primary/6 blur-[110px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted font-rajdhani">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                Projects
              </li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate mb-[18px] eyebrow-line">
            Capabilities in action
          </span>
          <h1 className="font-syncopate font-bold text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.02em] leading-[1.12] mb-5 max-w-3xl">
            Project{" "}
            <span className="bg-gradient-to-r from-[#FF4757] via-[#D62133] to-[#A31527] bg-clip-text text-transparent">
              Capabilities
            </span>
          </h1>
          <p className="text-muted text-[clamp(15px,2vw,18px)] font-rajdhani leading-relaxed max-w-2xl mb-10">
            Software products and technical systems Kryvazent can plan, build, deploy, and improve.
            Each example represents a real capability pattern applied to a business need.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-[13px] rounded-[11px] font-syncopate font-bold text-[13px] bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527] text-white shadow-[0_10px_28px_rgba(214,33,51,0.35)] hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(214,33,51,0.5)] transition-all duration-200"
            >
              Discuss Your Project
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center px-6 py-[13px] rounded-[11px] border border-line bg-surface font-syncopate font-bold text-[13px] text-foreground hover:border-primary hover:text-primary transition-all duration-200"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic project grid with filter */}
      <ProjectsPageClient />

      {/* CTA */}
      <ContactNew />
      <FooterNew />
    </div>
  );
}
