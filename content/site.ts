export const siteUrl = "https://www.flowz.dk";

export const email = "info@flowz.dk";

export const mailto = `mailto:${email}?subject=${encodeURIComponent("Software savings review")}`;

export const aiMailto = `mailto:${email}?subject=${encodeURIComponent("AI implementation")}`;

export const siteTitle = "Flowz | Software Renewal Negotiation & Cost Optimization";

export const siteDescription =
  "Flowz negotiates software renewals and cuts recurring costs. No upfront fee. You pay 20% of verified first-year savings, or nothing if there are no savings.";

export const cta = {
  label: "Get a Free Savings Review",
  href: "/#contact",
};

export const site = {
  name: "Flowz",
  legalName: "Flowz Consulting",
  registeredName: "flowz",
  cvr: "45157229",
  address: "Fridtjof Nansens Plads 2, 2100 Copenhagen",
  streetAddress: "Fridtjof Nansens Plads 2",
  postalCode: "2100",
  addressLocality: "Copenhagen",
  addressCountry: "DK",
  founded: 2024,
  email,
  mailto,
  aiMailto,
  nav: [
    { label: "Pricing", href: "/#pricing" },
    { label: "How It Works", href: "/#how" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    eyebrow: "Software procurement & renewal negotiation",
    headline: "Stop overpaying for software.",
    support:
      "We review your software contracts, find unnecessary costs and negotiate better renewals. You only pay us when we deliver verified savings.",
    primary: cta.label,
    primaryHref: cta.href,
    secondary: "See How It Works",
    secondaryHref: "/#how",
    trust: "No upfront fee · 20% of first-year savings · No savings, no fee",
  },
  steps: {
    heading: "How it works",
    items: [
      { index: "01", title: "Share your vendor list" },
      { index: "02", title: "We agree the scope and baseline" },
      { index: "03", title: "We negotiate, with your approval" },
      { index: "04", title: "You keep 80% of verified savings" },
    ],
  },
  pricing: {
    heading: "Pricing",
    figures: [
      { value: "0", label: "upfront" },
      { value: "20%", label: "of verified first-year savings" },
      { value: "0", label: "if there are no savings" },
    ],
    note: "You keep 80%. The scope is agreed in writing. AI work is priced separately.",
    exampleLabel: "Example only. Not a guaranteed result.",
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "What do we pay?",
        answer:
          "20% of verified first-year savings, invoiced after the saving is confirmed. No verified saving, no fee.",
      },
      {
        question: "What counts as a verified saving?",
        answer:
          "The reduction against a baseline agreed in writing before work starts. The calculator is an illustration.",
      },
      {
        question: "Will you contact our vendors?",
        answer: "Only with your approval. Terms are not agreed without you.",
      },
      {
        question: "What do you need to start?",
        answer:
          "A vendor list, rough spend, or the renewals you already know. Do not send contracts through this form.",
      },
    ],
  },
  contact: {
    heading: "Request a free review.",
    submit: "Request My Free Review",
    reassurance: "No commitment.",
  },
  ai: {
    eyebrow: "Separate service",
    heading: "AI implementation and workflow automation",
    summary:
      "Need help automating operations as well? We also design and implement tailored workflows and AI-enabled processes.",
    note: "This is a separate fixed-scope service. It is not included in the no-savings-no-fee pricing.",
    link: "AI implementation",
    pageHeading: "AI implementation and workflow automation",
    pageIntro:
      "We pick two or three workflows where time or errors are expensive, build them into tools the team already opens, and leave something the team can run.",
    points: [
      "A short list of work that is actually worth automating",
      "Built into the software people already use",
      "Handed over so the team can run it",
      "Priced as a fixed piece of work, separate from the savings fee",
    ],
    cta: "Write about a workflow",
  },
};
