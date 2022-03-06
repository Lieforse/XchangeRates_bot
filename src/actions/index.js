/* eslint-disable camelcase */
const { exchangeRatesHub_action, exchange_action, convert_action, startHub_action } = require('./modules')
const {
  telegram: { availableCurrencies },
} = require('../../configs/config.json')

const actions = (db, bot) => {
  availableCurrencies.forEach((currency) => {
    const actionName = `${currency}-UAH`

    bot.action(actionName, (ctx) => exchange_action(db, bot, ctx.chat.id, currency))
  })

  bot.action('exchange_rates_hub_action', (ctx) => exchangeRatesHub_action(db, bot, ctx, 'startHub_action'))
  bot.action('convert_action', (ctx) => convert_action(db, bot, ctx, 'startHub_action'))
  bot.action('startHub_action', (ctx) => startHub_action(db, bot, ctx))
}

module.exports = { actions }
