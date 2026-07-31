"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getNavigationChildren,
  type NavigationLocale,
} from "@/lib/navigation";

export function NavLinks({
  items,
  label,
  locale = "en",
}: {
  items: readonly { label: string; href: string }[];
  label: string;
  locale?: NavigationLocale;
}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const hoveredMenu = useRef<string | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [openMenu]);

  const closeMenu = () => {
    hoveredMenu.current = null;
    setOpenMenu(null);
  };

  return (
    <nav ref={navigationRef} aria-label={label}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const children = getNavigationChildren(item.href, locale);

        if (!children) {
          return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
        }

        const menuId = `${locale}-${item.href.replace(/[^a-z0-9]+/gi, "-")}-menu`;
        const isOpen = openMenu === item.href;

        return (
          <div
            className={`nav-dropdown${active ? " is-active" : ""}${isOpen ? " is-open" : ""}`}
            key={item.href}
            onMouseEnter={() => { hoveredMenu.current = item.href; setOpenMenu(item.href); }}
            onMouseLeave={() => { hoveredMenu.current = null; setOpenMenu(null); }}
            onFocus={() => setOpenMenu(item.href)}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null); }}
          >
            <div className="nav-dropdown-trigger">
              <Link href={item.href} aria-current={active ? "page" : undefined} onClick={closeMenu}>{item.label}</Link>
              <button
                type="button"
                aria-label={locale === "ar" ? `فتح قائمة ${item.label}` : `Open ${item.label} menu`}
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => setOpenMenu((current) => current === item.href && hoveredMenu.current !== item.href ? null : item.href)}
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>

            <ul id={menuId} className="nav-dropdown-menu">
              {children.map((child, index) => <li className={index === 0 ? "nav-dropdown-overview" : undefined} key={child.href}><Link href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={closeMenu}><span>{child.label}</span><span aria-hidden="true">→</span></Link></li>)}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
