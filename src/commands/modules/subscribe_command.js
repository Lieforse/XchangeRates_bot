const { parsers, createBackButton } = require('../../utils')
const log = require('../../utils').logger(__filename)
const {
  exchangeRates: { availableCurrencies },
} = require('../../../configs')

module.exports = async (bot, db, ctx) => {
  const chatId = String(ctx.chat.id)
  const message = ctx.message.text
  const { base, quote, time } = parsers.subscribeCommand(message)

  if (!(quote && base && time)) {
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

  try {
    const isPresent = await db.models.subscriptions.findOne({ where: { chatId, currency: base, time } })

    if (!isPresent) {
      await db.models.subscriptions.create({
        chatId,
        currency: base,
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

    bot.telegram.sendMessage(chatId, 'Subscription with these parameters is already added', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [createBackButton('settings_action')],
      },
    })
  } catch (error) {
    log.error(`Can't create subscription with such data: ${JSON.stringify({ base, quote, time })}, error: ${error}`)
  }
}
