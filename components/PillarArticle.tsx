import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { serviceCategories, site } from "@/content/site";
import { buttonClass, textLinkClass } from "@/lib/classes";

type Pillar = (typeof site.services.items)[number];

export function PillarArticle({ item }: { item: Pillar }) {
  const category = serviceCategories.find((entry) => entry.id === item.category);

  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.14em] text-accent">{category?.label}</p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">{item.title}</h1>
          <p className="mt-6 text-base leading-7 text-muted">{item.summary}</p>
          <h2 className="mt-12 font-serif text-2xl tracking-tight">What this covers</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6">
            {item.offers.map((offer) => (
              <li key={offer} className="flex gap-3">
                <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                <span>{offer}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-6 text-muted">{site.services.feeNote}</p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href={item.mailto} className={buttonClass}>
              {item.cta}
            </a>
            <Link href="/services" className={textLinkClass}>
              All services
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
