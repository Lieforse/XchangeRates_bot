/* eslint-disable no-await-in-loop */
const moment = require('moment')
const {
  charts: { daysNumber, scalesOffset },
} = require('../../../configs/config.json')
const { getNbuData } = require('../../api')
const { parseNbuData, logger, getPreviousDayDate, trunc } = require('../../utils')
const { createImage } = require('../../charts')

const log = logger('actions')

module.exports.getFromNbu_action = async (bot, ctx, currency) => {
  const chatId = ctx.chat.id

  try {
    const allData = []
    for (let i = daysNumber - 1; i >= 0; i -= 1) {
      const date = getPreviousDayDate(i)

      const { data } = await getNbuData(currency, date)
      allData.push(data[0])
    }

    const chart = await prepareDataForChart(allData)
    const preparedImage = chart.replace('data:image/png;base64,', '')
    const todayDataParsed = parseNbuData(allData[allData.length - 1])

    bot.telegram.sendPhoto(
      chatId,
      { source: Buffer.from(preparedImage, 'base64') },
      { caption: todayDataParsed, parse_mode: 'HTML' },
    )
  } catch (error) {
    log.error(error)
    bot.telegram.sendMessage(chatId, 'Oops, some error occured')
  }
}

async function prepareDataForChart(data) {
  const labels = []
  const prices = []

  data.forEach(({ rate, exchangedate }) => {
    labels.push(moment(exchangedate, 'DD.MM.YYYY').format('DD.MM.YY'))
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
