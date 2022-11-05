const Big = require('big.js')
const trunc = require('../../utils/modules/trunc')
const {
  telegram: { currencyToEmodji, emojis },
} = require('../../../configs')

module.exports = ({ base, quote, allSourcesData }) => {
  let prettifiedText = `<b>Exchange rates</b>\n\nFrom: ${base} ${currencyToEmodji[base]}\nTo: ${quote} ${currencyToEmodji[quote]}`

  Object.values(allSourcesData).forEach((source) => {
    const { isActualized, label, data } = source

    const todayData = data[data.length - 1]
    const previousDayData = data[data.length - 2]

    const numericDifference = trunc(Big(todayData.y).minus(previousDayData.y))
    const percentageDifference = trunc(Big(todayData.y).div(previousDayData.y).minus(1).times(100))

    prettifiedText += `\n\nSource: ${label}`

    if (!isActualized) {
      prettifiedText += `\n${emojis.exclamation}There is no today data, please wait a couple of minutes and try again${emojis.exclamation}\n`
    }

    prettifiedText += `\nRate: ${trunc(todayData.y)}\nPrevious day rate: ${trunc(
      previousDayData.y,
    )}\nDifference: ${numericDifference}(${percentageDifference}%)\nDate: ${todayData.x}`
  })

  return prettifiedText
}
