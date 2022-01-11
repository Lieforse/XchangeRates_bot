const trunc = require('./trunc')
const { currencyToEmodji } = require('../../../configs/telegram.json')

module.exports = ({ cc, rate, exchangedate }) => `**** Exchange rate ****

  From: ${cc} ${currencyToEmodji[cc]}
  To: UAH ${currencyToEmodji.UAH}
  Price: ${trunc(rate)}
  Date: ${exchangedate}`
