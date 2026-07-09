export type PricingPlan = {
  name: string;
  audience: string;
  price: string;
  priceNote: string;
  features: string[];
  highlighted: boolean;
};

export type SiteContent = {
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    plans: PricingPlan[];
  };
  projects: {
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    outcome: string;
    useCase: string;
    published: boolean;
  }[];
  testimonials: {
    quote: string;
    name: string;
    role: string;
    company: string;
    published: boolean;
  }[];
  partners: {
    name: string;
    tagline: string;
    logoUrl: string;
    initials: string;
    tone: "dark" | "gray" | "light";
    published: boolean;
  }[];
};

export const defaultSiteContent: SiteContent = {
  pricing: {
    eyebrow: "Pricing tiers",
    title: "A clear starting point",
    description:
      "Every project is scoped around the product, timeline, and technical requirements. These starting prices help you choose the right level of engagement.",
    plans: [
      {
        name: "Starter",
        audience: "For founders and small teams launching a first product",
        price: "Starting at $2,500",
        priceNote: "Fixed scope, quoted after a short discovery call",
        features: ["1 platform (web or mobile)", "Up to 2 core user flows fully built", "Basic admin/backend setup", "2 weeks of post-launch support"],
        highlighted: false,
      },
      {
        name: "Growth",
        audience: "For businesses scaling an existing product or adding new capability",
        price: "Starting at $6,000",
        priceNote: "Scoped per project",
        features: ["Web + mobile, or web + API/backend", "Custom integrations (payments, auth, third-party APIs)", "Cloud deployment & basic DevOps setup", "1 month of post-launch support"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        audience: "For organizations needing ongoing development, infrastructure, or AI capability",
        price: "Custom quote",
        priceNote: "Book a call to scope",
        features: ["Multi-platform builds and complex backend architecture", "AI/ML integration", "Advanced DevOps and dedicated support", "Ongoing engagement (monthly retainer available)"],
        highlighted: false,
      },
    ],
  },
  projects: [
    { title: "AI Analytics Dashboard", category: "AI Product Engineering", description: "A reporting platform concept for teams that need predictive insights, workflow visibility, and decision-ready dashboards.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", tech: ["Next.js", "Python", "ML Workflows"], outcome: "Faster reporting", useCase: "Data-led operations", published: true },
    { title: "Customer Operations Portal", category: "Web Application Development", description: "A secure portal pattern for customer records, service requests, internal approvals, notifications, and admin reporting.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", tech: ["React", "Node.js", "Cloud APIs"], outcome: "Cleaner workflows", useCase: "Growing service teams", published: true },
    { title: "Cloud Automation Layer", category: "Cloud and DevOps", description: "A deployment and infrastructure workflow for applications that need stable releases, monitoring, backups, and scaling paths.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", tech: ["Docker", "CI/CD", "Monitoring"], outcome: "Reliable launches", useCase: "Production software", published: true },
  ],
  testimonials: [
    { quote: "Kryvazent brought clarity to a complex build and delivered a product our team could confidently operate.", name: "Client name", role: "Founder", company: "Growing technology business", published: false },
  ],
  partners: [
    { name: "Vision Expert", tagline: "Optical Studio", logoUrl: "", initials: "VE", tone: "dark", published: true },
    { name: "Rajapura", tagline: "Since 1973", logoUrl: "", initials: "R", tone: "gray", published: true },
    { name: "EMergeSL", tagline: "", logoUrl: "/partners/emergesl.jpeg", initials: "ES", tone: "light", published: true },
  ],
};

export const isSiteContent = (value: unknown): value is SiteContent => {
  if (!value || typeof value !== "object") return false;
  const pricing = (value as { pricing?: unknown }).pricing;
  if (!pricing || typeof pricing !== "object") return false;
  const candidate = pricing as SiteContent["pricing"];
  return typeof candidate.eyebrow === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.description === "string" &&
    Array.isArray(candidate.plans) &&
    candidate.plans.length > 0 &&
    candidate.plans.every((plan) =>
      typeof plan?.name === "string" &&
      typeof plan?.audience === "string" &&
      typeof plan?.price === "string" &&
      typeof plan?.priceNote === "string" &&
      typeof plan?.highlighted === "boolean" &&
      Array.isArray(plan?.features) &&
      plan.features.every((feature) => typeof feature === "string")) &&
    Array.isArray((value as SiteContent).projects) &&
    Array.isArray((value as SiteContent).testimonials) &&
    Array.isArray((value as SiteContent).partners);
};
