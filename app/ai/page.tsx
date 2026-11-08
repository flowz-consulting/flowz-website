import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { buttonClass, textLinkClass } from "@/lib/classes";

export const metadata: Metadata = {
  title: "AI implementation",
  description:
    "Flowz designs and implements fixed-scope workflow automation and AI-enabled processes. This service is priced separately from software savings work.",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "AI implementation · Flowz",
    description:
      "Flowz designs and implements fixed-scope workflow automation and AI-enabled processes. This service is priced separately from software savings work.",
    url: "/ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI implementation · Flowz",
    description:
      "Flowz designs and implements fixed-scope workflow automation and AI-enabled processes. This service is priced separately from software savings work.",
  },
};

export default function AiPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">{site.ai.eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">{site.ai.pageHeading}</h1>
        <p className="mt-6 text-base leading-7 text-muted">{site.ai.pageIntro}</p>
        <p className="mt-4 text-base leading-7 text-foreground">{site.ai.note}</p>
        <ul className="mt-10 space-y-3 text-sm leading-6">
          {site.ai.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a href={site.aiMailto} className={buttonClass}>
            {site.ai.cta}
          </a>
          <Link href="/#contact" className={textLinkClass}>
            Software savings review
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
