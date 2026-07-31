"use client";

import { useMemo, useState } from "react";
import type { PricingPlan } from "@/lib/site-content";

export function PricingPlans({ plans, locale }: { plans: PricingPlan[]; locale: "en" | "ar" }) {
  const visible = useMemo(() => [...plans].filter((plan) => plan.published).sort((a, b) => a.order - b.order), [plans]);
  const supportsYearly = visible.some((plan) => plan.price.yearly && plan.price.yearly !== plan.price.monthly);
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  if (!visible.length) return null;
  const copy = locale === "ar"
    ? { label: "اختر نقطة البداية", title: "خطط مرنة تتكيف مع نطاق عملك", monthly: "شهري", yearly: "سنوي", recommended: "موصى بها", currency: "ر.س" }
    : { label: "Choose a starting point", title: "Flexible plans shaped around your scope", monthly: "Monthly", yearly: "Yearly", recommended: "Recommended", currency: "SAR" };

  return (
    <section className="section ar-plan-section">
      <div className="wrap">
        <header className="pricing-plan-header">
          <div><span>{copy.label}</span><h2>{copy.title}</h2></div>
          {supportsYearly ? <div className="billing-toggle" role="group" aria-label={locale === "ar" ? "فترة الفوترة" : "Billing period"}><button type="button" aria-pressed={period === "monthly"} onClick={() => setPeriod("monthly")}>{copy.monthly}</button><button type="button" aria-pressed={period === "yearly"} onClick={() => setPeriod("yearly")}>{copy.yearly}</button></div> : null}
        </header>
        <div className="ar-plans pricing-managed-plans">
          {visible.map((plan) => {
            const price = plan.price[period] || plan.price.monthly;
            return <article key={plan.id} className={plan.recommended ? "is-featured" : ""}>
              {plan.recommended ? <b className="plan-recommended">{copy.recommended}</b> : null}
              <span>{plan.description[locale]}</span>
              <h3>{plan.name[locale]}</h3>
              <div className="plan-price"><strong>{price}</strong>{/^\d/.test(price) ? <><small>{plan.price.currency || copy.currency}</small><em>{plan.billingPeriod[locale]}</em></> : null}</div>
              <ul>{plan.features.map((feature) => <li key={feature.id}><i aria-hidden="true">✓</i>{feature.label[locale]}</li>)}</ul>
              <a href="#quote" className="button secondary">{plan.cta[locale]}</a>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
