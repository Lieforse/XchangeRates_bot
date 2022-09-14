const moment = require('moment')
const trunc = require('../../utils/modules/trunc')
const {
  telegram: { currencyToEmodji },
} = require('../../../configs/config.json')

module.exports = ({ from, to, amount, result, rate }) => `<b>Converting currencies result</b>

  From: ${from} ${currencyToEmodji[from]}
  Amount: ${amount}
  To: ${to || 'UAH'} ${to ? currencyToEmodji[to] : currencyToEmodji.UAH}
  Rate: ${trunc(rate)}
  Date: ${moment().format('DD.MM.YY')}

<b>Result: ${trunc(result)}</b>`
