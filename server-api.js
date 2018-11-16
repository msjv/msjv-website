const express = require('express')
const fflogs = require('./fflogs')
const router = express.Router()

const STATIC = {
  'Bees Knees': null,
  // 'Cygne Eala': null,
  'Edwin Holmes': null,
  'Free Napkins': [ 'Anime Sucks' ],
  'Hat Kid': [ 'Zeno Mus' ],
  // 'Kup-o Coffee': [ 'Kup-O Coffee' ],
  'Lulu Pillow': null,
  'Soy Milk': null,
  'Tiny Sama': null,
  'Wunsucc Wahnquck': null
}

const cache = {}

router.get('/team', (_, response) => {
  if (cache.TEAM && cache.TEAM.timestamp > Date.now() - 86400000) {
    return response.json(cache.TEAM.value)
  }

  fflogs.getGuildReports('Friendship Squad', 'Adamantoise', 'NA')
    .then(reports => {
      reports = reports.filter(report => report.zone === 25) // Omega: Alphascape (Savage)
      return Promise.all([
        Promise.all(reports.map(report =>
          fflogs.getTablesReport('deaths', report.id, { start: 0, end: Number.MAX_SAFE_INTEGER }))),
        Promise.all(reports.map(report =>
          fflogs.getFightsReport(report.id)
        ))
      ])
    })
    .then(([ deathsReports, fightsReports ]) => {
      const deaths = {}
      for (const report of deathsReports) {
        for (const death of report.entries) {
          const { name } = death
          deaths[name] = (deaths[name] || 0) + 1
        }
      }

      const fights = {}
      for (const report of fightsReports) {
        const fightIdMap = {}
        for (const fight of report.fights) {
          fightIdMap[fight.id] = fight.zoneID
        }
        for (const player of report.friendlies) {
          const { name } = player
          fights[name] = (fights[name] || 0) +
            player.fights.map(fight => fightIdMap[fight.id])
              .filter(zoneId => zoneId === 802 || zoneId === 803) // Chaos and Midgardsormr (not sure where the IDs are documented)
              .length
        }
      }

      // TODO: This does not check for serverName
      const staticResults = Object.keys(STATIC)
        .reduce((acc, key) => {
          acc[key] = [ key ].concat(STATIC[key] || [])
            .reduce((acc, name) => {
              acc.deaths += deaths[name] || 0
              acc.fights += fights[name] || 0
              return acc
            }, { deaths: 0, fights: 0 })
          return acc
        }, {})

      cache.TEAM = {
        value: staticResults,
        timestamp: Date.now()
      }

      response.json(cache.TEAM.value)
    })
})

module.exports = router
