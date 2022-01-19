const { prepareExchangeData } = require('../../helpers/prepareExhangeData')
const { logger } = require('../../utils')

const log = logger('actions')

module.exports.getFromNbu_action = async (db, bot, chatId, currency) => {
  try {
    const { preparedImage, todayParsedData } = await prepareExchangeData(db, currency)

    bot.telegram.sendPhoto(
      chatId,
      { source: Buffer.from(preparedImage, 'base64') },
      { caption: todayParsedData, parse_mode: 'HTML' },
    )
  } catch (error) {
    log.error(error)
    bot.telegram.sendMessage(chatId, 'Oops, some error occured')
  }
}
