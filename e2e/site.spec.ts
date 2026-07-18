import { expect, test, type Page } from "@playwright/test";

const importantRoutes = [
  "/",
  "/features",
  "/features/crm",
  "/products",
  "/products/exchange",
  "/industries",
  "/industries/manufacturing",
  "/pricing",
  "/contact",
  "/ar",
  "/ar/features",
  "/ar/features/crm",
  "/ar/products",
  "/ar/products/exchange",
  "/ar/industries",
  "/ar/industries/manufacturing",
  "/ar/pricing",
  "/ar/contact",
];

function observePageHealth(page: Page) {
  const consoleErrors: string[] = [];
  const failedLocalRequests: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.url().startsWith("http://localhost:3000") && response.status() >= 400) {
      failedLocalRequests.push(`${response.status()} ${response.url()}`);
    }
  });
  return { consoleErrors, failedLocalRequests };
}

test("English and Arabic homepages load", async ({ page }) => {
  const health = observePageHealth(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("One platform for your entire business");
  await page.goto("/ar");
  await expect(page.locator('[dir="rtl"] h1')).toBeVisible();
  expect(health.consoleErrors).toEqual([]);
  expect(health.failedLocalRequests).toEqual([]);
});

test("English and Arabic not-found pages are localized", async ({ page }) => {
  const english = await page.goto("/missing-page");
  expect(english?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This path is disconnected.");

  const arabic = await page.goto("/ar/missing-page");
  expect(arabic?.status()).toBe(404);
  await expect(page.locator('[dir="rtl"] h1')).toHaveText("هذا المسار غير متصل.");
});

test("desktop navigation routes to features", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Features" }).click();
  await expect(page).toHaveURL(/\/features$/);
});

test("mobile navigation opens, closes, and handles Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
});

test("Arabic navigation order follows the localized information architecture", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ar");
  await expect(page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link")).toHaveText([
    "المزايا",
    "المنتجات",
    "القطاعات",
    "الحلول والأسعار",
  ]);
});

test("Arabic typography and mixed-direction form values remain correct", async ({ page }) => {
  await page.goto("/ar");
  await expect(page.locator("h1")).toHaveCSS("letter-spacing", "normal");

  await page.goto("/ar/contact");
  await expect(page.getByLabel("البريد الإلكتروني للعمل *")).toHaveCSS("direction", "ltr");
  await expect(page.getByLabel("البريد الإلكتروني للعمل *")).toHaveCSS("text-align", "left");
});

test("hero calls to action reach their intended routes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Book a tailored demo", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.goto("/ar");
  await page.getByRole("link", { name: "استكشف المنصة" }).click();
  await expect(page).toHaveURL(/\/ar\/features$/);
});

test("reduced motion preserves the complete hero experience", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".control-console")).toBeVisible();
  await expect(page.locator(".module-node").first()).toBeVisible();
  expect(await page.locator(".control-console").evaluate((element) => getComputedStyle(element).animationIterationCount)).toBe("1");
});

test("English contact validation, confirmation, and reset flow", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send my demo request" }).click();
  await expect(page.getByLabel("Full name *")).toBeFocused();
  await page.getByLabel("Full name *").fill("Ada Lovelace");
  await page.getByLabel("Work email *").fill("ada@example.com");
  await page.getByLabel("Company *").fill("UNU Labs");
  await page.getByRole("button", { name: "Send my demo request" }).click();
  await expect(page.getByRole("status")).toContainText("Your request has been sent");
  await page.getByRole("button", { name: "Edit my details" }).click();
  await expect(page.getByRole("button", { name: "Send my demo request" })).toBeVisible();
});

test("Arabic contact validation, confirmation, and reset flow", async ({ page }) => {
  await page.goto("/ar/contact");
  await page.getByRole("button", { name: "إرسال طلب العرض" }).click();
  await expect(page.getByLabel("الاسم الكامل *")).toBeFocused();
  await page.getByLabel("الاسم الكامل *").fill("مستخدم تجريبي");
  await page.getByLabel("البريد الإلكتروني للعمل *").fill("test@example.com");
  await page.getByLabel("الشركة *").fill("شركة تجريبية");
  await page.getByLabel("القطاع").selectOption({ label: "التقنية" });
  await page.getByRole("button", { name: "إرسال طلب العرض" }).click();
  await expect(page.getByRole("status")).toContainText("تم إرسال طلبك");
  await page.getByRole("button", { name: "تعديل البيانات" }).click();
  await expect(page.getByRole("button", { name: "إرسال طلب العرض" })).toBeVisible();
});

test("important routes are healthy and have complete links", async ({ page }) => {
  const health = observePageHealth(page);
  for (const route of importantRoutes) {
    const response = await page.goto(route);
    expect(response?.ok(), route).toBeTruthy();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("a:not([href]), a[href='']"), route).toHaveCount(0);
    const images = page.locator("img");
    const imageCount = await images.count();
    for (let index = 0; index < imageCount; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
          ), {
          message: `${route} image ${index + 1} failed to load`,
        })
        .toBe(true);
    }
  }
  expect(health.consoleErrors).toEqual([]);
  expect(health.failedLocalRequests).toEqual([]);
});

test("requested viewports have no horizontal overflow", async ({ page }) => {
  for (const route of ["/", "/ar"]) {
    for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
        `${route} at ${width}px overflowed`,
      ).toBe(true);
    }
  }
});

test("the ERP command center remains fully contained in English and Arabic", async ({ page }) => {
  for (const route of ["/", "/ar"]) {
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const bounds = await page.locator(".control-console").evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, viewport: window.innerWidth };
      });
      expect(bounds.left, `${route} console escaped the inline start at ${width}px`).toBeGreaterThanOrEqual(0);
      expect(bounds.right, `${route} console escaped the inline end at ${width}px`).toBeLessThanOrEqual(bounds.viewport);
    }
  }
});
