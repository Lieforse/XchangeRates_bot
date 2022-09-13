const { parseSubscribeCommand, createBackButton } = require('../../utils')
const log = require('../../utils').logger(__filename)
const {
  telegram: { availableCurrencies },
} = require('../../../configs/config.json')

module.exports = async (bot, db, ctx) => {
  const chatId = String(ctx.chat.id)
  const message = ctx.message.text
  const { from, to, time } = parseSubscribeCommand(message)

  if (!(to && from && time)) {
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

  try {
    const isUnique = await db.models.subscriptions.findOne({ where: { chatId, currency: from, time } })

    if (!isUnique) {
      await db.models.subscriptions.create({
        chatId,
        currency: from,
        time,
      })

      bot.telegram.sendMessage(chatId, 'Subscribed', {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [createBackButton('settings_action')],
        },
      })

      return
    }

    bot.telegram.sendMessage(chatId, 'Subscription with theese parameters is already added', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [createBackButton('settings_action')],
      },
    })
  } catch (error) {
    log.error(`Can't create subscription with such data: ${JSON.stringify({ from, to, time })}, error: ${error}`)
  }
}
