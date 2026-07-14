import Link from "next/link";
import { Page } from "@/components/Shell";
import { DetailVisual } from "@/components/ProductVisuals";

export default function NotFound() {
  return (
    <Page>
      <section className="detail-hero not-found-page">
        <div className="wrap detail-grid">
          <div>
            <span className="signal">Page not found · 404</span>
            <h1>This path is disconnected.</h1>
            <p>The page may have moved. Return to the connected UNU ERP platform or explore its core capabilities.</p>
            <div className="actions">
              <Link className="button" href="/">Return home</Link>
              <Link className="button secondary" href="/features">Explore features</Link>
            </div>
          </div>
          <DetailVisual label="Reconnect" />
        </div>
      </section>
    </Page>
  );
}
