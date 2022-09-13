const moment = require('moment')
const math = require('mathjs')
const { getTodayDate, trunc } = require('../utils')

const convertCurrencies = async (db, { from, to, amount }) => {
  const { models } = db

  const todayDate = getTodayDate()
  const dbRecord = await models.exchangeRates.findAll({
    where: {
      from,
      to,
      date: moment(todayDate, 'YYYYMMDD'),
    },
  })

  const { rate } = dbRecord[0]

  const scope = {
    rate: Number(rate),
    value: Number(amount),
  }

  const result = trunc(math.evaluate('rate * value', scope))
  return { result, rate }
}

module.exports = { convertCurrencies }
