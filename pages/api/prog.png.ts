import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import LRU from 'lru-cache'

const MSJV = '38446'
const cache = new LRU({
  max: 5,
  ttl: 60 * 1000
})

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const guild = req.query.g ?? MSJV
  const widgetUrl = `https://www.fflogs.com/embed/guild-progress-tile/latest?guild=${String(guild)}&difficulty=100`
  let buffer: Buffer

  if (cache.has(guild) as boolean) {
    buffer = cache.get(guild)
  } else {
    const browser = await puppeteer.launch({
      args: [
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain'
      ]
    })
    const page = await browser.newPage()
    await page.goto(widgetUrl, { waitUntil: 'networkidle2' })
    await page.waitForSelector('.guild-progress-tile-embed')
    const element = await page.$('.guild-progress-tile-embed')
    buffer = await element!.screenshot({ omitBackground: true }) as Buffer // eslint-disable-line @typescript-eslint/no-non-null-assertion
    cache.set(guild, buffer)
    void browser.close()
  }

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length
  })
  res.end(buffer, 'binary')
}
