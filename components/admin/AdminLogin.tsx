"use client";
/* eslint-disable @next/next/no-img-element -- The login uses the same local brand asset as the public site. */

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Use your UNU administrator account to continue.");
  const [loading, setLoading] = useState(false);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase is not configured for this deployment.");
      return;
    }
    setLoading(true);
    setMessage("Signing in…");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }
    router.refresh();
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-panel" aria-labelledby="admin-login-title">
        <div className="admin-login-copy">
          <img src="/assets/unu-logo.png" alt="UNU ERP" />
          <p className="admin-kicker">Protected workspace</p>
          <h1 id="admin-login-title">Control every part of the UNU website.</h1>
          <p>Manage English and Arabic content, products, software imagery, SEO, and enquiries from one production workspace.</p>
          <ul>
            <li>Immediate live publishing</li>
            <li>Supabase authentication and storage</li>
            <li>Full bilingual content control</li>
          </ul>
        </div>
        <form className="admin-login-form" onSubmit={signIn}>
          <div>
            <p className="admin-kicker">UNU Admin</p>
            <h2>Sign in</h2>
            <p className="admin-muted" role="status">{message}</p>
          </div>
          <label><span>Email address</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="admin-primary" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in to dashboard"}</button>
        </form>
      </section>
    </main>
  );
}

export function AdminSetup() {
  return (
    <main className="admin-login-shell">
      <section className="admin-setup-panel">
        <p className="admin-kicker">Setup required</p>
        <h1>Connect the dashboard to Supabase.</h1>
        <p>Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run the included migration, create one Auth user, then add that user to <code>admin_users</code>.</p>
        <p>The public website continues using its bundled content until Supabase is connected and the first save is published.</p>
      </section>
    </main>
  );
}

export function AdminAccessDenied({ email }: { email?: string }) {
  const router = useRouter();
  async function signOut() {
    await createSupabaseBrowserClient()?.auth.signOut();
    router.refresh();
  }
  return (
    <main className="admin-login-shell">
      <section className="admin-setup-panel">
        <p className="admin-kicker">Access restricted</p>
        <h1>This account is not the website administrator.</h1>
        <p>{email ?? "Your account"} is authenticated but is not listed in the <code>admin_users</code> table.</p>
        <button className="admin-secondary" type="button" onClick={signOut}>Sign out</button>
      </section>
    </main>
  );
}
