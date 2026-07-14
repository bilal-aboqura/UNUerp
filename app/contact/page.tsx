import { Page } from "@/components/Shell";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
export default function Contact() {
  return (
    <Page>
      <PageHero variant="contact" signal="Book a tailored demo" title="Show us how your operation works." intro="An ERP specialist will walk you through the workflows, teams, and data you want to connect." />
      <section className="section">
        <div className="wrap contact-grid">
          <div>
            <h2>Start with the operational challenge.</h2>
            <p>
              Tell us where work slows down today. We’ll help identify the right
              place to begin—across finance, customers, inventory, or people.
            </p>
            <a href="mailto:info@unuerp.com">Email the UNU team</a>
            <a href="tel:+966112248822">Call +966 11 224 8822</a>
            <span>Riyadh, Al Quds — Saudi Arabia</span>
          </div>
          <ContactForm />
        </div>
      </section>
    </Page>
  );
}
