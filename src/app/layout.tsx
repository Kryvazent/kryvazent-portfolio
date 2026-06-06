import type { Metadata } from "next";
import { Geist, Geist_Mono, Syncopate, Rajdhani } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import { siteUrlObject } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: siteUrlObject,
  applicationName: "Kryverzent",
  title: {
    default: "Kryverzent | Software Development, AI, Cloud and Digital Product Engineering",
    template: "%s | Kryverzent",
  },
  description:
    "Kryverzent is a software development and technology engineering company in Sri Lanka building custom web applications, mobile apps, AI-enabled products, cloud infrastructure, backend systems, APIs, and digital product experiences for startups and growing businesses.",
  keywords: [
    "Kryverzent",
    "software development company",
    "custom web application development",
    "mobile app development",
    "AI product development",
    "cloud infrastructure",
    "backend engineering",
    "UI UX engineering",
    "digital product studio",
    "technology company Sri Lanka",
  ],
  authors: [{ name: "Kryverzent" }],
  creator: "Kryverzent",
  publisher: "Kryverzent",
  category: "Technology",
  classification: "Software development, AI engineering, cloud infrastructure, mobile app development, and digital product engineering",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kryverzent",
    title: "Kryverzent | Software Development, AI, Cloud and Digital Product Engineering",
    description:
      "A technology engineering company for custom web apps, mobile apps, AI systems, cloud infrastructure, scalable backend platforms, and polished digital experiences.",
    images: [
      {
        url: "/logo_new.png",
        width: 512,
        height: 512,
        alt: "Kryverzent logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Kryverzent | Software Development and Technology Engineering",
    description:
      "Custom web apps, mobile apps, AI-enabled products, cloud infrastructure, backend systems, and UI/UX engineering for growing businesses.",
    images: ["/logo_new.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo_new.png",
  },
  other: {
    "ai-purpose":
      "Kryverzent builds custom software products including web apps, mobile apps, AI systems, cloud infrastructure, backend platforms, APIs, and UI/UX experiences.",
    "business-location": "Colombo, Western Province, Sri Lanka",
    "contact-email": "info@kryverzent.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} ${rajdhani.variable} antialiased font-rajdhani`} suppressHydrationWarning>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
