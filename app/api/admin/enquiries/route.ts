import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createPublicServerClient } from "@/lib/supabase/server";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  const { data, error } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const body = (await request.json()) as { id?: string; status?: string; admin_notes?: string };
  if (!body.id) return NextResponse.json({ message: "An enquiry id is required." }, { status: 400 });
  const allowed = new Set(["new", "contacted", "qualified", "closed"]);
  if (body.status && !allowed.has(body.status)) return NextResponse.json({ message: "Unknown enquiry status." }, { status: 400 });
  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  const { data, error } = await supabase
    .from("demo_requests")
    .update({ status: body.status, admin_notes: body.admin_notes })
    .eq("id", body.id)
    .select("*")
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}
