import type { HTMLAttributes } from "react";

const featureEmojis: Record<string, string> = {
  crm: "💬",
  sales: "📈",
  accounting: "💰",
  purchase: "🛒",
  inventory: "📦",
  hr: "👥",
  projects: "📋",
  ecommerce: "🛍️",
  marketing: "📣",
  helpdesk: "🎧",
  pos: "🧾",
  "no-code-studio": "🧩",
};

type FeatureIconProps = HTMLAttributes<HTMLSpanElement> & {
  slug: string;
};

export function FeatureIcon({ slug, ...props }: FeatureIconProps) {
  return <span {...props} className={`feature-emoji ${props.className ?? ""}`.trim()} aria-hidden="true">{featureEmojis[slug] ?? "✨"}</span>;
}
