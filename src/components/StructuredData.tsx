import { siteUrl } from "@/lib/site";

const services = [
  {
    name: "Custom web application development",
    description:
      "Designing and building reliable business web applications, dashboards, portals, internal tools, and customer-facing platforms.",
  },
  {
    name: "Mobile application development",
    description:
      "Creating native and cross-platform mobile apps with polished user experiences for iOS and Android users.",
  },
  {
    name: "Cloud infrastructure and DevOps",
    description:
      "Planning, deploying, and maintaining cloud infrastructure, CI/CD workflows, hosting, and scalable production environments.",
  },
  {
    name: "AI and machine learning product integration",
    description:
      "Adding AI-powered automation, intelligent search, recommendations, data workflows, and machine learning features to digital products.",
  },
  {
    name: "UI and UX engineering",
    description:
      "Designing and implementing usable, responsive, conversion-aware interfaces for web and mobile products.",
  },
  {
    name: "Backend system design and API development",
    description:
      "Building secure APIs, databases, authentication systems, backend services, and integrations for scalable applications.",
  },
];

const faqEntries = [
  {
    question: "What does Kryverzent do?",
    answer:
      "Kryverzent is a software development and technology engineering company that builds custom web applications, mobile apps, AI-enabled systems, cloud infrastructure, backend platforms, and digital product experiences.",
  },
  {
    question: "Who is Kryverzent for?",
    answer:
      "Kryverzent works with startups, growing businesses, and organizations that need reliable software engineering for new products, modernization, automation, or scalable digital systems.",
  },
  {
    question: "What services does Kryverzent provide?",
    answer:
      "Kryverzent provides custom web app development, mobile development, cloud infrastructure, DevOps, AI and machine learning integration, UI/UX engineering, backend development, and API architecture.",
  },
  {
    question: "Where is Kryverzent based?",
    answer:
      "Kryverzent is based in Colombo, Western Province, Sri Lanka, and serves clients in Sri Lanka and globally.",
  },
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
          name: service.name,
          description: service.description,
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
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Kryverzent software development and technology engineering company",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo_new.png`,
      },
      description:
        "This homepage introduces Kryverzent, explains its software engineering services, highlights project capabilities, shows network partners, describes pricing tiers, and provides contact information.",
      mainEntity: {
        "@id": `${siteUrl}/#services`,
      },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "Kryverzent software engineering services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.name,
        description: service.description,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqEntries.map((entry) => ({
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
