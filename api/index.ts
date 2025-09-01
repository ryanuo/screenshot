import { getScreenshot } from '../lib/puppeteer'
// or alternatively use Playwright
// import { getScreenshot } from "./_lib/playwright";
module.exports = async (req, res) => {
  if (!req.query.url)
    return res.status(400).send('No url query specified.')
  if (!checkUrl(req.query.url))
    return res.status(400).send('Invalid url query specified.')
  try {
    const file = await getScreenshot(
      req.query.url,
      {
        width: req.query.width ? Number(req.query.width) : 1280,
        height: req.query.height ? Number(req.query.height) : 720,
        returnType: req.query.returnType || 'buffer',
      },
    )
    res.setHeader('Content-Type', 'image/png')
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=86400, max-age=86400',
    )
    res.status(200).end(file)
  }
  catch (error) {
    console.error(error)
    res
      .status(500)
      .send(
        'The server encountered an error. You may have inputted an invalid query.',
      )
  }
}

function checkUrl(string) {
  try {
    // eslint-disable-next-line no-new
    new URL(string)
  }
  catch (_error) {
    console.error(_error)
    return false
  }
  return true
}
