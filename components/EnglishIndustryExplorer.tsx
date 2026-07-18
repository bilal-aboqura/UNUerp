"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { industries, slugify } from "@/lib/content";
import { englishIndustryCopy } from "@/lib/en-marketing-content";

type IndustryItem = { slug: string; name: string; summary: string };
const fallbackItems: IndustryItem[] = industries.map((name) => { const slug = slugify(name); return { slug, name, summary: englishIndustryCopy[slug] ?? "" }; });
const groups = [
  { id: "all", label: "All industries", indexes: industries.map((_, index) => index) },
  { id: "commerce", label: "Commerce & retail", indexes: [1, 2, 3, 4, 8, 20] },
  { id: "industry", label: "Industry & logistics", indexes: [0, 5, 10, 11] },
  { id: "services", label: "Services & institutions", indexes: [6, 7, 9, 15, 16, 17, 18] },
  { id: "experience", label: "Hospitality & content", indexes: [12, 13, 14, 19] },
];
const marks = ["◆", "◫", "⌁", "✦"];

export function EnglishIndustryExplorer({ items = fallbackItems }: { items?: IndustryItem[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const group = groups.find((item) => item.id === active) ?? groups[0];
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("en");
    return group.indexes.filter((index) => items[index] && (!normalized || `${items[index].name} ${items[index].summary}`.toLocaleLowerCase("en").includes(normalized)));
  }, [group.indexes, items, query]);

  return <div className="ar-industry-explorer">
    <div className="ar-industry-controls"><div className="ar-industry-tabs" role="tablist" aria-label="Filter industries">{groups.map((item) => <button aria-selected={active === item.id} className={active === item.id ? "is-active" : ""} key={item.id} onClick={() => setActive(item.id)} role="tab" type="button">{item.label}</button>)}</div><label className="ar-industry-search"><span className="sr-only">Search industries</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by industry or activity…" /><i aria-hidden="true">⌕</i></label></div>
    {visible.length ? <div className="ar-industry-grid">{visible.map((index) => { const item = items[index]; return <Link href={`/industries/${item.slug}`} key={item.slug}><span className="ar-industry-mark" aria-hidden="true">{marks[index % marks.length]}</span><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.name}</h3><p>{item.summary}</p><b>Explore solutions <i aria-hidden="true">→</i></b></Link>; })}</div> : <p className="ar-industry-empty" role="status">No matching industries found. Try another search term.</p>}
  </div>;
}
