import Link from "next/link";
import { industries, products, slugify } from "@/lib/content";
import { arIndustries, arProducts } from "@/lib/ar-content";

const productCopy = [
  {
    tag: "التقنية المالية",
    title: "عمليات مالية بلا حدود تشغيلية",
    text: "امتثال وتحقق وإدارة نقد وعمليات دولية ضمن منصة مالية مترابطة.",
    items: ["الامتثال والحوكمة", "التحقق الرقمي", "إدارة النقد"],
  },
  {
    tag: "تواصل العملاء",
    title: "كل قناة. محادثة ذكية واحدة.",
    text: "اجمع محادثات العملاء وفرق الخدمة ومؤشرات الأداء في مساحة عمل موحدة.",
    items: ["قنوات موحدة", "إدارة الفرق", "تحليلات الأداء"],
  },
  {
    tag: "الرعاية الصحية",
    title: "نظام تشغيل متصل للرعاية الحديثة",
    text: "اربط المرافق والأقسام والتأمين والمخزون الطبي والتقارير في تجربة واحدة.",
    items: ["إدارة المرافق", "التأمين والمالية", "المخزون الطبي"],
  },
  {
    tag: "تجربة العميل",
    title: "اجعل رحلة كل عميل تتحرك بوضوح",
    text: "أدر الطوابير وتدفق العملاء والتكاملات والتحليلات بشكل لحظي.",
    items: ["الطوابير الذكية", "تكامل الأنظمة", "تحليل الرحلة"],
  },
  {
    tag: "التجزئة",
    title: "رؤية واحدة لكل متجر وصنف وعملية بيع",
    text: "وحّد نقاط البيع والمخزون والمشتريات والمحاسبة عبر كل قنواتك.",
    items: ["نقاط البيع", "المخزون والمشتريات", "تقارير الفروع"],
  },
];

const englishProductCopy = [
  {
    tag: "Financial technology",
    title: "Financial operations without operational borders",
    text: "Bring compliance, verification, cash management and international operations into one connected financial platform.",
    items: [
      "Compliance & governance",
      "Digital verification",
      "Cash management",
    ],
  },
  {
    tag: "Customer communication",
    title: "Every channel. One intelligent conversation.",
    text: "Unify customer conversations, service teams and performance insight in one shared workspace.",
    items: ["Unified channels", "Team management", "Performance analytics"],
  },
  {
    tag: "Healthcare",
    title: "A connected operating system for modern care",
    text: "Connect facilities, departments, insurance, medical inventory and reporting in one experience.",
    items: ["Facility management", "Finance & insurance", "Medical inventory"],
  },
  {
    tag: "Customer experience",
    title: "Make every customer journey move with purpose",
    text: "Manage queues, customer flow, integrations and live operational analytics with clarity.",
    items: ["Smart queues", "System integrations", "Journey analytics"],
  },
  {
    tag: "Retail",
    title: "One view of every store, item and sale",
    text: "Unify point of sale, inventory, purchasing and accounting across every sales channel.",
    items: ["Point of sale", "Stock & purchasing", "Store reporting"],
  },
];

const groups = [
  {
    name: "الصناعة وسلاسل الإمداد",
    desc: "من التخطيط والشراء إلى المخزون والتسليم.",
    indexes: [0, 1, 4, 5, 10, 11],
  },
  {
    name: "الخدمات والأماكن",
    desc: "عمليات يومية أوضح وتجربة أفضل للعميل.",
    indexes: [7, 8, 9, 18, 19, 20],
  },
  {
    name: "التقنية والابتكار",
    desc: "مشاريع وموارد وفوترة تنمو مع فرق المعرفة.",
    indexes: [6, 13, 15, 16, 17],
  },
  {
    name: "العلامات والمحتوى",
    desc: "اربط الطلب والإنتاج والعملاء والنتائج المالية.",
    indexes: [2, 3, 12, 14],
  },
];

export function ArabicProducts() {
  return (
    <div className="ar-products">
      {products.map((product, i) => {
        const copy = productCopy[i];
        return (
          <Link
            href={`/ar/products/${slugify(product[0].replace("UNU ", ""))}`}
            key={product[0]}
            className="ar-product"
          >
            <div className="ar-product-no">0{i + 1}</div>
            <div className="ar-product-main">
              <div className="ar-product-meta">
                <span>{copy.tag}</span>
                <strong>{arProducts[i]}</strong>
              </div>
              <h2>{copy.title}</h2>
              <p>{copy.text}</p>
              <ul aria-label="أبرز القدرات">
                {copy.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <span className="ar-product-link">
              عرض المنتج <b aria-hidden="true">←</b>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function EnglishProducts() {
  return (
    <div className="ar-products en-products">
      {products.map((product, i) => {
        const copy = englishProductCopy[i];
        return (
          <Link
            href={`/products/${slugify(product[0].replace("UNU ", ""))}`}
            key={product[0]}
            className="ar-product"
          >
            <div className="ar-product-no">0{i + 1}</div>
            <div className="ar-product-main">
              <div className="ar-product-meta">
                <span>{copy.tag}</span>
                <strong>{product[0]}</strong>
              </div>
              <h2>{copy.title}</h2>
              <p>{copy.text}</p>
              <ul aria-label="Key capabilities">
                {copy.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <span className="ar-product-link">
              View product <b aria-hidden="true">→</b>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function ArabicIndustries() {
  return (
    <div className="ar-industry-groups">
      {groups.map((group, g) => (
        <section className="ar-industry-group" key={group.name}>
          <header>
            <span>0{g + 1}</span>
            <div>
              <h2>{group.name}</h2>
              <p>{group.desc}</p>
            </div>
          </header>
          <div className="ar-industry-links">
            {group.indexes.map((i) => (
              <Link
                href={`/ar/industries/${slugify(industries[i])}`}
                key={industries[i]}
              >
                <span>{arIndustries[i]}</span>
                <b aria-hidden="true">←</b>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
