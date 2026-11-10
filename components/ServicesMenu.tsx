"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { buttonClass } from "@/lib/classes";

const menuRequests = new Set<() => void>();

export function requestServicesMenu() {
  for (const request of menuRequests) request();
}

export function onServicesMenuRequest(request: () => void) {
  menuRequests.add(request);
  return () => {
    menuRequests.delete(request);
  };
}

export function ServicesMenuTrigger({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`${buttonClass} w-full cursor-pointer border-0 sm:w-auto ${className}`}
      aria-haspopup="true"
      aria-controls="services-menu"
      onClick={() => requestServicesMenu()}
    >
      Services
    </button>
  );
}

export function ServicesMenu({
  appearance = "button",
  className = "",
  current = false,
}: {
  appearance?: "button" | "nav";
  className?: string;
  current?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = "services-menu";
  const pathname = usePathname();

  const clearClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const show = () => {
    clearClose();
    setOpen(true);
  };

  const hide = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => {
      if (rootRef.current?.contains(document.activeElement)) return;
      setOpen(false);
    }, 140);
  };

  useEffect(() => () => clearClose(), []);

  useEffect(() => onServicesMenuRequest(() => setOpen(true)), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={
          appearance === "button"
            ? `${buttonClass} w-full cursor-pointer border-0 sm:w-auto`
            : `cursor-pointer border-0 bg-transparent p-0 text-sm transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                current ? "text-foreground" : "text-muted"
              }`
        }
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        Services
      </button>
      <div
        className={`absolute -left-2 top-full z-40 pt-4 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div
          id={menuId}
          className="w-[25rem] bg-background shadow-[0_1px_0_rgba(20,20,20,0.04),0_30px_60px_-30px_rgba(20,20,20,0.35)]"
        >
          <div className="h-0.5 bg-accent" aria-hidden="true" />
          <ul className="px-2 py-2">
            {site.services.items.map((item, index) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    scroll={false}
                    aria-current={active ? "page" : undefined}
                    className={`group grid grid-cols-[1.75rem_minmax(0,1fr)_1rem] items-baseline gap-x-2 px-3 py-2.5 transition-colors hover:bg-[#f6f6f4] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                      active ? "bg-[#f6f6f4]" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-serif text-sm text-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-serif text-lg leading-6 tracking-tight transition-colors group-hover:text-accent ${
                          active ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-muted">{item.menu}</span>
                    </span>
                    <span
                      className="-translate-x-1 self-center text-accent opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t border-line px-5 py-3.5 text-xs">
            <span className="text-muted">Each engagement is agreed in writing.</span>
            <Link
              href="/services"
              scroll={false}
              className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              onClick={() => setOpen(false)}
            >
              All services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
