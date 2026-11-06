"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const buttonClass =
  "inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-colors hover:bg-[#0f5534] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 border-b bg-background/90 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? "border-line shadow-[0_10px_30px_-24px_rgba(20,20,20,0.45)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-6" aria-label="Page">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <a href={site.mailto} className={buttonClass}>
            {site.hero.primary}
          </a>
        </nav>
      </div>
    </header>
  );
}
