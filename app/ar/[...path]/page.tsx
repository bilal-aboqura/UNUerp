import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/Shell";
import { ContactForm } from "@/components/ContactForm";
import { featureDetails, productDetails, industryDetails } from "@/lib/content";
import { arModules, arProducts, arIndustries } from "@/lib/ar-content";
import { ArabicProducts } from "@/components/ArabicCatalogs";
import { PageHero } from "@/components/PageHero";
import { DetailVisual } from "@/components/ProductVisuals";

const sectionCopy = {
  features: {
    signal: "مزايا UNU ERP",
    title: "منصة واحدة مترابطة للعمل الذي يدير أعمالك.",
    intro:
      "استكشف القدرات الأساسية من علاقات العملاء والمبيعات إلى المالية والأفراد والمخزون وسير العمل المخصص.",
    names: arModules,
    records: featureDetails,
  },
  products: {
    signal: "منتجات UNU",
    title: "منصات متخصصة. أساس تشغيلي واحد.",
    intro: "حلول مصممة لاحتياجات محددة ومتصلة برؤية موحدة لعملياتك.",
    names: arProducts,
    records: productDetails,
  },
  industries: {
    signal: "حلول حسب القطاع",
    title: "نكيّف النظام مع واقع قطاعك.",
    intro:
      "اربط العملاء والمالية والأفراد والمخزون والتسليم ضمن سير عمل يناسب مؤسستك.",
    names: arIndustries,
    records: industryDetails,
  },
} as const;

export function generateStaticParams() {
  return ["features", "products", "industries", "pricing", "contact"]
    .map((x) => ({ path: [x] }))
    .concat(
      Object.keys(featureDetails).map((x) => ({ path: ["features", x] })),
      Object.keys(productDetails).map((x) => ({ path: ["products", x] })),
      Object.keys(industryDetails).map((x) => ({ path: ["industries", x] })),
    );
}

export default async function ArabicRoute({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const [section, slug] = path;
  if (section === "pricing")
    return (
      <Page locale="ar">
        <PageHero
          locale="ar"
          variant="pricing"
          signal="أسعار واضحة ومرنة"
          title="استثمار يتناسب مع نطاق عملياتك."
          intro="نحدد السعر وفق الوحدات المطلوبة وحجم العمل واحتياجات التنفيذ والدعم، وليس عبر باقة جامدة."
        />
        <section className="section">
          <div className="wrap quote-grid">
            <div>
              <h2>ما الذي يحدد عرض السعر؟</h2>
              <ul>
                <li>الوحدات وسير العمل المطلوبة</li>
                <li>نطاق نقل البيانات والتكامل</li>
                <li>التخصيص والتدريب والدعم</li>
                <li>خيار الاستضافة والنشر</li>
              </ul>
            </div>
            <aside>
              <h2>احصل على تقدير مناسب.</h2>
              <p>
                شاركنا فرقك وأنظمتك الحالية وأهدافك التشغيلية لنقترح نقطة بداية
                واضحة.
              </p>
              <Link className="button" href="/ar/contact">
                تحدث مع خبير ERP
              </Link>
            </aside>
          </div>
        </section>
      </Page>
    );
  if (section === "contact")
    return (
      <Page locale="ar">
        <PageHero
          locale="ar"
          variant="contact"
          signal="اطلب عرضاً مخصصاً"
          title="أخبرنا كيف تعمل عملياتك."
          intro="سيراجع معك أحد خبراء ERP سير العمل والفرق والبيانات التي تريد ربطها."
        />
        <section className="section">
          <div className="wrap contact-grid">
            <div>
              <h2>ابدأ بالتحدي التشغيلي.</h2>
              <p>
                أخبرنا أين يتباطأ العمل اليوم، وسنساعدك على تحديد نقطة البداية
                المناسبة.
              </p>
              <a href="mailto:info@unuerp.com">راسل فريق UNU</a>
              <a href="tel:+966112248822">اتصل على +966 11 224 8822</a>
              <span>الرياض، القدس — المملكة العربية السعودية</span>
            </div>
            <ContactForm locale="ar" />
          </div>
        </section>
      </Page>
    );
  const config = sectionCopy[section as keyof typeof sectionCopy];
  if (!config) return notFound();
  const entries = Object.entries(config.records);
  if (!slug)
    return (
      <Page locale="ar">
        <PageHero
          locale="ar"
          variant={section as "features" | "products" | "industries"}
          signal={config.signal}
          title={config.title}
          intro={config.intro}
        />
        <section
          className={
            section === "products" ? "section ar-catalog-section" : "section"
          }
        >
          <div className="wrap">
            {section === "products" ? (
              <ArabicProducts />
            ) : (
              <div className="content-index">
                {entries.map(([key, item], i) => (
                  <Link href={`/ar/${section}/${key}`} key={key}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h2>{config.names[i] ?? item.name}</h2>
                    <p>حل مترابط يقلل العمل اليدوي ويمنح فرقك رؤية أوضح.</p>
                    <b>
                      استكشف <i aria-hidden="true">←</i>
                    </b>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </Page>
    );
  const index = entries.findIndex(([key]) => key === slug);
  if (index < 0) return notFound();
  const item = entries[index][1];
  const name = config.names[index] ?? item.name;
  return (
    <Page locale="ar">
      <section
        className={`detail-hero ${section === "products" ? "product-hero" : section === "industries" ? "industry-hero" : ""}`}
      >
        <div className="wrap detail-grid">
          <div>
            <span className="signal">{config.signal}</span>
            <h1>{name}: رؤية أوضح وعمل مترابط.</h1>
            <p>
              اربط {name} ببقية فرقك وبياناتك ضمن منصة مرنة تتكيف مع سير عمل
              مؤسستك.
            </p>
            <Link className="button" href="/ar/contact">
              اطلب عرضاً مخصصاً
            </Link>
          </div>
          <DetailVisual
            label={name}
            locale="ar"
            kind={section === "products" ? "product" : section === "industries" ? "industry" : "feature"}
          />
        </div>
      </section>
      <section className="section">
        <div className="wrap detail-copy">
          <div>
            <h2>مصمم حول طريقة عملك.</h2>
            <p>
              تخلّص من نقل البيانات بين الأنظمة، وامنح الفرق سياقاً مشتركاً
              لاتخاذ قرارات أسرع وأكثر دقة.
            </p>
          </div>
          <div className="benefit-list">
            {[
              "معلومات موحدة ومحدثة",
              "عمليات قابلة للتهيئة",
              "رؤية وتقارير في الوقت الحقيقي",
            ].map((x, i) => (
              <article key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>قدرة عملية متصلة ببقية منصة UNU ERP.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
