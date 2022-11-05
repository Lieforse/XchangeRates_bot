const moment = require('moment')
const {
  exchangeRates: { availableSources },
  charts: {
    daysNumber,
    scalesOffset,
    options: {
      colors: { sourceToColor },
    },
  },
} = require('../../configs')
const { getPreviousDayDate, trunc } = require('../utils')
const { createImage } = require('../charts')
const { checkIfDataActualized } = require('./dbExchangeRatesActualizer')
const { prettifyChartData } = require('../prettifiers')

const log = require('../utils').logger(__filename)

const prepareExchangeData = async (db, chatId, base) => {
  const {
    Sequelize: { Op },
    models,
  } = db

  const datasets = []
  const allPrices = []
  let chartLabels = []
  const allSourcesData = {}

  const subscribedSources = await models.users
    .findAll({
      where: { chatId },
      attributes: ['exchangeSources'],
      raw: true,
    })
    .then((data) => data[0].exchangeSources)

  for (let i = 0; i < subscribedSources.length; i += 1) {
    const source = subscribedSources[i]

    const isActualized = await checkIfDataActualized(models, base, source)

    if (!isActualized) {
      log.info('Data is not actualized yet, operating with previous day data')
    }

    let dateQuery

    if (!isActualized) {
      const previousDayNumber = 1
      dateQuery = {
        [Op.gte]: moment(getPreviousDayDate(daysNumber + 1), 'YYYYMMDD'),
        [Op.lte]: moment(getPreviousDayDate(previousDayNumber), 'YYYYMMDD'),
      }
    } else {
      dateQuery = {
        [Op.gte]: moment(getPreviousDayDate(daysNumber), 'YYYYMMDD'),
      }
    }

    const dataFromDb = await models.exchangeRates.findAll({
      where: {
        source,
        base,
        date: dateQuery,
      },
    })

    const { labels, chartData, prices } = await prepareDataForChart(dataFromDb)

    const dataset = {
      label: availableSources[source],
      data: chartData,
      fill: false,
      borderColor: [sourceToColor[source]],
      backgroundColor: [sourceToColor[source]],
      borderWidth: 3,
      tension: 0.2,
    }

    datasets.push(dataset)
    allPrices.push(...prices)
    allSourcesData[source] = {
      isActualized,
      label: availableSources[source],
      data: chartData,
    }

    if (labels.length > chartLabels.length) {
      chartLabels = labels
    }
  }

  const chartScales = {
    min: trunc(Math.min(...allPrices) - scalesOffset),
    max: trunc(Math.max(...allPrices) + scalesOffset),
  }

  const image = await createImage({ datasets, scales: chartScales, labels: chartLabels })

  const preparedImage = image.replace('data:image/png;base64,', '')
  const todayDataText = prettifyChartData({ base, quote: 'UAH', allSourcesData })

  return { preparedImage, todayDataText }
}

async function prepareDataForChart(data) {
  const labels = []
  const chartData = []
  const prices = []

  data.forEach(({ rate, date }) => {
    const formattedDate = moment(date).format('DD.MM.YY')

    labels.push(formattedDate)
    chartData.push({ y: rate, x: formattedDate })
    prices.push(rate)
  })

  return { labels, chartData, prices }
}

module.exports = {
  prepareExchangeData,
}
