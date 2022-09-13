const { prepareExchangeData } = require('../../helpers/prepareExhangeData')
const log = require('../../utils').logger(__filename)

module.exports = async (db, bot, chatId, currency) => {
  try {
    const { preparedImage, todayDataText } = await prepareExchangeData(db, currency)

    bot.telegram.sendPhoto(
      chatId,
      { source: Buffer.from(preparedImage, 'base64') },
      { caption: todayDataText, parse_mode: 'HTML' },
    )
  } catch (error) {
    log.error(error)
    bot.telegram.sendMessage(chatId, 'Oops, some error occured')
  }
}
