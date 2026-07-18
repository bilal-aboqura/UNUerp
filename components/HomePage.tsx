import Image from "next/image";
import Link from "next/link";
import { Page } from "@/components/Shell";
import { CommandCenter } from "@/components/ProductVisuals";
import { modules, products, slugify } from "@/lib/content";
import type { SiteContent } from "@/lib/site-content";

export const homeCopy = {
  en: {
    badge: "One connected operating system",
    title: "One platform for your entire business",
    lead: "Run finance, sales, inventory, HR, and customer operations from one connected system. Give every team access to the same accurate, up-to-date information.",
    primary: "Book a tailored demo",
    secondary: "Explore the platform",
    trust: ["Open-source flexibility", "Real-time business visibility", "Configured around your workflows"],
    commandTitle: "See your entire operation in one place",
    commandLead: "Track financial performance, sales activity, inventory movement, and workforce operations from one clear control center.",
    proof: "Trusted to support connected operations",
    proofNote: "A regional partner for businesses ready to replace disconnected systems.",
    systemEyebrow: "One connected operating model",
    systemProof: "Capture once. Act everywhere.",
    systemSources: ["Customer", "Invoice", "Inventory", "Employee"],
    systemActions: ["Approval", "Notification", "Handoff", "Updated"],
    systemSignals: ["Cash flow", "Sales", "Stock", "Workforce"],
    systemTitle: "One system for connected operations",
    systemLead: "UNU ERP replaces disconnected systems, repeated spreadsheets, and manual handoffs with one flexible platform for teams, data, and workflows.",
    systemSteps: [
      ["Enter data once", "Customer, transaction, inventory, and employee information is captured once and made available to the right teams."],
      ["Keep work moving", "Automate approvals, handoffs, notifications, and follow-ups without duplicate entry or constant status checks."],
      ["Make informed decisions", "See the financial and operational impact of every action using current, connected data."],
    ],
    capabilityTitle: "Every essential function, working together",
    capabilityLead: "Start with the modules you need today, then expand the same platform as your teams, locations, and processes grow.",
    capabilityAction: "View all features",
    capabilities: [
      ["CRM", "Keep customer information, conversations, opportunities, and next actions organized in one place.", "Explore CRM"],
      ["Sales", "Manage quotations, orders, invoices, and sales performance from lead to revenue.", "Explore Sales"],
      ["Accounting", "Track income, expenses, receivables, payables, budgets, and financial reports with greater clarity.", "Explore Accounting"],
      ["Purchasing", "Manage purchase requests, approvals, suppliers, and orders in one controlled process.", "Explore Purchasing"],
      ["Inventory", "Monitor available, reserved, incoming, and outgoing stock across all locations.", "Explore Inventory"],
      ["Human Resources", "Manage employee records, attendance, leave, payroll, and performance from one system.", "Explore HR"],
    ],
    financeTitle: "Financial clarity connected to daily operations",
    financeLead: "Connect sales, purchasing, inventory, projects, and workforce activity directly to the financial picture—without waiting for separate reports or manual reconciliation.",
    financeSignals: ["Real-time receivables and payables", "Purchasing connected to inventory", "Clear approval workflows", "Complete audit history", "Up-to-date financial reporting"],
    financeAction: "Explore Accounting",
    financeOverview: "Financial overview",
    cashStatus: "Stable",
    financeGrowth: "+12.4%",
    financeComparison: "vs. previous month",
    financeSample: "Sample interface data",
    financeConnections: [["Sales", "Connected"], ["Purchasing", "Connected"], ["Inventory", "Connected"]],
    productsTitle: "Specialized products built on one foundation",
    productsLead: "Extend UNU ERP into financial services, customer communication, healthcare, queue management, and retail without creating separate information silos.",
    productItems: [
      ["UNU Exchange", "A financial operations platform for compliance, verification, cash management, and international transactions."],
      ["UNU Chat", "Manage customer conversations across multiple communication channels from one intelligent workspace."],
      ["UNU Healthcare", "Connect facilities, departments, insurance, inventory, patient services, and reporting."],
      ["UNU Flow", "Manage queues, customer journeys, service points, and live operational analytics."],
      ["UNU Retail", "Connect point of sale, inventory, purchasing, accounting, branches, and omnichannel operations."],
    ],
    productAction: "View product",
    industriesTitle: "From day-to-day operations to better decisions",
    industriesLead: "UNU ERP can be configured around the way your industry actually works. Different sectors require different approvals, reporting structures, operational controls, and handoffs. We adapt the system while keeping your business data connected.",
    industryItems: ["Manufacturing", "Automotive", "Fashion and Apparel", "Food and Beverage", "Pharmaceuticals", "Construction", "Information Technology", "Education", "Retail", "Healthcare", "Professional Services"],
    industriesAction: "See all 21 industries",
    principlesTitle: "Flexible where you need it. Controlled where it matters.",
    principles: [
      ["Keep control of your platform", "Open-source foundations give you greater control over your data, deployment, and business processes."],
      ["Configure your workflows", "Adapt roles, approvals, reports, automations, and permissions to match the way your teams operate."],
      ["Scale without starting over", "Add new users, branches, modules, and workflows while continuing to work on the same platform."],
    ],
    faqTitle: "Questions business leaders ask",
    faqs: [
      ["Can UNU ERP support our current workflows?", "Yes. The implementation is configured around your required modules, approval paths, roles, reports, integrations, and deployment preferences."],
      ["Do we need to replace all our systems at once?", "No. You can start with one department or process, then expand gradually without disrupting the rest of the business."],
      ["How is pricing determined?", "Pricing depends on the selected modules, number of users, implementation requirements, integrations, customizations, and deployment model."],
      ["Can UNU ERP support industry-specific requirements?", "Yes. We can configure workflows, reports, permissions, and integrations around the needs of your sector."],
    ],
    finalTitle: "Show us where work slows down",
    finalLead: "Tell us which process creates delays, repeated work, or poor visibility. We will map the teams, information, and decisions involved, then recommend a practical starting point.",
    finalAction: "Talk to an ERP expert",
  },
  ar: {
    badge: "نظام تشغيل واحد ومترابط",
    title: "أدر أعمالك من مكان واحد",
    lead: "اربط المالية والمبيعات والمخزون والموارد البشرية وخدمة العملاء في نظام موحّد، لتعمل فرقك على بيانات دقيقة ومحدثة دون تنقّل بين أنظمة منفصلة.",
    primary: "اطلب عرضًا مخصصًا",
    secondary: "استكشف المنصة",
    trust: ["تحكم كامل في بياناتك", "تحديث لحظي للعمليات", "إعدادات مرنة تناسب طريقة عملك"],
    commandTitle: "صورة أوضح لكل ما يحدث داخل شركتك",
    commandLead: "تابع الأداء المالي، والمبيعات، وحركة المخزون، والموارد البشرية من لوحة تشغيل واحدة تمنحك رؤية فورية لما يحتاج إلى قرار.",
    proof: "موثوق لدعم عمليات مترابطة",
    proofNote: "شريك إقليمي للشركات المستعدة لاستبدال الأنظمة المنفصلة.",
    systemEyebrow: "نموذج تشغيلي واحد",
    systemProof: "سجّل مرة واحدة، واعمل من كل مكان.",
    systemSources: ["عميل", "فاتورة", "مخزون", "موظف"],
    systemActions: ["موافقة", "تنبيه", "تسليم", "تم التحديث"],
    systemSignals: ["التدفق النقدي", "المبيعات", "المخزون", "القوى العاملة"],
    systemTitle: "منصة واحدة لعمليات مترابطة",
    systemLead: "تساعد UNU ERP الشركات على استبدال الأنظمة المنفصلة والعمل اليدوي بمنصة مرنة تربط الفرق والبيانات وسير العمل.",
    systemSteps: [
      ["سجّل البيانات مرة واحدة", "تدخل بيانات العملاء والمبيعات والمخزون والموظفين مرة واحدة، ثم تصبح متاحة للإدارات المصرح لها دون تكرار الإدخال."],
      ["أتمت المهام المتكررة", "نظّم الموافقات والتنبيهات والمتابعات، وقلّل الاعتماد على الرسائل والمكالمات لمعرفة حالة كل طلب."],
      ["اتخذ قرارات أدق", "اربط النتائج المالية بما يحدث فعليًا في المبيعات والمخزون والمشتريات والموارد البشرية."],
    ],
    capabilityTitle: "كل ما تحتاجه لإدارة أعمالك",
    capabilityLead: "ابدأ بالوحدات التي تحتاجها الآن، ثم أضف المزيد مع توسع شركتك دون الحاجة إلى تغيير النظام بالكامل.",
    capabilityAction: "عرض جميع المزايا",
    capabilities: [
      ["إدارة علاقات العملاء", "احتفظ ببيانات العملاء، وتابع الفرص والمحادثات والصفقات من مكان واحد.", "استكشف إدارة العملاء"],
      ["المبيعات", "أدر عروض الأسعار والطلبات والفواتير، وتابع أداء فريق المبيعات خطوة بخطوة.", "استكشف المبيعات"],
      ["المحاسبة", "تابع الحسابات والمدفوعات والمصروفات والتقارير المالية بوضوح أكبر.", "استكشف المحاسبة"],
      ["المشتريات", "نظّم طلبات الشراء والموردين والموافقات، واربطها مباشرة بالمخزون والحسابات.", "استكشف المشتريات"],
      ["المخزون", "تابع الكميات والحركات والتحويلات بين المخازن، وتجنب النقص أو التكدس.", "استكشف المخزون"],
      ["الموارد البشرية", "أدر بيانات الموظفين والحضور والإجازات والرواتب والتقييمات في نظام واحد.", "استكشف الموارد البشرية"],
    ],
    financeTitle: "رؤية مالية مرتبطة بالعمليات الفعلية",
    financeLead: "اربط النتائج المالية بالمبيعات والمشتريات والمخزون والموارد البشرية، لتحصل على صورة مالية محدثة تعكس ما يحدث فعليًا داخل أعمالك.",
    financeSignals: ["متابعة لحظية للذمم المدينة والدائنة", "ربط المشتريات بحركة المخزون", "مسارات واضحة للموافقات", "سجل كامل للعمليات والتعديلات", "تقارير مالية محدثة باستمرار"],
    financeAction: "استكشف حلول المحاسبة",
    financeOverview: "الحالة المالية",
    cashStatus: "مستقر",
    financeGrowth: "+١٢٫٤٪",
    financeComparison: "مقارنة بالشهر السابق",
    financeSample: "بيانات توضيحية",
    financeConnections: [["المبيعات", "متصلة"], ["المشتريات", "متصلة"], ["المخزون", "متصل"]],
    productsTitle: "حلول متخصصة تعمل على نفس المنصة",
    productsLead: "وسّع استخدام UNU ERP حسب احتياجات نشاطك، دون إنشاء نظام منفصل لكل قسم أو منتج.",
    productItems: [
      ["UNU Exchange", "حل لإدارة عمليات الصرافة والتحويلات ضمن بيئة تشغيل مترابطة."],
      ["UNU Chat", "قنوات تواصل داخلية تساعد الفرق على متابعة العمل والمناقشات المرتبطة بالمهام."],
      ["UNU Healthcare", "أدوات مخصصة لإدارة المنشآت الصحية والعمليات اليومية وخدمة المرضى."],
      ["UNU Flow", "نظام لتنظيم تدفقات العمل والموافقات والإجراءات بين الأقسام."],
      ["UNU Retail", "حل متكامل لإدارة المتاجر والمبيعات والمخزون والفروع."],
    ],
    productAction: "عرض المنتج",
    industriesTitle: "من أرض الواقع إلى لوحة الإدارة",
    industriesLead: "صُممت UNU ERP لتناسب طريقة عمل القطاعات المختلفة، لأن كل قطاع لديه عمليات وتقارير وضوابط تختلف عن غيره. نهيئ النظام بما يتوافق مع طبيعة نشاطك، مع الحفاظ على قاعدة بيانات موحدة ومترابطة.",
    industryItems: ["التصنيع", "السيارات", "الأزياء والملابس", "الأغذية والمشروبات", "الأدوية", "الإنشاءات", "تقنية المعلومات", "التعليم", "تجارة التجزئة", "الخدمات المهنية", "الرعاية الصحية"],
    industriesAction: "عرض جميع القطاعات",
    principlesTitle: "مرونة أكبر دون فقدان السيطرة",
    principles: [
      ["تحكم في بياناتك", "بفضل البنية مفتوحة المصدر، تحتفظ بملكية بياناتك وتحدد طريقة استضافتها وإدارتها."],
      ["خصّص سير العمل", "اضبط الصلاحيات والموافقات والتقارير والأتمتة بما يناسب إجراءات شركتك."],
      ["توسّع دون إعادة البناء", "أضف فروعًا وفرقًا ووحدات جديدة مع استمرار العمل على النظام نفسه."],
    ],
    faqTitle: "أسئلة شائعة",
    faqs: [
      ["هل يمكن تهيئة UNU ERP حسب طريقة عملنا الحالية؟", "نعم. نبدأ بدراسة العمليات الحالية، ثم نهيئ الوحدات والصلاحيات والموافقات والتقارير والتكاملات بما يناسب شركتك."],
      ["هل يجب أن نستبدل جميع الأنظمة دفعة واحدة؟", "لا. يمكن البدء بقسم أو عملية محددة، ثم التوسع تدريجيًا دون تعطيل العمل."],
      ["كيف يتم تحديد السعر؟", "يعتمد السعر على عدد المستخدمين والوحدات المطلوبة والتخصيصات والتكاملات وطريقة الاستضافة."],
      ["هل يمكن تنفيذ متطلبات خاصة بقطاعنا؟", "نعم. نوفر تخصيصات تناسب القطاعات المختلفة، بما في ذلك التقارير وسير العمل والصلاحيات والتكاملات."],
    ],
    finalTitle: "أخبرنا أين تتعطل أعمالك",
    finalLead: "شاركنا العملية التي تستغرق وقتًا أو تسبب تأخيرًا بين الفرق، وسنساعدك على تحديد أفضل نقطة للبدء بنظام مترابط وقابل للتوسع.",
    finalAction: "تحدث مع خبير ERP",
  },
} as const;

export function HomePage({
  locale = "en",
  content,
  siteContent,
  media,
}: {
  locale?: "en" | "ar";
  content?: (typeof homeCopy)["en"] | (typeof homeCopy)["ar"];
  siteContent?: SiteContent["global"];
  media?: SiteContent["media"];
}) {
  const ar = locale === "ar";
  const copy = content ?? homeCopy[locale];
  const prefix = ar ? "/ar" : "";
  const industrySlugs = [
    "manufacturing", "automotive", "fashion-and-apparel", "food-and-beverage",
    "pharmaceuticals", "construction", "information-technology", "education",
  ];

  return (
    <Page locale={locale} content={siteContent}>
      <section className="hero home-hero">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="wrap hero-copy">
          <span className="hero-badge"><i /> {copy.badge}</span>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.lead}</p>
          <div className="actions hero-actions">
            <Link className="button" href={`${prefix}/contact`}>{copy.primary}<span aria-hidden="true">{ar ? "←" : "↗"}</span></Link>
            <Link className="button secondary" href={`${prefix}/features`}>{copy.secondary}</Link>
          </div>
          <div className="trustline">
            {copy.trust.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="wrap hero-product">
          <div className="hero-product-copy" data-reveal>
            <h2>{copy.commandTitle}</h2>
            <p>{copy.commandLead}</p>
          </div>
          <CommandCenter locale={locale} />
        </div>
      </section>

      <section className="proof operating-proof" aria-label={copy.proof}>
        <div className="wrap proof-layout">
          <div>
            <strong><i aria-hidden="true" />{copy.proof}</strong>
            <p>{copy.proofNote}</p>
          </div>
          <div className="proof-logos">
            {[1, 2, 3, 4, 5, 6].map((logo) => (
              <Image key={logo} src={media?.clientLogos[logo - 1]?.src ?? `/assets/client-${logo}.png`} alt={ar ? media?.clientLogos[logo - 1]?.altAr ?? `شعار عميل UNU رقم ${logo}` : media?.clientLogos[logo - 1]?.altEn ?? `UNU client logo ${logo}`} width={128} height={62} sizes="96px" />
            ))}
          </div>
        </div>
      </section>

      <section className="connected-operations" aria-labelledby="connected-operations-heading">
        <div className="wrap connected-operations-layout">
          <div className="connected-operations-intro" data-reveal>
            <p className="workflow-eyebrow"><i aria-hidden="true" />{copy.systemEyebrow}</p>
            <h2 id="connected-operations-heading">{copy.systemTitle}</h2>
            <p>{copy.systemLead}</p>
            <div className="workflow-proof"><i aria-hidden="true" /><span>{copy.systemProof}</span></div>
          </div>
          <div className="workflow-scene" data-reveal>
            <svg className="workflow-connector" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={`workflow-track-${locale}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#368ec2" stopOpacity="0.62" />
                  <stop offset="0.52" stopColor="#4fc8ee" stopOpacity="0.92" />
                  <stop offset="1" stopColor="#2782b7" stopOpacity="0.64" />
                </linearGradient>
              </defs>
              <path className="workflow-track" stroke={`url(#workflow-track-${locale})`} d="M155 110 C268 110 304 42 385 70 S538 180 635 132 S742 58 845 110" />
              <path className="workflow-pulse" stroke={`url(#workflow-track-${locale})`} d="M155 110 C268 110 304 42 385 70 S538 180 635 132 S742 58 845 110" />
              <circle cx="155" cy="110" r="8" /><circle cx="500" cy="138" r="8" /><circle cx="845" cy="110" r="8" />
            </svg>
            <ol className="workflow-stages">
              {copy.systemSteps.map(([title, text], index) => (
                <li className={`workflow-stage workflow-stage-${index + 1}`} key={title}>
                  <span className="workflow-stage-no">{String(index + 1).padStart(2, "0")}</span>
                  <div className="workflow-stage-artifact" aria-hidden="true">
                    {index === 0 && <div className="source-cluster">{copy.systemSources.map((source) => <span key={source}>{source}</span>)}</div>}
                    {index === 1 && <div className="action-flow">{copy.systemActions.map((action, actionIndex) => <span key={action}><i>{actionIndex + 1}</i>{action}</span>)}</div>}
                    {index === 2 && <div className="signal-grid">{copy.systemSignals.map((signal, signalIndex) => <span key={signal}><i data-signal={signalIndex} />{signal}</span>)}</div>}
                  </div>
                  <div className="workflow-stage-copy">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section capability-section" id="platform">
        <div className="wrap capability-layout">
          <div className="capability-intro" data-reveal>
            <h2>{copy.capabilityTitle}</h2>
            <p>{copy.capabilityLead}</p>
            <Link href={`${prefix}/features`}>{copy.capabilityAction}<span aria-hidden="true">{ar ? "←" : "→"}</span></Link>
          </div>
          <div className="capability-rows">
            {copy.capabilities.map(([name, description, action], index) => {
              const moduleItem = modules[index];
              return (
              <Link href={`${prefix}/features/${slugify(moduleItem[0])}`} key={moduleItem[0]} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{name}</h3><p>{description}</p></div>
                <b>{action}<i aria-hidden="true">{ar ? "←" : "→"}</i></b>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="analytics-section">
        <div className="wrap analytics-layout">
          <div className="analytics-copy" data-reveal>
            <h2>{copy.financeTitle}</h2>
            <p>{copy.financeLead}</p>
            <ul>{copy.financeSignals.map((signal) => <li key={signal}><i />{signal}</li>)}</ul>
            <Link className="button button-inverse" href={`${prefix}/features/accounting`}>{copy.financeAction}<span aria-hidden="true">{ar ? "←" : "→"}</span></Link>
          </div>
          <div className="analytics-dashboard-shell" data-reveal>
          <div className="analytics-window" role="img" aria-label={ar ? "نموذج للوحة بيانات مالية يحتوي على بيانات توضيحية للتدفق النقدي ومؤشر نمو" : "Sample financial dashboard showing cash flow status and a growth indicator"}>
            <div className="analytics-top"><span>UNU / {ar ? "المالية" : "Finance"}</span><i><b /> {ar ? "محدث الآن" : "Updated now"}</i></div>
            <div className="analytics-summary">
              <div><small>{copy.financeOverview}</small><strong>{ar ? `التدفق النقدي: ${copy.cashStatus}` : `Cash flow: ${copy.cashStatus}`}</strong><span><b>{copy.financeGrowth}</b>{copy.financeComparison}</span></div>
              <div className="summary-ring"><i /></div>
            </div>
            <div className="analytics-chart" aria-hidden="true">
              <svg className="analytics-trend" viewBox="0 0 100 48" preserveAspectRatio="none"><path d="M0 36 L14 28 L28 34 L42 18 L56 25 L70 12 L84 17 L100 5" /></svg>
              <div className="analytics-bars">
                {[62, 78, 54, 86, 71, 92, 84, 100].map((height, i) => <i key={i} style={{ "--bar": `${height}%`, "--bar-delay": `${i * 55}ms` } as React.CSSProperties} />)}
              </div>
              <div className="analytics-periods">{(ar ? ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "أغس"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]).map((period) => <span key={period}>{period}</span>)}</div>
            </div>
            <div className="analytics-ledger">
              {copy.financeConnections.map(([item, status], i) => <span key={item}><i data-tone={i} />{item}<b>{status}</b></span>)}
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="wrap">
          <div className="statement-head product-statement" data-reveal><h2>{copy.productsTitle}</h2><p>{copy.productsLead}</p></div>
          <div className="product-runway">
            {copy.productItems.map(([name, description], index) => {
              const product = products[index];
              return (
              <Link href={`${prefix}/products/${slugify(product[0].replace("UNU ", ""))}`} key={product[0]} data-reveal>
                <span>0{index + 1}</span>
                <strong>{name}</strong>
                <p>{description}</p>
                <b>{copy.productAction}<i aria-hidden="true">{ar ? "←" : "→"}</i></b>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="industry-story">
        <div className="wrap industry-story-grid">
          <div className="industry-photo" data-reveal style={{ position: "relative" }}>
            <Image src={media?.industriesHero ?? "/assets/hero-industries.webp"} alt={ar ? "فريق عمليات يستخدم بيانات مترابطة في مستودع" : "Operations team using connected data in a warehouse"} fill sizes="(max-width: 900px) 100vw, 50vw" />
            <span>{ar ? "من أرض الواقع إلى لوحة الإدارة" : "From day-to-day operations to better decisions"}</span>
          </div>
          <div className="industry-story-copy" data-reveal>
            <h2>{copy.industriesTitle}</h2>
            <p>{copy.industriesLead}</p>
            <div className="industry-links">
              {copy.industryItems.map((industry, index) => (
                <Link href={industrySlugs[index] ? `${prefix}/industries/${industrySlugs[index]}` : `${prefix}/industries`} key={industry}>{industry}</Link>
              ))}
            </div>
            <Link className="text-link" href={`${prefix}/industries`}>{copy.industriesAction}<span aria-hidden="true">{ar ? "←" : "→"}</span></Link>
          </div>
        </div>
      </section>

      <section className="principles-section">
        <div className="wrap principles-layout">
          <h2 data-reveal>{copy.principlesTitle}</h2>
          <div>
            {copy.principles.map(([title, text], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="wrap faq-layout">
          <h2 data-reveal>{copy.faqTitle}</h2>
          <div className="faq-list">
            {copy.faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0} data-reveal>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-section">
        <div className="wrap cta final-cta" data-reveal>
          <div><h2>{copy.finalTitle}</h2><p>{copy.finalLead}</p></div>
          <Link className="button light-button" href={`${prefix}/contact`}>{copy.finalAction}<span aria-hidden="true">{ar ? "←" : "↗"}</span></Link>
        </div>
      </section>
    </Page>
  );
}
