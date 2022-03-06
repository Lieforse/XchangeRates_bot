const { prettifyConvertData } = require('../utils')
const { convertCurrencies } = require('./convertCurrencies')

const prepareConvertData = async (db, { from, to, amount }) => {
  const { result, rate } = await convertCurrencies(db, { from, to, amount })
  const formattedResponse = prettifyConvertData({ from, to, amount, result, rate })

  return formattedResponse
}

module.exports = {
  prepareConvertData,
}
