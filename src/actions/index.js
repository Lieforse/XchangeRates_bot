/* eslint-disable camelcase */
const {
  exchangeRatesHub_action,
  exchange_action,
  convert_action,
  startHub_action,
  settings_action,
  settings_subscriptions_action,
} = require('./modules')
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
  bot.action('settings_action', (ctx) => settings_action(db, bot, ctx, 'startHub_action'))
  bot.action('settings_subscriptions_action', (ctx) => settings_subscriptions_action(db, bot, ctx, 'settings_action'))
  bot.action('settings_banks_action', (ctx) => settings_action(db, bot, ctx, 'settings_action'))
}

module.exports = { actions }
