"use client";
/* eslint-disable @next/next/no-img-element -- Administrators can provide Supabase-hosted image URLs outside Next's static allowlist. */

import { ChangeEvent, ReactNode, useEffect, useEffectEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { JsonValue, SiteContent } from "@/lib/site-content";

export type MediaAsset = {
  id: string;
  name: string;
  public_url: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  alt_en: string;
  alt_ar: string;
  created_at: string;
};

export type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
  language: "en" | "ar";
  source_page: string;
  status: "new" | "contacted" | "qualified" | "closed";
  admin_notes: string;
};

type TabKey = "overview" | "homepage" | "products" | "features" | "industries" | "media" | "enquiries" | "settings";
type Locale = "en" | "ar";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "homepage", label: "Homepage" },
  { key: "products", label: "Products" },
  { key: "features", label: "Features" },
  { key: "industries", label: "Industries" },
  { key: "media", label: "Media" },
  { key: "enquiries", label: "Enquiries" },
  { key: "settings", label: "Settings" },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function titleFromKey(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^./, (character) => character.toUpperCase());
}

function setAtPath(target: unknown, path: (string | number)[], value: unknown) {
  let cursor = target as Record<string | number, unknown>;
  path.slice(0, -1).forEach((part) => {
    cursor = cursor[part] as Record<string | number, unknown>;
  });
  cursor[path.at(-1)!] = value;
}

function isImageKey(key: string, value: string) {
  return /(^src$|image|logo|hero)/i.test(key) && !/alt/i.test(key) && (/^(\/|https?:)/.test(value) || value === "");
}

function EditorField({
  fieldKey,
  value,
  onChange,
  onUpload,
}: {
  fieldKey: string;
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  onUpload: (file: File) => Promise<string | null>;
}) {
  const label = titleFromKey(fieldKey);
  if (typeof value === "boolean") {
    return <label className="admin-check"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} /><span>{label}</span></label>;
  }
  if (typeof value === "number") {
    return <label className="admin-field"><span>{label}</span><input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
  }
  if (typeof value !== "string") return null;

  const multiline = value.length > 100 || /(intro|description|text|answer|note|tagline|legal)/i.test(fieldKey);
  const image = isImageKey(fieldKey, value);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await onUpload(file);
    if (url) onChange(url);
    event.target.value = "";
  }

  return (
    <label className={`admin-field${image ? " admin-image-field" : ""}`}>
      <span>{label}</span>
      {multiline ? <textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}
      {image ? (
        <>
          {value ? <img className="admin-image-preview" src={value} alt="" /> : null}
          <span className="admin-upload-button">Upload image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} /></span>
        </>
      ) : null}
    </label>
  );
}

function ContentEditor({
  value,
  onChange,
  onUpload,
  depth = 0,
}: {
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  onUpload: (file: File) => Promise<string | null>;
  depth?: number;
}) {
  if (Array.isArray(value)) {
    const primitive = value.every((item) => ["string", "number", "boolean"].includes(typeof item));
    return (
      <div className="admin-array">
        {value.length === 0 ? <p className="admin-empty">No entries yet. Add the first one below.</p> : null}
        {value.map((item, index) => (
          <div className={primitive ? "admin-array-row" : "admin-array-object"} key={index}>
            {primitive ? (
              <EditorField fieldKey={`Item ${index + 1}`} value={item} onUpload={onUpload} onChange={(next) => { const copy = clone(value); copy[index] = next; onChange(copy); }} />
            ) : (
              <details open={index === 0}>
                <summary>{typeof item === "object" && item && !Array.isArray(item) && "title" in item ? String(item.title) : `Entry ${index + 1}`}</summary>
                <ContentEditor value={item} onUpload={onUpload} depth={depth + 1} onChange={(next) => { const copy = clone(value); copy[index] = next; onChange(copy); }} />
              </details>
            )}
            <button className="admin-danger-link" type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}>Delete {primitive ? "item" : "entry"}</button>
          </div>
        ))}
        <button className="admin-inline-action" type="button" onClick={() => onChange([...value, value[0] && typeof value[0] === "object" ? clone(value[0]) : ""])}>Add {primitive ? "item" : "entry"}</button>
      </div>
    );
  }

  if (!value || typeof value !== "object") return null;
  return (
    <div className={`admin-object admin-object-depth-${Math.min(depth, 2)}`}>
      {Object.entries(value).map(([key, item]) => {
        const nested = item !== null && typeof item === "object";
        return nested ? (
          <section className="admin-editor-section" key={key}>
            <h3>{titleFromKey(key)}</h3>
            <ContentEditor value={item} onUpload={onUpload} depth={depth + 1} onChange={(next) => { const copy = clone(value); copy[key] = next; onChange(copy); }} />
          </section>
        ) : (
          <EditorField key={key} fieldKey={key} value={item} onUpload={onUpload} onChange={(next) => { const copy = clone(value); copy[key] = next; onChange(copy); }} />
        );
      })}
    </div>
  );
}

function PanelHeader({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return <header className="admin-panel-header"><div><h2>{title}</h2><p>{body}</p></div>{action}</header>;
}

export function AdminDashboard({
  initialContent,
  initialMedia,
  initialEnquiries,
  adminEmail,
}: {
  initialContent: SiteContent;
  initialMedia: MediaAsset[];
  initialEnquiries: Enquiry[];
  adminEmail?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("overview");
  const [locale, setLocale] = useState<Locale>("en");
  const [content, setContent] = useState(() => clone(initialContent));
  const [baseline, setBaseline] = useState(() => clone(initialContent));
  const [media, setMedia] = useState(initialMedia);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [selectedProduct, setSelectedProduct] = useState(Object.keys(initialContent.products)[0] ?? "");
  const [selectedFeature, setSelectedFeature] = useState(Object.keys(initialContent.features)[0] ?? "");
  const [selectedIndustry, setSelectedIndustry] = useState(Object.keys(initialContent.industries)[0] ?? "");
  const [status, setStatus] = useState<{ tone: string; message: string }>({ tone: "success", message: "Changes are live" });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const metrics = useMemo(() => [
    ["Products", Object.keys(content.products).length],
    ["Features", Object.keys(content.features).length],
    ["Industries", Object.keys(content.industries).length],
    ["Media assets", media.length + content.media.clientLogos.length],
  ], [content, media.length]);

  function update(path: (string | number)[], value: JsonValue) {
    const next = clone(content);
    setAtPath(next, path, value);
    setContent(next);
    setDirty(true);
    setStatus({ tone: "dirty", message: "Unsaved changes" });
  }

  function updateMany(changes: Array<{ path: (string | number)[]; value: JsonValue }>) {
    const next = clone(content);
    changes.forEach(({ path, value }) => setAtPath(next, path, value));
    setContent(next);
    setDirty(true);
    setStatus({ tone: "dirty", message: "Unsaved changes" });
  }

  async function uploadImage(file: File) {
    setStatus({ tone: "saving", message: `Uploading ${file.name}…` });
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const result = await response.json() as MediaAsset & { message?: string };
    if (!response.ok) {
      setStatus({ tone: "error", message: result.message ?? "Image upload failed." });
      return null;
    }
    setMedia((current) => [result, ...current]);
    setStatus({ tone: "dirty", message: "Image uploaded. Save to publish it." });
    return result.public_url;
  }

  async function save() {
    setSaving(true);
    setStatus({ tone: "saving", message: "Publishing changes…" });
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
    const result = await response.json() as { message?: string };
    setSaving(false);
    if (!response.ok) {
      setStatus({ tone: "error", message: result.message ?? "Changes could not be published." });
      return;
    }
    setBaseline(clone(content));
    setDirty(false);
    setStatus({ tone: "success", message: "Changes are live" });
    router.refresh();
  }

  function reset() {
    setContent(clone(baseline));
    setDirty(false);
    setStatus({ tone: "neutral", message: "Reverted to the live version" });
  }

  async function signOut() {
    await createSupabaseBrowserClient()?.auth.signOut();
    router.refresh();
  }

  const handleShortcutSave = useEffectEvent(() => { void save(); });

  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) {
      if (!dirty) return;
      event.preventDefault();
    }
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleShortcutSave();
      }
    }
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("keydown", shortcut);
    return () => { window.removeEventListener("beforeunload", beforeUnload); window.removeEventListener("keydown", shortcut); };
  }, [dirty]);

  let editor: ReactNode;
  if (tab === "overview") {
    editor = <Overview content={content} media={media} enquiries={enquiries} onNavigate={setTab} />;
  } else if (tab === "homepage") {
    editor = <><PanelHeader title="Homepage" body="Edit the complete homepage in both languages, including all section copy and media." /><LocaleTabs locale={locale} onChange={setLocale} /><ContentEditor value={content.home[locale] as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["home", locale], value)} /><section className="admin-editor-section"><h3>Homepage media</h3><ContentEditor value={content.media as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["media"], value)} /></section></>;
  } else if (tab === "products") {
    const current = content.products[selectedProduct];
    editor = <><PanelHeader title="Products" body="Manage product cards, full product pages, software imagery, FAQs, workflows, and integrations." action={<ResourceSelect value={selectedProduct} options={Object.keys(content.products)} onChange={setSelectedProduct} />} /><LocaleTabs locale={locale} onChange={setLocale} />{current ? <><section className="admin-editor-section"><h3>Catalog card</h3><ContentEditor value={current.catalog[locale]} onUpload={uploadImage} onChange={(value) => update(["products", selectedProduct, "catalog", locale], value)} /></section><section className="admin-editor-section"><h3>Product page</h3><ContentEditor value={current[locale]} onUpload={uploadImage} onChange={(value) => update(["products", selectedProduct, locale], value)} /></section><section className="admin-editor-section"><h3>Dashboard replacement image</h3><p className="admin-editor-help">Upload a real product screenshot here to replace the illustrated dashboard in the product hero. Keep the image blank to use the illustration.</p><ContentEditor value={{ image: current.image, imageAlt: current.imageAlt[locale] }} onUpload={uploadImage} onChange={(value) => { const item = value as { image: string; imageAlt: string }; updateMany([{ path: ["products", selectedProduct, "image"], value: item.image }, { path: ["products", selectedProduct, "imageAlt", locale], value: item.imageAlt }]); }} /></section></> : null}</>;
  } else if (tab === "features") {
    const current = content.features[selectedFeature];
    editor = <><PanelHeader title="Features" body="Edit every ERP capability, benefit, headline, and localized description." action={<ResourceSelect value={selectedFeature} options={Object.keys(content.features)} onChange={setSelectedFeature} />} /><LocaleTabs locale={locale} onChange={setLocale} />{current ? <ContentEditor value={current[locale] as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["features", selectedFeature, locale], value)} /> : null}</>;
  } else if (tab === "industries") {
    const current = content.industries[selectedIndustry];
    editor = <><PanelHeader title="Industries" body="Manage industry names, summaries, detailed page copy, and imagery." action={<ResourceSelect value={selectedIndustry} options={Object.keys(content.industries)} onChange={setSelectedIndustry} />} /><LocaleTabs locale={locale} onChange={setLocale} />{current ? <><ContentEditor value={current[locale] as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["industries", selectedIndustry, locale], value)} /><section className="admin-editor-section"><h3>Industry media</h3><ContentEditor value={{ image: current.image }} onUpload={uploadImage} onChange={(value) => update(["industries", selectedIndustry, "image"], (value as { image: string }).image)} /></section></> : null}</>;
  } else if (tab === "media") {
    editor = <MediaLibrary media={media} onUpload={uploadImage} onDelete={(id) => setMedia((items) => items.filter((item) => item.id !== id))} />;
  } else if (tab === "enquiries") {
    editor = <EnquiryInbox enquiries={enquiries} onChange={setEnquiries} />;
  } else {
    editor = <><PanelHeader title="Settings" body="Manage site identity, SEO, navigation, contact details, page headers, and pricing content." /><section className="admin-editor-section"><h3>Global settings</h3><ContentEditor value={content.global as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["global"], value)} /></section><section className="admin-editor-section"><h3>Page headers</h3><ContentEditor value={content.pages as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["pages"], value)} /></section><section className="admin-editor-section"><h3>Pricing content</h3><ContentEditor value={content.pricing as unknown as JsonValue} onUpload={uploadImage} onChange={(value) => update(["pricing"], value)} /></section></>;
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><img src="/assets/unu-logo.png" alt="" /><span>UNU Admin</span></div>
        <nav aria-label="Admin sections">{tabs.map((item) => <button className={tab === item.key ? "is-active" : ""} key={item.key} onClick={() => setTab(item.key)} type="button">{item.label}</button>)}</nav>
        <div className="admin-preview-links"><strong>Live preview</strong><Link href="/" target="_blank">English site <span>↗</span></Link><Link href="/ar" target="_blank">Arabic site <span>↗</span></Link></div>
        <div className="admin-account"><span>{adminEmail}</span><button type="button" onClick={signOut}>Sign out</button></div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar"><div><p className="admin-kicker">Dashboard</p><h1>Admin Control Center</h1><p>Manage website content, media, and enquiries from one protected workspace.</p></div><div className="admin-save-actions"><span className={`admin-status admin-status-${status.tone}`} role="status">{status.message}</span><Link className="admin-secondary" href="/" target="_blank">View website</Link><button className="admin-secondary" type="button" onClick={reset} disabled={!dirty}>Reset</button><button className="admin-primary" type="button" onClick={() => void save()} disabled={saving}>{saving ? "Publishing…" : "Save changes"}</button></div></header>
        <section className="admin-metrics" aria-label="Website summary">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section>
        <section className="admin-main-panel">{editor}</section>
      </div>
    </main>
  );
}

function LocaleTabs({ locale, onChange }: { locale: Locale; onChange: (value: Locale) => void }) {
  return <div className="admin-locale-tabs" role="tablist" aria-label="Content language"><button type="button" role="tab" aria-selected={locale === "en"} onClick={() => onChange("en")}>English</button><button type="button" role="tab" aria-selected={locale === "ar"} onClick={() => onChange("ar")}>العربية</button></div>;
}

function ResourceSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="admin-resource-select"><span>Choose item</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option} key={option}>{titleFromKey(option)}</option>)}</select></label>;
}

function Overview({ content, media, enquiries, onNavigate }: { content: SiteContent; media: MediaAsset[]; enquiries: Enquiry[]; onNavigate: (tab: TabKey) => void }) {
  const newLeads = enquiries.filter((item) => item.status === "new").length;
  return <><PanelHeader title="Website overview" body="Everything shown here is connected to the live public website." /><div className="admin-overview-grid"><article><span>Content</span><h3>Keep the website current</h3><p>Edit bilingual homepage, product, feature, industry, pricing, and company details.</p><button type="button" onClick={() => onNavigate("homepage")}>Edit homepage</button></article><article><span>Media</span><h3>{media.length} uploaded assets</h3><p>Upload product screenshots, page imagery, logos, and replacement visuals.</p><button type="button" onClick={() => onNavigate("media")}>Open media library</button></article><article><span>Enquiries</span><h3>{newLeads} new requests</h3><p>Review demo requests and track each conversation through qualification.</p><button type="button" onClick={() => onNavigate("enquiries")}>Review enquiries</button></article></div><section className="admin-editor-section"><h3>Publishing status</h3><dl className="admin-health"><div><dt>Content schema</dt><dd>Version {content.version}</dd></div><div><dt>Languages</dt><dd>English and Arabic</dd></div><div><dt>Publishing</dt><dd>Immediate on save</dd></div><div><dt>Storage</dt><dd>Supabase protected</dd></div></dl></section></>;
}

function MediaLibrary({ media, onUpload, onDelete }: { media: MediaAsset[]; onUpload: (file: File) => Promise<string | null>; onDelete: (id: string) => void }) {
  const [message, setMessage] = useState("Upload JPG, PNG, WebP, or AVIF files up to 10 MB.");
  async function upload(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; setMessage(`Uploading ${file.name}…`); const url = await onUpload(file); setMessage(url ? `${file.name} is ready to use.` : "Upload failed. Try again."); event.target.value = ""; }
  async function remove(id: string) { if (!window.confirm("Delete this media asset? Existing page references may stop working.")) return; const response = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, { method: "DELETE" }); if (response.ok) onDelete(id); }
  return <><PanelHeader title="Media library" body={message} action={<label className="admin-primary admin-file-action">Upload media<input type="file" accept="image/*" onChange={upload} /></label>} />{media.length ? <div className="admin-media-grid">{media.map((asset) => <article key={asset.id}><img src={asset.public_url} alt={asset.alt_en || asset.name} loading="lazy" /><div><strong>{asset.name}</strong><span>{Math.max(1, Math.round(asset.size_bytes / 1024))} KB</span></div><button type="button" onClick={() => void navigator.clipboard.writeText(asset.public_url)}>Copy URL</button><button className="admin-danger-link" type="button" onClick={() => void remove(asset.id)}>Delete</button></article>)}</div> : <p className="admin-empty">No uploaded assets yet. Existing images in the project remain available.</p>}</>;
}

function EnquiryInbox({ enquiries, onChange }: { enquiries: Enquiry[]; onChange: (items: Enquiry[]) => void }) {
  async function update(item: Enquiry, patch: Partial<Enquiry>) { const response = await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: item.id, ...patch }) }); if (!response.ok) return; const next = await response.json() as Enquiry; onChange(enquiries.map((current) => current.id === next.id ? next : current)); }
  return <><PanelHeader title="Enquiries" body="Review demo requests and record the next step for each prospect." />{enquiries.length ? <div className="admin-enquiries">{enquiries.map((item) => <article key={item.id}><header><div><h3>{item.name}</h3><p>{item.company} · {item.email}</p></div><time>{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.created_at))}</time></header><p>{item.message || "No additional message."}</p><div className="admin-enquiry-meta"><span>{item.language === "ar" ? "Arabic" : "English"}</span><span>{item.industry || "Industry not specified"}</span><span>{item.source_page || "Direct"}</span></div><div className="admin-enquiry-actions"><label><span>Status</span><select value={item.status} onChange={(event) => void update(item, { status: event.target.value as Enquiry["status"] })}><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="closed">Closed</option></select></label><label><span>Private notes</span><textarea rows={2} defaultValue={item.admin_notes} onBlur={(event) => void update(item, { admin_notes: event.target.value })} /></label></div></article>)}</div> : <p className="admin-empty">No enquiries yet. New demo requests will appear here.</p>}</>;
}
