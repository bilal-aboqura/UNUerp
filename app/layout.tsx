import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Manrope, Sora } from "next/font/google";
import "./style.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "UNU ERP — One platform for your entire business",
    template: "%s | UNU ERP",
  },
  description: "Run finance, sales, inventory, HR, and customer operations from one connected system.",
  metadataBase: new URL("https://unuerp.com"),
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar" } },
  openGraph: {
    title: "UNU ERP — One platform for your entire business",
    description: "Run finance, sales, inventory, HR, and customer operations from one connected system.",
    type: "website",
  },
};
export const viewport: Viewport = {width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#ffffff"};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${arabic.variable}`}>
        {children}
      </body>
    </html>
  );
}
