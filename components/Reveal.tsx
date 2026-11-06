"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  as?: "div" | "li";
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
