import { notFound } from "next/navigation";
import { Page } from "@/components/Shell";
import { EnglishProductDetail } from "@/components/EnglishMarketing";
import { englishProductPages, type EnglishProductPage } from "@/lib/en-marketing-content";
import { readSiteContent } from "@/lib/site-content";

export function generateStaticParams() { return Object.keys(englishProductPages).map((slug) => ({ slug })); }

function managedDashboardImage(src: string) {
  return src && src !== "/assets/hero-products.webp" ? src : undefined;
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await readSiteContent();
  const page = site.products[slug]?.en as unknown as EnglishProductPage | undefined;
  if (!page) notFound();
  return <Page content={site.global}><EnglishProductDetail page={page} image={managedDashboardImage(site.products[slug].image)} imageAlt={site.products[slug].imageAlt.en} /></Page>;
}
