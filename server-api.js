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
    .then(reports =>
        [Promise.all(reports.map(report => fflogs.getTablesReport('deaths', report.id, { start: 0, end: Number.MAX_SAFE_INTEGER }))),
          Promise.all(reports.map(report => fflogs.getFightsReport(report.id, {start:0, end: Number.MAX_SAFE_INTEGER})))]

    )
    .then(reports => {
      const reports1 = reports[0]
      const reports2 = reports[1]

      const deaths = {}
      for (const report of reports1) {
        for (const death of report.entries) {
          const { name } = death
          deaths[name] = (deaths[name] || 0) + 1
        }
      }

      const fights = {}
      for (const report of reports2) {
        for (const player of report.friendlies) {
          const { name } = player
          fights[name] = (fights[name] || 0) + player.fights.length
        }
      }

      const results = {}
      for (const name of deaths) {
        deaths[name] = deaths[name] / fights[name]
      }

      // TODO: This does not check for serverName
      const staticResults = Object.keys(STATIC)
        .reduce((acc, key) => {
          acc[key] = [ key ].concat(STATIC[key] || [])
            .reduce((acc, name) => acc + (results[name] || 0), 0)
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
