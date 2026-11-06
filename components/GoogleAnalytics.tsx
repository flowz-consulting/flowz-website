"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.match(
  /^G-[A-Z0-9]+$/,
)?.[0];

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(readConsent() === "analytics");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!enabled || !measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="flowz-ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
