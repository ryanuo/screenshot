import { chromium as playwright, Page } from "playwright-core";
import chromium from "@sparticuz/chromium";

let _page: Page | null;

async function getPage() {
  if (_page) return _page;

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  const context = await browser.newContext();
  _page = await context.newPage();

  return _page;
}

export async function getScreenshot(url, width, height) {
  const page = await getPage();

  await page.goto(url);
  await page.setViewportSize({
    width: Number(width) || 1280,
    height: Number(height) || 720,
  });

  const file = await page.screenshot();

  return file;
}
