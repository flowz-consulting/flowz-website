"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cta, site } from "@/content/site";
import { buttonClass } from "@/lib/classes";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const links = panel ? [...panel.querySelectorAll<HTMLElement>("a[href]")] : [];
    const items = [...links, ...(buttonRef.current ? [buttonRef.current] : [])];
    links[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-background/95 backdrop-blur-md transition-[border-color,box-shadow] duration-500 ${
        scrolled || open
          ? "border-line shadow-[0_10px_30px_-24px_rgba(20,20,20,0.45)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-lg tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {site.name}
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={cta.href} className={`${buttonClass} max-sm:hidden`}>
              {cta.label}
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-line lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
                <span
                  className={`h-px w-4 bg-foreground transition-transform motion-reduce:transition-none ${
                    open ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-4 bg-foreground transition-transform motion-reduce:transition-none ${
                    open ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <nav
          id={menuId}
          ref={panelRef}
          aria-label="Primary"
          hidden={!open}
          className="border-t border-line py-3 lg:hidden"
        >
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pb-4 sm:hidden">
          <a href={cta.href} className={`${buttonClass} w-full`} onClick={() => setOpen(false)}>
            {cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
