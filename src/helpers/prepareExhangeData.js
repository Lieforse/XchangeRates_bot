const moment = require('moment')
const {
  charts: { daysNumber, scalesOffset },
} = require('../../configs/config.json')
const { prettifyNbuData, getPreviousDayDate, trunc } = require('../utils')
const { createImage } = require('../charts')
const { dbExchangeRatesActualizer, checkIfDataActualized } = require('./dbExchangeRatesActualizer')

const log = require('../utils').logger(__filename)

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

  const isActualized = await checkIfDataActualized(models, currency)
  if (!isActualized) {
    log.info('Data is not actualized yet, operating with previous day data')
  }

  let dataFromDb

  if (!isActualized) {
    const previousDayNumber = 1
    dataFromDb = await models.exchangeRates.findAll({
      where: {
        from: currency,
        date: {
          [Op.gte]: moment(getPreviousDayDate(daysNumber + 1), 'YYYYMMDD'),
          [Op.lte]: moment(getPreviousDayDate(previousDayNumber), 'YYYYMMDD'),
        },
      },
    })
  } else {
    dataFromDb = await models.exchangeRates.findAll({
      where: {
        from: currency,
        date: {
          [Op.gte]: moment(getPreviousDayDate(daysNumber), 'YYYYMMDD'),
        },
      },
    })
  }

  const chart = await prepareDataForChart(dataFromDb)
  const preparedImage = chart.replace('data:image/png;base64,', '')
  const todayDataText = prettifyNbuData(dataFromDb[dataFromDb.length - 1], isActualized)

  return { preparedImage, todayDataText }
}

async function prepareDataForChart(data) {
  const labels = []
  const prices = []

  data.forEach(({ rate, date }) => {
    labels.push(moment(date).format('DD.MM.YY'))
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
