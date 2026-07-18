import Link from "next/link";
import Image from "next/image";
import { nav } from "@/lib/content";
import { MobileMenu } from "@/components/MobileMenu";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { NavLinks } from "@/components/NavLinks";
import { SiteMotion } from "@/components/SiteMotion";
import type { SiteContent } from "@/lib/site-content";

export type Locale = "en" | "ar";

const arNav = [
  { label: "المزايا", href: "/ar/features" },
  { label: "المنتجات", href: "/ar/products" },
  { label: "القطاعات", href: "/ar/industries" },
  { label: "الحلول والأسعار", href: "/ar/pricing" },
];

export function Header({ locale = "en", content }: { locale?: Locale; content?: SiteContent["global"] }) {
  const arabic = locale === "ar";
  const items = content?.navigation[locale] ?? (arabic ? arNav : nav);
  return (
    <header className="navbar" id="navbar">
      <div className="nav nav-inner wrap">
        <Link className="brand nav-logo" href={arabic ? "/ar" : "/"} aria-label={arabic ? "الرئيسية — UNU ERP" : "UNU ERP home"}>
          <Image src={content?.logo.src ?? "/assets/unu-logo.png"} alt="" width={187} height={99} priority />
        </Link>
        <NavLinks items={items} label={arabic ? "التنقل الرئيسي" : "Primary navigation"} />
        <div className="nav-actions">
          <LocaleSwitch className="lang" locale={locale} />
          <Link className="button small nav-cta" href={arabic ? "/ar/contact" : "/contact"}>{content?.cta[locale] ?? (arabic ? "اطلب عرضاً" : "Book a demo")}</Link>
        </div>
        <MobileMenu locale={locale} items={items} ctaLabel={content?.cta[locale]} />
      </div>
    </header>
  );
}

export function Footer({ locale = "en", content }: { locale?: Locale; content?: SiteContent["global"] }) {
  const arabic = locale === "ar";
  const footer = content?.footer[locale];
  const contact = content?.contact;
  const items = content?.navigation[locale] ?? (arabic ? arNav : nav);
  return (
    <footer>
      <div className="wrap foot">
        <div className="footer-brand">
          <div className="brand light"><Image src={content?.logo.src ?? "/assets/unu-logo.png"} alt={content?.logo.alt ?? "UNU ERP"} width={187} height={99} /></div>
          <p>{footer?.tagline ?? (arabic ? "حلول ذكية ومترابطة ومفتوحة المصدر تساعد الشركات على إدارة عملياتها بوضوح وكفاءة أكبر." : "Intelligent, connected, open-source business management for growing enterprises.")}</p>
          <span className="footer-trust"><i />{footer?.trust ?? (arabic ? "منصة مرنة. بيانات تحت تحكمك." : "One flexible platform. Your data under your control.")}</span>
        </div>
        <div className="footer-links">
          <strong>{arabic ? "استكشف" : "Explore"}</strong>
          {items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div className="footer-links">
          <strong>{arabic ? "ابدأ" : "Get started"}</strong>
          <Link href={arabic ? "/ar/contact" : "/contact"}>{content?.cta[locale] ?? (arabic ? "اطلب عرضاً" : "Book a demo")}</Link>
          <Link href={arabic ? "/ar/contact" : "/contact"}>{arabic ? "تواصل معنا" : "Contact us"}</Link>
          <Link href={arabic ? "/ar#faq" : "/#faq"}>{arabic ? "الأسئلة الشائعة" : "Frequently asked questions"}</Link>
          <LocaleSwitch locale={locale} />
        </div>
        <div className="footer-links footer-contact">
          <strong>{arabic ? "تواصل معنا" : "Contact"}</strong>
          <a href={`mailto:${contact?.email ?? "info@unuerp.com"}`}>{contact?.email ?? "info@unuerp.com"}</a>
          <a href={`tel:${(contact?.phone ?? "+966112248822").replace(/\s/g, "")}`}>{contact?.phone ?? "+966 11 224 8822"}</a>
          <span>{contact?.address[locale] ?? (arabic ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia")}</span>
        </div>
      </div>
      <div className="wrap legal"><span>© 2026 UNU ERP</span><span>{footer?.legal ?? (arabic ? "صُمم للشركات التي تشكل مستقبل المملكة العربية السعودية." : "Built for businesses shaping Saudi Arabia’s future.")}</span></div>
    </footer>
  );
}

export function Page({ children, locale = "en", content }: { children: React.ReactNode; locale?: Locale; content?: SiteContent["global"] }) {
  const arabic = locale === "ar";
  return (
    <div className={arabic ? "locale-ar" : "locale-en"} lang={locale} dir={arabic ? "rtl" : "ltr"}>
      <SiteMotion />
      <a className="skip-link" href="#main-content">{arabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <Header locale={locale} content={content} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} content={content} />
    </div>
  );
}
