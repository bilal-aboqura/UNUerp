import type { ReactNode, SVGProps } from "react";

export const managedIconOptions = [
  "chat", "trend", "calculator", "cart", "inventory", "users", "projects", "store",
  "megaphone", "headset", "receipt", "workflow", "shield", "link", "wallet", "globe",
  "calendar", "analytics", "database", "settings",
] as const;

const paths: Record<string, ReactNode> = {
  chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></>,
  trend: <><path d="M3 17 9 11l4 4 8-9"/><path d="M15 6h6v6"/></>,
  calculator: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></>,
  cart: <><path d="M3 4h2l2.2 10h9.8l2-7H6"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></>,
  inventory: <><path d="m4 7 8-4 8 4-8 4Z"/><path d="m4 7 8 4 8-4v10l-8 4-8-4Z"/><path d="M12 11v10"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  projects: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h3M8 16h5"/></>,
  store: <><path d="M4 10v10h16V10M3 4h18l-2 6H5Z"/><path d="M9 20v-6h6v6"/></>,
  megaphone: <><path d="m3 11 15-6v14L3 13Z"/><path d="M11.6 15.6 13 21H7l-1.4-7"/></>,
  headset: <><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M18 19c0 1.1-.9 2-2 2h-4M4 14h3v5H5a1 1 0 0 1-1-1ZM20 14h-3v5h2a1 1 0 0 0 1-1Z"/></>,
  receipt: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z"/><path d="M9 7h6M9 11h6M9 15h4"/></>,
  workflow: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a4 4 0 0 1 4 4v5M15 18h-4a4 4 0 0 1-4-4V9"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></>,
  wallet: <><path d="M4 5h14a2 2 0 0 1 2 2v12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M16 11h6v5h-6a2.5 2.5 0 0 1 0-5Z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
  analytics: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
};

export function suggestedIcon(text: string, index = 0) {
  const value = text.toLowerCase();
  if (/secure|compliance|govern|صلاح|امتثال|حما/.test(value)) return "shield";
  if (/integrat|connect|channel|ربط|تكامل|قنوات/.test(value)) return "link";
  if (/cash|financ|payment|مال|نقد|دفع/.test(value)) return "wallet";
  if (/invent|stock|مخزون/.test(value)) return "inventory";
  if (/international|global|دول|عالم/.test(value)) return "globe";
  if (/report|analytic|performance|تحليل|تقارير|أداء/.test(value)) return "analytics";
  if (/team|people|موظ|فريق/.test(value)) return "users";
  if (/schedule|appointment|queue|موعد|طابور/.test(value)) return "calendar";
  if (/conversation|chat|message|محادث|رسائل/.test(value)) return "chat";
  return managedIconOptions[index % managedIconOptions.length];
}

export function ManagedIcon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name] ?? paths.workflow}
    </svg>
  );
}
