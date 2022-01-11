/* eslint-disable camelcase */
const { getFromNbu_action } = require('./modules/getFromNbu_action')
const { availableCurrencies } = require('../../configs/telegram.json')

const actions = (bot) => {
  availableCurrencies.forEach((currency) => {
    const actionName = `${currency}-UAH`

    bot.action(actionName, (ctx) => getFromNbu_action(bot, ctx.chat.id, currency))
  })
}

module.exports = { actions }
