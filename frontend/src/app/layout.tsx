import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syncopate, Rajdhani } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import { primaryKeywords, site } from "@/lib/seo";
import { siteUrlObject } from "@/lib/site";
import { ContentProvider } from "@/components/ContentProvider";
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
  applicationName: site.name,
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: primaryKeywords,
  authors: [{ name: site.name, url: "/" }],
  creator: site.name,
  publisher: site.name,
  category: "Technology",
  classification:
    "Software development, AI engineering, cloud infrastructure, mobile app development, backend development, API development, and digital product engineering",
  alternates: {
    canonical: "/",
    languages: {
      "en-LK": "/",
    },
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shortDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kryvazent custom software, AI, cloud, and mobile engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
    images: ["/og-image.png"],
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
    "geo.region": "LK",
    "geo.placename": `${site.city}, ${site.region}, ${site.country}`,
    "ai-purpose":
      "Kryvazent builds custom software products including web apps, mobile apps, AI systems, cloud infrastructure, backend platforms, APIs, and UI/UX experiences.",
    "business-location": `${site.city}, ${site.region}, ${site.country}`,
    "contact-email": site.email,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Inline script: apply saved theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('kv-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} ${rajdhani.variable} antialiased font-rajdhani`} suppressHydrationWarning>
        <StructuredData />
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
