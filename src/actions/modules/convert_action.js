const { createBackButton } = require('../../utils')

module.exports = async (db, bot, ctx, goBackData) => {
  const chatId = ctx.chat.id

  ctx.deleteMessage()
  bot.telegram.sendMessage(
    chatId,
    `To convert currencies, please, write down message in this format:\n/c {From currency} {To currency} {Amount}\nFor example:\n/c USD UAH 25.99\nCurrently you can convert only to HRYVNIA`,
    {
      reply_markup: {
        inline_keyboard: [createBackButton(goBackData)],
      },
    },
  )
}
