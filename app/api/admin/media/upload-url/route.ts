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

function safeName(name: string) {
  const clean = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return clean || "media";
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });

  const body = await request.json().catch(() => null) as { name?: string; type?: string; size?: number } | null;
  const name = typeof body?.name === "string" ? body.name : "";
  const type = typeof body?.type === "string" ? body.type : "";
  const size = typeof body?.size === "number" ? body.size : 0;
  if (!name || !allowedTypes.has(type)) return NextResponse.json({ message: "Upload a JPG, PNG, WebP, AVIF, MP4, or WebM file." }, { status: 400 });
  if (!Number.isFinite(size) || size <= 0 || size > maxBytes) return NextResponse.json({ message: "Media files must be 100 MB or smaller." }, { status: 400 });

  const supabase = await createPublicServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });

  const storagePath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName(name)}`;
  const { data, error } = await supabase.storage.from("site-media").createSignedUploadUrl(storagePath);
  if (error || !data?.token) return NextResponse.json({ message: error?.message ?? "Could not prepare the upload." }, { status: 500 });

  const { data: publicData } = supabase.storage.from("site-media").getPublicUrl(storagePath);
  return NextResponse.json({ token: data.token, storagePath, publicUrl: publicData.publicUrl });
}
