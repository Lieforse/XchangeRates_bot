const { prepareExchangeData } = require('../../helpers/prepareExhangeData')
const log = require('../../utils').logger(__filename)

module.exports = async (db, bot, id, base) => {
  const chatId = String(id)
  try {
    const { preparedImage, todayDataText } = await prepareExchangeData(db, chatId, base)

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
