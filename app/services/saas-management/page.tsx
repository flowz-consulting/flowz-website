import type { Metadata } from "next";
import { PillarArticle } from "@/components/PillarArticle";
import { site } from "@/content/site";

const item = site.services.items.find((entry) => entry.href === "/services/saas-management");
const title = "SaaS management and governance";
const description =
  "Flowz keeps a running view of software spend, ownership, renewals, and what to change next. This is ongoing advisory, scoped on its own.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/saas-management" },
  openGraph: { title: `${title} · Flowz`, description, url: "/services/saas-management" },
  twitter: { card: "summary_large_image", title: `${title} · Flowz`, description },
};

export default function SaasManagementPage() {
  if (!item) return null;
  return <PillarArticle item={item} />;
}
