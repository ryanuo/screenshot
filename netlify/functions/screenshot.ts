import { getScreenshot } from '../../_lib/puppeteer'

function checkUrl(string: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(string)
  }
  catch {
    return false
  }
  return true
}

export async function handler(event: any) {
  const params = event.queryStringParameters || {}
  const { url, width, height, returnType } = params

  if (!url)
    return { statusCode: 400, body: 'No url query specified.' }
  if (!checkUrl(url))
    return { statusCode: 400, body: 'Invalid url query specified.' }

  try {
    const file = await getScreenshot(url, {
      width: width ? Number(width) : 1280,
      height: height ? Number(height) : 720,
      returnType: returnType || 'buffer',
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, immutable, no-transform, s-maxage=86400, max-age=86400',
      },
      body: file.toString(),
      isBase64Encoded: true,
    }
  }
  catch (error) {
    console.error(error)
    return { statusCode: 500, body: 'Screenshot failed.' }
  }
}
