import { Page } from "@/components/Shell";
import { EnglishPricingPage } from "@/components/EnglishMarketing";
import { readSiteContent } from "@/lib/site-content";

export default async function Pricing() {
  const site = await readSiteContent();
  return <Page content={site.global}><EnglishPricingPage pricing={site.pricing.en} pageContent={site.pages.pricing.en} /></Page>;
}
