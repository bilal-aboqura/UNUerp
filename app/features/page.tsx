import { FeatureGroups } from "@/components/FeatureGroups";
import { Page } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { readSiteContent } from "@/lib/site-content";

export default async function Features() {
  const site = await readSiteContent();
  const page = site.pages.features.en;

  return (
    <Page content={site.global}>
      <PageHero variant="features" signal={page.signal} title={page.title} intro={page.intro} mediaSrc={site.media.featuresHero} cta={{ label: page.cta ?? "Book a tailored demo", href: "/contact" }} />
      <section className="section"><FeatureGroups items={Object.entries(site.features).filter(([, item]) => item.published).map(([slug, item]) => ({ slug, name: item.en.name, intro: item.en.intro, icon: item.icon, section: item.section, order: item.order }))} /></section>
    </Page>
  );
}
