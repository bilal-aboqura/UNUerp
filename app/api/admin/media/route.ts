import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createPublicServerClient } from "@/lib/supabase/server";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxBytes = 10 * 1024 * 1024;

function safeName(name: string) {
  const clean = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return clean || "image";
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ message: "Upload a JPG, PNG, WebP, or AVIF image." }, { status: 400 });
  if (file.size > maxBytes) return NextResponse.json({ message: "Images must be 10 MB or smaller." }, { status: 400 });

  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });

  const storagePath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName(file.name)}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from("site-media").upload(storagePath, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return NextResponse.json({ message: uploadError.message }, { status: 500 });

  const { data: publicData } = supabase.storage.from("site-media").getPublicUrl(storagePath);
  const asset = {
    name: file.name,
    storage_path: storagePath,
    public_url: publicData.publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
    created_by: auth.session.user.id,
  };
  const { data, error } = await supabase.from("media_assets").insert(asset).select("*").single();
  if (error) {
    await supabase.storage.from("site-media").remove([storagePath]);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ message: "A media asset id is required." }, { status: 400 });
  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  const { data } = await supabase.from("media_assets").select("storage_path").eq("id", id).single();
  if (!data) return NextResponse.json({ message: "Media asset not found." }, { status: 404 });
  const { error: storageError } = await supabase.storage.from("site-media").remove([data.storage_path]);
  if (storageError) return NextResponse.json({ message: storageError.message }, { status: 500 });
  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
