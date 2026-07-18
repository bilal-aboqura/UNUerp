"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { industries, slugify } from "@/lib/content";
import { arIndustries } from "@/lib/ar-content";
import { arabicIndustryCopy } from "@/lib/ar-marketing-content";

type IndustryItem = { slug: string; name: string; summary: string };
const fallbackItems = industries.map((name, index) => { const slug = slugify(name); return { slug, name: arIndustries[index], summary: arabicIndustryCopy[slug] ?? "" }; });
const groups = [
  { id: "all", label: "جميع القطاعات", indexes: industries.map((_, index) => index) },
  { id: "commerce", label: "التجارة والتجزئة", indexes: [1, 2, 3, 4, 8, 20] },
  { id: "industry", label: "الصناعة واللوجستيات", indexes: [0, 5, 10, 11] },
  { id: "services", label: "الخدمات والقطاع المؤسسي", indexes: [6, 7, 9, 15, 16, 17, 18] },
  { id: "experience", label: "الضيافة والمحتوى", indexes: [12, 13, 14, 19] },
];
const marks = ["◆", "◫", "⌁", "✦"];

export function ArabicIndustryExplorer({ items = fallbackItems }: { items?: IndustryItem[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const group = groups.find((item) => item.id === active) ?? groups[0];
  const visible = useMemo(() => { const normalized = query.trim().toLocaleLowerCase("ar"); return group.indexes.filter((index) => items[index] && (!normalized || `${items[index].name} ${items[index].summary}`.toLocaleLowerCase("ar").includes(normalized))); }, [group.indexes, items, query]);
  return <div className="ar-industry-explorer"><div className="ar-industry-controls"><div className="ar-industry-tabs" role="tablist" aria-label="تصفية القطاعات">{groups.map((item) => <button aria-selected={active === item.id} className={active === item.id ? "is-active" : ""} key={item.id} onClick={() => setActive(item.id)} role="tab" type="button">{item.label}</button>)}</div><label className="ar-industry-search"><span className="sr-only">ابحث عن قطاع</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن قطاع أو نشاط…" /><i aria-hidden="true">⌕</i></label></div>{visible.length ? <div className="ar-industry-grid">{visible.map((index) => { const item = items[index]; return <Link href={`/ar/industries/${item.slug}`} key={item.slug}><span className="ar-industry-mark" aria-hidden="true">{marks[index % marks.length]}</span><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.name}</h3><p>{item.summary}</p><b>استكشف الحلول <i aria-hidden="true">←</i></b></Link>; })}</div> : <p className="ar-industry-empty" role="status">لا توجد نتائج مطابقة. جرّب كلمة بحث أخرى.</p>}</div>;
}
