const { createBackButton, log, sourcesSubscriptions } = require('../../utils')

module.exports = async (db, bot, ctx, goBackData, source) => {
  const { models } = db
  const chatId = String(ctx.chat.id)

  const subscribedSources = await models.users
    .findAll({
      where: { chatId },
      attributes: ['exchangeSources'],
      raw: true,
    })
    .then((data) => data[0].exchangeSources)

  const isSubscribed = subscribedSources.findIndex((item) => item === source)

  if (isSubscribed === -1) {
    subscribedSources.push(source)
  } else {
    subscribedSources.splice(isSubscribed, 1)
  }

  try {
    await models.users.update(
      { exchangeSources: subscribedSources },
      {
        where: { chatId },
      },
    )
  } catch (error) {
    log.error(`Can't update user ${chatId} exchange sources: ${JSON.stringify(subscribedSources)}`, error)
  }

  try {
    const replyButtons = sourcesSubscriptions.createReplyButtons(subscribedSources)

    ctx.editMessageReplyMarkup({
      inline_keyboard: [replyButtons, createBackButton(goBackData)],
    })
  } catch (error) {
    log.error(`Can't update user ${chatId} message`, error)
  }
}
