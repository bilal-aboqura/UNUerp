import { describe, expect, it } from "vitest";
import {
  createIndustryResource,
  createFeatureResource,
  createProductResource,
  slugifyResource,
} from "@/lib/admin-content-resources";

describe("admin content resources", () => {
  const input = {
    slug: "  Field Service  ",
    englishName: "UNU Field Service",
    arabicName: "UNU للخدمات الميدانية",
  };

  it("creates URL-safe resource slugs", () => {
    expect(slugifyResource("  Field Service & Support  ")).toBe("field-service-support");
  });

  it("creates a complete bilingual product draft", () => {
    const product = createProductResource(input);
    expect(product.catalog.en).toMatchObject({ slug: "field-service", name: "UNU Field Service" });
    expect(product.catalog.ar).toMatchObject({ slug: "field-service", name: "UNU للخدمات الميدانية" });
    expect(product.en).toMatchObject({ name: "UNU Field Service", workflow: expect.any(Array), faq: expect.any(Array) });
    expect(product.imageAlt.ar).toContain("UNU للخدمات الميدانية");
  });

  it("creates an industry draft with the three paragraphs required by detail pages", () => {
    const industry = createIndustryResource(input);
    expect(industry.en.name).toBe("UNU Field Service");
    expect(industry.ar.name).toBe("UNU للخدمات الميدانية");
    expect(industry.en.intro).toHaveLength(3);
    expect(industry.ar.intro).toHaveLength(3);
  });

  it("creates an unpublished bilingual feature draft with managed ordering", () => {
    const feature = createFeatureResource(input, 4);
    expect(feature).toMatchObject({ published: false, order: 4, section: "business", icon: "workflow" });
    expect(feature.en.name).toBe("UNU Field Service");
    expect(feature.ar.name).toBe("UNU للخدمات الميدانية");
  });
});
