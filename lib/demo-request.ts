export type DemoRequest = {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
};

export type DemoRequestWebhookPayload = DemoRequest & {
  submittedAt: string;
  language: "en" | "ar";
  sourcePage: string;
  userAgent: string;
};

type ValidationResult =
  | { ok: true; data: DemoRequest }
  | { ok: false; message: string };

const limits = {
  name: 100,
  email: 254,
  company: 150,
  industry: 100,
  message: 2_000,
} as const;

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function createWebhookPayload(
  data: DemoRequest,
  metadata: { locale: unknown; sourcePage: unknown; userAgent: unknown; submittedAt?: Date },
): DemoRequestWebhookPayload {
  return {
    ...data,
    submittedAt: (metadata.submittedAt ?? new Date()).toISOString(),
    language: metadata.locale === "ar" ? "ar" : "en",
    sourcePage: clean(metadata.sourcePage, 500),
    userAgent: clean(metadata.userAgent, 300),
  };
}

export function validateDemoRequest(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, message: "Invalid request body." };
  }

  const values = input as Record<string, unknown>;
  const data: DemoRequest = {
    name: clean(values.name, limits.name),
    email: clean(values.email, limits.email).toLowerCase(),
    company: clean(values.company, limits.company),
    industry: clean(values.industry, limits.industry),
    message: clean(values.message, limits.message),
  };

  if (!data.name || !data.email || !data.company) {
    return { ok: false, message: "Name, work email, and company are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, message: "Enter a valid work email address." };
  }

  return { ok: true, data };
}
