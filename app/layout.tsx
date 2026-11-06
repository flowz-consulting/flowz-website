import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/content/site";
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

const description =
  "You only pay us if your software bill goes down. Flowz reviews your stack, cuts the overlap, and renegotiates renewals. No savings, no fee.";

export const metadata: Metadata = {
  title: site.legalName,
  description,
  openGraph: {
    title: site.legalName,
    description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ScrollProgress />
        {children}
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
