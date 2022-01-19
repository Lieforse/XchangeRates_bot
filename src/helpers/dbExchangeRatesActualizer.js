const moment = require('moment')
const {
  charts: { daysNumber },
} = require('../../configs/config.json')
const { getNbuData } = require('../api')
const { getTodayDate, getPreviousDayDate } = require('../utils')

const dbExchangeRatesActualizer = async (db, currency) => {
  const {
    Sequelize: { Op },
    models,
  } = db

  const dbRecords = await models.exchangeRates.findAll({
    where: {
      to: currency,
      date: {
        [Op.gte]: moment(getPreviousDayDate(daysNumber), 'YYYYMMDD'),
      },
    },
  })
  const todayDate = getTodayDate()

  const isTodayRatesPresent = dbRecords.find((item) => moment(item.date).format('YYYYMMDD') === todayDate)

  if (!!isTodayRatesPresent && dbRecords.length >= 14) {
    return
  }

  for (let i = daysNumber - 1; i >= 0; i -= 1) {
    const date = getPreviousDayDate(i)
    const isDayPresent = dbRecords.find((item) => moment(item.date).format('YYYYMMDD') === todayDate)

    if (!isDayPresent) {
      const { data } = await getNbuData(currency, date)
      const { cc, rate, exchangedate } = data[0]
      const newRecord = {
        from: 'UAH',
        to: cc,
        rate,
        date: moment(exchangedate, 'DD.MM.YYYY'),
      }

      models.exchangeRates.create(newRecord)
    }
  }
}

module.exports = { dbExchangeRatesActualizer }
