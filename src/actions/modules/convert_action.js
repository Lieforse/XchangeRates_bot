const {
  exchangeRates: { availableSources },
} = require('../../../configs')
const { createBackButton } = require('../../utils')

module.exports = async (db, bot, ctx, goBackData) => {
  ctx.deleteMessage()

  const chatId = ctx.chat.id
  const availableSourcesText = Object.keys(availableSources).join(', ')

  bot.telegram.sendMessage(
    chatId,
    `To convert currencies, please, write down message in this format:\n/c {From currency} {To currency} {Amount} {Source}\n\nFor example:\n/c USD UAH 25.99 mono\n\nCurrently you can convert only to HRYVNIA\n\n Available sources: ${availableSourcesText}`,
    {
      reply_markup: {
        inline_keyboard: [createBackButton(goBackData)],
      },
    },
  )
}
