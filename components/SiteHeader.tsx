"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { onServicesMenuRequest, ServicesMenu } from "@/components/ServicesMenu";
import { cta as defaultCta, serviceCategories, site } from "@/content/site";
import { buttonClass } from "@/lib/classes";

let pendingHomeTop = false;

export function SiteHeader({
  overlay = false,
  cta = defaultCta,
}: {
  overlay?: boolean;
  cta?: { label: string; href: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pendingHomeTop || pathname !== "/") return;
    pendingHomeTop = false;
    const toTop = () => window.scrollTo(0, 0);
    toTop();
    const timers = [0, 50, 150, 300, 600].map((delay) => window.setTimeout(toTop, delay));
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () =>
      onServicesMenuRequest(() => {
        if (window.matchMedia("(max-width: 1023px)").matches) setOpen(true);
      }),
    [],
  );

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
      className={`top-0 z-30 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        overlay ? "fixed inset-x-0" : "sticky"
      } ${
        open
          ? "max-lg:min-h-svh border-line bg-background shadow-[0_10px_30px_-24px_rgba(20,20,20,0.45)]"
          : scrolled
              ? "border-line bg-background/95 shadow-[0_10px_30px_-24px_rgba(20,20,20,0.45)] backdrop-blur-md"
              : overlay
                ? "border-transparent bg-transparent"
                : "border-transparent bg-background/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            scroll={false}
            onClick={(event) => {
              event.preventDefault();
              pendingHomeTop = true;
              if (pathname === "/") {
                pendingHomeTop = false;
                if (window.location.hash) history.replaceState(null, "", "/");
                window.scrollTo(0, 0);
                return;
              }
              router.push("/", { scroll: false });
            }}
            className="font-serif text-lg tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {site.name}
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const current = item.href === "/services" ? pathname.startsWith("/services") : pathname === item.href;
              if (item.href === "/services") {
                return (
                  <ServicesMenu key={item.href} appearance="nav" current={current} />
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`text-sm transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    current ? "text-foreground" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            {cta.href === "/services" ? null : (
              <a href={cta.href} className={`${buttonClass} max-sm:hidden`}>
                {cta.label}
              </a>
            )}
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
            <li>
              <p className="py-3 text-sm text-foreground">Services</p>
              <ul className="grid grid-cols-1 gap-4 pb-3 sm:grid-cols-2">
                {serviceCategories.map((category) => (
                  <li key={category.id}>
                    <p className="px-3 text-xs uppercase tracking-[0.14em] text-muted">{category.label}</p>
                    <ul className="mt-1">
                      {site.services.items
                        .filter((item) => item.category === category.id)
                        .map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              scroll={false}
                              className="block py-2 pl-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                              onClick={() => setOpen(false)}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            {site.nav
              .filter((item) => item.href !== "/services")
              .map((item) => (
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
          {cta.href === "/services" ? (
            <button
              type="button"
              className={`${buttonClass} w-full cursor-pointer border-0`}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              {cta.label}
            </button>
          ) : (
            <a href={cta.href} className={`${buttonClass} w-full`} onClick={() => setOpen(false)}>
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
