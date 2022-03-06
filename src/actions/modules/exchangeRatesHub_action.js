const {
  telegram: { currencyButtons },
} = require('../../../configs/config.json')
const { createBackButton } = require('../../utils')

module.exports = async (db, bot, ctx, goBackData) => {
  const chatId = ctx.chat.id

  ctx.deleteMessage()
  bot.telegram.sendMessage(chatId, 'Choose the currency from the list below to get the actual exchange rates', {
    reply_markup: {
      inline_keyboard: [...currencyButtons, createBackButton(goBackData)],
    },
  })
}
