import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactNew from "@/components/ui-new/ContactNew";
import FooterNew from "@/components/ui-new/FooterNew";
import NavNew from "@/components/ui-new/NavNew";
import Particles from "@/components/Particles";
import { absoluteUrl } from "@/lib/site";
import { primaryKeywords, seoServices, servicePath, site, type SeoService } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return seoServices.map((service) => ({
    slug: service.slug,
  }));
}

const getService = (slug: string) => seoServices.find((service) => service.slug === slug);

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const url = servicePath(service.slug);

  return {
    title: `${service.title} in Sri Lanka`,
    description: service.metadataDescription,
    keywords: [...service.keywords, ...primaryKeywords.slice(0, 5)],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title: `${service.title} in Sri Lanka | ${site.name}`,
      description: service.metadataDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${service.title} by ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} in Sri Lanka | ${site.name}`,
      description: service.metadataDescription,
      images: ["/og-image.png"],
    },
  };
}

const buildServiceStructuredData = (service: SeoService) => {
  const url = absoluteUrl(servicePath(service.slug));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.title,
        url,
        description: service.description,
        keywords: service.keywords.join(", "),
        provider: {
          "@id": `${site.url}/#organization`,
          name: site.name,
          url: site.url,
        },
        areaServed: [
          {
            "@type": "Country",
            name: site.country,
          },
          {
            "@type": "Place",
            name: "Global",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} capabilities`,
          itemListElement: service.capabilities.map((capability) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: capability,
              provider: {
                "@id": `${site.url}/#organization`,
              },
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${service.title} in Sri Lanka | ${site.name}`,
        description: service.metadataDescription,
        isPartOf: {
          "@id": `${site.url}/#website`,
        },
        about: {
          "@id": `${url}#service`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/og-image.png"),
          width: 1200,
          height: 630,
        },
        inLanguage: site.language,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: absoluteUrl("/#services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
    ],
  };
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = seoServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const structuredData = buildServiceStructuredData(service);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="scanline" />
      <Particles />
      <NavNew />

      <section className="relative px-6 pt-32 pb-14 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
        <div className="absolute right-[-220px] top-24 h-[460px] w-[460px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted font-rajdhani">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                {service.shortTitle}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase text-primary font-syncopate">
                {service.title}
              </p>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl font-syncopate">
                {service.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted lg:text-xl font-rajdhani">
                {service.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-xs font-bold uppercase text-white transition-all hover:bg-primary/90 font-syncopate border-glow"
                >
                  Start a Project
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-7 py-4 text-xs font-bold uppercase text-foreground transition-all hover:border-primary/50 hover:text-primary font-syncopate"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <aside className="glass-dark border-line p-6 lg:p-8" aria-label={`${service.title} summary`}>
              <h2 className="text-lg font-bold uppercase text-foreground font-syncopate">
                Service Focus
              </h2>
              <div className="mt-6 space-y-4">
                {service.outcomes.slice(0, 4).map((outcome) => (
                  <div key={outcome} className="border-l-2 border-primary/70 pl-4">
                    <p className="text-sm leading-relaxed text-muted font-rajdhani">{outcome}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:py-20" aria-labelledby="capabilities-heading">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="capabilities-heading" className="text-2xl font-bold text-foreground md:text-4xl font-syncopate">
              What Kryvazent Builds
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-primary" />
            <p className="mt-6 text-base leading-relaxed text-muted font-rajdhani">
              Each engagement is scoped around the product outcome, the team that will use it, and the technical foundation needed for the next stage of growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {service.capabilities.map((capability) => (
              <article key={capability} className="glass border-line p-5">
                <h3 className="text-base font-bold text-foreground font-syncopate">{capability}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-strong px-6 py-12 lg:py-20" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl">
          <h2 id="process-heading" className="text-2xl font-bold text-foreground md:text-4xl font-syncopate">
            Project Process
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-primary" />

          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <li key={step} className="relative border border-line bg-background p-5">
                <span className="text-xs font-bold text-primary font-syncopate">
                  Step {index + 1}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted font-rajdhani">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-12 lg:py-20" aria-labelledby="service-faq-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="service-faq-heading" className="text-2xl font-bold text-foreground md:text-4xl font-syncopate">
            {service.shortTitle} FAQ
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-primary" />

          <div className="mt-8 space-y-4">
            {service.faqs.map((entry) => (
              <article key={entry.question} className="glass border-line p-6">
                <h3 className="text-lg font-bold text-foreground font-syncopate">{entry.question}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted font-rajdhani">{entry.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-12 lg:py-20" aria-labelledby="related-services-heading">
        <div className="mx-auto max-w-7xl">
          <h2 id="related-services-heading" className="text-2xl font-bold text-foreground md:text-4xl font-syncopate">
            Related Services
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-primary" />

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={servicePath(related.slug)}
                className="group glass border-line p-6 transition-colors hover:border-primary/50"
              >
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary font-syncopate">
                  {related.shortTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted font-rajdhani">
                  {related.metadataDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactNew />
      <FooterNew />
    </main>
  );
}
