import { launch, Browser, Page } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

let _browser: Browser | null = null;

async function getBrowser() {
  if (_browser) return _browser;

  _browser = await launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  return _browser;
}

export async function getScreenshot(url: string, width = 1280, height = 720) {
  const browser = await getBrowser();
  const page: Page = await browser.newPage();

  await page.setViewport({
    width: Number(width),
    height: Number(height),
    deviceScaleFactor: 2,
  });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

  const buffer = await page.screenshot({ type: "png" });

  await page.close(); // Serverless 中避免资源泄漏

  return buffer;
}
