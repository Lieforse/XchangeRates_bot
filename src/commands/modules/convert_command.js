const { parsers } = require('../../utils')
const {
  exchangeRates: { availableCurrencies },
} = require('../../../configs')
const { prepareConvertData } = require('../../helpers/prepareConvertData')

module.exports = async (bot, db, ctx) => {
  const chatId = ctx.chat.id
  const message = ctx.message.text
  const { base, quote, amount, source } = parsers.convertCommand(message)

  if (!(quote && base && amount)) {
    bot.telegram.sendMessage(chatId, 'Please write message in the right format')
    return
  }

  if (!availableCurrencies.includes(base)) {
    bot.telegram.sendMessage(chatId, `This 'from' currency ${base} isn't available for converting`)
    return
  }

  if (quote !== 'UAH') {
    bot.telegram.sendMessage(chatId, 'Second converting currency is only UAH')
    return
  }

  const result = await prepareConvertData(db, { base, quote, amount, source })
  bot.telegram.sendMessage(chatId, result, { parse_mode: 'HTML' })
}
