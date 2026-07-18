import { describe, expect, it } from "vitest";
import { cloneDefaultSiteContent, defaultSiteContent } from "@/lib/site-content";

describe("site content model", () => {
  it("contains every public catalog and both locales", () => {
    expect(Object.keys(defaultSiteContent.features)).toHaveLength(12);
    expect(Object.keys(defaultSiteContent.products)).toHaveLength(5);
    expect(Object.keys(defaultSiteContent.industries)).toHaveLength(21);
    expect(defaultSiteContent.home.en.title).toBeTruthy();
    expect(defaultSiteContent.home.ar.title).toBeTruthy();
    expect(defaultSiteContent.media.clientLogos).toHaveLength(6);
  });

  it("returns a safe editable clone", () => {
    const first = cloneDefaultSiteContent();
    const second = cloneDefaultSiteContent();
    first.global.siteName = "Changed";
    expect(second.global.siteName).toBe("UNU ERP");
    expect(() => JSON.stringify(first)).not.toThrow();
  });
});
