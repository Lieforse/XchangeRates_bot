const moment = require('moment')
const trunc = require('./trunc')
const {
  telegram: { currencyToEmodji },
} = require('../../../configs/config.json')

module.exports = ({ from, rate, date }) => `<b>Exchange rate</b>

  From: ${from} ${currencyToEmodji[from]}
  To: UAH ${currencyToEmodji.UAH}
  Price: ${trunc(rate)}
  Date: ${moment(date).format('DD.MM.YY')}`
