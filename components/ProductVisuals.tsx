import Image from "next/image";

export function CommandCenter({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const copy = ar
    ? {
        title: "مركز العمليات",
        live: "مباشر",
        finance: "المالية",
        sales: "المبيعات",
        inventory: "المخزون",
        people: "الموارد البشرية",
        purchasing: "المشتريات",
        overview: "عرض موحّد لحالة العمل",
        cash: "التدفق النقدي",
        sync: "آخر مزامنة الآن",
        invoice: "الفاتورة رقم 1048",
        paid: "تم السداد",
        salesStatus: "أداء المبيعات محدث لحظيًا",
        stock: "الكميات متزامنة عبر جميع المواقع",
        payroll: "مراجعة الرواتب قيد التنفيذ",
        decision: "كل فريق يرى البيانات نفسها، وكل قرار يبدأ من معلومات موثوقة.",
      }
    : {
        title: "UNU ERP Operations Center",
        live: "Live",
        finance: "Finance",
        sales: "Sales",
        inventory: "Inventory",
        people: "People",
        purchasing: "Purchasing",
        overview: "A unified view of:",
        cash: "Cash flow",
        sync: "Synced just now",
        invoice: "Invoice 1048",
        paid: "Paid",
        salesStatus: "Pipeline and order activity updated in real time",
        stock: "Stock synchronized across locations",
        payroll: "Payroll review in progress",
        decision: "One source of information for every team and every decision.",
      };

  return (
    <div className="command-stage" aria-label={copy.overview} role="img">
      <svg className="connection-map" viewBox="0 0 1200 620" aria-hidden="true">
        <path d="M168 175 C320 175 332 280 470 280" />
        <path d="M1032 160 C875 160 858 280 730 280" />
        <path d="M170 478 C330 478 350 365 470 365" />
        <path d="M1030 472 C860 472 850 365 730 365" />
        <circle cx="168" cy="175" r="4" />
        <circle cx="1032" cy="160" r="4" />
        <circle cx="170" cy="478" r="4" />
        <circle cx="1030" cy="472" r="4" />
      </svg>

      <div className="module-node node-finance" data-reveal>
        <span className="node-mark">01</span>
        <strong>{copy.finance}</strong>
        <small>{copy.invoice}</small>
        <i>{copy.paid}</i>
      </div>
      <div className="module-node node-sales" data-reveal>
        <span className="node-mark">02</span>
        <strong>{copy.sales}</strong>
        <small>{copy.salesStatus}</small>
        <div className="node-bars" aria-hidden="true"><i /><i /><i /><i /></div>
      </div>
      <div className="module-node node-stock" data-reveal>
        <span className="node-mark">03</span>
        <strong>{copy.inventory}</strong>
        <small>{copy.stock}</small>
        <span className="status-line"><i /> {copy.live}</span>
      </div>
      <div className="module-node node-people" data-reveal>
        <span className="node-mark">04</span>
        <strong>{copy.people}</strong>
        <small>{copy.payroll}</small>
        <div className="avatar-row" aria-hidden="true"><i /><i /><i /></div>
      </div>

      <div className="control-console" data-reveal>
        <div className="console-topbar">
          <div>
            <span className="unu-chip">UNU ERP</span>
            <strong>{copy.title}</strong>
          </div>
          <span className="live-chip"><i /> {copy.live}</span>
        </div>
        <div className="console-body">
          <div className="console-rail" aria-hidden="true">
            <span className="active" />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="console-main">
            <div className="console-heading">
              <div>
                <small>{copy.overview}</small>
                <strong>{copy.cash}</strong>
              </div>
              <span>{copy.sync}</span>
            </div>
            <svg className="cash-chart" viewBox="0 0 650 210" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={`chart-fill-${locale}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#56d3ff" stopOpacity=".34" />
                  <stop offset="1" stopColor="#56d3ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="chart-area" fill={`url(#chart-fill-${locale})`} d="M0 190 C75 176 94 122 155 138 C230 158 244 72 320 98 C390 122 428 42 498 65 C555 83 590 34 650 25 L650 210 L0 210 Z" />
              <path className="chart-line" d="M0 190 C75 176 94 122 155 138 C230 158 244 72 320 98 C390 122 428 42 498 65 C555 83 590 34 650 25" />
              <circle className="chart-pulse" cx="650" cy="25" r="6" />
            </svg>
            <div className="console-modules">
              {[copy.cash, copy.sales, copy.purchasing, copy.inventory, copy.people].map((item, index) => (
                <span key={item}><i data-tone={index} />{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="console-caption">{copy.decision}</div>
      </div>
    </div>
  );
}

export function DetailVisual({
  label,
  locale = "en",
  kind = "feature",
}: {
  label: string;
  locale?: "en" | "ar";
  kind?: "feature" | "product" | "industry";
}) {
  const ar = locale === "ar";
  return (
    <div className={`detail-visual detail-visual-${kind}`} aria-label={label} role="img">
      <div className="detail-visual-head">
        <span>UNU</span>
        <i><b /> {ar ? "متصل" : "Connected"}</i>
      </div>
      <strong>{label}</strong>
      <div className="detail-flow" aria-hidden="true">
        <span>{ar ? "مدخلات" : "Inputs"}</span><i /><span>{ar ? "سير العمل" : "Workflow"}</span><i /><span>{ar ? "تقارير" : "Reporting"}</span>
      </div>
      <svg viewBox="0 0 500 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 98 C80 90 100 52 168 64 C245 78 270 22 335 42 C400 61 430 18 500 12" />
      </svg>
      <small>{ar ? "بيانات موحدة · قرارات أوضح" : "Shared data · Clearer decisions"}</small>
    </div>
  );
}

export function PageVisual({ variant, locale = "en" }: { variant: string; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  if (["features", "products", "industries"].includes(variant)) {
    const src = `/assets/hero-${variant}.webp`;
    const alt = ar
      ? variant === "industries" ? "فريق عمليات في مستودع مترابط" : variant === "products" ? "فريق أعمال سعودي يعمل على أنظمة UNU" : "فريق يراجع لوحة تحليلات الأعمال"
      : variant === "industries" ? "Operations team working from shared warehouse data" : variant === "products" ? "Saudi business team working together with UNU products" : "Business team reviewing connected operational analytics";
    return (
      <div className="page-photo" style={{ position: "relative" }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 44vw" />
        <span>{ar ? "مصمم لعمليات المنطقة" : "Designed for regional operations"}</span>
      </div>
    );
  }
  if (variant === "pricing") {
    return (
      <div className="scope-visual" aria-label={ar ? "نطاق مرن للتنفيذ" : "Flexible implementation scope"} role="img">
        <span>{ar ? "نطاق التنفيذ" : "Implementation scope"}</span>
        {[ar ? "الوحدات" : "Modules", ar ? "التكامل" : "Integrations", ar ? "التدريب" : "Training", ar ? "الدعم" : "Support"].map((x, i) => <div key={x}><b>{x}</b><i style={{ "--scope": `${88 - i * 13}%` } as React.CSSProperties} /></div>)}
        <small>{ar ? "عرض سعر مبني حول احتياجك" : "A quote shaped around your operation"}</small>
      </div>
    );
  }
  return (
    <div className="contact-visual-card" aria-label={ar ? "جلسة اكتشاف مخصصة" : "Personalized discovery session"} role="img">
      <span>{ar ? "جلسة اكتشاف" : "Discovery session"}</span>
      <strong>{ar ? "عملياتك هي نقطة البداية." : "Your operation is the starting point."}</strong>
      <div><i />{ar ? "فهم سير العمل" : "Map the workflow"}</div>
      <div><i />{ar ? "تحديد الأولويات" : "Define priorities"}</div>
      <div><i />{ar ? "تصميم نقطة البداية" : "Shape the starting scope"}</div>
    </div>
  );
}
