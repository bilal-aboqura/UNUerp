"use client";

import Link from "next/link";
import { useState } from "react";
import { FeatureIcon } from "@/components/FeatureIcon";
import type { FeatureSection } from "@/lib/site-content";

type FeatureItem = {
  slug: string;
  name: string;
  intro: string;
  icon: string;
  section: FeatureSection;
  order: number;
};

const groupCopy = {
  en: {
    business: { title: "Everything You Need to Manage Your Business", intro: "Core capabilities share one operational source of truth." },
    specialized: { title: "Specialized Solutions Built on the Same Platform", intro: "Extend the platform around distinct workflows without fragmenting your data." },
    explore: "Explore",
    more: "Show More",
  },
  ar: {
    business: { title: "كل ما تحتاجه لإدارة أعمالك", intro: "قدرات أساسية تعمل معاً ضمن مصدر تشغيلي واحد للبيانات." },
    specialized: { title: "حلول متخصصة تعمل على نفس المنصة", intro: "وسّع المنصة لتناسب إجراءات متخصصة مع الحفاظ على ترابط بياناتك." },
    explore: "استكشف",
    more: "عرض المزيد",
  },
};

const initialVisible = 4;

function FeatureGroup({ section, items, locale }: { section: FeatureSection; items: FeatureItem[]; locale: "en" | "ar" }) {
  const [expanded, setExpanded] = useState(false);
  const copy = groupCopy[locale];
  const visible = expanded ? items : items.slice(0, initialVisible);
  if (!items.length) return null;
  const listId = `feature-group-${section}-${locale}`;

  return (
    <section className="feature-group" aria-labelledby={`${listId}-title`}>
      <header className="feature-group-heading">
        <div><h2 id={`${listId}-title`}>{copy[section].title}</h2><p>{copy[section].intro}</p></div>
        <span>{String(items.length).padStart(2, "0")}</span>
      </header>
      <div className="content-index feature-group-grid" id={listId}>
        {visible.map((item, index) => (
          <Link className={index >= initialVisible ? "is-revealed" : ""} href={`${locale === "ar" ? "/ar" : ""}/features/${item.slug}`} key={item.slug}>
            <FeatureIcon icon={item.icon} />
            <h3>{item.name}</h3>
            <p>{item.intro}</p>
            <b>{copy.explore} {item.name}<i aria-hidden="true">{locale === "ar" ? "←" : "→"}</i></b>
          </Link>
        ))}
      </div>
      {!expanded && items.length > initialVisible ? (
        <button className="feature-show-more" type="button" aria-expanded="false" aria-controls={listId} onClick={() => setExpanded(true)}>
          {copy.more}<span aria-hidden="true">↓</span>
        </button>
      ) : null}
    </section>
  );
}

export function FeatureGroups({ items, locale = "en" }: { items: FeatureItem[]; locale?: "en" | "ar" }) {
  const ordered = [...items].sort((a, b) => a.order - b.order);
  return (
    <div className="wrap feature-groups">
      <FeatureGroup section="business" items={ordered.filter((item) => item.section === "business")} locale={locale} />
      <FeatureGroup section="specialized" items={ordered.filter((item) => item.section === "specialized")} locale={locale} />
    </div>
  );
}
