import type { Metadata } from "next";
import { AdminAccessDenied, AdminLogin, AdminSetup } from "@/components/admin/AdminLogin";
import { AdminDashboard, type Enquiry, type MediaAsset } from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin-auth";
import { readSiteContent } from "@/lib/site-content";
import { createPublicServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Control Center | UNU ERP",
  robots: { index: false, follow: false },
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const session = await getAdminSession();
  const { preview } = await searchParams;
  if (!session.configured && process.env.NODE_ENV !== "production" && preview === "1") {
    return <AdminDashboard initialContent={await readSiteContent()} initialMedia={[]} initialEnquiries={[]} adminEmail="Local preview" />;
  }
  if (!session.configured) return <AdminSetup />;
  if (!session.user) return <AdminLogin />;
  if (!session.isAdmin) return <AdminAccessDenied email={session.user.email} />;

  const supabase = await createPublicServerClient();
  const [content, mediaResult, enquiriesResult] = await Promise.all([
    readSiteContent(),
    supabase!.from("media_assets").select("*").order("created_at", { ascending: false }),
    supabase!.from("demo_requests").select("*").order("created_at", { ascending: false }),
  ]);

  return <AdminDashboard initialContent={content} initialMedia={(mediaResult.data ?? []) as MediaAsset[]} initialEnquiries={(enquiriesResult.data ?? []) as Enquiry[]} adminEmail={session.user.email} />;
}
