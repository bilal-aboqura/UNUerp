import { cache } from "react";
import { homeCopy } from "@/components/HomePage";
import {
  featureDetails,
  industries,
  industryDetails,
  nav,
  slugify,
} from "@/lib/content";
import { arIndustries, arModules } from "@/lib/ar-content";
import {
  englishIndustryCopy,
  englishProductCatalog,
  englishProductPages,
} from "@/lib/en-marketing-content";
import {
  arabicIndustryCopy,
  arabicProductCatalog,
  arabicProductPages,
} from "@/lib/ar-marketing-content";
import { createPublicServerClient } from "@/lib/supabase/server";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type SiteContent = {
  version: number;
  global: {
    siteName: string;
    logo: { src: string; alt: string };
    seo: {
      en: { title: string; description: string };
      ar: { title: string; description: string };
    };
    navigation: {
      en: { label: string; href: string }[];
      ar: { label: string; href: string }[];
    };
    cta: { en: string; ar: string };
    contact: {
      email: string;
      phone: string;
      address: { en: string; ar: string };
    };
    footer: {
      en: { tagline: string; trust: string; legal: string };
      ar: { tagline: string; trust: string; legal: string };
    };
  };
  media: {
    hero: string;
    featuresHero: string;
    productsHero: string;
    industriesHero: string;
    clientLogos: { src: string; altEn: string; altAr: string }[];
  };
  home: {
    en: (typeof homeCopy)["en"];
    ar: (typeof homeCopy)["ar"];
  };
  pages: Record<
    "features" | "products" | "industries" | "pricing" | "contact",
    {
      en: { signal: string; title: string; intro: string; cta?: string };
      ar: { signal: string; title: string; intro: string; cta?: string };
    }
  >;
  features: Record<
    string,
    {
      en: { name: string; headline: string; intro: string; benefits: string[] };
      ar: { name: string; headline: string; intro: string; benefits: string[] };
    }
  >;
  products: Record<
    string,
    {
      en: JsonValue;
      ar: JsonValue;
      catalog: { en: JsonValue; ar: JsonValue };
      image: string;
      imageAlt: { en: string; ar: string };
    }
  >;
  industries: Record<
    string,
    {
      en: { name: string; headline: string; intro: string[]; summary: string };
      ar: { name: string; headline: string; intro: string[]; summary: string };
      image: string;
    }
  >;
  pricing: {
    en: { factors: string[]; planNames: string[]; note: string };
    ar: { factors: string[]; planNames: string[]; note: string };
  };
};

const arNav = [
  { label: "المزايا", href: "/ar/features" },
  { label: "المنتجات", href: "/ar/products" },
  { label: "القطاعات", href: "/ar/industries" },
  { label: "الحلول والأسعار", href: "/ar/pricing" },
];

function defaultFeatures(): SiteContent["features"] {
  return Object.fromEntries(
    Object.entries(featureDetails).map(([slug, item], index) => [
      slug,
      {
        en: item,
        ar: {
          name: arModules[index] ?? item.name,
          headline: `${arModules[index] ?? item.name}: رؤية أوضح وعمل مترابط.`,
          intro: `اربط ${arModules[index] ?? item.name} ببقية فرقك وبياناتك ضمن منصة مرنة تتكيف مع سير عمل مؤسستك.`,
          benefits: item.benefits.map((benefit) => benefit),
        },
      },
    ]),
  );
}

function defaultProducts(): SiteContent["products"] {
  const enCatalog = Object.fromEntries(englishProductCatalog.map((item) => [item.slug, item]));
  const arCatalog = Object.fromEntries(arabicProductCatalog.map((item) => [item.slug, item]));
  return Object.fromEntries(
    Object.keys(englishProductPages).map((slug) => [
      slug,
      {
        en: englishProductPages[slug] as unknown as JsonValue,
        ar: arabicProductPages[slug] as unknown as JsonValue,
        catalog: {
          en: enCatalog[slug] as unknown as JsonValue,
          ar: arCatalog[slug] as unknown as JsonValue,
        },
        image: "/assets/hero-products.webp",
        imageAlt: {
          en: `${englishProductPages[slug]?.name ?? "UNU product"} product workspace`,
          ar: `واجهة منتج ${arabicProductPages[slug]?.name ?? "UNU"}`,
        },
      },
    ]),
  );
}

function defaultIndustries(): SiteContent["industries"] {
  return Object.fromEntries(
    industries.map((name, index) => {
      const slug = slugify(name);
      const item = industryDetails[slug];
      const arName = arIndustries[index] ?? name;
      return [
        slug,
        {
          en: {
            name,
            headline: item.headline,
            intro: [...item.intro],
            summary: englishIndustryCopy[slug] ?? item.intro[0],
          },
          ar: {
            name: arName,
            headline: `حلول مترابطة لقطاع ${arName}`,
            intro: [
              `اربط العمليات الأساسية في قطاع ${arName} ضمن منصة مرنة واحدة.`,
              "وحّد المالية والعملاء والموارد والمخزون والتسليم في صورة تشغيلية مشتركة.",
              "هيّئ الصلاحيات والتقارير وسير العمل بما يناسب طبيعة مؤسستك.",
            ],
            summary: arabicIndustryCopy[slug] ?? `حلول تشغيل مرنة لقطاع ${arName}.`,
          },
          image: "/assets/hero-industries.webp",
        },
      ];
    }),
  );
}

export const defaultSiteContent: SiteContent = {
  version: 1,
  global: {
    siteName: "UNU ERP",
    logo: { src: "/assets/unu-logo.png", alt: "UNU ERP" },
    seo: {
      en: {
        title: "UNU ERP — One platform for your entire business",
        description: "Run finance, sales, inventory, HR, and customer operations from one connected system.",
      },
      ar: {
        title: "UNU ERP — منصة واحدة لإدارة أعمالك",
        description: "اربط المالية والمبيعات والمخزون والموارد البشرية وخدمة العملاء في نظام واحد.",
      },
    },
    navigation: { en: nav.map((item) => ({ ...item })), ar: arNav },
    cta: { en: "Book a demo", ar: "اطلب عرضاً" },
    contact: {
      email: "info@unuerp.com",
      phone: "+966 11 224 8822",
      address: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },
    },
    footer: {
      en: {
        tagline: "Intelligent, connected, open-source business management for growing enterprises.",
        trust: "One flexible platform. Your data under your control.",
        legal: "Built for businesses shaping Saudi Arabia’s future.",
      },
      ar: {
        tagline: "حلول ذكية ومترابطة ومفتوحة المصدر تساعد الشركات على إدارة عملياتها بوضوح وكفاءة أكبر.",
        trust: "منصة مرنة. بيانات تحت تحكمك.",
        legal: "صُمم للشركات التي تشكل مستقبل المملكة العربية السعودية.",
      },
    },
  },
  media: {
    hero: "/assets/hero.jpeg",
    featuresHero: "/assets/hero-features.webp",
    productsHero: "/assets/hero-products.webp",
    industriesHero: "/assets/hero-industries.webp",
    clientLogos: Array.from({ length: 6 }, (_, index) => ({
      src: `/assets/client-${index + 1}.png`,
      altEn: `UNU client logo ${index + 1}`,
      altAr: `شعار عميل UNU رقم ${index + 1}`,
    })),
  },
  home: JSON.parse(JSON.stringify(homeCopy)) as SiteContent["home"],
  pages: {
    features: {
      en: { signal: "UNU ERP features", title: "One connected platform for the work that runs your business.", intro: "Explore every core capability—from customer relationships and sales to finance, people, inventory and custom workflows.", cta: "Book a tailored demo" },
      ar: { signal: "مزايا UNU ERP", title: "منصة واحدة مترابطة للأعمال التي تدير مؤسستك.", intro: "استكشف قدرات إدارة العملاء والمبيعات والمالية والموارد والمخزون وسير العمل.", cta: "اطلب عرضاً مخصصاً" },
    },
    products: {
      en: { signal: "Specialized UNU products", title: "Specialized products. One connected operating platform.", intro: "Use specialized products for distinct operational needs while keeping management, data, and growth connected.", cta: "Book a product walkthrough" },
      ar: { signal: "منتجات UNU المتخصصة", title: "منتجات متخصصة على منصة تشغيل واحدة.", intro: "اختر المنتج الأقرب إلى احتياجاتك مع الحفاظ على ترابط الإدارة والبيانات والتوسع.", cta: "اطلب عرض المنتج" },
    },
    industries: {
      en: { signal: "Industry solutions", title: "One platform. Specialized solutions for every industry.", intro: "Configurable solutions that connect customers, finance, people, inventory, and delivery in one operating model.", cta: "Book a consultation" },
      ar: { signal: "حلول القطاعات", title: "منصة واحدة وحلول متخصصة لمختلف القطاعات.", intro: "حلول قابلة للتهيئة تربط العملاء والمالية والموارد والمخزون والتسليم.", cta: "احجز استشارة" },
    },
    pricing: {
      en: { signal: "Pricing built around your operation", title: "A practical scope, shaped around what you need.", intro: "Pricing reflects modules, users, implementation, integrations, and deployment.", cta: "Request a tailored quote" },
      ar: { signal: "تسعير يناسب عملياتك", title: "نطاق عملي مبني على احتياجاتك.", intro: "يتحدد السعر حسب الوحدات والمستخدمين والتنفيذ والتكاملات والاستضافة.", cta: "اطلب عرض سعر" },
    },
    contact: {
      en: { signal: "Book a tailored demo", title: "Show us how your operation works.", intro: "An ERP specialist will walk you through the workflows, teams, and data you want to connect." },
      ar: { signal: "احجز عرضاً مخصصاً", title: "شاركنا طريقة عمل مؤسستك.", intro: "سيراجع معك أحد متخصصي ERP العمليات والفرق والبيانات التي تريد ربطها." },
    },
  },
  features: defaultFeatures(),
  products: defaultProducts(),
  industries: defaultIndustries(),
  pricing: {
    en: {
      factors: ["Selected modules", "Number of users", "Implementation scope", "Integrations", "Hosting model", "Support requirements"],
      planNames: ["Essential", "Growth", "Enterprise"],
      note: "Every quote is scoped around your workflows and implementation requirements.",
    },
    ar: {
      factors: ["الوحدات المختارة", "عدد المستخدمين", "نطاق التنفيذ", "التكاملات", "نموذج الاستضافة", "متطلبات الدعم"],
      planNames: ["الأساسي", "النمو", "المؤسسات"],
      note: "يتم إعداد كل عرض سعر بناءً على سير العمل ومتطلبات التنفيذ.",
    },
  },
};

export function cloneDefaultSiteContent(): SiteContent {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
}

export const readSiteContent = cache(async (): Promise<SiteContent> => {
  const supabase = await createPublicServerClient();
  if (!supabase) return cloneDefaultSiteContent();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", "current")
    .maybeSingle();

  if (error || !data?.content) return cloneDefaultSiteContent();
  return data.content as SiteContent;
});
