import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { Reveal } from "@/components/Reveal";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { email, site } from "@/content/site";
import { buttonClass, textLinkClass } from "@/lib/classes";

const title = "SaaS and AI cost optimisation";
const description =
  "Flowz reduces technology spend through negotiation, benchmarking, licence right-sizing, and AI cost. Vendor negotiations and renewals are 20% of verified first-year savings, with no upfront fee.";

const item = site.services.items.find((entry) => entry.href === "/services/cost-optimisation");
const negotiationMailto = `mailto:${email}?subject=${encodeURIComponent("Vendor negotiation")}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/cost-optimisation" },
  openGraph: { title: `${title} · Flowz`, description, url: "/services/cost-optimisation" },
  twitter: { card: "summary_large_image", title: `${title} · Flowz`, description },
};

export default function CostOptimisationPage() {
  return (
    <>
      <SiteHeader />
      <CurrencyProvider>
        <main id="top">
          <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
            <p className="text-xs uppercase tracking-[0.14em] text-accent">Optimise</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">{item?.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{item?.summary}</p>
            <h2 className="mt-12 font-serif text-2xl tracking-tight">What this covers</h2>
            <ul className="mt-6 max-w-2xl space-y-3 text-sm leading-6">
              {item?.offers.map((offer) => (
                <li key={offer} className="flex gap-3">
                  <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
              The savings fee below applies to SaaS vendor negotiations and renewals. Benchmarking, licence
              right-sizing, token cost, currency, payment terms, and AI procurement are scoped and priced on their own.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href={item?.mailto} className={buttonClass}>
                {item?.cta}
              </a>
              <Link href="/services" className={textLinkClass}>
                All services
              </Link>
            </div>
          </section>

          <Section id="negotiation" tone="muted">
            <Reveal>
              <SectionIntro
                heading="Vendor negotiations and renewals"
                intro="This pricing applies to this engagement. You keep 80% of the verified saving before other costs and taxes."
              />
            </Reveal>
            <ul className="mt-10 grid gap-px bg-line sm:grid-cols-3">
              {site.pricing.figures.map((figure, index) => (
                <Reveal as="li" key={figure.label} delay={index * 110} className="bg-[#f6f6f6] px-8 py-7">
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
            <div className="mt-8">
              <a href={negotiationMailto} className={buttonClass}>
                Start a negotiation
              </a>
            </div>
          </Section>

          <Section id="how">
            <Reveal>
              <SectionIntro heading={site.steps.heading} />
            </Reveal>
            <ol className="timeline relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8">
              <span className="timeline-rule" aria-hidden="true" />
              {site.steps.items.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.index}
                  delay={index * 90}
                  className="border-l border-line pl-6 lg:border-l-0 lg:pl-0"
                >
                  <p className="relative z-10 w-fit bg-background pr-3 font-serif text-3xl text-accent">
                    {step.index}
                  </p>
                  <h3 className="mt-4 max-w-[16rem] font-serif text-xl tracking-tight">{step.title}</h3>
                </Reveal>
              ))}
            </ol>
          </Section>

          <Section id="faq" tone="muted">
            <Reveal>
              <SectionIntro heading={site.faq.heading} />
            </Reveal>
            <div className="mt-8 max-w-2xl border-t border-line">
              {site.faq.items.map((entry, index) => (
                <Reveal as="details" key={entry.question} delay={index * 80} className="group border-b border-line">
                  <summary className="cursor-pointer py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    <span className="flex items-start justify-between gap-6">
                      <h3 className="text-base font-medium text-foreground">{entry.question}</h3>
                      <span className="faq-plus mt-1 text-accent" aria-hidden="true">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="max-w-xl pb-4 text-sm leading-6 text-muted">{entry.answer}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-sm leading-6 text-muted">
              To start,{" "}
              <Link href="/#contact" className={textLinkClass}>
                send a message
              </Link>
              .
            </p>
          </Section>
        </main>
      </CurrencyProvider>
      <SiteFooter />
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
