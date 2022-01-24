const moment = require('moment')
const math = require('mathjs')
const { getTodayDate } = require('../utils')
const { dbExchangeRatesActualizer } = require('./dbExchangeRatesActualizer')

const convertCurrencies = async (db, { from, to, value }) => {
  const { models } = db
  await dbExchangeRatesActualizer(db, from)
  const todayDate = getTodayDate()
  const dbRecord = await models.exchangeRates.findAll({
    where: {
      from,
      to,
      date: moment(todayDate, 'YYYYMMDD'),
    },
  })

  const scope = {
    rate: Number(dbRecord[0].rate),
    value: Number(value),
  }

  const result = math.evaluate('rate * value', scope)
  return result
}

module.exports = { convertCurrencies }
