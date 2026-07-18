import { Page } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { EnglishCta } from "@/components/EnglishMarketing";
import { EnglishIndustryExplorer } from "@/components/EnglishIndustryExplorer";
import { readSiteContent } from "@/lib/site-content";

export default async function Industries() {
  const site = await readSiteContent();
  const page = site.pages.industries.en;
  const items = Object.entries(site.industries).map(([slug, item]) => ({ slug, name: item.en.name, summary: item.en.summary }));
  return <Page content={site.global}>
    <PageHero variant="industries" signal={page.signal} title={page.title} intro={page.intro} mediaSrc={site.media.industriesHero} cta={{ label: page.cta ?? "Book a consultation", href: "/contact" }} />
    <section className="section ar-industries-section"><div className="wrap"><header className="ar-section-head"><div><span>Choose your industry</span><h2>Start with how your operation works, not a generic module list</h2></div><p>Search for your activity or use the categories to find the challenges and solutions closest to your organization.</p></header><EnglishIndustryExplorer items={items} /></div></section>
    <section className="section ar-industry-value"><div className="wrap ar-industry-value-grid"><div><span>Why UNU industry solutions?</span><h2>One technical foundation, configured for real operations</h2></div><div>{["Configurable workflows", "Multi-branch support", "Flexible hosting options", "Live reporting", "Role-based permissions", "Project-scoped integrations"].map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}</div></div></section>
    <section className="section ar-sector-process"><div className="wrap"><header className="ar-section-head compact"><div><span>What we bring to each sector</span><h2>From understanding the need to operating the platform</h2></div></header><ol className="ar-workflow">{["Requirements analysis", "System configuration", "Data connection", "Training", "Launch", "Ongoing support"].map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol></div></section>
    <EnglishCta title="Looking for a system that fits your sector?" text="Let UNU specialists help you choose the right starting point for the way your organization works." />
  </Page>;
}
