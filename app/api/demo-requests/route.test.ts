// @vitest-environment node

import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function request(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/demo-requests", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

const validSubmission = {
  name: "Ada <Lovelace>",
  email: "ADA@EXAMPLE.COM",
  company: "Analytical Engines",
  industry: "Technology",
  message: "=SUM(1,1)",
  locale: "ar",
  sourcePage: "/ar/contact",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/demo-requests", () => {
  it("rejects invalid input before processing it", async () => {
    const response = await POST(request({ name: "", email: "invalid" }, "test-invalid"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Name, work email, and company are required.",
    });
  });

  it("accepts honeypot submissions without forwarding them", async () => {
    const response = await POST(
      request({ website: "https://spam.example", name: "Ignored" }, "test-honeypot"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("sends a sanitized Google Sheets webhook payload and configured authorization", async () => {
    vi.stubEnv("DEMO_REQUEST_WEBHOOK_URL", "https://script.google.com/macros/s/example/exec");
    vi.stubEnv("DEMO_REQUEST_WEBHOOK_TOKEN", "sheet-secret");
    const fetchMock = vi.fn<typeof fetch>();
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: true })));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request(validSubmission, "test-webhook"),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://script.google.com/macros/s/example/exec");
    expect(options?.headers).toMatchObject({ authorization: "Bearer sheet-secret" });
    const payload = JSON.parse(options?.body as string);
    expect(payload).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      industry: "Technology",
      message: "=SUM(1,1)",
      language: "ar",
      sourcePage: "/ar/contact",
      sharedSecret: "sheet-secret",
    });
    expect(payload.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(payload).not.toHaveProperty("website");
  });

  it("returns a safe frontend error when the webhook fails", async () => {
    vi.stubEnv("DEMO_REQUEST_WEBHOOK_URL", "https://script.google.com/macros/s/example/exec");
    vi.stubEnv("DEMO_REQUEST_WEBHOOK_TOKEN", "never-return-this");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ ok: false }), { status: 200 })));

    const response = await POST(request(validSubmission, "test-failure"));
    const payload = await response.json();

    expect(response.status).toBe(502);
    expect(payload).toEqual({
      message: "We could not send your request. Please try again or contact us directly.",
    });
    expect(JSON.stringify(payload)).not.toContain("never-return-this");
  });

  it("blocks duplicate submissions after the configured rate limit", async () => {
    vi.stubEnv("DEMO_REQUEST_WEBHOOK_URL", "https://script.google.com/macros/s/example/exec");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ ok: true }))));
    const ip = "test-duplicate";

    for (let index = 0; index < 5; index += 1) {
      await expect(POST(request(validSubmission, ip))).resolves.toMatchObject({ status: 200 });
    }

    const response = await POST(request(validSubmission, ip));
    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      message: "Too many requests. Please try again in a few minutes.",
    });
  });
});
