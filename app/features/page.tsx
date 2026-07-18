import Link from "next/link";
import { Page } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { readSiteContent } from "@/lib/site-content";

export default async function Features() {
  const site = await readSiteContent();
  const page = site.pages.features.en;
  return (
    <Page content={site.global}>
      <PageHero variant="features" signal={page.signal} title={page.title} intro={page.intro} mediaSrc={site.media.featuresHero} cta={{ label: page.cta ?? "Book a tailored demo", href: "/contact" }} />
      <section className="section"><div className="wrap content-index">
        {Object.entries(site.features).map(([slug, item], index) => (
          <Link href={`/features/${slug}`} key={slug}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.en.name}</h2><p>{item.en.intro}</p><b>Explore {item.en.name}<i aria-hidden="true">→</i></b></Link>
        ))}
      </div></section>
    </Page>
  );
}
