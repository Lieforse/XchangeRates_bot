const { get } = require('axios')
const moment = require('moment')
const cc = require('currency-codes')
const { BaseConnector } = require('.')
const {
  apiUrls: { Mono },
} = require('../../../configs')

class MonoConnector extends BaseConnector {
  constructor() {
    super()

    this.source = 'mono'
    this.data = []
    this.normalizedData = null
  }

  async getAndNormalizeData({ forceUpdate }) {
    if (this.normalizedData && !forceUpdate) {
      return
    }

    await this.fetchData()
    this.normalizeData()
  }

  async fetchData() {
    this.data = await get(Mono).then((data) => data.data)
  }

  normalizeData() {
    const { data } = this
    this.normalizedData = {}

    data.forEach((currencyData) => {
      const { rateBuy, rateCross, date, currencyCodeA, currencyCodeB } = currencyData

      const base = cc.number(currencyCodeA)?.code
      const quote = cc.number(currencyCodeB)?.code

      const keyName = `${base}:${quote}`

      this.normalizedData[keyName] = {
        source: this.source,
        base,
        quote,
        rate: rateBuy || rateCross,
        date: moment(moment.unix(date), 'DD.MM.YYYY'),
      }
    })
  }

  getCurrencyData(base, quote) {
    const keyName = `${base}:${quote}`

    return this.normalizedData[keyName]
  }
}

module.exports.MonoConnector = MonoConnector
