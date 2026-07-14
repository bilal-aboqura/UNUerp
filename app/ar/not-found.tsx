import Link from "next/link";
import { Page } from "@/components/Shell";
import { DetailVisual } from "@/components/ProductVisuals";

export default function ArabicNotFound() {
  return (
    <Page locale="ar">
      <section className="detail-hero not-found-page">
        <div className="wrap detail-grid">
          <div>
            <span className="signal">الصفحة غير موجودة · 404</span>
            <h1>هذا المسار غير متصل.</h1>
            <p>ربما تم نقل الصفحة. عد إلى منصة UNU ERP أو استكشف قدراتها الأساسية.</p>
            <div className="actions">
              <Link className="button" href="/ar">العودة للرئيسية</Link>
              <Link className="button secondary" href="/ar/features">استكشف المزايا</Link>
            </div>
          </div>
          <DetailVisual label="إعادة الاتصال" locale="ar" />
        </div>
      </section>
    </Page>
  );
}
