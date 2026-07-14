"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import type { Locale } from "@/components/Shell";
import { LocaleSwitch } from "@/components/LocaleSwitch";

export function MobileMenu({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const arabic = locale === "ar";
  const items = arabic
    ? [
        { label: "المزايا", href: "/ar/features" },
        { label: "المنتجات", href: "/ar/products" },
        { label: "القطاعات", href: "/ar/industries" },
        { label: "الأسعار", href: "/ar/pricing" },
      ]
    : nav;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = navigationRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
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
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">
          {open
            ? arabic
              ? "إغلاق القائمة"
              : "Close navigation"
            : arabic
              ? "فتح القائمة"
              : "Open navigation"}
        </span>
        <span className="hamburger-lines" aria-hidden="true"><i /><i /></span>
      </button>
      {open && (
        <>
          <button className="menu-backdrop" type="button" aria-label={arabic ? "إغلاق القائمة" : "Close navigation"} onClick={() => setOpen(false)} />
          <nav ref={navigationRef} id="mobile-navigation" aria-label={arabic ? "التنقل عبر الجوال" : "Mobile navigation"}>
            <div className="mobile-menu-head"><span>UNU ERP</span><small>{arabic ? "منصة أعمال مترابطة" : "Connected business platform"}</small></div>
            {items.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">{arabic ? "←" : "→"}</span></Link>
            ))}
            <LocaleSwitch locale={locale} onNavigate={() => setOpen(false)} />
            <Link className="button" href={arabic ? "/ar/contact" : "/contact"} onClick={() => setOpen(false)}>{arabic ? "اطلب عرضاً مخصصاً" : "Book a tailored demo"}</Link>
          </nav>
        </>
      )}
    </div>
  );
}
