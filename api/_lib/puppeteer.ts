import { launch, Page } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

let _page: Page | null;

async function getPage() {
  if (_page) return _page;

  const browser = await launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  _page = await browser.newPage();

  return _page;
}

export async function getScreenshot(url, width, height) {
  const page = await getPage();
  await page.goto(url);
  await page.setViewport({
    width: Number(width) || 1280,
    height: Number(height) || 720,
    deviceScaleFactor: 2,
  });
  const file = await page.screenshot();
  return file;
}
