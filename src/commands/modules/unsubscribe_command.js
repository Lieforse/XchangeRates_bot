const { parsers, createBackButton } = require('../../utils')
const log = require('../../utils').logger(__filename)

module.exports = async (bot, db, ctx) => {
  const chatId = String(ctx.chat.id)
  const message = ctx.message.text
  const { id } = parsers.unsubscribeCommand(message)

  if (!(id || id === 0)) {
    bot.telegram.sendMessage(chatId, 'Please write message in the right format')
    return
  }

  try {
    const subscription = await db.models.subscriptions.findOne({ where: { id }, raw: true })

    if (subscription && chatId === subscription.chatId) {
      await db.models.subscriptions.destroy({ where: { id } })

      bot.telegram.sendMessage(chatId, 'Unsubscribed', {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [createBackButton('settings_action')],
        },
      })

      return
    }

    bot.telegram.sendMessage(chatId, "Subscription with theese parameters doesn't exist", {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [createBackButton('settings_action')],
      },
    })
  } catch (error) {
    log.error(`Can't delete subscription with such id: ${id}, error: ${error}`)
  }
}
