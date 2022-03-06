const { parseConvertCommand } = require('../../utils')
const {
  telegram: { availableCurrencies },
} = require('../../../configs/config.json')
const { prepareConvertData } = require('../../helpers/prepareConvertData')

module.exports = async (bot, db, ctx) => {
  const chatId = ctx.chat.id
  const message = ctx.message.text
  const { from, to, amount } = parseConvertCommand(message)

  if (!(to && from && amount)) {
    bot.telegram.sendMessage(chatId, 'Please write message in the right format')
    return
  }

  if (!availableCurrencies.includes(from)) {
    bot.telegram.sendMessage(chatId, `This 'from' currency ${from} isn't available for converting`)
    return
  }

  if (to !== 'UAH') {
    bot.telegram.sendMessage(chatId, 'Second converting currency is only UAH')
    return
  }

  const result = await prepareConvertData(db, { from, to, amount })
  bot.telegram.sendMessage(chatId, result, { parse_mode: 'HTML' })
}
