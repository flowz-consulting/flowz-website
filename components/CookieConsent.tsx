"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import {
  OPEN_COOKIES_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(readConsent() === null);
    const show = () => setOpen(true);
    sync();
    window.addEventListener(OPEN_COOKIES_EVENT, show);
    return () => window.removeEventListener(OPEN_COOKIES_EVENT, show);
  }, []);

  if (!open) return null;

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-title" className="text-sm font-medium text-foreground">
            Cookies
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {site.registeredName} stores one cookie to remember this choice. If
            you accept, Google Analytics also counts visits and sees which pages
            are read. That includes the page and general browser details, and it
            is sent to Google. You can reject, and you can change it later.
          </p>
          <Link
            href="/privacy"
            className="mt-2 inline-block text-sm text-foreground underline underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Privacy
          </Link>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="inline-flex items-center justify-center border border-foreground px-5 py-3 text-sm font-medium text-foreground hover:bg-[#f6f6f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("analytics")}
            className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-medium text-accent-ink hover:bg-[#0f5534] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
