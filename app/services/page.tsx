import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { contactCta, site } from "@/content/site";
import { textLinkClass } from "@/lib/classes";

const title = "Services";
const description =
  "Flowz groups its consultancy into cost optimisation, software strategy, AI, workflow automation, and SaaS governance. The savings fee applies only to vendor negotiations and renewals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} · Flowz`,
    description,
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · Flowz`,
    description,
  },
};

export default function ServicesPage() {
  const [flagship, ...rest] = site.services.items;

  return (
    <>
      <SiteHeader cta={contactCta} />
      <main id="top">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">{site.services.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">
            {site.services.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{site.services.pageIntro}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-foreground">{site.services.feeNote}</p>

          <article className="mt-12 border border-line p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-accent">{flagship.kicker}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight">{flagship.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{flagship.summary}</p>
            <Link href={flagship.href} scroll={false} className={`${textLinkClass} mt-6 inline-flex`}>
              {flagship.link}
            </Link>
          </article>

          <ul className="mt-px grid gap-px bg-line sm:grid-cols-2">
            {rest.map((item) => (
              <li key={item.href} className="flex flex-col bg-background p-8">
                <p className="text-xs uppercase tracking-[0.14em] text-accent">{item.kicker}</p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight">{item.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-muted">{item.summary}</p>
                <Link href={item.href} scroll={false} className={`${textLinkClass} mt-auto w-fit pt-6`}>
                  {item.link}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line bg-[#f6f6f6]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <h2 className="max-w-3xl font-serif text-3xl tracking-tight sm:text-4xl">How the work proceeds</h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {site.journey.map((step, index) => (
                <li key={step.title}>
                  <p className="font-serif text-3xl text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-serif text-xl tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <h2 className="max-w-3xl font-serif text-3xl tracking-tight sm:text-4xl">Three ways to engage</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              The five areas are the catalogue. An engagement is assess, implement, or manage.
            </p>
            <ul className="mt-10 grid gap-px bg-line lg:grid-cols-3">
              {site.engagements.map((model) => (
                <li key={model.title} className="bg-background p-8">
                  <p className="text-xs uppercase tracking-[0.14em] text-accent">{model.kicker}</p>
                  <h3 className="mt-3 font-serif text-2xl tracking-tight">{model.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{model.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-line bg-[#f6f6f6]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Example packages</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Ways to start. Scope and price are agreed in writing. This is not a rate card.
            </p>
            <div className="mt-10 border-t border-line">
              <div className="hidden grid-cols-[1.1fr_1.6fr_0.8fr] gap-6 border-b border-line py-3 text-xs uppercase tracking-[0.14em] text-muted sm:grid">
                <p>Package</p>
                <p>Core deliverable</p>
                <p>Engagement</p>
              </div>
              <ul>
                {site.packages.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[1.1fr_1.6fr_0.8fr] sm:items-baseline sm:gap-6"
                  >
                    <h3 className="text-base font-medium">{item.name}</h3>
                    <p className="text-sm leading-6 text-muted">{item.deliverable}</p>
                    <p className="text-sm leading-6">{item.engagement}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">{site.services.placement}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
