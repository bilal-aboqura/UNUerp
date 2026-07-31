import type { SiteContent } from "@/lib/site-content";

export type NewResourceInput = {
  slug: string;
  englishName: string;
  arabicName: string;
};

export function slugifyResource(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productPage(name: string, locale: "en" | "ar") {
  if (locale === "ar") {
    return {
      name,
      signal: `منتج ${name}`,
      headline: `${name}: عمليات مترابطة في منصة واحدة.`,
      intro: `اربط فرقك وبياناتك وإجراءاتك اليومية من خلال ${name}.`,
      sectionTitle: `قدرات عملية مصممة لفرق ${name}`,
      sectionIntro: "حرّر هذا النص ليشرح كيف يدعم المنتج سير العمل اليومي والنتائج التشغيلية.",
      featuresLabel: "نطاق العمل",
      featuresTitle: "قدرات يومية للفرق والإدارة",
      featuresIntro: "أضف القدرات النهائية بعد مراجعة سير العمل والأنظمة الحالية.",
      workflowLabel: "كيف يعمل؟",
      workflowTitle: "رحلة تشغيلية واضحة من البداية إلى النتيجة",
      workflowIntro: "عدّل الخطوات لتطابق رحلة العمل الفعلية.",
      audiencesLabel: "مناسب لـ",
      audiencesTitle: "فرق تعمل في سياقات تشغيل حقيقية",
      integrationsLabel: "التكاملات",
      integrationsTitle: "مصمم للعمل ضمن بيئة أعمالك",
      faqLabel: "الأسئلة الشائعة",
      faqTitle: "إجابات قبل جلسة العرض",
      faqIntro: "أضف الإجابات التي يحتاجها العميل قبل طلب العرض.",
      demoVideo: { src: "", poster: "/assets/hero-products.webp", title: `شاهد ${name} أثناء العمل`, description: "أضف وصفاً للفيديو أو اترك رابط الفيديو فارغاً لعرض الدعوة إلى التواصل." },
      capabilities: [{ title: "القدرة الأولى", text: "اشرح الفائدة التشغيلية لهذه القدرة." }],
      features: ["أضف ميزة"],
      workflow: ["أضف خطوة"],
      integrations: ["UNU ERP"],
      audiences: ["أضف فئة مستخدمين"],
      faq: [{ question: "أضف سؤالاً شائعاً", answer: "أضف الإجابة هنا." }],
      ctaTitle: `اكتشف كيف يناسب ${name} عملياتك`,
      ctaText: "احجز جلسة عرض مخصصة حول احتياجات فريقك.",
      dashboard: { label: name, primaryMetric: "العمليات النشطة", secondaryMetric: "حالة النظام", rows: ["أضف مؤشراً"] },
    };
  }

  return {
    name,
    signal: `Introducing ${name}`,
    headline: `${name}: connected operations in one platform.`,
    intro: `Connect teams, data, and day-to-day workflows through ${name}.`,
    sectionTitle: `Practical capabilities built for ${name} teams`,
    sectionIntro: "Edit this introduction to explain how the product supports daily work and operational outcomes.",
    featuresLabel: "Operational scope",
    featuresTitle: "Practical daily capabilities for teams and management",
    featuresIntro: "Add the final capabilities after reviewing the workflow and current systems.",
    workflowLabel: "How it works",
    workflowTitle: "A clear journey from first action to final outcome",
    workflowIntro: "Edit these steps to match the real operating journey.",
    audiencesLabel: "Built for",
    audiencesTitle: "Teams working in real operating contexts",
    integrationsLabel: "Integrations",
    integrationsTitle: "Designed to work within your business environment",
    faqLabel: "Frequently asked questions",
    faqTitle: "Answers before your walkthrough",
    faqIntro: "Add the answers a customer needs before requesting a walkthrough.",
    demoVideo: { src: "", poster: "/assets/hero-products.webp", title: `See ${name} in action`, description: "Add a video description, or leave the video URL empty to show the standard call-to-action." },
    capabilities: [{ title: "First capability", text: "Explain the operational value of this capability." }],
    features: ["Add a feature"],
    workflow: ["Add a step"],
    integrations: ["UNU ERP"],
    audiences: ["Add an audience"],
    faq: [{ question: "Add a common question", answer: "Add the answer here." }],
    ctaTitle: `See how ${name} can fit your operation`,
    ctaText: "Book a walkthrough shaped around your team and workflows.",
    dashboard: { label: name, primaryMetric: "Active operations", secondaryMetric: "System status", rows: ["Add a dashboard row"] },
  };
}

export function createProductResource(input: NewResourceInput): SiteContent["products"][string] {
  const slug = slugifyResource(input.slug);
  const englishName = input.englishName.trim();
  const arabicName = input.arabicName.trim();

  return {
    en: productPage(englishName, "en"),
    ar: productPage(arabicName, "ar"),
    catalog: {
      en: {
        slug,
        name: englishName,
        tag: "Business operations",
        title: `${englishName} for connected day-to-day work`,
        text: "Edit this summary to explain the product’s primary operational value.",
        items: ["Add a key capability"],
      },
      ar: {
        slug,
        name: arabicName,
        tag: "عمليات الأعمال",
        title: `${arabicName} لعمليات يومية مترابطة`,
        text: "حرّر هذا الملخص لشرح القيمة التشغيلية الأساسية للمنتج.",
        items: ["أضف قدرة رئيسية"],
      },
    },
    image: "/assets/hero-products.webp",
    imageAlt: {
      en: `${englishName} product workspace`,
      ar: `واجهة منتج ${arabicName}`,
    },
  };
}

export function createIndustryResource(input: NewResourceInput): SiteContent["industries"][string] {
  const englishName = input.englishName.trim();
  const arabicName = input.arabicName.trim();

  return {
    en: {
      name: englishName,
      headline: `Connected operations for the ${englishName} industry.`,
      summary: `Bring the essential workflows of ${englishName} organizations into one configurable platform.`,
      intro: [
        `Connect the core processes of a ${englishName} organization in one adaptable platform.`,
        "Unify finance, customers, people, inventory, and delivery around a shared operational view.",
        "Configure permissions, reporting, and workflows to match how your organization works.",
      ],
    },
    ar: {
      name: arabicName,
      headline: `حلول مترابطة لقطاع ${arabicName}.`,
      summary: `اجمع إجراءات قطاع ${arabicName} الأساسية في منصة واحدة قابلة للتهيئة.`,
      intro: [
        `اربط العمليات الأساسية في قطاع ${arabicName} ضمن منصة مرنة واحدة.`,
        "وحّد المالية والعملاء والموارد والمخزون والتسليم في صورة تشغيلية مشتركة.",
        "هيّئ الصلاحيات والتقارير وسير العمل بما يناسب طبيعة مؤسستك.",
      ],
    },
    image: "/assets/hero-industries.webp",
  };
}

export function createFeatureResource(input: NewResourceInput, order: number): SiteContent["features"][string] {
  const englishName = input.englishName.trim();
  const arabicName = input.arabicName.trim();
  return {
    icon: "workflow",
    section: "business",
    published: false,
    order,
    en: {
      name: englishName,
      headline: `${englishName} connected to the rest of your operation.`,
      intro: `Explain how ${englishName} helps teams work with clearer, shared information.`,
      benefits: ["Add the first operational benefit"],
    },
    ar: {
      name: arabicName,
      headline: `${arabicName} مترابط مع بقية عمليات مؤسستك.`,
      intro: `اشرح كيف يساعد ${arabicName} الفرق على العمل ببيانات أوضح ومشتركة.`,
      benefits: ["أضف الفائدة التشغيلية الأولى"],
    },
  };
}
