const {
  telegram: { introButtons },
} = require('../../../configs')
const log = require('../../utils').logger(__filename)

module.exports = async (db, bot, ctx) => {
  const { models } = db
  const chatId = String(ctx.chat.id)

  try {
    ctx.deleteMessage()
  } catch (error) {
    log.error(error)
  }

  try {
    await models.users.findOrCreate({
      where: {
        chatId,
      },
      defaults: {
        chatId,
      },
    })
  } catch (error) {
    log.error(error)
  }
  const introText = `Hello;)\nI'm Xchange Rates bot that provides actual exchange rates for hryvnia.\nTo proceed, choose the next step`

  bot.telegram.sendMessage(chatId, introText, {
    reply_markup: {
      inline_keyboard: introButtons,
    },
  })
}
