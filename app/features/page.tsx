import Link from "next/link";
import { Page } from "@/components/Shell";
import { featureDetails } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
export default function Features() {
  return (
    <Page>
      <PageHero variant="features" signal="UNU ERP features" title="One connected platform for the work that runs your business." intro="Explore every core capability—from customer relationships and sales to finance, people, inventory and custom workflows." cta={{ label: "Book a tailored demo", href: "/contact" }} />
      <section className="section">
        <div className="wrap content-index">
          {Object.entries(featureDetails).map(([slug, item], i) => (
            <Link href={`/features/${slug}`} key={slug}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h2>{item.name}</h2>
              <p>{item.intro}</p>
              <b>
                Explore {item.name}
                <i aria-hidden="true">→</i>
              </b>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
