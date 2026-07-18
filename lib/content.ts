export const modules = [
  ["CRM", "Turn every conversation into a clear next action."],
  ["Sales", "Move from quotation to revenue without fractured handoffs."],
  [
    "Accounting",
    "See expenses, receivables, payables and budgets in one view.",
  ],
  [
    "Purchase",
    "Bring requests, approvals and suppliers into one controlled flow.",
  ],
  ["Inventory", "Know what is available, committed and moving in real time."],
  ["HR", "Give people self-service tools while keeping operations aligned."],
  ["Projects", "Coordinate work, time and delivery around shared outcomes."],
  ["Ecommerce", "Connect your storefront directly to stock and finance."],
  ["Marketing", "Build measurable campaigns from the same customer record."],
  ["Helpdesk", "Resolve cases with complete customer and operational context."],
  ["POS", "Run modern retail with connected sales and inventory."],
  [
    "No-Code Studio",
    "Shape workflows around your business without platform lock-in.",
  ],
] as const;
export const products = [
  [
    "UNU Exchange",
    "A fintech platform for compliance, verification, cash and international operations.",
  ],
  [
    "UNU Chat",
    "One intelligent interface for every customer communication channel.",
  ],
  [
    "UNU Health Care",
    "Medical facilities, departments, insurance, inventory and reporting—connected.",
  ],
  ["UNU Flow", "Smart queue and customer-flow management with live analytics."],
  [
    "UNU Retail",
    "POS, inventory, purchasing, accounting and omnichannel operations in one system.",
  ],
] as const;
export const industries = [
  "Manufacturing",
  "Automotive",
  "Fashion & Apparel",
  "Food & Beverage",
  "Pharmaceuticals",
  "Construction",
  "Information Technology",
  "Education",
  "Real Estate",
  "Healthcare",
  "Transportation & Logistics",
  "Maritime & Shipping",
  "Media & Entertainment",
  "Gaming",
  "Photography & Videography",
  "Software Development",
  "AI & Machine Learning",
  "Cybersecurity",
  "Cloud Services",
  "Hospitality & Tourism",
  "Fitness & Wellness",
];
export const nav = [
  { label: "Features", href: "/features" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Solutions & Pricing", href: "/pricing" },
];
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
export const featureDetails: Record<
  string,
  { name: string; headline: string; intro: string; benefits: string[] }
> = Object.fromEntries(
  modules.map(([name, intro]) => [
    slugify(name),
    {
      name,
      headline:
        (
          {
            CRM: "Build stronger relationships with open-source CRM",
            Sales: "A lightning-fast sales system for every opportunity",
            Accounting:
              "Financial clarity without requiring accounting expertise",
            Purchase: "An integrated approach to smarter procurement",
            Inventory: "Know every item, location and movement",
            HR: "Stop managing employees. Start empowering them.",
            Projects: "Enable your people to work as one team",
            Ecommerce: "Build the store around your operation",
            Marketing: "Turn customer insight into measurable campaigns",
            Helpdesk: "Resolve every request with complete context",
            POS: "Connected retail, from counter to accounts",
            "No-Code Studio": "Build without limits",
          } as Record<string, string>
        )[name] || name,
      intro,
      benefits:
        (
          {
            CRM: [
              "Unified customer records",
              "Pipeline and activity visibility",
              "Connected sales and support",
            ],
            Sales: [
              "Quotations and orders",
              "Automated handoffs",
              "Real-time revenue visibility",
            ],
            Accounting: [
              "Receivables and payables",
              "Budgets and expenses",
              "Compliance-ready reporting",
            ],
            Purchase: [
              "Purchase requests and approvals",
              "Supplier management",
              "Inventory-linked purchasing",
            ],
            Inventory: [
              "Multi-location stock",
              "Reordering and transfers",
              "Live valuation and traceability",
            ],
            HR: [
              "Employee self-service",
              "Attendance and leave",
              "Connected payroll operations",
            ],
            Projects: [
              "Tasks and milestones",
              "Time and resource tracking",
              "Shared delivery reporting",
            ],
            Ecommerce: [
              "Connected catalog and orders",
              "Live inventory sync",
              "Customer and finance integration",
            ],
            Marketing: [
              "Audience segmentation",
              "Email automation",
              "Campaign measurement",
            ],
            Helpdesk: [
              "Case ownership and SLAs",
              "Omnichannel context",
              "Support analytics",
            ],
            POS: [
              "Fast checkout",
              "Inventory synchronization",
              "Store performance reporting",
            ],
            "No-Code Studio": [
              "Custom fields and forms",
              "Workflow automation",
              "Business-specific applications",
            ],
          } as Record<string, string[]>
        )[name] || [],
    },
  ]),
);
export const productDetails: Record<
  string,
  { name: string; headline: string; intro: string; capabilities: string[] }
> = Object.fromEntries(
  products.map(([name, intro]) => [
    slugify(name.replace("UNU ", "")),
    {
      name,
      headline: (
        {
          "UNU Exchange": "Financial operations without operational borders",
          "UNU Chat": "Every channel. One intelligent conversation.",
          "UNU Health Care": "A connected operating system for modern care",
          "UNU Flow": "Make every customer journey move with purpose",
          "UNU Retail": "One view of every store, item and sale",
        } as Record<string, string>
      )[name],
      intro,
      capabilities: (
        {
          "UNU Exchange": [
            "Compliance & governance",
            "Digital integration & verification",
            "Financial operations management",
            "Inventory & cash management",
            "International operations",
          ],
          "UNU Chat": [
            "Connecting all communication channels",
            "Smart centralized management",
            "Performance analytics and KPIs",
            "Team management",
          ],
          "UNU Health Care": [
            "Medical facility management",
            "Medical departments",
            "Finance and insurance",
            "Analytics and reporting",
            "Medical inventory",
          ],
          "UNU Flow": [
            "Smart queue management",
            "System integrations",
            "Customer experience",
            "Analytics and reporting",
          ],
          "UNU Retail": [
            "Sales and omnichannel",
            "Inventory and fixed assets",
            "Purchasing and suppliers",
            "Accounting and finance",
            "Reporting and analytics",
          ],
        } as Record<string, string[]>
      )[name],
    },
  ]),
);
export const industryDetails: Record<
  string,
  { name: string; headline: string; intro: string[] }
> = Object.fromEntries(
  industries.map((name) => [
    slugify(name),
    {
      name,
      headline: `Open-source ERP and CRM for ${name}`,
      intro: [
        `Connect the critical operations of your ${name.toLowerCase()} organization in one adaptable platform.`,
        `UNU ERP replaces disconnected tools with a live operational model spanning finance, customers, people, purchasing, inventory and delivery.`,
        `Configure workflows around the way your teams work today, then extend them as the organization grows.`,
      ],
    },
  ]),
);
