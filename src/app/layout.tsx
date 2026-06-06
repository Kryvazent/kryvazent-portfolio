import type { Metadata } from "next";
import { Geist, Geist_Mono, Syncopate, Rajdhani } from "next/font/google";
import StructuredData from "@/components/StructuredData";
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

const siteUrl = new URL("https://www.kryverzent.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Kryverzent",
  title: {
    default: "Kryverzent | Software Development, AI, Cloud and Digital Product Engineering",
    template: "%s | Kryverzent",
  },
  description:
    "Kryverzent is a software development and technology engineering company building custom web applications, mobile apps, AI-enabled products, cloud infrastructure, backend systems, and digital experiences for growing businesses.",
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
  alternates: {
    canonical: "/",
  },
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
