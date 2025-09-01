import type { Browser, Page } from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { launch } from 'puppeteer-core'
import { uploadToOSS } from './utils'

let _browser: Browser | null = null

async function getBrowser() {
  if (_browser)
    return _browser

  _browser = await launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 720,
      deviceScaleFactor: 2,
    },
    executablePath: await chromium.executablePath(),
    headless: true,
  })

  return _browser
}

interface ScreenshotOptions { width: number, height: number, returnType: 'buffer' | 'json' }
export async function getScreenshot(url: string, options: ScreenshotOptions =
{ width: 1280, height: 720, returnType: 'buffer' }) {
  const { width, height, returnType } = options
  const browser = await getBrowser()
  const page: Page = await browser.newPage()

  await page.setViewport({
    width: Number(width),
    height: Number(height),
    deviceScaleFactor: 2,
  })

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

  const buffer = await page.screenshot({ type: 'png' })

  await page.close() // Serverless 中避免资源泄漏

  if (returnType === 'buffer')
    return buffer
  if (returnType === 'json') {
    const data = await uploadToOSS(buffer)
    return data
  }

  return buffer
}
