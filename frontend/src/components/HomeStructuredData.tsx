import { absoluteUrl } from "@/lib/site";
import { homepageFaqs, seoServices, servicePath, site } from "@/lib/seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      isPartOf: {
        "@id": `${site.url}/#website`,
      },
      about: {
        "@id": `${site.url}/#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
      },
      description: site.description,
      mainEntity: {
        "@id": `${site.url}/#services`,
      },
      inLanguage: site.language,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#services`,
      name: `${site.name} software engineering services`,
      itemListElement: seoServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(servicePath(service.slug)),
        name: service.title,
        description: service.description,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: homepageFaqs.map((entry) => ({
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

const HomeStructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default HomeStructuredData;
