import type { Metadata } from "next";
import { PillarArticle } from "@/components/PillarArticle";
import { site } from "@/content/site";

const item = site.services.items.find((entry) => entry.href === "/services/ai-strategy");
const title = "AI strategy, adoption and enablement";
const description =
  "Flowz helps a team choose AI, learn it, and put it into the work. Selection, training, and adoption are scoped separately from vendor negotiation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-strategy" },
  openGraph: { title: `${title} · Flowz`, description, url: "/services/ai-strategy" },
  twitter: { card: "summary_large_image", title: `${title} · Flowz`, description },
};

export default function AiStrategyPage() {
  if (!item) return null;
  return <PillarArticle item={item} />;
}
