> This repo is "cloned" from this one: https://github.com/RemiixInc/screenshot
> But now I'd say it's more loosely based on that one, because I've updated
> and changed the packages used to take screenshots.

# Vercel Screenshot

Serverless API to take screenshots of websites with Puppeteer or Playwright

## Usage

Clone/fork the repo to your scope and deploy to Vercel however you like.

I tested it with Node 18, but a very similar code in [kindle-page](https://github.com/bukowskiadam/kindle-page)
works ok in Node 20 runtime.

### Example

```
https://<your vercel app>/api?url=https://google.com&width=1280&height=720
```

---

> Leave the Github star ⭐️ if it is useful