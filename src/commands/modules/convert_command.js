const { convertCurrencies } = require('../../helpers/convertCurrencies')
const { parseConvertCommand } = require('../../utils')
const {
  telegram: { availableCurrencies },
} = require('../../../configs/config.json')

module.exports.convertCommand = async (bot, db, ctx) => {
  const chatId = ctx.chat.id
  const message = ctx.message.text
  const { from, to, value } = parseConvertCommand(message)

  if (!(to && from && value)) {
    bot.telegram.sendMessage(chatId, 'Please write message in right format')
    return
  }

  if (!availableCurrencies.includes(from)) {
    bot.telegram.sendMessage(chatId, `This 'from' currency ${from} isn't available for converting`)
    return
  }

  if (to !== 'UAH') {
    bot.telegram.sendMessage(chatId, 'Converting available only for UAH')
    return
  }

  const result = await convertCurrencies(db, { from, to, value })
  bot.telegram.sendMessage(chatId, result)
}
