import { Page } from "@/components/Shell";
import { industries, slugify } from "@/lib/content";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
export default function Industries() {
  return (
    <Page>
      <PageHero variant="industries" signal="Industry solutions" title="One platform. Configured for your reality." intro="UNU ERP adapts finance, people, inventory and customer workflows to the operating demands of your sector." cta={{ label: "Discuss your industry", href: "/contact" }} />
      <section className="section">
        <div className="wrap content-index">
          {industries.map((x, i) => (
            <Link href={`/industries/${slugify(x)}`} key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h2>{x}</h2>
              <p>
                Connect planning, execution and reporting for {x.toLowerCase()}{" "}
                teams in one open system.
              </p>
              <b>
                Explore {x}
                <i aria-hidden="true">→</i>
              </b>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap cta compact">
        <h2>Don’t see your exact workflow?</h2>
        <Link className="button light-button" href="/contact">
          Design it with us
        </Link>
      </section>
    </Page>
  );
}
