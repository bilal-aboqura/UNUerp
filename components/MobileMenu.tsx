"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import type { Locale } from "@/components/Shell";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { getIndustryNavigationGroups, getNavigationChildren } from "@/lib/navigation";

const arabicNav = [
  { label: "المزايا", href: "/ar/features" },
  { label: "المنتجات", href: "/ar/products" },
  { label: "القطاعات", href: "/ar/industries" },
  { label: "الحلول والأسعار", href: "/ar/pricing" },
];

export function MobileMenu({ locale = "en", items: providedItems, ctaLabel }: { locale?: Locale; items?: readonly { label: string; href: string }[]; ctaLabel?: string }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const arabic = locale === "ar";
  const items = providedItems ?? (arabic ? arabicNav : nav);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    navigationRef.current?.querySelector<HTMLElement>("a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">{open ? (arabic ? "إغلاق القائمة" : "Close navigation") : (arabic ? "فتح القائمة" : "Open navigation")}</span>
        <span className="hamburger-lines" aria-hidden="true"><i /><i /></span>
      </button>
      {open ? <>
        <button className="menu-backdrop" type="button" aria-label={arabic ? "إغلاق القائمة" : "Close navigation"} onClick={() => setOpen(false)} />
        <nav ref={navigationRef} id="mobile-navigation" aria-label={arabic ? "التنقل عبر الجوال" : "Mobile navigation"}>
          <div className="mobile-menu-head"><span>UNU ERP</span><small>{arabic ? "منصة أعمال مترابطة" : "Connected business platform"}</small></div>
          {items.map((item) => {
            const children = getNavigationChildren(item.href, locale);
            if (!children) return <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">{arabic ? "←" : "→"}</span></Link>;

            const isDropdownOpen = openDropdown === item.href;
            const submenuId = `mobile-${locale}-${item.href.replace(/[^a-z0-9]+/gi, "-")}-menu`;
            const groups = item.href.endsWith("/industries") ? getIndustryNavigationGroups(locale) : null;
            return (
              <div className="mobile-nav-group" key={item.href}>
                <div className="mobile-nav-row">
                  <Link href={item.href} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">{arabic ? "←" : "→"}</span></Link>
                  <button type="button" aria-label={arabic ? `فتح قائمة ${item.label}` : `Open ${item.label} menu`} aria-expanded={isDropdownOpen} aria-controls={submenuId} onClick={() => setOpenDropdown(isDropdownOpen ? null : item.href)}><span aria-hidden="true">⌄</span></button>
                </div>
                {isDropdownOpen && groups ? (
                  <div id={submenuId} className="mobile-nav-submenu mobile-nav-submenu-groups">
                    <Link className="mobile-nav-all" href={children[0].href} onClick={() => setOpen(false)}>{children[0].label}<span aria-hidden="true">{arabic ? "←" : "→"}</span></Link>
                    {groups.map((group) => <section key={group.label}><strong>{group.label}</strong><ul>{group.items.map((child) => <li key={child.href}><Link href={child.href} onClick={() => setOpen(false)}>{child.label}<span aria-hidden="true">{arabic ? "←" : "→"}</span></Link></li>)}</ul></section>)}
                  </div>
                ) : isDropdownOpen ? (
                  <ul id={submenuId} className="mobile-nav-submenu">{children.map((child) => <li key={child.href}><Link href={child.href} onClick={() => setOpen(false)}>{child.label}<span aria-hidden="true">{arabic ? "←" : "→"}</span></Link></li>)}</ul>
                ) : null}
              </div>
            );
          })}
          <LocaleSwitch locale={locale} onNavigate={() => setOpen(false)} />
          <Link className="button" href={arabic ? "/ar/contact" : "/contact"} onClick={() => setOpen(false)}>{ctaLabel ?? (arabic ? "اطلب عرضاً مخصصاً" : "Book a tailored demo")}</Link>
        </nav>
      </> : null}
    </div>
  );
}
