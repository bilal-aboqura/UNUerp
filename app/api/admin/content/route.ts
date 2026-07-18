import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { readSiteContent, type SiteContent } from "@/lib/site-content";
import { createPublicServerClient } from "@/lib/supabase/server";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  return NextResponse.json(await readSiteContent());
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });

  let content: SiteContent;
  try {
    content = (await request.json()) as SiteContent;
  } catch {
    return NextResponse.json({ message: "The content payload is not valid JSON." }, { status: 400 });
  }

  if (!content || content.version !== 1 || !content.global || !content.home || !content.products) {
    return NextResponse.json({ message: "Required website content sections are missing." }, { status: 400 });
  }

  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });

  const { error } = await supabase.from("site_content").upsert({
    id: "current",
    content,
    updated_at: new Date().toISOString(),
    updated_by: auth.session.user.id,
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, publishedAt: new Date().toISOString() });
}
