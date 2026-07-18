import Image from "next/image";
/* eslint-disable @next/next/no-img-element -- Product media is administrator-managed in Supabase storage. */
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import {
  englishProductCatalog,
  type EnglishProductPage,
} from "@/lib/en-marketing-content";

const Arrow = () => <span aria-hidden="true">↗</span>;

export function EnglishProductDashboard({
  content,
  compact = false,
  image,
  imageAlt,
}: {
  content: EnglishProductPage["dashboard"];
  compact?: boolean;
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <div className={`ar-dashboard is-image ${compact ? "is-compact" : ""}`}>
        <img src={image} alt={imageAlt ?? `${content.label} software interface`} />
      </div>
    );
  }

  return (
    <div
      className={`ar-dashboard ${compact ? "is-compact" : ""}`}
      aria-label={`Illustrative ${content.label} dashboard`}
      role="img"
    >
      <div className="ar-dashboard-bar">
        <span className="ar-dashboard-brand">UNU</span>
        <strong>{content.label}</strong>
        <i><b /> Illustrative view</i>
      </div>
      <div className="ar-dashboard-body">
        <nav aria-hidden="true">
          <span className="is-active" /><span /><span /><span /><span />
        </nav>
        <div className="ar-dashboard-main">
          <div className="ar-dashboard-metrics">
            <article><small>{content.primaryMetric}</small><strong>1,248</strong><span>Updated now</span></article>
            <article><small>{content.secondaryMetric}</small><strong>Stable</strong><span>Connected</span></article>
          </div>
          <div className="ar-dashboard-chart" aria-hidden="true">
            {[38, 57, 46, 72, 63, 88, 76, 94].map((height, index) => (
              <i key={height + index} style={{ "--bar-height": `${height}%` } as React.CSSProperties} />
            ))}
          </div>
          <div className="ar-dashboard-rows">
            {content.rows.map((row, index) => <span key={row}><i data-tone={index} />{row}<b>→</b></span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogVisual() {
  const dashboard = {
    label: "Product center",
    primaryMetric: "Connected operations",
    secondaryMetric: "Platform status",
    rows: ["UNU Exchange", "UNU Chat", "UNU Retail", "UNU Flow"],
  };
  return (
    <div className="ar-catalog-visual">
      <div className="ar-catalog-photo">
        <Image
          src="/assets/hero-products.webp"
          alt="A business team using UNU products in a shared workspace"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 44vw"
        />
      </div>
      <EnglishProductDashboard content={dashboard} compact />
    </div>
  );
}

export function EnglishProductsPage({ catalog = englishProductCatalog, pageContent }: { catalog?: readonly { slug: string; name: string; tag: string; title: string; text: string; items: readonly string[] }[]; pageContent?: { signal: string; title: string; intro: string; cta?: string } }) {
  return (
    <>
      <section className="ar-marketing-hero">
        <div className="wrap ar-marketing-hero-grid">
          <div className="ar-marketing-hero-copy">
            <span className="signal">{pageContent?.signal ?? "Specialized UNU products"}</span>
            <h1>{pageContent?.title ?? "Specialized products. One connected operating platform."}</h1>
            <p>{pageContent?.intro ?? "Use specialized products for distinct operational needs while keeping management, data, and future growth connected through one foundation."}</p>
            <div className="actions">
              <Link className="button" href="/contact">{pageContent?.cta ?? "Request a demo"} <Arrow /></Link>
              <a className="button secondary" href="#products">Explore products</a>
            </div>
          </div>
          <CatalogVisual />
        </div>
      </section>

      <section className="ar-proof-strip" aria-label="UNU product scope">
        <div className="wrap">
          {["5 specialized products", "21 industries", "Flexible implementation", "Connected data", "Configurable permissions", "Operational reporting"].map((item) => <span key={item}><i />{item}</span>)}
        </div>
      </section>

      <section className="section ar-catalog" id="products">
        <div className="wrap">
          <header className="ar-section-head">
            <div><span>Choose the closest fit</span><h2>Specialized products built to work as one system</h2></div>
            <p>Start with the product that solves your most urgent operating challenge, then expand as your needs grow.</p>
          </header>
          <div className="ar-product-showcase">
            {catalog.map((product, index) => {
              const detail = {
                label: product.name,
                primaryMetric: index === 1 ? "Conversations" : index === 2 ? "Appointments" : index === 4 ? "Sales" : "Operations",
                secondaryMetric: "System status",
                rows: product.items.slice(0, 4),
              };
              return (
                <article className="ar-product-story" key={product.slug}>
                  <div className="ar-product-story-copy">
                    <div className="ar-product-story-meta"><span>0{index + 1}</span><b>{product.tag}</b></div>
                    <strong>{product.name}</strong>
                    <h3>{product.title}</h3>
                    <p>{product.text}</p>
                    <ul aria-label={`Key capabilities of ${product.name}`}>{product.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <Link className="button secondary" href={`/products/${product.slug}`}>Explore product <Arrow /></Link>
                  </div>
                  <EnglishProductDashboard content={detail} compact />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ar-platform-band">
        <div className="wrap ar-platform-band-grid">
          <div><span>One operating foundation</span><h2>Add what you need today without fragmenting tomorrow’s data.</h2></div>
          <div className="ar-platform-points">
            {["Modern workspaces", "Hosting options shaped to project scope", "Integrations and APIs", "Flexible permissions", "Reports and dashboards", "Implementation and training support"].map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
          </div>
        </div>
      </section>

      <EnglishCta title="Ready to run a more connected operation?" text="See how UNU products can unify work, reduce manual handoffs, and create a foundation that grows with you." />
    </>
  );
}

export function EnglishProductDetail({ page, image, imageAlt }: { page: EnglishProductPage; image?: string; imageAlt?: string }) {
  return (
    <>
      <section className="ar-detail-hero">
        <div className="wrap ar-detail-hero-grid">
          <div>
            <span className="signal">{page.signal}</span>
            <h1>{page.headline}</h1>
            <p>{page.intro}</p>
            <div className="actions"><Link className="button" href="/contact">Request a demo <Arrow /></Link><a className="button secondary" href="#capabilities">Explore capabilities</a></div>
          </div>
          <EnglishProductDashboard content={page.dashboard} image={image} imageAlt={imageAlt} />
        </div>
      </section>

      <section className="section ar-capabilities" id="capabilities">
        <div className="wrap">
          <header className="ar-section-head"><div><span>{page.name}</span><h2>{page.sectionTitle}</h2></div><p>{page.sectionIntro}</p></header>
          <div className="ar-capability-list">
            {page.capabilities.map((capability, index) => <article key={capability.title}><span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section ar-feature-matrix">
        <div className="wrap ar-feature-matrix-grid">
          <div><span>Operational scope</span><h2>Practical daily capabilities for teams and management</h2><p>Final modules and integrations are defined after reviewing your workflows and current systems.</p></div>
          <ul>{page.features.map((feature) => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul>
        </div>
      </section>

      <section className="section ar-workflow-section">
        <div className="wrap">
          <header className="ar-section-head compact"><div><span>How it works</span><h2>One journey you can follow from first action to final outcome</h2></div></header>
          <ol className="ar-workflow">{page.workflow.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol>
        </div>
      </section>

      <section className="section ar-fit-section">
        <div className="wrap ar-fit-grid">
          <article><span>Built for</span><h2>Teams working in real operating contexts</h2><div className="ar-token-list">{page.audiences.map((item) => <b key={item}>{item}</b>)}</div></article>
          <article><span>Integrations</span><h2>Designed to work within your business environment</h2><div className="ar-token-list is-dark">{page.integrations.map((item) => <b key={item}>{item}</b>)}</div></article>
        </div>
      </section>

      <section className="section ar-faq-section">
        <div className="wrap ar-faq-grid">
          <div><span>Frequently asked questions</span><h2>Answers before your walkthrough</h2><p>We explain what can be confirmed now. Implementation and integration scope are finalized after reviewing your needs.</p></div>
          <div className="ar-faq-list">{page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <EnglishCta title={page.ctaTitle} text={page.ctaText} />
    </>
  );
}

export function EnglishPricingPage({ pricing, pageContent }: { pricing?: { factors: string[]; planNames: string[]; note: string }; pageContent?: { signal: string; title: string; intro: string; cta?: string } }) {
  const factors = [
    ["Users", "The expected level of concurrent access and the roles your teams require."],
    ["Required modules", "Accounting, people, inventory, sales, and other capabilities in your operating scope."],
    ["Integrations", "Connections to existing systems and required APIs."],
    ["Configuration", "Workflows, fields, permissions, and reports shaped around your organization."],
    ["Training and support", "The number of teams, training scope, and service level."],
    ["Hosting", "Cloud or private deployment options based on project requirements."],
  ];
  const plans = [
    { name: "Starter", label: "For smaller businesses", items: ["Core modules", "A focused team", "Standard support"] },
    { name: "Business", label: "For growing businesses", items: ["Multiple modules", "Selected integrations", "Advanced reporting"] },
    { name: "Enterprise", label: "For complex organizations", items: ["Multiple branches", "Configured workflows", "Service agreement"] },
  ];
  return (
    <>
      <section className="ar-pricing-hero">
        <div className="wrap ar-pricing-hero-grid">
          <div>
            <span className="signal">{pageContent?.signal ?? "Project cost estimate"}</span>
            <h1>{pageContent?.title ?? "Get a quote shaped around your organization."}</h1>
            <p>{pageContent?.intro ?? "UNU pricing reflects your real requirements, users, modules, and deployment model, so your investment is tied to a scope that creates operating value."}</p>
            <div className="actions"><a className="button" href="#quote">Request a quote <Arrow /></a><a className="button secondary" href="#how">How is pricing calculated?</a></div>
            <div className="ar-pricing-trust"><span>Tailored pricing</span><span>Scalable scope</span><span>Clear detail</span></div>
          </div>
          <div className="ar-estimator" role="img" aria-label="Illustrative project scope estimator">
            <div className="ar-estimator-head"><span>UNU</span><b>Scope estimator</b><i>Illustrative</i></div>
            {["Users", "Modules", "Integrations", "Training", "Support"].map((item, index) => <div key={item}><span>{item}</span><i style={{ "--scope": `${82 - index * 9}%` } as React.CSSProperties} /></div>)}
            <footer><span>Project scope</span><strong>Defined after discovery</strong></footer>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <header className="ar-section-head"><div><span>Why not a fixed price?</span><h2>Every implementation starts from a different operating reality</h2></div><p>Branches, teams, and current systems change the scope. We prepare a clear proposal around what your organization actually needs.</p></header>
          <div className="ar-pricing-reasons">{["Every organization is different", "You choose the modules", "Implementation and integration vary", "The solution can expand as you grow"].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div>
        </div>
      </section>

      <section className="section ar-pricing-factors">
        <div className="wrap ar-pricing-factor-grid">
          <div><span>Pricing factors</span><h2>What shapes your proposal?</h2><p>We explain each part of the proposal so you know where the investment goes and what the implementation includes.</p></div>
          <div>{factors.map(([title, text], index) => <article key={title}><span>{index + 1}</span><div><h3>{pricing?.factors[index] ?? title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section ar-plan-section">
        <div className="wrap">
          <header className="ar-section-head compact"><div><span>Choose a starting point</span><h2>Scope categories, not rigid price tiers</h2></div></header>
          <div className="ar-plans">{plans.map((plan, index) => <article key={plan.name} className={index === 1 ? "is-featured" : ""}><span>{plan.label}</span><h3>{plan.name}</h3><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><a href="#quote" className="button secondary">Request a quote</a></article>)}</div>
        </div>
      </section>

      <section className="section ar-process-section">
        <div className="wrap">
          <header className="ar-section-head compact"><div><span>A clear process</span><h2>From first request to implementation</h2></div></header>
          <ol className="ar-workflow">{["Send your request", "Discovery meeting", "Proposal preparation", "Proposal review", "Implementation begins"].map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol>
        </div>
      </section>

      <section className="section ar-quote-section" id="quote">
        <div className="wrap ar-quote-grid">
          <div><span>Start with your needs</span><h2>Ready for a tailored quote?</h2><p>Tell us about your operation, team size, and branches. A UNU specialist will review the details and arrange the right discovery session.</p><ul><li>Requirements analysis</li><li>System setup and configuration</li><li>Data migration planning</li><li>Training and support</li></ul></div>
          <ContactForm variant="quote" />
        </div>
      </section>
    </>
  );
}

export function EnglishCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="ar-final-cta">
      <div className="wrap"><div><h2>{title}</h2><p>{text}</p></div><div className="actions"><Link className="button" href="/contact">Request a demo <Arrow /></Link><a className="button secondary" href="mailto:info@unuerp.com">Contact sales</a></div></div>
    </section>
  );
}
