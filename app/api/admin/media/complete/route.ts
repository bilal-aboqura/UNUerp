import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createPublicServerClient } from "@/lib/supabase/server";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);
const maxBytes = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });

  const body = await request.json().catch(() => null) as { name?: string; storagePath?: string; mimeType?: string; sizeBytes?: number } | null;
  const name = typeof body?.name === "string" ? body.name : "";
  const storagePath = typeof body?.storagePath === "string" ? body.storagePath : "";
  const mimeType = typeof body?.mimeType === "string" ? body.mimeType : "";
  const sizeBytes = typeof body?.sizeBytes === "number" ? body.sizeBytes : 0;
  if (!name || !storagePath || storagePath.includes("..") || !allowedTypes.has(mimeType)) return NextResponse.json({ message: "The uploaded media details are invalid." }, { status: 400 });
  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0 || sizeBytes > maxBytes) return NextResponse.json({ message: "Media files must be 100 MB or smaller." }, { status: 400 });

  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });

  const { data: publicData } = supabase.storage.from("site-media").getPublicUrl(storagePath);
  const asset = {
    name,
    storage_path: storagePath,
    public_url: publicData.publicUrl,
    mime_type: mimeType,
    size_bytes: sizeBytes,
    created_by: auth.session.user.id,
  };
  const { data, error } = await supabase.from("media_assets").insert(asset).select("*").single();
  if (error) {
    await supabase.storage.from("site-media").remove([storagePath]);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
