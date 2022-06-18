import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const MSJV = '38446'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const guild = req.query.g ?? MSJV
  const response = await fetch(`https://www.fflogs.com/zone/race/content/45?difficulty=100&guild=${String(guild)}`, {
    referrer: `https://www.fflogs.com/embed/guild-progress-tile/latest?guild=${String(guild)}&difficulty=100`
  })
  const data = await response.json()

  res.status(200).json(data)
}
