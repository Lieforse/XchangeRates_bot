/* eslint-disable camelcase */
const { getFromNbu_action } = require('./modules/getFromNbu_action')
const {
  telegram: { availableCurrencies },
} = require('../../configs/config.json')

const actions = (db, bot) => {
  availableCurrencies.forEach((currency) => {
    const actionName = `${currency}-UAH`

    bot.action(actionName, (ctx) => getFromNbu_action(db, bot, ctx.chat.id, currency))
  })
}

module.exports = { actions }
