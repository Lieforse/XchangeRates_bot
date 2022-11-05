const {
  exchangeRates: { availableCurrencies },
} = require('../../../configs')
const { connectorsHashmap } = require('../../api')
const { getTodayDate } = require('../../utils')

const log = require('../../utils').logger(__filename)

module.exports = async (ExchangeRatesActualizerFactory, source, intervalText) => {
  log.info(`Starting ${intervalText} data actualizing job`)
  const date = getTodayDate()

  try {
    await connectorsHashmap[source].getAndNormalizeData({ forceUpdate: true, date })
    const ExchangeRatesActualizer = ExchangeRatesActualizerFactory.create(source)

    for (let i = 0; i < availableCurrencies.length; i += 1) {
      const base = availableCurrencies[i]

      await ExchangeRatesActualizer.actualize(base, 'UAH')
    }

    log.info(`${intervalText} data actualizing job finished`)
  } catch (error) {
    log.error(error)
  }
}
