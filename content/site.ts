// Replace this address before you send the site to leads.
export const email = "hello@flowzconsulting.com";

export const mailto = `mailto:${email}?subject=${encodeURIComponent("Software renewals")}`;

export const site = {
  name: "Flowz",
  legalName: "Flowz Consulting",
  founded: 2024,
  email,
  mailto,
  nav: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
  ],
  hero: {
    eyebrow: "For companies about to renew their software",
    headline: "You only pay us if your software bill goes down.",
    accent: "No savings, no fee.",
    support:
      "Flowz reviews the tools you already pay for, removes the overlap, and renegotiates the renewals. The fee is a share of the money saved.",
    primary: "Write to us",
    secondary: "See what we do",
    secondaryHref: "#services",
  },
  services: [
    {
      index: "01",
      title: "Vendor negotiation",
      summary:
        "We map the current stack, line up renewal dates, find tools that do the same job, and renegotiate. The fee applies only if the bill goes down.",
      points: [
        "A clear picture of what you pay, and when it renews",
        "Overlap called out, so duplicate tools can go",
        "Renewals negotiated with the vendors",
        "No fee if the spend does not fall",
      ],
    },
    {
      index: "02",
      title: "AI implementation",
      summary:
        "We pick two or three workflows where time or errors are expensive, build them into tools the team already opens, and leave something they can run without us.",
      points: [
        "A short list of work that is actually worth automating",
        "Built into the software people already use",
        "Handed over so the team can run it",
        "Priced as a fixed piece of work, separate from the savings fee",
      ],
    },
  ],
  steps: [
    {
      index: "01",
      title: "Share the stack",
      body: "You send the tools and the contracts. We map what you pay, when it renews, and where two products do one job.",
    },
    {
      index: "02",
      title: "We negotiate",
      body: "We take the renewals to the vendors, or sit with you while you do. The aim is a lower bill, or a tool you can drop.",
    },
    {
      index: "03",
      title: "You pay from the savings",
      body: "The fee is an agreed share of the first-year savings. If the bill does not move, the fee is zero.",
    },
  ],
  close: {
    headline: "Send the renewal list. We will tell you if there is money in it.",
    primary: "Write to us",
  },
};
