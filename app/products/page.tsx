import { Page } from "@/components/Shell";
import { EnglishProductsPage } from "@/components/EnglishMarketing";
import { readSiteContent } from "@/lib/site-content";

export default async function Products() {
  const site = await readSiteContent();
  const catalog = Object.values(site.products).map((item) => item.catalog.en) as unknown as { slug: string; name: string; tag: string; title: string; text: string; items: string[] }[];
  return <Page content={site.global}><EnglishProductsPage catalog={catalog} pageContent={site.pages.products.en} /></Page>;
}
