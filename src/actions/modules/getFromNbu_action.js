const { getNbuData } = require('../../api')
const { getTodayDate, parseNbuData } = require('../../utils')

module.exports.getFromNbu_action = async (bot, chatId, currency) => {
  const todayDate = getTodayDate()

  try {
    const { data } = await getNbuData(currency, todayDate)
    const parsedData = parseNbuData(data[0])
    bot.telegram.sendMessage(chatId, parsedData)
  } catch (error) {
    bot.telegram.sendMessage(chatId, 'Oops, some error occured')
  }
}
