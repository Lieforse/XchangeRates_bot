const schedule = require('node-schedule')
const log = require('../utils').logger('cron')
const { getFromNbu_action } = require('../actions/modules/getFromNbu_action')
const { dbExchangeRatesActualizer } = require('../helpers/dbExchangeRatesActualizer')
const {
  telegram: { availableCurrencies },
} = require('../../configs/config.json')

const cron = async (db, bot) => {
  log.info('Starting cron')
  schedule.scheduleJob({ hour: 9, minute: 0, tz: 'EET' }, async () => {
    log.info('Starting daily job')
    try {
      const users = await db.models.users.findAll()

      const usersPromise = users.map(({ chatId }) => getFromNbu_action(db, bot, chatId, 'USD'))
      await Promise.all(usersPromise)

      log.info('Daily job finished')
    } catch (error) {
      log.error(error)
    }
  })

  schedule.scheduleJob({ hour: 0, minute: 0, tz: 'EET' }, async () => {
    log.info('Starting daily data actualizing job')
    try {
      for (let i = 0; i < availableCurrencies.length; i += 1) {
        const currency = availableCurrencies[i]
        await dbExchangeRatesActualizer(db, currency)
      }

      log.info('Daily data actualizing job finished')
    } catch (error) {
      log.error(error)
    }
  })
}

module.exports = { cron }
