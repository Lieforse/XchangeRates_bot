const {
  telegram: { currencyButtons },
} = require('../../../configs/config.json')
const log = require('../../utils').logger('commands')

module.exports.start_command = async (ctx, db) => {
  const { models } = db
  const chatId = ctx.chat.id
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

  ctx.reply('Choose the currency from the list above to get the actual exchange rate', {
    reply_markup: {
      inline_keyboard: currencyButtons,
    },
  })
}
