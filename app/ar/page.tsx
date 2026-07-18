import { HomePage } from "@/components/HomePage";
import { readSiteContent } from "@/lib/site-content";

export const metadata = {
  title: "UNU ERP — أدر أعمالك من مكان واحد",
  description: "اربط المالية والمبيعات والمخزون والموارد البشرية وخدمة العملاء في نظام موحّد.",
};

export default async function Arabic() {
  const content = await readSiteContent();
  return <HomePage locale="ar" content={content.home.ar} siteContent={content.global} media={content.media} />;
}
