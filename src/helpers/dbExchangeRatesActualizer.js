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
      from: currency,
      date: {
        [Op.gte]: moment(getPreviousDayDate(daysNumber), 'YYYYMMDD'),
      },
    },
    raw: true,
  })
  const todayDate = getTodayDate()

  const isTodayRatesPresent = dbRecords.find((item) => moment(item.date).format('YYYYMMDD') === todayDate)

  if (!!isTodayRatesPresent && dbRecords.length >= 14) {
    return
  }

  for (let i = daysNumber - 1; i >= 0; i -= 1) {
    const date = getPreviousDayDate(i)
    const isDayPresent = dbRecords.find((item) => moment(item.date).format('YYYYMMDD') === date)

    if (!isDayPresent) {
      const { data } = await getNbuData(currency, date)
      const { cc, rate, exchangedate } = data[0]
      const newRecord = {
        from: cc,
        to: 'UAH',
        rate,
        date: moment(exchangedate, 'DD.MM.YYYY'),
      }

      await models.exchangeRates.create(newRecord)
    }
  }
}

const checkIfDataActualized = async (models, currency) => {
  const isActualized = models.exchangeRates.findOne({
    where: {
      from: currency,
      date: moment(),
    },
    raw: true,
  })

  return !!isActualized
}

module.exports = { dbExchangeRatesActualizer, checkIfDataActualized }
