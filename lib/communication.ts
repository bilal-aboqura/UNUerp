import type { SiteContent } from "@/lib/site-content";

export function normalizeWhatsappPhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /[a-z]/i.test(trimmed)) return null;
  let digits = trimmed.replace(/[^0-9]/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length < 7 || digits.length > 15 || digits.startsWith("0")) return null;
  return digits;
}

export function buildWhatsappUrl(phone: string, message = "") {
  const normalized = normalizeWhatsappPhone(phone);
  if (!normalized) return null;
  const params = message.trim() ? `?text=${encodeURIComponent(message.trim())}` : "";
  return `https://wa.me/${normalized}${params}`;
}

export function isValidExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateSiteContent(content: SiteContent) {
  if (!content.global || !content.features || !content.pricing?.plans) return "Required website content sections are missing.";
  if (content.global.whatsapp.visible && !normalizeWhatsappPhone(content.global.whatsapp.phone)) {
    return "Enter the WhatsApp number in international format, for example +966112248822.";
  }
  const invalidSocial = content.global.socialLinks.find((item) => item.enabled && !isValidExternalUrl(item.url));
  if (invalidSocial) return `Enter a valid http or https URL for the enabled ${invalidSocial.platform} link.`;
  const incompleteFeature = Object.entries(content.features).find(([, item]) => !item.en.name.trim() || !item.ar.name.trim());
  if (incompleteFeature) return `Add both English and Arabic names for the feature “${incompleteFeature[0]}”.`;
  const incompletePlan = content.pricing.plans.find((plan) => plan.published && (!plan.name.en.trim() || !plan.name.ar.trim() || !plan.cta.en.trim() || !plan.cta.ar.trim()));
  if (incompletePlan) return "Published pricing plans need names and CTA labels in both languages.";
  return null;
}
