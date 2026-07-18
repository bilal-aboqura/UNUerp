import { notFound } from "next/navigation";
import Link from "next/link";
import { Page } from "@/components/Shell";
import { featureDetails } from "@/lib/content";
import { DetailVisual } from "@/components/ProductVisuals";
import { readSiteContent } from "@/lib/site-content";

export function generateStaticParams() { return Object.keys(featureDetails).map((slug) => ({ slug })); }

export default async function Feature({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await readSiteContent();
  const item = site.features[slug]?.en;
  if (!item) notFound();
  return (
    <Page content={site.global}>
      <section className="detail-hero"><div className="wrap detail-grid"><div><span className="signal">UNU ERP · {item.name}</span><h1>{item.headline}</h1><p>{item.intro}</p><Link className="button" href="/contact">Book a {item.name} demo</Link></div><DetailVisual label={item.name} /></div></section>
      <section className="section"><div className="wrap detail-copy"><div><span className="signal">One operational picture</span><h2>Make {item.name.toLowerCase()} part of the same operational picture.</h2><p>{item.intro} Keep related customers, transactions, people, and reports connected—so your team spends less time re-entering information and waiting for updates.</p></div><div className="benefit-list">{item.benefits.map((benefit, index) => <article key={benefit}><span>0{index + 1}</span><h3>{benefit}</h3><p>Set this capability up around your approval rules, roles, and reporting needs.</p></article>)}</div></div></section>
    </Page>
  );
}
