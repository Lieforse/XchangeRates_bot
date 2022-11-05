const { createBackButton, sourcesSubscriptions } = require('../../utils')

module.exports = async (db, bot, ctx, goBackData) => {
  const { models } = db
  const chatId = String(ctx.chat.id)

  const subscribedSources = await models.users
    .findAll({
      where: { chatId },
      attributes: ['exchangeSources'],
      raw: true,
    })
    .then((data) => data[0].exchangeSources)

  ctx.deleteMessage()

  const replyButtons = sourcesSubscriptions.createReplyButtons(subscribedSources)

  bot.telegram.sendMessage(chatId, 'Sources subscriptions:', {
    reply_markup: {
      inline_keyboard: [replyButtons, createBackButton(goBackData)],
    },
  })
}
