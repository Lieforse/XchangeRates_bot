/* eslint-disable camelcase */
const { getFromNbu_action } = require('./modules/getFromNbu_action')
const {
  telegram: { availableCurrencies },
} = require('../../configs/config.json')

const actions = (bot) => {
  availableCurrencies.forEach((currency) => {
    const actionName = `${currency}-UAH`

    bot.action(actionName, (ctx) => getFromNbu_action(bot, ctx, currency))
  })
}

module.exports = { actions }
