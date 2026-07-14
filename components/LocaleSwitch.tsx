"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/components/Shell";

export function LocaleSwitch({
  locale,
  className,
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const arabic = locale === "ar";
  const englishPath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const href = arabic
    ? englishPath
    : pathname === "/"
      ? "/ar"
      : `/ar${pathname}`;
  return (
    <Link
      className={className}
      href={href}
      hrefLang={arabic ? "en" : "ar"}
      lang={arabic ? "en" : "ar"}
      onClick={onNavigate}
    >
      {arabic ? "English" : "العربية"}
    </Link>
  );
}
