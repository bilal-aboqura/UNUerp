import { HomePage } from "@/components/HomePage";

export const metadata = {
  title: "UNU ERP — أدر أعمالك من مكان واحد",
  description: "اربط المالية والمبيعات والمخزون والموارد البشرية وخدمة العملاء في نظام موحّد.",
};

export default function Arabic() {
  return <HomePage locale="ar" />;
}
