create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
create policy "admins can read their membership" on public.admin_users for select to authenticated using (user_id = auth.uid());

create or replace function public.is_site_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;
revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to authenticated;

create table if not exists public.site_content (
  id text primary key default 'current',
  content jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);
alter table public.site_content enable row level security;
create policy "site content is publicly readable" on public.site_content for select to anon, authenticated using (true);
create policy "admins can insert site content" on public.site_content for insert to authenticated with check (public.is_site_admin());
create policy "admins can update site content" on public.site_content for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  storage_path text not null unique,
  public_url text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  alt_en text not null default '',
  alt_ar text not null default '',
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);
alter table public.media_assets enable row level security;
create policy "media metadata is publicly readable" on public.media_assets for select to anon, authenticated using (true);
create policy "admins manage media metadata" on public.media_assets for all to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  industry text not null default '',
  message text not null default '',
  language text not null default 'en' check (language in ('en', 'ar')),
  source_page text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  admin_notes text not null default ''
);
alter table public.demo_requests enable row level security;
create policy "any visitor can create a demo request" on public.demo_requests for insert to anon, authenticated with check (status = 'new' and admin_notes = '');
create policy "admins can read demo requests" on public.demo_requests for select to authenticated using (public.is_site_admin());
create policy "admins can update demo requests" on public.demo_requests for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy "site media is publicly readable" on storage.objects for select to public using (bucket_id = 'site-media');
create policy "admins can upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_site_admin());
create policy "admins can update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_site_admin()) with check (bucket_id = 'site-media' and public.is_site_admin());
create policy "admins can delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_site_admin());

-- Grant the single dashboard user access after creating it in Supabase Auth:
-- insert into public.admin_users (user_id) select id from auth.users where email = 'admin@example.com';
