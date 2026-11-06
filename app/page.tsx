import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

const buttonClass =
  "inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-colors hover:bg-[#0f5534] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const textLinkClass =
  "text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Page() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-center px-6 py-16">
          <div className="rise rise-1 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-balance text-xs uppercase tracking-[0.14em] text-muted">
              {site.hero.eyebrow}
            </p>
          </div>
          <h1 className="rise rise-2 mt-6 max-w-[14ch] font-serif text-[2rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="rise rise-3 relative mt-6 w-fit font-serif text-xl italic text-accent sm:text-2xl">
            {site.hero.accent}
            <span
              className="draw-rule absolute inset-x-0 -bottom-1 h-px bg-accent"
              aria-hidden="true"
            />
          </p>
          <p className="rise rise-4 mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {site.hero.support}
          </p>
          <div className="rise rise-5 mt-10 flex flex-wrap items-center gap-6">
            <a href={site.mailto} className={buttonClass}>
              {site.hero.primary}
            </a>
            <a href={site.hero.secondaryHref} className={textLinkClass}>
              {site.hero.secondary}
            </a>
          </div>
        </section>

        <section id="services" className="scroll-mt-14 border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                What we do
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px bg-line sm:grid-cols-2">
              {site.services.map((service, index) => (
                <Reveal key={service.title} delay={index * 140} className="h-full">
                <article className="service-panel h-full bg-background p-8 sm:p-10">
                  <p className="font-serif text-sm text-accent">{service.index}</p>
                  <h3 className="mt-4 font-serif text-2xl tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-muted">
                    {service.summary}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-foreground">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-2 h-px w-3 shrink-0 bg-accent"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-14 border-t border-line bg-[#f6f6f6]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                How the savings work
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-10">
              {site.steps.map((step, index) => (
                <Reveal as="li" key={step.index} delay={index * 120}>
                  <p className="font-serif text-3xl text-accent">{step.index}</p>
                  <h3 className="mt-4 font-serif text-xl tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line">
          <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:py-28">
            <h2 className="max-w-[18ch] font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
              {site.close.headline}
            </h2>
            <a href={site.mailto} className={buttonClass}>
              {site.close.primary}
            </a>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
