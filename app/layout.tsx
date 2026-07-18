import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Manrope, Sora } from "next/font/google";
import { readSiteContent } from "@/lib/site-content";
import "./style.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const content = await readSiteContent();
  const seo = content.global.seo.en;
  return {
    title: { default: seo.title, template: `%s | ${content.global.siteName}` },
    description: seo.description,
    metadataBase: new URL("https://unuerp.com"),
    alternates: { canonical: "/", languages: { en: "/", ar: "/ar" } },
    openGraph: { title: seo.title, description: seo.description, type: "website" },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth"><body className={`${display.variable} ${body.variable} ${arabic.variable}`}>{children}</body></html>;
}
