import type { Metadata } from "next";
import { PillarArticle } from "@/components/PillarArticle";
import { site } from "@/content/site";

const item = site.services.items.find((entry) => entry.href === "/services/workflow-automation");
const title = "Workflow automation and integration";
const description =
  "Flowz designs a process and builds it in Make, Zapier, or n8n, then leaves the team able to run it. Priced as its own piece of work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/workflow-automation" },
  openGraph: { title: `${title} · Flowz`, description, url: "/services/workflow-automation" },
  twitter: { card: "summary_large_image", title: `${title} · Flowz`, description },
};

export default function WorkflowAutomationPage() {
  if (!item) return null;
  return <PillarArticle item={item} />;
}
