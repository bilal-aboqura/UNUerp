import Link from "next/link";
import Image from "next/image";
import { nav } from "@/lib/content";
import { MobileMenu } from "@/components/MobileMenu";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { NavLinks } from "@/components/NavLinks";
import { SiteMotion } from "@/components/SiteMotion";
export type Locale = "en" | "ar";
const arNav = [
  { label: "المزايا", href: "/ar/features" },
  { label: "المنتجات", href: "/ar/products" },
  { label: "القطاعات", href: "/ar/industries" },
  { label: "الأسعار", href: "/ar/pricing" },
];
export function Header({ locale = "en" }: { locale?: Locale }) {
  const arabic = locale === "ar",
    items = arabic ? arNav : nav;
  return (
    <header className="navbar" id="navbar">
      <div className="nav nav-inner wrap">
        <Link
          className="brand nav-logo"
          href={arabic ? "/ar" : "/"}
          aria-label={arabic ? "الرئيسية — UNU ERP" : "UNU ERP home"}
        >
          <Image src="/assets/unu-logo.png" alt="" width={187} height={99} priority />
        </Link>
        <NavLinks items={items} label={arabic ? "التنقل الرئيسي" : "Primary navigation"} />
        <div className="nav-actions">
          <LocaleSwitch className="lang" locale={locale} />
          <Link
            className="button small nav-cta"
            href={arabic ? "/ar/contact" : "/contact"}
          >
            {arabic ? "اطلب عرضًا" : "Book a demo"}
          </Link>
        </div>
        <MobileMenu locale={locale} />
      </div>
    </header>
  );
}
export function Footer({ locale = "en" }: { locale?: Locale }) {
  const arabic = locale === "ar";
  return (
    <footer>
      <div className="wrap foot">
        <div className="footer-brand">
          <div className="brand light">
            <Image src="/assets/unu-logo.png" alt="UNU ERP" width={187} height={99} />
          </div>
          <p>
            {arabic
              ? "حلول ذكية ومترابطة ومفتوحة المصدر تساعد الشركات على إدارة عملياتها بوضوح وكفاءة أكبر."
              : "Intelligent, connected, open-source business management for growing enterprises."}
          </p>
          <span className="footer-trust"><i />{arabic ? "منصة مرنة. بيانات تحت تحكمك." : "One flexible platform. Your data under your control."}</span>
        </div>
        <div className="footer-links">
          <strong>{arabic ? "استكشف" : "Explore"}</strong>
          {(arabic ? arNav : nav).map((x) => (
            <Link key={x.href} href={x.href}>
              {x.label}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <strong>{arabic ? "ابدأ" : "Get started"}</strong>
          <Link href={arabic ? "/ar/contact" : "/contact"}>{arabic ? "اطلب عرضًا" : "Book a demo"}</Link>
          <Link href={arabic ? "/ar/contact" : "/contact"}>{arabic ? "تواصل معنا" : "Contact us"}</Link>
          <Link href={arabic ? "/ar#faq" : "/#faq"}>{arabic ? "الأسئلة الشائعة" : "Frequently asked questions"}</Link>
          <LocaleSwitch locale={locale} />
        </div>
        <div className="footer-links footer-contact">
          <strong>{arabic ? "تواصل معنا" : "Contact"}</strong>
          <a href="mailto:info@unuerp.com">info@unuerp.com</a>
          <a href="tel:+966112248822">+966 11 224 8822</a>
          <span>
            {arabic
              ? "الرياض، المملكة العربية السعودية"
              : "Riyadh, Saudi Arabia"}
          </span>
        </div>
      </div>
      <div className="wrap legal">
        <span>© 2026 UNU ERP</span>
        <span>
          {arabic
            ? "صُمم للشركات التي تشكل مستقبل المملكة العربية السعودية."
            : "Built for businesses shaping Saudi Arabia’s future."}
        </span>
      </div>
    </footer>
  );
}
export function Page({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const arabic = locale === "ar";
  return (
    <div
      className={arabic ? "locale-ar" : undefined}
      lang={locale}
      dir={arabic ? "rtl" : "ltr"}
    >
      <SiteMotion />
      <a className="skip-link" href="#main-content">
        {arabic ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
