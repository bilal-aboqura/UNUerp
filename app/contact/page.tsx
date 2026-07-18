import { Page } from "@/components/Shell";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { readSiteContent } from "@/lib/site-content";

export default async function Contact() {
  const site = await readSiteContent();
  const page = site.pages.contact.en;
  return (
    <Page content={site.global}>
      <PageHero variant="contact" signal={page.signal} title={page.title} intro={page.intro} />
      <section className="section"><div className="wrap contact-grid"><div><h2>Start with the operational challenge.</h2><p>Tell us where work slows down today. We’ll help identify the right place to begin—across finance, customers, inventory, or people.</p><a href={`mailto:${site.global.contact.email}`}>Email the UNU team</a><a href={`tel:${site.global.contact.phone.replace(/\s/g, "")}`}>Call {site.global.contact.phone}</a><span>{site.global.contact.address.en}</span></div><ContactForm /></div></section>
    </Page>
  );
}
