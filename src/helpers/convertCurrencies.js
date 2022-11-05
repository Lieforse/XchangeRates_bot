const moment = require('moment')
const Big = require('big.js')
const { getTodayDate, trunc } = require('../utils')

const convertCurrencies = async (db, { base, quote, amount, source }) => {
  const { models } = db

  const todayDate = getTodayDate()
  const dbRecord = await models.exchangeRates.findOne({
    where: {
      source,
      base,
      quote,
      date: moment(todayDate, 'YYYYMMDD'),
    },
  })

  const { rate } = dbRecord

  const result = trunc(Big(rate).times(amount))

  return { result, rate }
}

module.exports = { convertCurrencies }
