const moment = require('moment')
const CommonExchangeRatesActualizer = require('./commonActualizer')

class ExchangeRatesActualizerFactory {
  constructor(db) {
    this.db = db
  }

  create(source) {
    switch (source) {
      default:
        return new CommonExchangeRatesActualizer(this.db, source)
    }
  }
}

const checkIfDataActualized = async (models, base, source) => {
  const isActualized = await models.exchangeRates.findOne({
    where: {
      source,
      base,
      date: moment(),
    },
    raw: true,
  })

  return !!isActualized
}

module.exports = { ExchangeRatesActualizerFactory, checkIfDataActualized }
