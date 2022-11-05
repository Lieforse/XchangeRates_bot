const { createBackButton } = require('../../utils')
const {
  telegram: { settingsButtons },
} = require('../../../configs')

module.exports = async (db, bot, ctx, goBackData) => {
  const chatId = ctx.chat.id

  ctx.deleteMessage()

  bot.telegram.sendMessage(chatId, 'Bot settings', {
    reply_markup: {
      inline_keyboard: [...settingsButtons, createBackButton(goBackData)],
    },
  })
}
