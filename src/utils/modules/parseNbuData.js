const trunc = require('./trunc')
const {
  telegram: { currencyToEmodji },
} = require('../../../configs/config.json')

module.exports = ({ cc, rate, exchangedate }) => `<b>Exchange rate</b>

  From: ${cc} ${currencyToEmodji[cc]}
  To: UAH ${currencyToEmodji.UAH}
  Price: ${trunc(rate)}
  Date: ${exchangedate}`
