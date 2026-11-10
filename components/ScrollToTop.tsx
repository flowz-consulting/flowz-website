"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const place = () => {
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const id = window.location.hash.replace(/^#/, "");
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
      root.style.scrollBehavior = previous;
    };

    place();
    const timers = [50, 150, 400].map((delay) => window.setTimeout(place, delay));
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
