const { currencyButtons } = require('../../../configs/telegram.json')

module.exports.start_command = async (ctx, models) => {
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
    console.log(error)
  }

  ctx.reply('Choose the currency from the list above to get the actual exchange rate', {
    reply_markup: {
      inline_keyboard: currencyButtons,
    },
  })
}
