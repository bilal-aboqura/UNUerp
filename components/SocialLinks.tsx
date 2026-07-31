import type { ReactNode } from "react";
import { buildWhatsappUrl, isValidExternalUrl } from "@/lib/communication";
import type { SiteContent, SocialPlatform } from "@/lib/site-content";

const labels: Record<SocialPlatform, string> = {
  facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", x: "X (Twitter)",
  youtube: "YouTube", tiktok: "TikTok", whatsapp: "WhatsApp",
};

const marks: Record<SocialPlatform, ReactNode> = {
  facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>,
  linkedin: <><path d="M5 9v10M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10"/></>,
  x: <path d="M4 4l16 16M20 4 4 20"/>,
  youtube: <><path d="M21 12c0 3-.4 5-1 6-1 1-4 1-8 1s-7 0-8-1c-.6-1-1-3-1-6s.4-5 1-6c1-1 4-1 8-1s7 0 8 1c.6 1 1 3 1 6Z"/><path d="m10 9 5 3-5 3Z"/></>,
  tiktok: <><path d="M14 4v11a4 4 0 1 1-4-4"/><path d="M14 4c1 3 3 4 6 4"/></>,
  whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M8.5 8.2c.4 3.4 2.2 5.2 5.6 5.7l1.2-1.4-2.1-1-.8.7c-1.1-.4-1.9-1.2-2.4-2.3l.7-.8-1-2Z"/></>,
};

export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{marks[platform]}</svg>;
}

export function FooterSocialLinks({ links }: { links: SiteContent["global"]["socialLinks"] }) {
  const visible = links.filter((link) => link.enabled && isValidExternalUrl(link.url));
  if (!visible.length) return null;
  return (
    <div className="footer-socials" aria-label="Social media">
      {visible.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={labels[link.platform]} key={link.id}><SocialIcon platform={link.platform} /></a>)}
    </div>
  );
}

export function FloatingWhatsapp({ settings, locale }: { settings: SiteContent["global"]["whatsapp"]; locale: "en" | "ar" }) {
  if (!settings.visible) return null;
  const href = buildWhatsappUrl(settings.phone, settings.message[locale]);
  if (!href) return null;
  const position = settings.position === "auto" ? (locale === "ar" ? "left" : "right") : settings.position;
  const label = locale === "ar" ? "تواصل مع UNU عبر واتساب" : "Chat with UNU on WhatsApp";
  return <a className={`floating-whatsapp is-${position}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><SocialIcon platform="whatsapp" /><span>{label}</span></a>;
}
