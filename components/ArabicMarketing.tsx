import Image from "next/image";
/* eslint-disable @next/next/no-img-element -- Product media is administrator-managed in Supabase storage. */
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import {
  arabicProductCatalog,
  type ArabicProductPage,
} from "@/lib/ar-marketing-content";

const Arrow = () => <span aria-hidden="true">↗</span>;

export function ArabicProductDashboard({
  content,
  compact = false,
  image,
  imageAlt,
}: {
  content: ArabicProductPage["dashboard"];
  compact?: boolean;
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <div className={`ar-dashboard is-image ${compact ? "is-compact" : ""}`}>
        <img src={image} alt={imageAlt ?? `واجهة برنامج ${content.label}`} />
      </div>
    );
  }

  return (
    <div
      className={`ar-dashboard ${compact ? "is-compact" : ""}`}
      aria-label={`عرض توضيحي: ${content.label}`}
      role="img"
    >
      <div className="ar-dashboard-bar">
        <span className="ar-dashboard-brand">UNU</span>
        <strong>{content.label}</strong>
        <i><b /> عرض توضيحي</i>
      </div>
      <div className="ar-dashboard-body">
        <nav aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
          <span />
        </nav>
        <div className="ar-dashboard-main">
          <div className="ar-dashboard-metrics">
            <article>
              <small>{content.primaryMetric}</small>
              <strong>1,248</strong>
              <span>آخر تحديث الآن</span>
            </article>
            <article>
              <small>{content.secondaryMetric}</small>
              <strong>مستقر</strong>
              <span>متصل</span>
            </article>
          </div>
          <div className="ar-dashboard-chart" aria-hidden="true">
            {[38, 57, 46, 72, 63, 88, 76, 94].map((height, index) => (
              <i key={height + index} style={{ "--bar-height": `${height}%` } as React.CSSProperties} />
            ))}
          </div>
          <div className="ar-dashboard-rows">
            {content.rows.map((row, index) => (
              <span key={row}><i data-tone={index} />{row}<b>←</b></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogVisual() {
  const dashboard = {
    label: "مركز المنتجات",
    primaryMetric: "العمليات المتصلة",
    secondaryMetric: "حالة المنصات",
    rows: ["UNU Exchange", "UNU Chat", "UNU Retail", "UNU Flow"],
  };
  return (
    <div className="ar-catalog-visual">
      <div className="ar-catalog-photo">
        <Image
          src="/assets/hero-products.webp"
          alt="فريق أعمال يستخدم منصات UNU في بيئة عمل مشتركة"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 44vw"
        />
      </div>
      <ArabicProductDashboard content={dashboard} compact />
    </div>
  );
}

export function ArabicProductsPage({ catalog = arabicProductCatalog, pageContent }: { catalog?: readonly { slug: string; name: string; tag: string; title: string; text: string; items: readonly string[] }[]; pageContent?: { signal: string; title: string; intro: string; cta?: string } }) {
  return (
    <>
      <section className="ar-marketing-hero">
        <div className="wrap ar-marketing-hero-grid">
          <div className="ar-marketing-hero-copy">
            <span className="signal">{pageContent?.signal ?? "منتجات UNU المتخصصة"}</span>
            <h1>{pageContent?.title ?? "كل أعمالك في منصة واحدة، مصممة لكل قطاع."}</h1>
            <p>{pageContent?.intro ?? "نقدم منصات متخصصة تلبي احتياجات القطاعات المختلفة، مع قاعدة تشغيل موحدة تضمن التكامل وسهولة الإدارة والنمو المستقبلي."}</p>
            <div className="actions">
              <Link className="button" href="/ar/contact">{pageContent?.cta ?? "طلب عرض توضيحي"} <Arrow /></Link>
              <a className="button secondary" href="#products">استعراض المنتجات</a>
            </div>
          </div>
          <CatalogVisual />
        </div>
      </section>

      <section className="ar-proof-strip" aria-label="نطاق منصات UNU">
        <div className="wrap">
          {["5 منصات متخصصة", "21 قطاعاً", "تنفيذ مرن", "بيانات موحدة", "صلاحيات قابلة للتهيئة", "تقارير تشغيلية"].map((item) => <span key={item}><i />{item}</span>)}
        </div>
      </section>

      <section className="section ar-catalog" id="products">
        <div className="wrap">
          <header className="ar-section-head">
            <div>
              <span>اختر المنصة الأقرب لعملك</span>
              <h2>منتجات متخصصة، تعمل ضمن منظومة واحدة</h2>
            </div>
            <p>ابدأ بالمنتج الذي يحل التحدي الأكثر إلحاحاً، ثم وسّع المنظومة مع نمو احتياجاتك.</p>
          </header>
          <div className="ar-product-showcase">
            {catalog.map((product, index) => {
              const detail = {
                label: product.name,
                primaryMetric: index === 1 ? "المحادثات" : index === 2 ? "المواعيد" : index === 4 ? "المبيعات" : "العمليات",
                secondaryMetric: "حالة النظام",
                rows: product.items.slice(0, 4),
              };
              return (
                <article className="ar-product-story" key={product.slug}>
                  <div className="ar-product-story-copy">
                    <div className="ar-product-story-meta"><span>0{index + 1}</span><b>{product.tag}</b></div>
                    <strong>{product.name}</strong>
                    <h3>{product.title}</h3>
                    <p>{product.text}</p>
                    <ul aria-label={`أبرز قدرات ${product.name}`}>
                      {product.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <Link className="button secondary" href={`/ar/products/${product.slug}`}>استعرض المنتج <Arrow /></Link>
                  </div>
                  <ArabicProductDashboard content={detail} compact />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ar-platform-band">
        <div className="wrap ar-platform-band-grid">
          <div>
            <span>قاعدة تشغيل واحدة</span>
            <h2>أضف ما تحتاجه اليوم، وحافظ على ترابط بياناتك غداً.</h2>
          </div>
          <div className="ar-platform-points">
            {["واجهات عمل حديثة", "خيارات استضافة حسب نطاق المشروع", "تكاملات وواجهات API", "صلاحيات مرنة", "تقارير ولوحات متابعة", "دعم التنفيذ والتدريب"].map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
          </div>
        </div>
      </section>

      <ArabicCta
        title="جاهز لرفع كفاءة أعمالك؟"
        text="اكتشف كيف تساعدك منصات UNU على توحيد التشغيل وتقليل العمل اليدوي وبناء أساس قابل للنمو."
      />
    </>
  );
}

export function ArabicProductDetail({ page, image, imageAlt }: { page: ArabicProductPage; image?: string; imageAlt?: string }) {
  return (
    <>
      <section className="ar-detail-hero">
        <div className="wrap ar-detail-hero-grid">
          <div>
            <span className="signal">{page.signal}</span>
            <h1>{page.headline}</h1>
            <p>{page.intro}</p>
            <div className="actions">
              <Link className="button" href="/ar/contact">طلب عرض توضيحي <Arrow /></Link>
              <a className="button secondary" href="#capabilities">استكشف المميزات</a>
            </div>
          </div>
          <ArabicProductDashboard content={page.dashboard} image={image} imageAlt={imageAlt} />
        </div>
      </section>

      <section className="section ar-capabilities" id="capabilities">
        <div className="wrap">
          <header className="ar-section-head">
            <div><span>{page.name}</span><h2>{page.sectionTitle}</h2></div>
            <p>{page.sectionIntro}</p>
          </header>
          <div className="ar-capability-list">
            {page.capabilities.map((capability, index) => (
              <article key={capability.title}>
                <span>0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section ar-feature-matrix">
        <div className="wrap ar-feature-matrix-grid">
          <div>
            <span>نطاق العمل</span>
            <h2>قدرات يومية واضحة لفرق التشغيل والإدارة</h2>
            <p>تُحدد الوحدات والتكاملات النهائية بعد فهم إجراءات العمل والأنظمة الحالية.</p>
          </div>
          <ul>{page.features.map((feature) => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul>
        </div>
      </section>

      <section className="section ar-workflow-section">
        <div className="wrap">
          <header className="ar-section-head compact">
            <div><span>كيف يعمل؟</span><h2>رحلة واحدة يمكن متابعتها من البداية إلى النتيجة</h2></div>
          </header>
          <ol className="ar-workflow">
            {page.workflow.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="section ar-fit-section">
        <div className="wrap ar-fit-grid">
          <article>
            <span>مناسب لـ</span>
            <h2>مصمم لفرق تعمل في سياق حقيقي</h2>
            <div className="ar-token-list">{page.audiences.map((item) => <b key={item}>{item}</b>)}</div>
          </article>
          <article>
            <span>التكاملات</span>
            <h2>يعمل ضمن بيئة أعمالك</h2>
            <div className="ar-token-list is-dark">{page.integrations.map((item) => <b key={item}>{item}</b>)}</div>
          </article>
        </div>
      </section>

      <section className="section ar-faq-section">
        <div className="wrap ar-faq-grid">
          <div><span>الأسئلة الشائعة</span><h2>إجابات قبل جلسة العرض</h2><p>نعرض ما يمكن تأكيده الآن، ويُحسم نطاق التنفيذ والتكامل بعد مراجعة احتياجاتك.</p></div>
          <div className="ar-faq-list">
            {page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <ArabicCta title={page.ctaTitle} text={page.ctaText} />
    </>
  );
}

export function ArabicPricingPage({ pricing, pageContent }: { pricing?: { factors: string[]; planNames: string[]; note: string }; pageContent?: { signal: string; title: string; intro: string; cta?: string } }) {
  const factors = [
    ["عدد المستخدمين", "حجم الوصول المتزامن والأدوار المطلوبة."],
    ["الوحدات المطلوبة", "المحاسبة والموارد البشرية والمخزون والمبيعات وغيرها."],
    ["التكامل", "الربط بالأنظمة الحالية وواجهات API."],
    ["التخصيص", "تهيئة النظام وفق إجراءات العمل الخاصة بالمؤسسة."],
    ["التدريب والدعم", "عدد الفرق ونطاق التدريب ومستوى الخدمة."],
    ["الاستضافة", "خيار سحابي أو محلي وفق متطلبات المشروع."],
  ];
  const plans = [
    { name: "Starter", label: "للشركات الصغيرة", items: ["وحدات أساسية", "فريق صغير", "دعم قياسي"] },
    { name: "Business", label: "للشركات المتوسطة", items: ["وحدات متعددة", "تكاملات مختارة", "تقارير متقدمة"] },
    { name: "Enterprise", label: "للمؤسسات الكبيرة", items: ["عدة فروع", "سير عمل مخصص", "اتفاقية خدمة"] },
  ];
  return (
    <>
      <section className="ar-pricing-hero">
        <div className="wrap ar-pricing-hero-grid">
          <div>
            <span className="signal">{pageContent?.signal ?? "تقدير تكلفة المشروع"}</span>
            <h1>{pageContent?.title ?? "احصل على عرض سعر يناسب احتياجات مؤسستك."}</h1>
            <p>{pageContent?.intro ?? "يعتمد تسعير UNU على احتياجاتك الفعلية وعدد المستخدمين والوحدات وطريقة الاستضافة، لتدفع مقابل النطاق الذي يحقق قيمة لعملك."}</p>
            <div className="actions"><a className="button" href="#quote">اطلب عرض سعر <Arrow /></a><a className="button secondary" href="#how">كيف يُحسب السعر؟</a></div>
            <div className="ar-pricing-trust"><span>تسعير مخصص</span><span>نطاق قابل للتوسع</span><span>تفاصيل واضحة</span></div>
          </div>
          <div className="ar-estimator" role="img" aria-label="نموذج توضيحي لعوامل تقدير تكلفة المشروع">
            <div className="ar-estimator-head"><span>UNU</span><b>حاسبة النطاق</b><i>تقدير مبدئي</i></div>
            {["المستخدمون", "الوحدات", "التكامل", "التدريب", "الدعم"].map((item, index) => <div key={item}><span>{item}</span><i style={{ "--scope": `${82 - index * 9}%` } as React.CSSProperties} /></div>)}
            <footer><span>نطاق المشروع</span><strong>يُحدد بعد جلسة الاكتشاف</strong></footer>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <header className="ar-section-head"><div><span>لماذا لا نعرض سعراً ثابتاً؟</span><h2>لأن كل عملية تنفيذ تبدأ من واقع مختلف</h2></div><p>عدد الفروع والفرق والأنظمة الحالية يغير نطاق العمل. لذلك نبني عرضاً واضحاً حول ما تحتاجه فعلاً.</p></header>
          <div className="ar-pricing-reasons">
            {["كل مؤسسة مختلفة", "أنت تختار الوحدات", "التنفيذ والتكامل يختلفان", "الحل يتوسع مع النمو"].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}
          </div>
        </div>
      </section>

      <section className="section ar-pricing-factors">
        <div className="wrap ar-pricing-factor-grid">
          <div><span>عوامل التسعير</span><h2>ما الذي يحدد عرض السعر؟</h2><p>نشرح كل عنصر داخل العرض حتى تعرف أين يذهب الاستثمار وما الذي يشمله التنفيذ.</p></div>
          <div>{factors.map(([title, text], index) => <article key={title}><span>{index + 1}</span><div><h3>{pricing?.factors[index] ?? title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section ar-plan-section">
        <div className="wrap">
          <header className="ar-section-head compact"><div><span>اختر نقطة البداية</span><h2>فئات نطاق، وليست أسعاراً جامدة</h2></div></header>
          <div className="ar-plans">{plans.map((plan, index) => <article key={plan.name} className={index === 1 ? "is-featured" : ""}><span>{plan.label}</span><h3>{plan.name}</h3><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><a href="#quote" className="button secondary">اطلب عرضاً</a></article>)}</div>
        </div>
      </section>

      <section className="section ar-process-section">
        <div className="wrap">
          <header className="ar-section-head compact"><div><span>خطوات واضحة</span><h2>من الطلب إلى بدء التنفيذ</h2></div></header>
          <ol className="ar-workflow">{["أرسل طلبك", "اجتماع لفهم الاحتياج", "إعداد عرض السعر", "مراجعة العرض", "بدء التنفيذ"].map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol>
        </div>
      </section>

      <section className="section ar-quote-section" id="quote">
        <div className="wrap ar-quote-grid">
          <div><span>ابدأ من احتياجك</span><h2>جاهز للحصول على عرض سعر؟</h2><p>شاركنا نشاطك وحجم الفريق والفروع. سيراجع خبير UNU البيانات ويتواصل معك لتحديد جلسة اكتشاف مناسبة.</p><ul><li>تحليل الاحتياجات</li><li>إعداد النظام والتخصيص</li><li>خطة ترحيل البيانات</li><li>التدريب والدعم</li></ul></div>
          <ContactForm locale="ar" variant="quote" />
        </div>
      </section>
    </>
  );
}

export function ArabicCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="ar-final-cta">
      <div className="wrap"><div><h2>{title}</h2><p>{text}</p></div><div className="actions"><Link className="button" href="/ar/contact">طلب عرض توضيحي <Arrow /></Link><a className="button secondary" href="mailto:info@unuerp.com">تواصل مع فريق المبيعات</a></div></div>
    </section>
  );
}
