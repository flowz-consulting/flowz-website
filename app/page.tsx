import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site, siteDescription, siteTitle } from "@/content/site";
import { buttonClass, textLinkClass } from "@/lib/classes";

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
      <SiteHeader />
      <CurrencyProvider>
      <main id="top">
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-10 sm:pb-16 sm:pt-16">
          <div className="rise rise-1 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{site.hero.eyebrow}</p>
          </div>
          <h1 className="rise rise-2 mt-6 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {site.hero.support}
          </p>
          <div className="rise rise-4 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={site.hero.primaryHref} className={`${buttonClass} w-full sm:w-auto`}>
              {site.hero.primary}
            </a>
            <a href={site.hero.secondaryHref} className={textLinkClass}>
              {site.hero.secondary}
            </a>
          </div>
          <p className="rise rise-5 mt-6 text-sm font-medium text-foreground">{site.hero.trust}</p>
        </section>

        <Section id="pricing">
          <Reveal>
            <SectionIntro heading={site.pricing.heading} />
          </Reveal>
          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-3">
            {site.pricing.figures.map((figure, index) => (
              <Reveal as="li" key={figure.label} delay={index * 110} className="bg-background px-8 py-7">
                <p className="font-serif text-5xl tracking-tight text-foreground">{figure.value}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{figure.label}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-sm leading-6 text-muted">{site.pricing.note}</p>
          </Reveal>
          <Reveal delay={220}>
            <SavingsCalculator />
          </Reveal>
        </Section>

        <Section id="how" tone="muted">
          <Reveal>
            <SectionIntro heading={site.steps.heading} />
          </Reveal>
          <ol className="timeline relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8">
            <span className="timeline-rule" aria-hidden="true" />
            {site.steps.items.map((step, index) => (
              <Reveal as="li" key={step.index} delay={index * 90} className="border-l border-line pl-6 lg:border-l-0 lg:pl-0">
                <p className="relative z-10 w-fit bg-[#f6f6f6] pr-3 font-serif text-3xl text-accent">
                  {step.index}
                </p>
                <h3 className="mt-4 max-w-[16rem] font-serif text-xl tracking-tight">{step.title}</h3>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section id="faq">
          <Reveal>
            <SectionIntro heading={site.faq.heading} />
          </Reveal>
          <div className="mt-8 max-w-2xl border-t border-line">
            {site.faq.items.map((item, index) => (
              <Reveal as="details" key={item.question} delay={index * 80} className="group border-b border-line">
                <summary className="cursor-pointer py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <span className="flex items-start justify-between gap-6">
                    <h3 className="text-base font-medium text-foreground">{item.question}</h3>
                    <span className="faq-plus mt-1 text-accent" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <p className="max-w-xl pb-4 text-sm leading-6 text-muted">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="contact" tone="muted">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
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
        </Section>
      </main>
      </CurrencyProvider>
      <Reveal>
        <SiteFooter />
      </Reveal>
    </>
  );
}

function Section({
  id,
  tone = "plain",
  children,
}: {
  id?: string;
  tone?: "plain" | "muted";
  children: ReactNode;
}) {
  return (
    <section id={id} className={`border-t border-line ${tone === "muted" ? "bg-[#f6f6f6]" : ""}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">{children}</div>
    </section>
  );
}

function SectionIntro({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{heading}</h2>
      {intro ? <p className="mt-4 text-base leading-7 text-muted">{intro}</p> : null}
    </div>
  );
}
