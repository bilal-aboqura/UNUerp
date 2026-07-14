# UNU ERP website

## Run locally

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
npm run check
```

`npm run test:e2e:ui` opens the Playwright runner. Install the browser once with `npx playwright install chromium` if Playwright reports it is missing.

## Google Sheets webhook

For Google Sheets setup, deployment instructions, and the complete Apps Script, see [docs/google-sheets-webhook.md](docs/google-sheets-webhook.md). Keep all webhook variables server-only; never use a `NEXT_PUBLIC_` prefix.

## Environment variables

Copy `.env.example` to `.env.local` when connecting demo requests to an approved service.

- `DEMO_REQUEST_WEBHOOK_URL` — optional server-side webhook URL for production demo requests.
- `DEMO_REQUEST_WEBHOOK_TOKEN` — optional server-side Bearer token for that webhook.

Without a webhook, the API logs sanitized requests only in development. In production it returns a clear unavailable response rather than pretending submissions were delivered.
