import type { Metadata } from "next";
import { PillarArticle } from "@/components/PillarArticle";
import { site } from "@/content/site";

const item = site.services.items.find((entry) => entry.href === "/services/software-strategy");
const title = "Software strategy and migration";
const description =
  "Flowz assesses a software stack, plans a migration, and coordinates the move. The work is scoped and priced on its own.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/software-strategy" },
  openGraph: { title: `${title} · Flowz`, description, url: "/services/software-strategy" },
  twitter: { card: "summary_large_image", title: `${title} · Flowz`, description },
};

export default function SoftwareStrategyPage() {
  if (!item) return null;
  return <PillarArticle item={item} />;
}
