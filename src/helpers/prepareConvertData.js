const { prettifyConvertData } = require('../prettifiers')
const { convertCurrencies } = require('./convertCurrencies')

const prepareConvertData = async (db, { base, quote, amount, source }) => {
  const { result, rate } = await convertCurrencies(db, { base, quote, amount, source })
  const formattedResponse = prettifyConvertData({ base, quote, amount, result, rate, source })

  return formattedResponse
}

module.exports = {
  prepareConvertData,
}
