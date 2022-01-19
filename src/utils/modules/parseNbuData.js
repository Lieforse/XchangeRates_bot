const moment = require('moment')
const trunc = require('./trunc')
const {
  telegram: { currencyToEmodji },
} = require('../../../configs/config.json')

module.exports = ({ to, rate, date }) => `<b>Exchange rate</b>

  From: ${to} ${currencyToEmodji[to]}
  To: UAH ${currencyToEmodji.UAH}
  Price: ${trunc(rate)}
  Date: ${moment(date).format('DD.MM.YY')}`
