import type { Metadata } from "next";
import Link from "next/link";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { HeroFilm } from "@/components/HeroFilm";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { ServicesMenuTrigger } from "@/components/ServicesMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site, siteDescription, siteTitle } from "@/content/site";
import { textLinkClass } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function Page() {
  return (
    <>
      <SiteHeader overlay />
      <CurrencyProvider>
      <main id="top">
        <section className="relative flex min-h-svh items-center">
          <HeroFilm />
          <div className="hero-scrim absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-24 sm:pb-40 sm:pt-20">
            <div className="rise rise-1 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{site.hero.eyebrow}</p>
            </div>
            <h1 className="rise rise-2 mt-6 max-w-xl font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-6xl">
              {site.hero.headline}
            </h1>
            <p className="rise rise-3 mt-6 max-w-md text-base leading-7 text-muted sm:text-lg">
              {site.hero.support}
            </p>
            <div className="rise rise-4 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ServicesMenuTrigger className="w-full sm:w-auto" />
              <Link href={site.hero.secondaryHref} className={textLinkClass}>
                {site.hero.secondary}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{site.services.heading}</h2>
                <p className="mt-4 text-base leading-7 text-muted">{site.services.intro}</p>
              </div>
            </Reveal>
            <ul className="mt-10 border-t border-line">
              {site.services.items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    scroll={false}
                    className="grid gap-2 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-10"
                  >
                    <span>
                      <span className="text-xs uppercase tracking-[0.14em] text-accent">{item.kicker}</span>
                      <span className="mt-2 block font-serif text-2xl tracking-tight text-foreground">{item.title}</span>
                    </span>
                    <span className="text-sm leading-6 text-muted">{item.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="border-t border-line bg-[#f6f6f6]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
            <Reveal>
              <div>
                <h2 id="contact-title" className="font-serif text-3xl tracking-tight sm:text-4xl">
                  {site.contact.heading}
                </h2>
                <p className="mt-6 text-sm leading-6 text-muted">
                  Or email{" "}
                  <a href={site.mailto} className={textLinkClass}>
                    {site.email}
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <LeadForm />
            </Reveal>
          </div>
        </section>
      </main>
      </CurrencyProvider>
      <Reveal>
        <SiteFooter />
      </Reveal>
    </>
  );
}

