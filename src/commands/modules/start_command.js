const {
  telegram: { introButtons },
} = require('../../../configs/config.json')
const log = require('../../utils').logger(__filename)

module.exports = async (ctx, db) => {
  const { models } = db
  const chatId = String(ctx.chat.id)

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

  ctx.reply(introText, {
    reply_markup: {
      inline_keyboard: introButtons,
    },
  })
}
