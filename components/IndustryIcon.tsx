import type { HTMLAttributes } from "react";

const industryEmojis: Record<string, string> = {
  manufacturing: "🏭",
  automotive: "🚗",
  "fashion-and-apparel": "👗",
  "food-and-beverage": "🍽️",
  pharmaceuticals: "💊",
  construction: "🏗️",
  "information-technology": "💻",
  education: "🎓",
  "real-estate": "🏢",
  healthcare: "🏥",
  "transportation-and-logistics": "🚚",
  "maritime-and-shipping": "🚢",
  "media-and-entertainment": "🎬",
  gaming: "🎮",
  "photography-and-videography": "📸",
  "software-development": "👨‍💻",
  "ai-and-machine-learning": "🤖",
  cybersecurity: "🛡️",
  "cloud-services": "☁️",
  "hospitality-and-tourism": "🏨",
  "fitness-and-wellness": "🏋️",
};

type IndustryIconProps = HTMLAttributes<HTMLSpanElement> & {
  slug: string;
};

export function IndustryIcon({ slug, ...props }: IndustryIconProps) {
  return <span {...props} className={`industry-emoji ${props.className ?? ""}`.trim()} aria-hidden="true">{industryEmojis[slug] ?? "✨"}</span>;
}
