const { get } = require('axios')
const moment = require('moment')
const { BaseConnector } = require('.')
const {
  apiUrls: { NBU },
} = require('../../../configs')

class NbuConnector extends BaseConnector {
  constructor() {
    super()

    this.source = 'nbu'
    this.currentDate = ''
    this.data = []
    this.normalizedData = null
  }

  async getAndNormalizeData({ date, forceUpdate }) {
    if (this.normalizedData && this.currentDate === date && !forceUpdate) {
      return
    }

    this.currentDate = date

    await this.fetchData(date)
    this.normalizeData()
  }

  async fetchData(date) {
    this.data = await await get(`${NBU}?date=${date}&json`).then((data) => data.data)
  }

  normalizeData() {
    const { data } = this
    this.normalizedData = {}

    data.forEach((currencyData) => {
      const { cc: base, rate, exchangedate } = currencyData
      const quote = 'UAH'
      const keyName = `${base}:${quote}`

      this.normalizedData[keyName] = {
        source: this.source,
        base,
        quote,
        rate,
        date: moment(exchangedate, 'DD.MM.YYYY'),
      }
    })
  }

  getCurrencyData(base) {
    const keyName = `${base}:UAH`

    return this.normalizedData[keyName]
  }
}

module.exports.NbuConnector = NbuConnector
