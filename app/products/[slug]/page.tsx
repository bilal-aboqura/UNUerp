import { notFound } from "next/navigation";
import Link from "next/link";
import { Page } from "@/components/Shell";
import { productDetails } from "@/lib/content";
import { DetailVisual } from "@/components/ProductVisuals";
export function generateStaticParams() {
  return Object.keys(productDetails).map((slug) => ({ slug }));
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = productDetails[slug];
  if (!item) notFound();
  return (
    <Page>
      <section className="detail-hero product-hero">
        <div className="wrap detail-grid">
          <div>
            <span className="signal">UNU product suite</span>
            <h1>{item.headline}</h1>
            <p>{item.intro}</p>
            <Link className="button" href="/contact">
              Request a product demo
            </Link>
          </div>
          <DetailVisual label={item.name} kind="product" />
        </div>
      </section>
      <section className="section">
        <div className="wrap detail-copy">
          <div>
            <h2>Built around the way your operation works.</h2>
            <p>
              {item.intro} Connect every relevant team and data point without
              adding another disconnected system.
            </p>
          </div>
          <div className="benefit-list">
            {item.capabilities.slice(0, 3).map((x, i) => (
              <article key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>
                  A connected capability with clear ownership and reporting for
                  confident decisions.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
