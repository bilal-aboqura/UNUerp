import { NextRequest, NextResponse } from "next/server";
import { createWebhookPayload, validateDemoRequest } from "@/lib/demo-request";
import { createPublicServerClient } from "@/lib/supabase/server";

const windowMs = 15 * 60 * 1_000;
const maxRequests = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > maxRequests;
}

function sourcePage(request: NextRequest, body: Record<string, unknown>) {
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.pathname}${url.search}`;
    } catch {
      // Fall through to the browser-provided path, which is sanitized below.
    }
  }
  return body.sourcePage;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const result = validateDemoRequest(body);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  const payload = createWebhookPayload(result.data, {
    locale: body.locale,
    sourcePage: sourcePage(request, body),
    userAgent: request.headers.get("user-agent"),
  });

  const supabase = await createPublicServerClient();
  let stored = false;
  if (supabase) {
    const { error } = await supabase.from("demo_requests").insert({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      industry: payload.industry,
      message: payload.message,
      language: payload.language,
      source_page: payload.sourcePage,
    });
    stored = !error;
  }

  const webhookUrl = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (!webhookUrl) {
    if (stored) return NextResponse.json({ ok: true, delivery: "database" });
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { message: "Demo requests are temporarily unavailable. Please contact us by phone or email." },
        { status: 503 },
      );
    }

    console.info("Development demo request", payload);
    return NextResponse.json({ ok: true, delivery: "development" });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.DEMO_REQUEST_WEBHOOK_TOKEN
          ? { authorization: `Bearer ${process.env.DEMO_REQUEST_WEBHOOK_TOKEN}` }
          : {}),
      },
      // Apps Script web-app events document the body but not incoming headers.
      // The shared secret is used only for webhook authentication and is never persisted.
      body: JSON.stringify({
        ...payload,
        ...(process.env.DEMO_REQUEST_WEBHOOK_TOKEN
          ? { sharedSecret: process.env.DEMO_REQUEST_WEBHOOK_TOKEN }
          : {}),
      }),
      signal: AbortSignal.timeout(8_000),
    });

    const webhookResult = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (!response.ok || webhookResult?.ok !== true) {
      throw new Error(`Webhook returned ${response.status}`);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "We could not send your request. Please try again or contact us directly." },
      { status: 502 },
    );
  }
}
