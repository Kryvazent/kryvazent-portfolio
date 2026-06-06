const siteUrl = "https://www.kryverzent.com";

const services = [
  "Custom web application development",
  "Mobile application development",
  "Cloud infrastructure and DevOps",
  "AI and machine learning product integration",
  "UI and UX engineering",
  "Backend system design and API development",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Kryverzent",
      legalName: "Kryverzent Systems Inc.",
      url: siteUrl,
      logo: `${siteUrl}/logo_new.png`,
      image: `${siteUrl}/logo_new.png`,
      description:
        "Kryverzent is a software development and technology engineering company that builds custom web applications, mobile applications, AI-enabled systems, cloud infrastructure, backend platforms, and digital product experiences.",
      email: "info@kryverzent.com",
      telephone: "+94704443997",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressRegion: "Western Province",
        addressCountry: "LK",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Sri Lanka",
        },
        {
          "@type": "Place",
          name: "Global",
        },
      ],
      knowsAbout: [
        "Software engineering",
        "Web application development",
        "Mobile application development",
        "Artificial intelligence",
        "Machine learning",
        "Cloud infrastructure",
        "Backend architecture",
        "User interface design",
        "User experience engineering",
      ],
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: {
            "@id": `${siteUrl}/#organization`,
          },
        },
      })),
      slogan: "Engineering the Impossible",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Kryverzent",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      description:
        "The official Kryverzent website explains the company's software development services, project capabilities, technology tiers, partner network, company background, and contact information.",
      inLanguage: "en",
      about: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "Kryverzent software engineering services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service,
      })),
    },
  ],
};

const StructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;
