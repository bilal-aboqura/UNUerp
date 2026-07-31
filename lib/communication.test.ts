import { describe, expect, it } from "vitest";
import { buildWhatsappUrl, normalizeWhatsappPhone } from "@/lib/communication";

describe("WhatsApp link utilities", () => {
  it("normalizes international phone formats", () => {
    expect(normalizeWhatsappPhone("+966 11 224 8822")).toBe("966112248822");
    expect(normalizeWhatsappPhone("00966-11-224-8822")).toBe("966112248822");
  });

  it("rejects invalid phone numbers", () => {
    expect(normalizeWhatsappPhone("011 224 8822")).toBeNull();
    expect(normalizeWhatsappPhone("call-us")).toBeNull();
    expect(normalizeWhatsappPhone("123")).toBeNull();
  });

  it("builds a correctly encoded wa.me URL", () => {
    expect(buildWhatsappUrl("+966 11 224 8822", "Hello UNU & team")).toBe("https://wa.me/966112248822?text=Hello%20UNU%20%26%20team");
  });
});
