import { describe, expect, it } from "vitest";
import { validateDemoRequest } from "@/lib/demo-request";

describe("validateDemoRequest", () => {
  it("sanitizes and normalizes a valid request", () => {
    const result = validateDemoRequest({
      name: "  Ada <Lovelace> ",
      email: " ADA@EXAMPLE.COM ",
      company: "  UNU\nLabs ",
      industry: "Technology",
      message: "Need <reporting> help.",
    });

    expect(result).toEqual({
      ok: true,
      data: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        company: "UNU Labs",
        industry: "Technology",
        message: "Need reporting help.",
      },
    });
  });

  it("rejects missing required fields and invalid emails", () => {
    expect(validateDemoRequest({})).toMatchObject({ ok: false });
    expect(
      validateDemoRequest({ name: "Ada", company: "UNU", email: "not-an-email" }),
    ).toMatchObject({ ok: false, message: "Enter a valid work email address." });
  });
});
