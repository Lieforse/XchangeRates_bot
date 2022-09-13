const moment = require('moment')
const trunc = require('./trunc')
const {
  telegram: { currencyToEmodji, emojis },
} = require('../../../configs/config.json')

module.exports = ({ from, rate, date }, isActualized) => {
  if (!isActualized) {
    return `<b>Exchange rate</b>

    ${emojis.exclamation}There is no today data, please wait a couple of minutes and try again${emojis.exclamation}
    From: ${from} ${currencyToEmodji[from]}
    To: UAH ${currencyToEmodji.UAH}
    Price: ${trunc(rate)}
    Date: ${moment(date).format('DD.MM.YY')}`
  }
  return `<b>Exchange rate</b>

    From: ${from} ${currencyToEmodji[from]}
    To: UAH ${currencyToEmodji.UAH}
    Price: ${trunc(rate)}
    Date: ${moment(date).format('DD.MM.YY')}`
}
