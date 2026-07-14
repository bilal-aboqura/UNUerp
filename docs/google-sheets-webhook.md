# Google Sheets demo-request webhook

This project posts sanitized form data from its server-side API to the URL in
`DEMO_REQUEST_WEBHOOK_URL`. The browser never receives that URL or its token.

Google Apps Script web-app events document the POST body but not incoming request
headers. For that reason, when `DEMO_REQUEST_WEBHOOK_TOKEN` is configured, the
Next.js server sends it to this script as `sharedSecret` in the server-to-server
JSON request. The script validates it and immediately discards it: it is not
logged, returned, or written to the spreadsheet. The server also retains the
Bearer Authorization header for compatible non-Apps-Script webhook providers.

## Apps Script

Create a standalone Apps Script project and replace its contents with this code:

```javascript
const SHEET_NAME = "Demo Requests";
const HEADERS = [
  "Submitted At", "Name", "Email", "Phone", "Company", "Industry", "Message",
  "Language", "Source Page", "User Agent",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, code: "busy" });

  try {
    const body = parseBody_(e);
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("WEBHOOK_SHARED_SECRET");

    // Do not deploy a public endpoint without a configured secret.
    if (!expectedSecret || !constantTimeEqual_(body.sharedSecret, expectedSecret)) {
      return json_({ ok: false, code: "unauthorized" });
    }

    const data = validate_(body);
    if (!data.ok) return json_({ ok: false, code: "invalid_request" });

    const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    if (!spreadsheetId) return json_({ ok: false, code: "misconfigured" });

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([
      new Date(data.submittedAt), safeCell_(data.name), safeCell_(data.email),
      safeCell_(data.phone), safeCell_(data.company), safeCell_(data.industry),
      safeCell_(data.message), safeCell_(data.language), safeCell_(data.sourcePage),
      safeCell_(data.userAgent),
    ]);
    return json_({ ok: true });
  } catch (error) {
    // Do not log request bodies or return implementation details.
    console.error("Demo request webhook failed", error && error.message);
    return json_({ ok: false, code: "internal_error" });
  } finally {
    lock.releaseLock();
  }
}

function parseBody_(e) {
  if (!e || !e.postData || e.postData.type !== "application/json") throw new Error("Invalid body");
  const value = JSON.parse(e.postData.contents);
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid body");
  return value;
}

function validate_(body) {
  const data = {
    submittedAt: clean_(body.submittedAt, 40),
    name: clean_(body.name, 100),
    email: clean_(body.email, 254).toLowerCase(),
    phone: clean_(body.phone, 50),
    company: clean_(body.company, 150),
    industry: clean_(body.industry, 100),
    message: clean_(body.message, 2000),
    language: body.language === "ar" ? "ar" : body.language === "en" ? "en" : "",
    sourcePage: clean_(body.sourcePage, 500),
    userAgent: clean_(body.userAgent, 300),
  };
  if (!data.name || !data.email || !data.company || !data.language) return { ok: false };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { ok: false };
  if (Number.isNaN(new Date(data.submittedAt).getTime())) return { ok: false };
  return Object.assign({ ok: true }, data);
}

function clean_(value, maxLength) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

function safeCell_(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function constantTimeEqual_(actual, expected) {
  if (typeof actual !== "string" || actual.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < actual.length; index += 1) difference |= actual.charCodeAt(index) ^ expected.charCodeAt(index);
  return difference === 0;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
```

Apps Script's Content Service returns JSON but does not provide a normal way to
set an HTTP status code. The `ok` and `code` fields are the response contract;
the Next.js API treats any response without `ok: true` as a delivery failure and
returns a safe error to the browser.

## Setup

1. Create a Google Sheet and copy its ID from the URL between `/d/` and `/edit`.
2. Open [Google Apps Script](https://script.google.com/), create a **New project**, and paste the script above.
3. In **Project Settings** > **Script properties**, add `SPREADSHEET_ID` (the copied ID) and `WEBHOOK_SHARED_SECRET` (a long random value kept in a password manager).
4. Select **Deploy** > **New deployment** > **Web app**.
5. Set **Execute as** to **Me** so the script can write to the Sheet. Select the least broad access that permits your host to reach it; commonly **Anyone**. Every request must still pass shared-secret validation before it can write a row.
6. Deploy, authorize the requested permissions, and copy the `/exec` URL. Do not use `/dev` outside development.
7. In the hosting provider's server environment, set:

   ```bash
   DEMO_REQUEST_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   DEMO_REQUEST_WEBHOOK_TOKEN=the-exact-WEBHOOK_SHARED_SECRET-value
   ```

   Never prefix either variable with `NEXT_PUBLIC_`; redeploy after adding them.
8. Submit the website's contact form. Verify its success response, then open the Sheet and confirm a row appears in **Demo Requests** under the automatically-created header row.

## Stored data and security

The sheet stores only the recommended columns: submitted timestamp, name, email,
phone (blank until the website has a phone field), company, industry, message,
language, source page, and a truncated user-agent. It does not receive IP
addresses, internal errors, or the shared secret. Values starting with `=`, `+`,
`-`, or `@` are prefixed with an apostrophe before they reach a cell, preventing
spreadsheet formula injection. A script lock serializes concurrent appends.
