import Link from "next/link";
import { CookieSettings } from "@/components/CookieSettings";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-foreground">
            {site.legalName}
            <span aria-hidden="true"> · </span>
            <span className="text-muted">Since {site.founded}</span>
          </p>
          <p>
            {site.registeredName}
            <span aria-hidden="true"> · </span>
            CVR {site.cvr}
          </p>
          <p>{site.address}</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/privacy"
            className="text-foreground underline underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Privacy
          </Link>
          <CookieSettings />
          <a
            href={site.mailto}
            className="text-foreground underline underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
