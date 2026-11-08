import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site, siteDescription, siteTitle, siteUrl } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: siteUrl,
  email: site.email,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.streetAddress,
    postalCode: site.postalCode,
    addressLocality: site.addressLocality,
    addressCountry: site.addressCountry,
  },
  identifier: {
    "@type": "PropertyValue",
    name: "CVR",
    value: site.cvr,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · Flowz",
  },
  description: siteDescription,
  openGraph: {
    siteName: "Flowz",
    type: "website",
    locale: "en_DK",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:outline focus:outline-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <ScrollProgress />
        {children}
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
