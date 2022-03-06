const { dbExchangeRatesActualizer } = require('../../helpers/dbExchangeRatesActualizer')
const {
  telegram: { availableCurrencies },
} = require('../../../configs/config.json')

const log = require('../../utils').logger(__filename)

module.exports = async (db) => {
  log.info('Starting daily data actualizing job')
  try {
    for (let i = 0; i < availableCurrencies.length; i += 1) {
      const currency = availableCurrencies[i]
      await dbExchangeRatesActualizer(db, currency)
    }

    log.info('Daily data actualizing job finished')
  } catch (error) {
    log.error(error)
  }
}
