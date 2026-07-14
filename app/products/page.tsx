import { Page } from "@/components/Shell";
import { EnglishProducts } from "@/components/ArabicCatalogs";
import { PageHero } from "@/components/PageHero";
export default function Products() {
  return (
    <Page>
      <PageHero variant="products" signal="Our products" title="Specialized systems. One UNU philosophy." intro="Extend connected operations into finance, communication, healthcare, customer flow and retail." cta={{ label: "Talk to a product expert", href: "/contact" }} />
      <section className="section ar-catalog-section">
        <div className="wrap">
          <EnglishProducts />
        </div>
      </section>
    </Page>
  );
}
