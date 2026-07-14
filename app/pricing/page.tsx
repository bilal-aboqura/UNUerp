import { Page } from "@/components/Shell";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
export default function Pricing() {
  return (
    <Page>
      <PageHero variant="pricing" signal="Pricing shaped around your operation" title="Pay for the scope your operation needs—not a fixed seat tier." intro="Your quote reflects the modules, rollout work, and support your team actually needs." cta={{ label: "Request a tailored quote", href: "/contact" }} />
      <section className="section">
        <div className="wrap quote-grid">
          <div>
            <h2>What we consider when we prepare a quote</h2>
            <ul>
              <li>The modules and workflows you need</li>
              <li>Your users, locations, and legal entities</li>
              <li>Data migration and integrations</li>
              <li>Cloud or private deployment</li>
              <li>Training and ongoing support</li>
            </ul>
          </div>
          <aside>
            <span className="signal">Talk through your needs</span>
            <h2>Get a tailored quote</h2>
            <p>
              Tell us how your operation works. We’ll recommend a practical
              starting scope without unnecessary modules.
            </p>
            <Link className="button" href="/contact">
              Talk to an ERP specialist
            </Link>
          </aside>
        </div>
      </section>
    </Page>
  );
}
