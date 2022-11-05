const moment = require('moment')
const trunc = require('../../utils/modules/trunc')
const {
  exchangeRates: { availableSources },
  telegram: { currencyToEmodji },
} = require('../../../configs')

module.exports = ({ base, quote, amount, result, rate, source }) => `<b>Converting currencies result</b>

  Source: ${availableSources[source]}
  From: ${base} ${currencyToEmodji[base]}
  Amount: ${amount}
  To: ${quote || 'UAH'} ${quote ? currencyToEmodji[quote] : currencyToEmodji.UAH}
  Rate: ${trunc(rate)}
  Date: ${moment().format('DD.MM.YY')}

<b>Result: ${trunc(result)}</b>`
