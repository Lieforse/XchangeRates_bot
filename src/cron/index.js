const schedule = require('node-schedule')
const { ExchangeRatesActualizerFactory } = require('../helpers/dbExchangeRatesActualizer')
const log = require('../utils').logger('cron')
const { dataActualizer_job, subscriptions_job } = require('./modules')

const cron = async (db, bot) => {
  log.info('Started cron')
  const ExchangeRatesActualizer = new ExchangeRatesActualizerFactory(db)

  schedule.scheduleJob({ minute: 0, tz: 'EET' }, async (time) => {
    await subscriptions_job(db, bot, time)
  })

  schedule.scheduleJob('0 */12 * * *', async () => {
    await dataActualizer_job(ExchangeRatesActualizer, 'nbu', 'every 12th hours')
  })

  schedule.scheduleJob('*/15 * * * *', async () => {
    await dataActualizer_job(ExchangeRatesActualizer, 'mono', 'every 15th minute')
  })
}

module.exports = { cron }
