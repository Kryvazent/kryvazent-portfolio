export type Project = {
  image: string;
  alt: string;
  category: string;
  outcome: string;
  title: string;
  tech: string[];
  description: string;
  useCase: string;
  link: string | null;
};

export const ALL_PROJECTS: Project[] = [
  {
    image: "/partners/rajapura-bg.png",
    alt: "Rajapura Herbal — herbal e-commerce platform",
    category: "E-Commerce",
    outcome: "Live product",
    title: "Rajapura Herbal",
    tech: ["Web", "E-Commerce", "Product Catalogue"],
    description:
      "A full e-commerce platform for a heritage Sri Lankan herbal brand — built with product catalogues, online ordering, and brand storytelling.",
    useCase: "Herbal & wellness retail",
    link: "https://rajapuraherbal.lk",
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    alt: "Emerge Sri Lanka — community and social impact platform",
    category: "Web Application",
    outcome: "Live platform",
    title: "Emerge Sri Lanka",
    tech: ["Next.js", "Web", "Community Platform"],
    description:
      "A digital platform for Emerge Sri Lanka — enabling community engagement, programme visibility, and social impact communication.",
    useCase: "Non-profit & community",
    link: "https://emergesrilanka.org",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    alt: "AI Analytics Dashboard",
    category: "AI Engineering",
    outcome: "Faster reporting",
    title: "AI Analytics Dashboard",
    tech: ["Next.js", "Python", "ML Workflows"],
    description:
      "A reporting platform concept for teams that need predictive insights, workflow visibility, and decision-ready dashboards.",
    useCase: "Data-led operations",
    link: null,
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    alt: "Customer Operations Portal",
    category: "Web Application",
    outcome: "Cleaner workflows",
    title: "Customer Operations Portal",
    tech: ["React", "Node.js", "Cloud APIs"],
    description:
      "A secure portal pattern for customer records, service requests, internal approvals, notifications, and admin reporting.",
    useCase: "Growing service teams",
    link: null,
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    alt: "Cloud Automation Layer",
    category: "Cloud & DevOps",
    outcome: "Reliable launches",
    title: "Cloud Automation Layer",
    tech: ["Docker", "CI/CD", "Monitoring"],
    description:
      "A deployment and infrastructure workflow for applications that need stable releases, monitoring, backups, and scaling paths.",
    useCase: "Production software",
    link: null,
  },
  
];

/** First 3 projects shown on the homepage */
export const FEATURED_PROJECTS = ALL_PROJECTS.slice(0, 3);
