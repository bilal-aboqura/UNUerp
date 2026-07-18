import { notFound } from "next/navigation";
import Link from "next/link";
import { Page } from "@/components/Shell";
import { EnglishCta } from "@/components/EnglishMarketing";
import { industryDetails } from "@/lib/content";
import { DetailVisual } from "@/components/ProductVisuals";
import { readSiteContent } from "@/lib/site-content";

export function generateStaticParams() { return Object.keys(industryDetails).map((slug) => ({ slug })); }
export default async function Industry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await readSiteContent();
  const item = site.industries[slug]?.en;
  if (!item) notFound();
  return <Page content={site.global}>
    <section className="detail-hero industry-hero"><div className="wrap detail-grid"><div><span className="signal">UNU industry solutions</span><h1>{item.headline}</h1><p>{item.summary}</p><Link className="button" href="/contact">Book an industry consultation <span aria-hidden="true">↗</span></Link></div><DetailVisual label={item.name} kind="industry" /></div></section>
    <section className="section ar-industry-detail"><div className="wrap"><header className="ar-section-head"><div><span>Connected operations</span><h2>Bring essential processes around one source of operational truth</h2></div><p>{item.intro[1]}</p></header><div className="ar-capability-list">{[["Understand the challenge", item.intro[0]], ["Configure the solution", item.intro[1]], ["Connect the teams", item.intro[2]], ["Expand with confidence", "Add branches, modules, or integrations as the operation grows."]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <EnglishCta title={`Build the right starting point for ${item.name}`} text="Share your current operating challenges and we’ll propose a clear scope for the walkthrough and implementation." />
  </Page>;
}
