import Link from "next/link";
import { PageVisual } from "@/components/ProductVisuals";

export function PageHero({
  signal,
  title,
  intro,
  variant = "features",
  locale = "en",
  cta,
}: {
  signal: string;
  title: string;
  intro: string;
  variant?: "features" | "products" | "industries" | "pricing" | "contact";
  locale?: "en" | "ar";
  cta?: { label: string; href: string };
}) {
  return (
    <section className={`page-hero ${variant}-visual`}>
      <div className="wrap page-hero-grid">
        <div className="page-hero-copy">
          <span className="signal">{signal}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          {cta && <Link className="button" href={cta.href}>{cta.label}<span aria-hidden="true">↗</span></Link>}
        </div>
        <PageVisual variant={variant} locale={locale} />
      </div>
    </section>
  );
}
