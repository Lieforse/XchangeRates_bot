/* eslint-disable no-await-in-loop */
const moment = require('moment')
const {
  charts: { daysNumber, scalesOffset },
} = require('../../configs/config.json')
const { parseNbuData, getPreviousDayDate, trunc } = require('../utils')
const log = require('../utils').logger('prepareExchangeData')
const { createImage } = require('../charts')
const { dbExchangeRatesActualizer } = require('./dbExchangeRatesActualizer')

const prepareExchangeData = async (db, currency) => {
  const {
    Sequelize: { Op },
    models,
  } = db

  try {
    await dbExchangeRatesActualizer(db, currency)
  } catch (error) {
    log.error("Data can't be actualized: ", error)
  }

  const dataFromDb = await models.exchangeRates.findAll({
    where: {
      from: currency,
      date: {
        [Op.gte]: moment(getPreviousDayDate(daysNumber), 'YYYYMMDD'),
      },
    },
  })

  const chart = await prepareDataForChart(dataFromDb)
  const preparedImage = chart.replace('data:image/png;base64,', '')
  const todayParsedData = parseNbuData(dataFromDb[dataFromDb.length - 1])

  return { preparedImage, todayParsedData }
}

async function prepareDataForChart(data) {
  const labels = []
  const prices = []

  data.forEach(({ rate, date }) => {
    labels.push(moment(date, 'DD.MM.YYYY').format('DD.MM.YY'))
    prices.push(rate)
  })

  const scales = {
    min: trunc(Math.min(...prices) - scalesOffset),
    max: trunc(Math.max(...prices) + scalesOffset),
  }

  const chartData = { labels, prices, scales }
  const image = await createImage(chartData)

  return image
}

module.exports = {
  prepareExchangeData,
}
