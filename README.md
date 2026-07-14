# UNU ERP

<p align="center">
  <img src="public/assets/unu-logo.png" alt="UNU ERP" width="180" />
</p>

<p align="center">
  <strong>One connected platform for the work that runs your business.</strong>
</p>

<p align="center">
  A bilingual, conversion-focused website for UNU ERP: built to help growing regional businesses explore connected operations, specialized products, industry fit, and a tailored demo.
</p>

<p align="center">
  <a href="#what-this-site-delivers">What it delivers</a> &middot;
  <a href="#experience-map">Experience map</a> &middot;
  <a href="#technical-foundation">Technical foundation</a> &middot;
  <a href="#quality">Quality</a> &middot;
  <a href="#demo-request-delivery">Demo requests</a>
</p>

---

## What This Site Delivers

UNU ERP is positioned as an open, adaptable operating platform that brings finance, sales, inventory, people, customers, and sector-specific workflows into one source of truth. This website turns that positioning into a focused evaluation journey for business and technology decision-makers.

- Explains a connected ERP story through outcomes and workflows, not feature overload.
- Covers core capabilities, specialized UNU products, and **21 industries**.
- Provides complete English and Arabic experiences, with right-to-left-aware layouts and navigation.
- Guides qualified visitors toward a tailored demo through a protected, server-side delivery flow.
- Preserves an enterprise feel across desktop and mobile while keeping the experience fast, clear, and accessible.

## Experience Map

| Area | Purpose |
| --- | --- |
| `/` and `/ar` | Immersive product story, connected-operation visual, capabilities, products, industries, and conversion paths. |
| `/features` | Core ERP capability catalog with individual detail pages. |
| `/products` | Specialized UNU products built on the same connected foundation. |
| `/industries` | Industry-specific entry points and tailored detail pages. |
| `/pricing` | Custom-pricing conversation path. |
| `/contact` | Tailored demo request form and delivery feedback. |

Every primary route has an Arabic counterpart under `/ar`, including localized content, navigation, directionality, and calls to action.

## The Product Experience

The visual direction is **The Connected Ledger**: an operational surface that feels exact, calm, and current when finance, sales, inventory, people, and delivery must agree.

- A dark, high-authority hero uses a lightweight connected-system visualization instead of a generic dashboard screenshot.
- Editorial layouts make broad capability coverage feel coherent rather than card-heavy.
- `Sora`, `Manrope`, and `IBM Plex Sans Arabic` provide a deliberate bilingual typographic system through Next.js font loading.
- Motion is purposeful: staged entrances, data-path flow, chart drawing, subtle depth, and reduced-motion support.
- Responsive behavior prioritizes the highest-value content on small screens while preserving clear reading order and tap targets.

The complete rationale, tokens, component vocabulary, and responsive rules live in [DESIGN.md](DESIGN.md).

## Technical Foundation

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 with the App Router |
| UI | React 19 and TypeScript |
| Styling | Purpose-built responsive CSS and lightweight SVG/HTML visuals |
| Localization | English plus Arabic routes with RTL-aware UI |
| Form handling | Next.js route handler with validation, honeypot protection, rate limiting, and timeout-controlled webhook delivery |
| Testing | Vitest, Testing Library, and Playwright |
| Image workflow | `sharp`-powered image optimization script |

### Project Layout

```text
app/                    Routes, layouts, metadata, and the demo-request API
components/             Shared shell, navigation, visuals, motion, and form UI
lib/                    Content catalogs, locale content, and request validation
public/assets/          Brand, hero, industry, and client assets
docs/                   Webhook delivery documentation
tests/ and e2e/         Unit and browser-level coverage
```

## Quality

The project keeps its confidence checks separate and also provides one full gate:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
npm run check
```

`npm run check` runs linting, type checking, unit tests, and a production build. `npm run optimize:images` refreshes optimized hero imagery when source assets change.

## Demo Request Delivery

Demo requests are deliberately handled on the server. Input is validated before delivery, suspicious honeypot submissions are safely accepted without forwarding, and submissions are rate-limited by client address.

| Variable | Role |
| --- | --- |
| `DEMO_REQUEST_WEBHOOK_URL` | Approved server-side endpoint that receives sanitized demo requests. |
| `DEMO_REQUEST_WEBHOOK_TOKEN` | Optional secret for authenticating the server-to-server webhook request. |

These variables must never use a `NEXT_PUBLIC_` prefix. Without a configured webhook, development submissions are logged in sanitized form; production returns an honest unavailable response instead of claiming a request was delivered.

For the Google Sheets webhook contract, Apps Script implementation, and security notes, see [docs/google-sheets-webhook.md](docs/google-sheets-webhook.md).

## Principles Kept Intact

- One visible `h1` per route, semantic structure, skip navigation, keyboard focus, and reduced-motion support.
- No invented customer names, awards, testimonials, or outcome metrics.
- No browser exposure of webhook endpoints or authentication secrets.
- Content-led design: connected workflows first, technical complexity second.

## License

This repository is private. All rights reserved.
