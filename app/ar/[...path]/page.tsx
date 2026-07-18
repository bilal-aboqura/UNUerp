import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/Shell";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { DetailVisual } from "@/components/ProductVisuals";
import { ArabicIndustryExplorer } from "@/components/ArabicIndustryExplorer";
import {
  ArabicCta,
  ArabicPricingPage,
  ArabicProductDetail,
  ArabicProductsPage,
} from "@/components/ArabicMarketing";
import { featureDetails, productDetails, industryDetails } from "@/lib/content";
import { arModules, arProducts, arIndustries } from "@/lib/ar-content";
import { arabicIndustryCopy } from "@/lib/ar-marketing-content";
import type { ArabicProductPage } from "@/lib/ar-marketing-content";
import { readSiteContent } from "@/lib/site-content";

const sectionCopy = {
  features: {
    signal: "مزايا UNU ERP",
    title: "منصة واحدة مترابطة للعمل الذي يدير أعمالك.",
    intro: "استكشف القدرات الأساسية من علاقات العملاء والمبيعات إلى المالية والأفراد والمخزون وسير العمل المخصص.",
    names: arModules,
    records: featureDetails,
  },
  products: {
    signal: "منتجات UNU",
    title: "كل أعمالك في منصة واحدة، مصممة لكل قطاع.",
    intro: "منصات متخصصة تعمل معاً فوق قاعدة تشغيل وبيانات موحدة.",
    names: arProducts,
    records: productDetails,
  },
  industries: {
    signal: "حلول حسب القطاع",
    title: "حلول أعمال مصممة لكل قطاع.",
    intro: "نهيئ النظام وفق إجراءات العمل واللوائح ومتطلبات النمو لكل مؤسسة.",
    names: arIndustries,
    records: industryDetails,
  },
} as const;

function managedDashboardImage(src: string) {
  return src && src !== "/assets/hero-products.webp" ? src : undefined;
}

export function generateStaticParams() {
  return ["features", "products", "industries", "pricing", "contact"]
    .map((x) => ({ path: [x] }))
    .concat(
      Object.keys(featureDetails).map((x) => ({ path: ["features", x] })),
      Object.keys(productDetails).map((x) => ({ path: ["products", x] })),
      Object.keys(industryDetails).map((x) => ({ path: ["industries", x] })),
    );
}

function IndustriesPage({ items, page, mediaSrc }: { items: { slug: string; name: string; summary: string }[]; page: { signal: string; title: string; intro: string; cta?: string }; mediaSrc: string }) {
  return (
    <>
      <PageHero
        locale="ar"
        variant="industries"
        signal={page.signal}
        title={page.title}
        intro={page.intro}
        mediaSrc={mediaSrc}
        cta={{ label: page.cta ?? "احجز استشارة", href: "/ar/contact" }}
      />
      <section className="section ar-industries-section">
        <div className="wrap">
          <header className="ar-section-head">
            <div><span>اختر قطاعك</span><h2>ابدأ من طبيعة عملك، لا من قائمة وحدات عامة</h2></div>
            <p>ابحث عن نشاطك أو استخدم التصنيفات للوصول إلى التحديات والحلول الأقرب إلى مؤسستك.</p>
          </header>
          <ArabicIndustryExplorer items={items} />
        </div>
      </section>
      <section className="section ar-industry-value">
        <div className="wrap ar-industry-value-grid">
          <div><span>لماذا تختلف حلول UNU؟</span><h2>نفس الأساس التقني، وتهيئة تناسب التشغيل الفعلي</h2></div>
          <div>{["قابلة للتخصيص", "تدعم عدة فروع", "خيارات استضافة مرنة", "تقارير لحظية", "صلاحيات حسب الدور", "تكاملات وفق نطاق المشروع"].map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}</div>
        </div>
      </section>
      <section className="section ar-sector-process">
        <div className="wrap">
          <header className="ar-section-head compact"><div><span>ماذا نقدم لكل قطاع؟</span><h2>من فهم الاحتياج إلى تشغيل المنصة</h2></div></header>
          <ol className="ar-workflow">{["تحليل الاحتياجات", "تهيئة النظام", "ربط البيانات", "التدريب", "الإطلاق", "الدعم المستمر"].map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol>
        </div>
      </section>
      <ArabicCta title="هل تبحث عن نظام يناسب قطاعك؟" text="دع خبراء UNU يساعدونك على اختيار نقطة البداية والحلول الأنسب لطبيعة نشاطك." />
    </>
  );
}

function IndustryDetail({ name, slug, description }: { name: string; slug: string; description?: string }) {
  const summary = description ?? arabicIndustryCopy[slug] ?? "اربط فرقك وبياناتك وعملياتك في منصة قابلة للتهيئة وفق طبيعة قطاعك.";
  return (
    <>
      <section className="detail-hero industry-hero">
        <div className="wrap detail-grid">
          <div>
            <span className="signal">حلول قطاعية من UNU</span>
            <h1>حلول تشغيل متخصصة لقطاع {name}.</h1>
            <p>{summary}</p>
            <Link className="button" href="/ar/contact">احجز استشارة قطاعية <span aria-hidden="true">↗</span></Link>
          </div>
          <DetailVisual label={name} locale="ar" kind="industry" />
        </div>
      </section>
      <section className="section ar-industry-detail">
        <div className="wrap">
          <header className="ar-section-head"><div><span>تشغيل مترابط</span><h2>اجمع العمليات الأساسية حول مصدر بيانات واحد</h2></div><p>نبدأ من سير العمل الحالي، ثم نحدد الوحدات والصلاحيات والتقارير والتكاملات التي تحقق أكبر أثر.</p></header>
          <div className="ar-capability-list">
            {[
              ["فهم التحديات", "تحليل نقاط التعطل والعمل اليدوي وتكرار البيانات داخل المؤسسة."],
              ["تهيئة الحل", "اختيار الوحدات ومسارات الموافقة والتقارير المناسبة للقطاع."],
              ["ربط الفرق", "توحيد السياق بين المالية والعملاء والأفراد والمخزون والتسليم."],
              ["التوسع بثقة", "إضافة فروع أو وحدات أو تكاملات جديدة مع نمو العمل."],
            ].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <ArabicCta title={`ابنِ نقطة بداية مناسبة لقطاع ${name}`} text="شاركنا تحديات التشغيل الحالية لنقترح نطاقاً واضحاً للعرض والتنفيذ." />
    </>
  );
}

export default async function ArabicRoute({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const site = await readSiteContent();
  const [section, slug] = path;

  if (section === "pricing") return <Page locale="ar" content={site.global}><ArabicPricingPage pricing={site.pricing.ar} pageContent={site.pages.pricing.ar} /></Page>;

  if (section === "contact")
    return (
      <Page locale="ar" content={site.global}>
        <PageHero
          locale="ar"
          variant="contact"
          signal={site.pages.contact.ar.signal}
          title={site.pages.contact.ar.title}
          intro={site.pages.contact.ar.intro}
        />
        <section className="section">
          <div className="wrap contact-grid">
            <div>
              <h2>ابدأ بالتحدي التشغيلي.</h2>
              <p>أخبرنا أين يتباطأ العمل اليوم، وسنساعدك على تحديد نقطة البداية المناسبة.</p>
              <a href={`mailto:${site.global.contact.email}`}>راسل فريق UNU</a>
              <a href={`tel:${site.global.contact.phone.replace(/\s/g, "")}`}>اتصل على {site.global.contact.phone}</a>
              <span>{site.global.contact.address.ar}</span>
            </div>
            <ContactForm locale="ar" />
          </div>
        </section>
      </Page>
    );

  if (section === "products" && !slug) {
    const catalog = Object.values(site.products).map((item) => item.catalog.ar) as unknown as { slug: string; name: string; tag: string; title: string; text: string; items: string[] }[];
    return <Page locale="ar" content={site.global}><ArabicProductsPage catalog={catalog} pageContent={site.pages.products.ar} /></Page>;
  }
  if (section === "products" && slug) {
    const page = site.products[slug]?.ar as unknown as ArabicProductPage | undefined;
    if (!page) return notFound();
    return <Page locale="ar" content={site.global}><ArabicProductDetail page={page} image={managedDashboardImage(site.products[slug].image)} imageAlt={site.products[slug].imageAlt.ar} /></Page>;
  }
  if (section === "industries" && !slug) {
    const items = Object.entries(site.industries).map(([itemSlug, item]) => ({ slug: itemSlug, name: item.ar.name, summary: item.ar.summary }));
    return <Page locale="ar" content={site.global}><IndustriesPage items={items} page={site.pages.industries.ar} mediaSrc={site.media.industriesHero} /></Page>;
  }
  if (section === "industries" && slug) {
    const entries = Object.entries(industryDetails);
    const index = entries.findIndex(([key]) => key === slug);
    if (index < 0) return notFound();
    return <Page locale="ar" content={site.global}><IndustryDetail name={site.industries[slug]?.ar.name ?? arIndustries[index]} slug={slug} description={site.industries[slug]?.ar.summary} /></Page>;
  }

  const config = sectionCopy[section as keyof typeof sectionCopy];
  if (!config || section !== "features") return notFound();
  const entries = Object.entries(site.features);
  const featuresPage = site.pages.features.ar;
  if (!slug)
    return (
      <Page locale="ar" content={site.global}>
        <PageHero locale="ar" variant="features" signal={featuresPage.signal} title={featuresPage.title} intro={featuresPage.intro} mediaSrc={site.media.featuresHero} />
        <section className="section"><div className="wrap"><div className="content-index">{entries.map(([key, item], index) => <Link href={`/ar/features/${key}`} key={key}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.ar.name}</h2><p>{item.ar.intro}</p><b>استكشف <i aria-hidden="true">←</i></b></Link>)}</div></div></section>
      </Page>
    );
  const index = entries.findIndex(([key]) => key === slug);
  if (index < 0) return notFound();
  const item = entries[index][1].ar;
  const name = item.name;
  return (
    <Page locale="ar" content={site.global}>
      <section className="detail-hero"><div className="wrap detail-grid"><div><span className="signal">{featuresPage.signal}</span><h1>{item.headline}</h1><p>{item.intro}</p><Link className="button" href="/ar/contact">اطلب عرضاً مخصصاً</Link></div><DetailVisual label={name} locale="ar" kind="feature" /></div></section>
      <section className="section"><div className="wrap detail-copy"><div><h2>مصمم حول طريقة عملك.</h2><p>{item.intro}</p></div><div className="benefit-list">{item.benefits.map((value, idx) => <article key={value}><span>0{idx + 1}</span><h3>{value}</h3><p>قدرة عملية متصلة ببقية منصة UNU ERP.</p></article>)}</div></div></section>
    </Page>
  );
}
