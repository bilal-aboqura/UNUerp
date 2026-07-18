export type EnglishProductPage = {
  name: string;
  signal: string;
  headline: string;
  intro: string;
  sectionTitle: string;
  sectionIntro: string;
  capabilities: { title: string; text: string }[];
  features: string[];
  workflow: string[];
  integrations: string[];
  audiences: string[];
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  dashboard: {
    label: string;
    primaryMetric: string;
    secondaryMetric: string;
    rows: string[];
  };
};

export const englishProductCatalog = [
  {
    slug: "exchange",
    name: "UNU Exchange",
    tag: "Financial technology",
    title: "Professional operations for exchange and currency businesses",
    text: "Manage currency purchases and sales, cash inventory, pricing, customers, controls, and reporting from one operating platform.",
    items: ["Cash and vaults", "Live pricing", "Branch management", "Controls and reporting", "Permissions", "Transaction history"],
  },
  {
    slug: "chat",
    name: "UNU Chat",
    tag: "Customer communication",
    title: "Manage every customer channel from one workspace",
    text: "Bring WhatsApp, email, website chat, and other channels together so your team can respond and follow up with full context.",
    items: ["WhatsApp", "Live Chat", "Email", "Conversation routing", "Smart assistant", "Performance reporting"],
  },
  {
    slug: "health-care",
    name: "UNU Health Care",
    tag: "Healthcare operations",
    title: "A connected digital platform for healthcare facilities",
    text: "Manage patients, appointments, medical records, labs, radiology, pharmacy, billing, and reporting through one system.",
    items: ["Patients", "Appointments", "Medical records", "Labs and radiology", "Billing", "Reporting"],
  },
  {
    slug: "flow",
    name: "UNU Flow",
    tag: "Business automation",
    title: "Automate workflows and manage the customer journey",
    text: "Design workflows, route approvals, and connect data and systems to reduce manual work across departments.",
    items: ["Workflows", "Approvals", "System connections", "Alerts", "Dashboards", "Permissions"],
  },
  {
    slug: "retail",
    name: "UNU Retail",
    tag: "Retail operations",
    title: "A connected platform for stores and points of sale",
    text: "Manage sales, inventory, customers, purchasing, accounting, and branch performance in one system.",
    items: ["Point of sale", "Inventory", "Branch management", "Customers", "Accounting", "Performance reporting"],
  },
] as const;

export const englishProductPages: Record<string, EnglishProductPage> = {
  exchange: {
    name: "UNU Exchange",
    signal: "Built for exchange businesses",
    headline: "Run exchange operations with clarity and control.",
    intro: "Manage currency buying and selling, cash and vaults, branches, controls, and reporting in one configurable operating platform.",
    sectionTitle: "Purpose-built for currency exchange operations",
    sectionIntro: "From transaction execution to review and reporting, UNU Exchange gives operations and management a shared view with clear records of movements and permissions.",
    capabilities: [
      { title: "Transactions and currencies", text: "Organize currency purchases and sales, monitor prices, and manage daily movements from one workspace." },
      { title: "Cash and vault management", text: "Track currency balances, vaults, branches, and cash inventory with clear operational alerts." },
      { title: "Controls and reporting", text: "Maintain transaction and permission records with financial and operational reporting for review and decisions." },
      { title: "Branch management", text: "Compare branch performance and monitor balances, currency movement, and daily outcomes centrally." },
      { title: "Customers and verification", text: "Connect customer information to transactions and required documents in a reviewable process." },
      { title: "Financial integration", text: "Configure connections to finance systems, devices, and surrounding services within the project scope." },
    ],
    features: ["Currency buying and selling", "Cash and vault management", "Cash inventory tracking", "Branch management", "Employee permissions", "Pricing updates", "Transaction audit trail", "Executive reporting", "Customer management", "Operational limit monitoring"],
    workflow: ["Register customer", "Execute transaction", "Verify and review", "Update vault", "Report and control"],
    integrations: ["UNU ERP", "Accounting", "Identity and verification", "Printing devices", "APIs"],
    audiences: ["Exchange companies", "Branch networks", "Treasury teams", "Audit and control teams"],
    faq: [
      { question: "Does it support multiple branches and vaults?", answer: "The platform is designed to manage branches and vaults centrally. Final configuration is shaped around your operating structure." },
      { question: "Can permissions and review paths be configured?", answer: "Yes. Roles, permissions, and approval paths can be aligned with the responsibilities of operations and review teams." },
      { question: "Can it connect to financial systems?", answer: "The implementation team reviews your current systems and required interfaces to define the appropriate integration scope." },
    ],
    ctaTitle: "See your exchange operation in one platform",
    ctaText: "Book a walkthrough shaped around your branches, vaults, and current workflows.",
    dashboard: { label: "Exchange operations", primaryMetric: "Currency activity", secondaryMetric: "Vault status", rows: ["Currency rates", "Today’s transactions", "Branch balances", "Review and reports"] },
  },
  chat: {
    name: "UNU Chat",
    signal: "One customer service workspace",
    headline: "Every customer conversation. One connected place.",
    intro: "Bring customer channels together, route conversations to the right people, and follow performance in a workspace connected to your business data.",
    sectionTitle: "Everything your service team needs to stay in context",
    sectionIntro: "From the first message to resolution and performance review, UNU Chat keeps the conversation, customer, and team connected.",
    capabilities: [
      { title: "Unified conversations", text: "Bring WhatsApp, email, website chat, and other channels into one interface." },
      { title: "Intelligent routing", text: "Route conversations to the right employee based on team, branch, or request type." },
      { title: "Live reporting", text: "Monitor response speed, conversation volume, and service-team performance." },
      { title: "Connected business context", text: "Link conversations to customer records, orders, invoices, and relevant files." },
      { title: "Role-based access", text: "Control what agents and supervisors see according to responsibility and scope." },
      { title: "Team assistance", text: "Use prepared replies, alerts, and tickets to support consistent service." },
    ],
    features: ["WhatsApp Business", "Live Chat", "Email", "Contact center", "Smart assistant", "Tickets", "Performance dashboard", "Analytics", "Notifications", "Permissions"],
    workflow: ["Customer message", "UNU Chat", "Automatic routing", "Assigned agent", "Request resolution", "Performance review"],
    integrations: ["UNU ERP", "CRM", "POS", "Accounting", "WhatsApp", "Email", "API"],
    audiences: ["Customer service", "Sales", "Technical support", "Contact centers"],
    faq: [
      { question: "Which channels can be connected?", answer: "The channel scope depends on the implementation plan and available integrations. The team confirms it with you before the project starts." },
      { question: "Does it support multiple teams and branches?", answer: "Teams, departments, and branches can be organized with routing rules and permissions aligned to your operation." },
      { question: "Can conversations connect to ERP data?", answer: "Conversation links to customer records and related transactions can be assessed within the agreed integration scope." },
    ],
    ctaTitle: "Manage customer conversations from one workspace",
    ctaText: "See how a request moves from the channel to the right team member without losing context.",
    dashboard: { label: "Conversation inbox", primaryMetric: "Active conversations", secondaryMetric: "Response time", rows: ["WhatsApp Business", "Live Chat", "Email", "Team reports"] },
  },
  "health-care": {
    name: "UNU Health Care",
    signal: "Healthcare facility operations",
    headline: "A connected operating platform for healthcare facilities.",
    intro: "Manage hospitals, clinics, and medical centers through one system that connects the patient journey, clinical departments, inventory, billing, and reporting.",
    sectionTitle: "From patient reception to final billing",
    sectionIntro: "Connect appointments, medical records, labs, radiology, pharmacy, and finance in one coordinated operating experience.",
    capabilities: [
      { title: "Appointment management", text: "Organize patient bookings and clinician schedules with a clear view of clinic capacity." },
      { title: "Electronic medical record", text: "Bring patient details, visits, test results, and prescriptions into one record." },
      { title: "Connected medical departments", text: "Coordinate reception, clinics, labs, radiology, pharmacy, and billing." },
      { title: "Reporting and statistics", text: "Give management a clearer view of operations, revenue, and service demand." },
      { title: "User permissions", text: "Organize access for doctors, nursing, reception, and management according to role." },
      { title: "Medical inventory", text: "Connect pharmacy and consumable movements to demand and billing." },
    ],
    features: ["Doctor management", "Patient management", "Appointments", "Laboratory", "Radiology", "Pharmacy", "Billing", "Medical inventory", "Reporting", "Permissions"],
    workflow: ["Patient", "Booking", "Reception", "Clinician", "Medical services", "Pharmacy and billing", "Reporting"],
    integrations: ["UNU ERP", "Human resources", "Accounting", "SMS", "WhatsApp", "Email", "Payment gateways", "API"],
    audiences: ["Hospitals", "Medical centers", "Clinics", "Dental centers", "Laboratories", "Radiology centers", "Physical therapy"],
    faq: [
      { question: "Does it support multiple facilities and branches?", answer: "The operating structure can be configured for multiple branches and departments with permissions and reports for each management level." },
      { question: "Can patient data be imported?", answer: "Data sources and quality are reviewed first, followed by a migration and verification plan within the implementation project." },
      { question: "How is patient data protected?", answer: "Protection depends on permissions, activity records, hosting controls, and the integrations agreed in the project scope." },
    ],
    ctaTitle: "Ready to improve healthcare operations?",
    ctaText: "See the complete patient journey in a system that connects teams, services, and data.",
    dashboard: { label: "Facility operations", primaryMetric: "Today’s appointments", secondaryMetric: "Clinic capacity", rows: ["Patient list", "Clinician schedules", "Medical services", "Billing and reports"] },
  },
  flow: {
    name: "UNU Flow",
    signal: "Connected process automation",
    headline: "Connect your systems. Move decisions forward with confidence.",
    intro: "A central platform for connecting company systems, unifying data, and following operations through workflows and dashboards that give management a clearer view.",
    sectionTitle: "A system that adapts to your business",
    sectionIntro: "Connect applications and data to reduce manual work, speed up approvals, and improve collaboration across departments.",
    capabilities: [
      { title: "Unified data", text: "Bring company data into a shared model with synchronization between connected systems." },
      { title: "Intelligent workflows", text: "Build approval, authorization, and task-routing paths that reduce manual intervention." },
      { title: "Live reporting", text: "Turn process status into dashboards and visuals that support decisions." },
      { title: "Flexible integration", text: "Connect current systems through interfaces appropriate to the work and data scope." },
      { title: "Immediate alerts", text: "Notify accountable owners when work is delayed, changed, or requires action." },
      { title: "Security and permissions", text: "Control access and record actions throughout sensitive workflows." },
    ],
    features: ["Process automation", "Approvals", "Data connections", "Alerts", "KPI dashboards", "Permissions", "Task tracking", "Activity history"],
    workflow: ["Connect systems", "Collect data", "Process rules", "Route actions", "Present reports"],
    integrations: ["ERP", "CRM", "HR", "Accounting", "POS", "E-commerce", "API", "Excel"],
    audiences: ["Growing businesses", "Manufacturers", "Service companies", "Institutions", "Healthcare", "Education"],
    faq: [
      { question: "Can it connect to our current system?", answer: "The project starts by reviewing systems, data sources, and available interfaces to identify the most practical integrations." },
      { question: "How long does implementation take?", answer: "Timing depends on the number of systems, workflows, and the customization scope. It is defined in an implementation plan before work begins." },
      { question: "Can permissions be customized?", answer: "Yes. Roles and permissions can be built around departments and the responsibilities at each workflow stage." },
    ],
    ctaTitle: "Improve how your operation moves",
    ctaText: "Let your systems and data work together inside one connected platform.",
    dashboard: { label: "Workflow center", primaryMetric: "Active processes", secondaryMetric: "Approval requests", rows: ["Sales", "Finance", "Human resources", "Inventory and integrations"] },
  },
  retail: {
    name: "UNU Retail",
    signal: "Connected retail operations",
    headline: "Manage every store from one operating platform.",
    intro: "Run sales, inventory, customers, branches, and points of sale, then follow performance from one central view.",
    sectionTitle: "Everything a retail operation needs in one system",
    sectionIntro: "From checkout to financial reporting, UNU Retail connects the store, warehouse, customer, and accounts.",
    capabilities: [
      { title: "Point-of-sale management", text: "Run checkout, invoices, returns, and discounts in a fast sales experience." },
      { title: "Inventory management", text: "Track quantities across stores and warehouses with shortage alerts and item movement." },
      { title: "Customer management", text: "Maintain one record for purchases, preferences, loyalty programs, and offers." },
      { title: "Branch management", text: "Follow every branch from a central view with permissions appropriate to each role." },
      { title: "Live reporting", text: "Review sales, items, branches, employees, cash, and tax information." },
      { title: "Employee permissions", text: "Give cashiers, supervisors, and managers clear roles with an activity record." },
    ],
    features: ["Barcode", "Receipt printers", "Customer display", "Electronic scales", "Payment devices", "QR", "Tax", "E-invoicing", "Returns", "Offers and discounts"],
    workflow: ["Customer", "Checkout", "Invoice", "Inventory update", "Reporting", "Management dashboard"],
    integrations: ["UNU ERP", "Accounting", "CRM", "Human resources", "E-commerce", "Payment gateways", "WhatsApp", "API"],
    audiences: ["Supermarkets", "Fashion", "Electronics", "Pharmacies", "Perfume stores", "Mobile stores", "Furniture", "Multi-branch retailers"],
    faq: [
      { question: "Does it support multiple branches and warehouses?", answer: "Branches and warehouses can be managed centrally with permissions and reports separated around your operating structure." },
      { question: "Does it support POS and barcode devices?", answer: "Required devices and drivers are reviewed during discovery to confirm compatibility with the implementation scope." },
      { question: "Can it connect to accounting and e-commerce?", answer: "Connections to accounting, digital channels, and payment gateways can be assessed based on the available systems and interfaces." },
    ],
    ctaTitle: "Operate your stores with a clearer view",
    ctaText: "Follow sales, inventory, and branches from one place in a walkthrough tailored to your retail operation.",
    dashboard: { label: "Retail performance", primaryMetric: "Today’s sales", secondaryMetric: "Inventory status", rows: ["Top items", "Branch performance", "Inventory alerts", "Customers and invoices"] },
  },
};

export const englishIndustryCopy: Record<string, string> = {
  manufacturing: "Manage production lines, manufacturing orders, quality, and inventory in one platform.",
  automotive: "Connect showrooms, workshops, service appointments, and spare-parts inventory.",
  "fashion-and-apparel": "Coordinate collections, sizes, branches, inventory, and seasonal sales.",
  "food-and-beverage": "Manage recipes, inventory, production, expiry tracking, and points of sale.",
  pharmaceuticals: "Control pharmaceutical inventory, expiry dates, purchasing, and traceability.",
  construction: "Manage projects, contractors, contracts, purchasing, and costs.",
  "information-technology": "Connect projects, technical support, subscriptions, contracts, and resources.",
  education: "Coordinate students, fees, people, finance, and support services.",
  "real-estate": "Manage units, tenants, contracts, collections, and maintenance.",
  healthcare: "Connect clinics, appointments, patients, billing, and medical inventory.",
  "transportation-and-logistics": "Manage shipments, fleets, tracking, billing, and delivery schedules.",
  "maritime-and-shipping": "Coordinate shipments, ports, documents, costs, and customers.",
  "media-and-entertainment": "Manage media projects, resources, customers, and budgets.",
  gaming: "Coordinate production teams, projects, subscriptions, sales, and customer support.",
  "photography-and-videography": "Manage bookings, projects, equipment, billing, and delivery.",
  "software-development": "Connect projects, resources, contracts, billing, and customer support.",
  "ai-and-machine-learning": "Organize projects, resources, contracts, costs, and delivery cycles.",
  cybersecurity: "Manage contracts, recurring services, incidents, projects, and billing.",
  "cloud-services": "Coordinate subscriptions, usage, billing, support, and service agreements.",
  "hospitality-and-tourism": "Connect bookings, services, guests, purchasing, and billing.",
  "fitness-and-wellness": "Manage memberships, bookings, trainers, payments, and customer experience.",
};
