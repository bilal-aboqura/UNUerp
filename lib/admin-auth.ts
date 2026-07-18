import { createPublicServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type AdminSession =
  | { configured: false; user: null; isAdmin: false }
  | { configured: true; user: null; isAdmin: false }
  | { configured: true; user: { id: string; email?: string }; isAdmin: boolean };

export async function getAdminSession(): Promise<AdminSession> {
  if (!isSupabaseConfigured()) {
    return { configured: false, user: null, isAdmin: false };
  }

  const supabase = await createPublicServerClient();
  if (!supabase) return { configured: false, user: null, isAdmin: false };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { configured: true, user: null, isAdmin: false };

  const { data } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    configured: true,
    user: { id: user.id, email: user.email },
    isAdmin: Boolean(data),
  };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.configured) {
    return { ok: false as const, status: 503, message: "Supabase is not configured." };
  }
  if (!session.user) {
    return { ok: false as const, status: 401, message: "Sign in to continue." };
  }
  if (!session.isAdmin) {
    return { ok: false as const, status: 403, message: "This account is not an administrator." };
  }
  return { ok: true as const, session };
}
