const { createBackButton, prettifySubscriptions } = require('../../utils')

module.exports = async (db, bot, ctx, goBackData) => {
  const { models } = db
  const chatId = String(ctx.chat.id)

  const subscriptions = await models.subscriptions.findAll({ where: { chatId }, raw: true })

  ctx.deleteMessage()
  if (subscriptions.length) {
    await bot.telegram.sendMessage(chatId, `Your current subscriptions are:\n\n${prettifySubscriptions(subscriptions)}`)
  } else {
    await bot.telegram.sendMessage(chatId, 'You have no subscriptions yet')
  }

  bot.telegram.sendMessage(
    chatId,
    'To subscribe for a currency, please send the next message: \n\n/s {From currency} {To currency} {Time}\n\n/s USD UAH 9:00\n\nTime should be only in hours, minutes will not be counted.\n\n\nTo unsubsribe - send, the same data but start the command with /unsub :\n\n/unsub {From currency} {To currency} {Time}',
    {
      reply_markup: {
        inline_keyboard: [createBackButton(goBackData)],
      },
    },
  )
}
