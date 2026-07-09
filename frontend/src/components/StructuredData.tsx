import { absoluteUrl } from "@/lib/site";
import { primaryKeywords, primaryNavLinks, seoServices, servicePath, site } from "@/lib/seo";

const serviceOffers = seoServices.map((service) => ({
  "@type": "Offer",
  url: absoluteUrl(servicePath(service.slug)),
  itemOffered: {
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath(service.slug))}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: {
      "@id": `${site.url}/#organization`,
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
  },
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: site.logo,
      image: site.logo,
      description: site.description,
      email: site.email,
      telephone: site.phoneHref,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          telephone: site.phoneHref,
          areaServed: [site.countryCode, "Global"],
          availableLanguage: [site.language],
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.email,
          telephone: site.phoneHref,
          areaServed: [site.countryCode, "Global"],
          availableLanguage: [site.language],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: site.countryCode,
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
      knowsAbout: primaryKeywords,
      makesOffer: serviceOffers,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${site.name} software development services`,
        itemListElement: serviceOffers,
      },
      priceRange: "$$",
      slogan: site.slogan,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: {
        "@id": `${site.url}/#organization`,
      },
      description: site.shortDescription,
      inLanguage: site.language,
      about: {
        "@id": `${site.url}/#organization`,
      },
    },
    ...primaryNavLinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      "@id": `${site.url}/#navigation-${index + 1}`,
      position: index + 1,
      name: link.name,
      url: absoluteUrl(link.href),
    })),
  ],
};

const StructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default StructuredData;
