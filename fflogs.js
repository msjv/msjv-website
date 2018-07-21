const request = require('request-promise-native')

const BASE_URL = 'https://www.fflogs.com/v1'
const API_KEY = process.env.FFLOGS_API_KEY

async function api (endpoint, parameters) {
  return request.get({
    url: `${BASE_URL}${endpoint}?api_key=${API_KEY}`,
    json: true,
    qs: parameters
  })
}

module.exports = {
  async getZones (parameters) {
    return api('/zones', parameters)
  },
  async getClasses (parameters) {
    return api('/classes', parameters)
  },
  async getEncounterRankings (encounterID, parameters) {
    return api(`/rankings/encounter/${encounterID}`, parameters)
  },
  async getCharacterRankings (characterName, serverName, serverRegion, parameters) {
    return api(`/rankings/character/${characterName}/${serverName}/${serverRegion}`, parameters)
  },
  async getParses (characterName, serverName, serverRegion, parameters) {
    return api(`/parses/character/${characterName}/${serverName}/${serverRegion}`, parameters)
  },
  async getGuildReports (guildName, serverName, serverRegion, parameters) {
    return api(`/reports/guild/${guildName}/${serverName}/${serverRegion}`, parameters)
  },
  async getUserReports (userName, parameters) {
    return api(`/reports/user/${userName}`, parameters)
  },
  async getFightsReport (code, parameters) {
    return api(`/report/fights/${code}`, parameters)
  },
  async getEventsReport (code, parameters) {
    return api(`/report/events/${code}`, parameters)
  },
  async getTablesReport (view, code, parameters) {
    return api(`/report/tables/${view}/${code}`, parameters)
  }
}
