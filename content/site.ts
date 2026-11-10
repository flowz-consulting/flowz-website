export const siteUrl = "https://www.flowz.dk";

export const email = "info@flowz.dk";

export const mailto = `mailto:${email}?subject=${encodeURIComponent("Consultancy enquiry")}`;

function enquiry(subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export const serviceCategories = [
  { id: "optimise", label: "Optimise" },
  { id: "modernise", label: "Modernise" },
  { id: "transform", label: "Transform" },
  { id: "manage", label: "Manage" },
] as const;

export const siteTitle = "Flowz | Software consultancy";

export const siteDescription =
  "Flowz helps companies optimise technology spend, modernise their software stack, and unlock productivity through AI and automation. Each engagement is agreed in writing.";

export const cta = {
  label: "Services",
  href: "/services",
};

export const contactCta = {
  label: "Contact",
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
  nav: [
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    eyebrow: "Consultancy",
    headline: "Consultancy for how you run on software.",
    support:
      "We help companies optimise technology spend, modernise their software stack, and unlock productivity through AI and automation.",
    primary: cta.label,
    primaryHref: cta.href,
    secondary: contactCta.label,
    secondaryHref: contactCta.href,
  },
  services: {
    eyebrow: "Services",
    heading: "What we do",
    intro:
      "Five areas of work. Vendor negotiations and renewals are the only engagement on a savings fee. Every other piece of work is scoped and priced on its own.",
    pageIntro:
      "We help companies optimise technology spend, modernise their software stack, and unlock productivity through AI and automation.",
    feeNote:
      "Vendor negotiations and renewals are the only engagement on a savings fee. Every other piece of work is scoped and priced on its own.",
    placement:
      "AI tool procurement and token cost sit with cost optimisation. Tool selection, training, adoption, and implementation sit with AI strategy. Removing unused licences sits with cost optimisation. Consolidating the stack sits with software strategy.",
    items: [
      {
        category: "optimise",
        title: "SaaS & AI cost optimisation",
        kicker: "Flagship",
        menu: "Find savings, negotiate contracts, remove waste.",
        summary: "Reduce technology spend, remove waste, and improve commercial terms.",
        href: "/services/cost-optimisation",
        link: "See this work",
        cta: "Talk about cost",
        mailto: enquiry("SaaS and AI cost"),
        offers: [
          "SaaS vendor negotiations and renewals",
          "SaaS benchmark pricing and competitive sourcing",
          "Unit price reduction and volume discounts",
          "Licence right-sizing and shelfware removal",
          "AI token and model cost optimisation",
          "Currency and FX optimisation",
          "Payment terms and deal structuring",
          "AI tool procurement and pricing advisory",
        ],
      },
      {
        category: "modernise",
        title: "Software strategy & migration",
        kicker: "Modernise",
        menu: "Strategy, migrations, and consolidation.",
        summary: "Optimise the software landscape and manage a move from one stack to another.",
        href: "/services/software-strategy",
        link: "See this work",
        cta: "Talk about the stack",
        mailto: enquiry("Software strategy"),
        offers: [
          "Software portfolio and stack assessments",
          "Software selection and alternative evaluation",
          "Software consolidation and rationalisation",
          "Migration strategy and roadmap",
          "Migration project management",
          "Vendor transition and replacement",
          "Implementation planning and coordination",
          "Change management and user adoption",
        ],
      },
      {
        category: "transform",
        title: "AI strategy, adoption & enablement",
        kicker: "Transform",
        menu: "Select, adopt, and use AI.",
        summary: "Help a team choose AI, learn it, and put it into the work.",
        href: "/services/ai-strategy",
        link: "See this work",
        cta: "Talk about AI",
        mailto: enquiry("AI strategy"),
        offers: [
          "AI readiness and opportunity assessments",
          "AI strategy and roadmap",
          "AI tool selection and recommendations",
          "AI training, workshops, and education",
          "AI setup, configuration, and deployment",
          "AI use case discovery and prioritisation",
          "AI governance, policies, and practice",
          "AI adoption and change management",
        ],
      },
      {
        category: "transform",
        title: "Workflow automation & integration",
        kicker: "Transform",
        menu: "Automate repetitive work and connect systems.",
        summary: "Design a process, build it in Make, Zapier, or n8n, and leave the team able to run it.",
        href: "/services/workflow-automation",
        link: "See this work",
        cta: "Talk about a workflow",
        mailto: enquiry("Workflow automation"),
        offers: [
          "Workflow discovery and process mapping",
          "Workflow design, creation, and management",
          "Make, Zapier, and n8n implementation",
          "AI-powered workflow automation",
          "SaaS integrations and API connectivity",
          "Process optimisation and efficiency",
          "Automation monitoring and maintenance",
          "Automation training and knowledge transfer",
        ],
      },
      {
        category: "manage",
        title: "SaaS management & governance",
        kicker: "Manage",
        menu: "Ongoing visibility, control, and advice.",
        summary: "Keep a running view of software spend, ownership, renewals, and what to change next.",
        href: "/services/saas-management",
        link: "See this work",
        cta: "Talk about governance",
        mailto: enquiry("SaaS management"),
        offers: [
          "SaaS spend and usage audits",
          "SaaS inventory and vendor management",
          "Licence lifecycle management",
          "SaaS procurement processes and policies",
          "Contract and renewal management",
          "SaaS budgeting and forecasting",
          "Software ownership and governance",
          "Continuous optimisation and reporting",
        ],
      },
    ],
  },
  journey: [
    {
      title: "Optimise spend",
      summary: "Find savings, negotiate contracts, remove waste.",
    },
    {
      title: "Modernise",
      summary: "Software strategy, migrations, consolidation.",
    },
    {
      title: "Transform",
      summary: "AI adoption, training, automation.",
    },
    {
      title: "Manage and improve",
      summary: "Ongoing governance, optimisation, and advisory.",
    },
  ],
  engagements: [
    {
      title: "Assess",
      kicker: "Discovery and advisory",
      summary: "Audit the current situation, identify opportunities, and deliver a prioritised action plan.",
    },
    {
      title: "Implement",
      kicker: "Project delivery",
      summary: "Carry out negotiations, migrations, AI deployments, and workflow automations.",
    },
    {
      title: "Manage",
      kicker: "Ongoing advisory",
      summary: "Monitor performance, maintain what was built, and keep optimising spend and usage.",
    },
  ],
  packages: [
    {
      name: "SaaS savings assessment",
      deliverable: "Savings opportunities and a negotiation roadmap",
      engagement: "Fixed fee",
    },
    {
      name: "AI readiness and strategy",
      deliverable: "Use cases, tool recommendations, and a roadmap",
      engagement: "Fixed fee",
    },
    {
      name: "Workflow automation sprint",
      deliverable: "Design and implementation of selected workflows",
      engagement: "Project",
    },
    {
      name: "Software migration advisory",
      deliverable: "Migration strategy, vendor evaluation, and project oversight",
      engagement: "Project",
    },
    {
      name: "Fractional SaaS and AI advisor",
      deliverable: "Ongoing procurement, optimisation, and strategic advice",
      engagement: "Monthly retainer",
    },
  ],
  steps: {
    heading: "How a negotiation works",
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
    note: "You keep 80% of the verified saving before other costs and taxes. The scope is agreed in writing. This fee is for vendor negotiations and renewals.",
    exampleLabel: "Example only. Not a guaranteed result.",
  },
  faq: {
    heading: "Questions about this fee",
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
    heading: "Tell us what you need.",
    submit: "Send a message",
    reassurance: "No commitment.",
  },
};
