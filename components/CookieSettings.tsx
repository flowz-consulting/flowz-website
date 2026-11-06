"use client";

import { OPEN_COOKIES_EVENT } from "@/lib/consent";

export function CookieSettings() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))}
      className="text-foreground underline underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      Cookies
    </button>
  );
}
