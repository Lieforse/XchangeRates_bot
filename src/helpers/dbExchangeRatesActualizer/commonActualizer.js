const AbstractExchangeRatesActualizer = require('./abstractActualizer')

class CommonExchangeRatesActualizer extends AbstractExchangeRatesActualizer {
  constructor(db, source) {
    super()

    this.db = db
    this.source = source
  }

  async actualize(base, quote) {
    const { models } = this.db

    const data = this.connectorsHashmap[this.source].getCurrencyData(base, quote)
    const todayData = await models.exchangeRates.findOne({
      where: { date: data.date, base: data.base, source: data.source },
      raw: true,
    })

    if (todayData) {
      if (todayData.rate === data.rate) {
        return
      }

      await models.exchangeRates.update({ rate: data.rate }, { where: { id: todayData.id } })
      return
    }

    await models.exchangeRates.create(data)
  }
}

module.exports = CommonExchangeRatesActualizer
