import { NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

export default async function handler (_: any, res: NextApiResponse): Promise<void> {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto('https://www.fflogs.com/embed/guild-progress-tile/latest?guild=38446&difficulty=100', { waitUntil: 'networkidle2' })
  await page.waitForSelector('.guild-progress-tile-embed')
  const element = await page.$('.guild-progress-tile-embed')
  const buffer = await element!.screenshot({ omitBackground: true }) // eslint-disable-line @typescript-eslint/no-non-null-assertion

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length
  })
  res.end(buffer, 'binary')
}
