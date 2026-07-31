"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { industries, slugify } from "@/lib/content";
import { englishIndustryCopy } from "@/lib/en-marketing-content";
import { IndustryIcon } from "@/components/IndustryIcon";
import { getIndustryNavigationGroups } from "@/lib/navigation";

type IndustryItem = { slug: string; name: string; summary: string };
const fallbackItems: IndustryItem[] = industries.map((name) => { const slug = slugify(name); return { slug, name, summary: englishIndustryCopy[slug] ?? "" }; });
const groups = [{ id: "all", label: "All industries", href: "/industries", items: null }, ...getIndustryNavigationGroups("en")];
export function EnglishIndustryExplorer({ items = fallbackItems }: { items?: IndustryItem[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const group = groups.find((item) => item.id === active) ?? groups[0];
  useEffect(() => {
    const syncCategory = () => { const category = window.location.hash.slice(1); setActive(groups.some((item) => item.id === category) ? category : "all"); };
    syncCategory();
    window.addEventListener("hashchange", syncCategory);
    return () => window.removeEventListener("hashchange", syncCategory);
  }, []);
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("en");
    const allowed = group.items ? new Set(group.items.map((item) => item.href.split("/").pop())) : null;
    return items.map((_, index) => index).filter((index) => (!allowed || allowed.has(items[index].slug)) && (!normalized || `${items[index].name} ${items[index].summary}`.toLocaleLowerCase("en").includes(normalized)));
  }, [group.items, items, query]);

  return <div className="ar-industry-explorer">
    <div className="ar-industry-controls"><div className="ar-industry-tabs" role="tablist" aria-label="Filter industries">{groups.map((item) => <button aria-selected={active === item.id} className={active === item.id ? "is-active" : ""} key={item.id} onClick={() => setActive(item.id)} role="tab" type="button">{item.label}</button>)}</div><label className="ar-industry-search"><span className="sr-only">Search industries</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by industry or activity…" /><i aria-hidden="true">⌕</i></label></div>
    {visible.length ? <div className="ar-industry-grid">{visible.map((index) => { const item = items[index]; return <Link href={`/industries/${item.slug}`} key={item.slug}><span className="ar-industry-mark"><IndustryIcon slug={item.slug} /></span><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.name}</h3><p>{item.summary}</p><b>Explore solutions <i aria-hidden="true">→</i></b></Link>; })}</div> : <p className="ar-industry-empty" role="status">No matching industries found. Try another search term.</p>}
  </div>;
}
