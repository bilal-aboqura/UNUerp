import { notFound } from "next/navigation";
import Link from "next/link";
import { Page } from "@/components/Shell";
import { industryDetails } from "@/lib/content";
import { DetailVisual } from "@/components/ProductVisuals";
export function generateStaticParams() {
  return Object.keys(industryDetails).map((slug) => ({ slug }));
}
export default async function Industry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = industryDetails[slug];
  if (!item) notFound();
  return (
    <Page>
      <section className="detail-hero">
        <div className="wrap detail-grid">
          <div>
            <span className="signal">Industry solution</span>
            <h1>{item.headline}</h1>
            <p>{item.intro[0]}</p>
            <Link className="button" href="/contact">
              Book an industry demo
            </Link>
          </div>
          <DetailVisual label={item.name} kind="industry" />
        </div>
      </section>
      <section className="section">
        <div className="wrap detail-copy">
          <div>
            <h2>Designed around how your industry works.</h2>
            <p>
              {item.intro[1]} {item.intro[2]}
            </p>
          </div>
          <div className="benefit-list">
            {[
              "One current operating picture",
              "Workflows configured to your reality",
              "Real-time visibility across teams",
            ].map((x, i) => (
              <article key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>
                  A connected operational capability shaped around{" "}
                  {item.name.toLowerCase()} teams.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
