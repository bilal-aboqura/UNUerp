import { arIndustries, arProducts } from "@/lib/ar-content";
import { industries, products, slugify } from "@/lib/content";

export type NavigationLocale = "en" | "ar";

export type NavigationChild = {
  label: string;
  href: string;
};

export type NavigationGroup = {
  id: string;
  label: string;
  href: string;
  items: NavigationChild[];
};

const industryCategoryIndexes = [
  { id: "production-infrastructure", label: { en: "Production & infrastructure", ar: "الإنتاج والبنية التحتية" }, indexes: [0, 1, 3, 4, 5, 8, 11] },
  { id: "technology-digital", label: { en: "Technology & digital", ar: "التقنية والخدمات الرقمية" }, indexes: [6, 15, 16, 17, 18] },
  { id: "commerce-experiences", label: { en: "Commerce & experiences", ar: "التجارة والتجارب" }, indexes: [2, 12, 13, 14, 19, 20] },
  { id: "services-mobility", label: { en: "Services & mobility", ar: "الخدمات والتنقل" }, indexes: [7, 9, 10] },
] as const;

function industryItems(locale: NavigationLocale): NavigationChild[] {
  const prefix = locale === "ar" ? "/ar" : "";
  return industries.map((name, index) => ({
    label: locale === "ar" ? arIndustries[index] ?? name : name,
    href: `${prefix}/industries/${slugify(name)}`,
  }));
}

export function getIndustryNavigationGroups(locale: NavigationLocale): NavigationGroup[] {
  const items = industryItems(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  return industryCategoryIndexes.map((category) => ({
    id: category.id,
    label: category.label[locale],
    href: `${prefix}/industries#${category.id}`,
    items: category.indexes.map((index) => items[index]),
  }));
}

export function getNavigationChildren(
  href: string,
  locale: NavigationLocale,
): NavigationChild[] | null {
  const isArabic = locale === "ar";
  const prefix = isArabic ? "/ar" : "";

  if (href === `${prefix}/products`) {
    return [
      { label: isArabic ? "جميع المنتجات" : "All products", href: `${prefix}/products` },
      ...products.map(([name], index) => ({
        label: isArabic ? arProducts[index] ?? name : name,
        href: `${prefix}/products/${slugify(name.replace("UNU ", ""))}`,
      })),
    ];
  }

  if (href === `${prefix}/industries`) {
    return [
      { label: isArabic ? "جميع القطاعات" : "All industries", href: `${prefix}/industries` },
      ...getIndustryNavigationGroups(locale).map(({ label, href: categoryHref }) => ({
        label,
        href: categoryHref,
      })),
    ];
  }

  return null;
}
